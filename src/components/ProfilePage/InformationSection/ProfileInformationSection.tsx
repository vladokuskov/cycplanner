import styled from 'styled-components';
import { PhotoSection } from './Avatar/AvatarSection';
import { EditProfileForm } from './EditProfileForm';
import { ProfileSection, ProfileSubSection } from '../StyledProfileSection';
import { EditPasswordForm } from './EditPasswordForm';

const InformationSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  @media (min-width: 680px) {
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 'main avatar';
  }
  @media (min-width: 850px) {
    grid-template-columns: 7fr 4fr;
  }
`;

const InformationEditWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const ProfileInformationSection = () => {
  return (
    <ProfileSection title="Profile information">
      <InformationSectionWrapper>
        <InformationEditWrapper>
          <ProfileSubSection title="Edit profile">
            <EditProfileForm />
          </ProfileSubSection>
          <ProfileSubSection title="Change password">
            <EditPasswordForm />
          </ProfileSubSection>
        </InformationEditWrapper>
        <ProfileSubSection title="Profile photo">
          <PhotoSection />
        </ProfileSubSection>
      </InformationSectionWrapper>
    </ProfileSection>
  );
};

export { ProfileInformationSection };