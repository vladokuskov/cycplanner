import { ProfileSection, ProfileSubSection } from '../StyledProfileSection';
import { ProfileDeleteSection } from './ProfileDeleteSection';

const ProfileSettingsSection = () => {
  return (
    <ProfileSection title="Account settings">
      <ProfileSubSection title="General">
        There will be dark mode in the future.. ssshh
      </ProfileSubSection>
      <ProfileSubSection title="Account">
        <ProfileDeleteSection />
      </ProfileSubSection>
    </ProfileSection>
  );
};

export { ProfileSettingsSection };
