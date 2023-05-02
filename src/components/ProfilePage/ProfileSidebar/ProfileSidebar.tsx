import { useAuth } from '@/context/AuthContext';
import { changeSection } from '@/store/profileReducer';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { faGear, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import {
  StyledSidebarBody,
  StyledSidebarHeader,
  StyledSidebarWrapper,
  StyledSubTitle,
} from './ProfileSidebar.styles';

const ProfileSidebar = () => {
  const { user } = useAuth();

  const activeSection = useAppSelector(
    (state) => state.profileReducer.activeProfileSection
  );

  const dispatch = useAppDispatch();

  return (
    <StyledSidebarWrapper>
      <StyledSidebarHeader>
        <ProfilePreview
          name={user?.displayName}
          description={'Your profile page'}
          photoURL={user?.photoURL}
          variant="no-link"
        />
        <StyledSubTitle>
          Here you can update your personal information, edit your bio, and
          customize your account settings.
        </StyledSubTitle>
      </StyledSidebarHeader>
      <StyledSidebarBody>
        <Button
          variant="text-icon"
          text="Information"
          icon={faUserAlt}
          onClick={() => dispatch(changeSection('information'))}
          full
          disabled={activeSection === 'information'}
        />
        <Button
          variant="text-icon"
          text="Settings"
          icon={faGear}
          onClick={() => dispatch(changeSection('settings'))}
          full
          disabled={activeSection === 'settings'}
        />
      </StyledSidebarBody>
    </StyledSidebarWrapper>
  );
};

export { ProfileSidebar };
