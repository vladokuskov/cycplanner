import styled from 'styled-components';

import { useAppSelector } from '@/store/redux-hooks';

import { ProfileInformationSection } from './InformationSection/ProfileInformationSection';
import { ProfileSettingsSection } from './SettingsSection/ProfileSettingsSection';

const StyledMainSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProfileMainSection = () => {
  const activeSection = useAppSelector(
    (state) => state.profileReducer.activeProfileSection
  );

  return (
    <StyledMainSectionWrapper>
      {activeSection === 'information' ? (
        <ProfileInformationSection />
      ) : (
        activeSection === 'settings' && <ProfileSettingsSection />
      )}
    </StyledMainSectionWrapper>
  );
};

export { ProfileMainSection };
