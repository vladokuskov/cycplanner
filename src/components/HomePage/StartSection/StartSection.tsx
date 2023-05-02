import { useRouter } from 'next/router';

import Banner from '@/assets/home-banner.svg';
import { useAuth } from '@/context/AuthContext';

import { Button } from '../../Button/Button';
import {
  StyledStartBannerWrapper,
  StyledStartContentWrapper,
  StyledStartDescription,
  StyledStartSectionWrapper,
  StyledStartTitle,
  StyledStartTitleBolder,
} from './StartSection.styles';

const StartSection = () => {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <StyledStartSectionWrapper>
      <StyledStartContentWrapper>
        <>
          <StyledStartTitle>
            <StyledStartTitleBolder>WELCOME to</StyledStartTitleBolder>
            <br />
            cycplanner
          </StyledStartTitle>
          <StyledStartDescription>
            the ultimate platform for cycling enthusiasts and event organizers.
          </StyledStartDescription>
        </>
        <Button
          disabled={user !== null}
          variant="filled"
          text="Get Started"
          bold
          size="md1"
          onClick={() => router.replace('/login')}
        />
      </StyledStartContentWrapper>
      <StyledStartBannerWrapper>
        <Banner />
      </StyledStartBannerWrapper>
    </StyledStartSectionWrapper>
  );
};

export { StartSection };
