import PrivateRoute from '@/modules/PrivateRoute';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/StyledContainer/StyledContainer';
import { IEvent } from '@/components/types/shared/event.types';
import { getDetailEvent } from '@/firebase/events';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '@/components/types/shared/loadingState.types';
import { DetailMainSection } from '@/components/EventDetail/DetailMain/DetailMainSection';
import { DetailSidebarSection } from '@/components/EventDetail/DetailSidebar/DetailSidebarSection';

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
  }, []);

  return (
    <PrivateRoute>
      <DynamicLayout>
        <Head>
          <title>cycplanner {event && `- ${event.title}`}</title>
        </Head>
        <StyledContainer variant="page">
          {loading === Loading.loading ? (
            <p>Loading</p>
          ) : loading === Loading.success ? (
            <StyledContainer variant="detail-page">
              <DetailMainSection event={event} />
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
