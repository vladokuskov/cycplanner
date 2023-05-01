import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { DetailMainSection } from '@/components/EventDetail/DetailMain/DetailMainSection';
import { DetailSidebarSection } from '@/components/EventDetail/DetailSidebar/DetailSidebarSection';
import { SkeletonLoader } from '@/components/skeleton/Skeleton';
import StyledContainer from '@/components/StyledContainer/StyledContainer';
import { IEvent } from '@/components/types/shared/event.types';
import { Loading } from '@/components/types/shared/loadingState.types';
import { getDetailEvent } from '@/firebase/events';
import PrivateRoute from '@/modules/PrivateRoute';

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  const router = useRouter();

  const [loading, setLoading] = useState<Loading>(Loading.loading);
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (router && router.query && router.query.id) {
          const data = await getDetailEvent(router.query.id);

          if (data) {
            setEvent(data);
            setLoading(Loading.success);
          }
        }
      } catch (err) {
        console.error(err);

        setLoading(Loading.error);
      }
    }
    fetchData();
  }, [loading]);

  const handleLoadingChange = async (e: Loading) => {
    setLoading(e);
  };

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner {event && `- ${event.title}`}</title>
        </Head>
        <StyledContainer variant="page">
          {loading === Loading.loading ? (
            <SkeletonLoader variant="detail-page" />
          ) : loading === Loading.success ? (
            <StyledContainer variant="detail-page">
              <DetailMainSection
                event={event}
                handleLoadingChange={handleLoadingChange}
              />
              <DetailSidebarSection event={event} />
            </StyledContainer>
          ) : (
            <p>Error occured</p>
          )}
        </StyledContainer>
      </DynamicLayout>
    </PrivateRoute>
  );
}
