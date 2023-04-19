import { ProfileSections } from '@/components/types/props/Profile/profile';
import styled from 'styled-components';
import { ProfileInformationSection } from './InformationSection/ProfileInformationSection';
import { ProfileSettingsSection } from './SettingsSection/ProfileSettingsSection';

const MainSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProfileMainSection = ({
  acitveSection,
}: {
  acitveSection: ProfileSections;
}) => {
  return (
    <MainSectionWrapper>
      {acitveSection === 'information' ? (
        <ProfileInformationSection />
      ) : (
        acitveSection === 'settings' && <ProfileSettingsSection />
      )}
    </MainSectionWrapper>
  );
};

export { ProfileMainSection };
