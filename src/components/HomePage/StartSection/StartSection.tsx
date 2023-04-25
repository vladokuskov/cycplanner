import { Button } from '../../Button/Button';
import {
  StartSectionWrapper,
  StartDescription,
  StartTitleBolder,
  StartTitle,
  StartBannerWrapper,
  StartContentWrapper,
} from './StartSection.styles';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Banner from '@/assets/home-banner.svg';

const StartSection = () => {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <StartSectionWrapper>
      <StartContentWrapper>
        <>
          <StartTitle>
            <StartTitleBolder>WELCOME to</StartTitleBolder>
            <br />
            cycplanner
          </StartTitle>
          <StartDescription>
            the ultimate platform for cycling enthusiasts and event organizers.
          </StartDescription>
        </>
        <Button
          disabled={user !== null}
          variant="filled"
          text="Get Started"
          bold
          size="md1"
          onClick={() => router.replace('/login')}
        />
      </StartContentWrapper>
      <StartBannerWrapper>
        <Banner />
      </StartBannerWrapper>
    </StartSectionWrapper>
  );
};

export { StartSection };
