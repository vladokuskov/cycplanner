import dynamic from 'next/dynamic';
import Head from 'next/head';
import StyledContainer from '@/components/styledComponents/StyledContainer';
import styled from 'styled-components';
import { Button } from '@/components/styledComponents/Button';
import { useRouter } from 'next/router';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';

const StartWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 680px) {
    padding: 1rem 3rem;
  }
`;

const StartContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;
const StartBannerWrapper = styled.div`
  display: none;
  max-width: 35rem;
  min-width: 26rem;
  max-height: 20rem;
  width: 100%;
  height: 100%;
  @media (min-width: 680px) {
    display: block;
    padding: 1rem 3rem;
  }
`;

const StartBanner = styled.img`
  width: 100%;
  height: 100%;
`;

const StartTitle = styled.h1`
  color: rgba(32, 32, 32, 0.77);
  font-weight: 500;
  font-size: 3.5rem;
  line-height: 93%;
  @media (min-width: 1200px) {
    font-size: 5rem;
  }
`;

const StartTitleBolder = styled.span`
  color: #2c2c2c;
  font-weight: 800;
`;

const StartDescription = styled.p`
  margin-top: 0.5rem;
  color: #2c2c2c;
  font-weight: 600;
  font-size: 1rem;
  line-height: 19px;
  margin-top: 0.5rem;
  @include media($from: 'md') {
    max-width: 90%;
    font-size: 1.1rem;
  }
`;

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  const router = useRouter();

  return (
    <DynamicLayout>
      <Head>
        <title>cycplanner - Home</title>
      </Head>
      <StyledContainer variant="page-content">
        <StartWrapper>
          <StartContentWrapper>
            <>
              <StartTitle>
                <StartTitleBolder>WELCOME to</StartTitleBolder>
                <br />
                cycplanner
              </StartTitle>
              <StartDescription>
                the ultimate platform for cycling enthusiasts and event
                organizers.
              </StartDescription>
            </>
            <Button
              variant="filled"
              text="Get Started"
              bold
              size="md1"
              onClick={() => router.replace('/login')}
            />
          </StartContentWrapper>
          <StartBannerWrapper>
            <StartBanner src="../assets/home-banner.svg" alt="" />
          </StartBannerWrapper>
        </StartWrapper>
        <PageSeparator />
      </StyledContainer>
    </DynamicLayout>
  );
}
