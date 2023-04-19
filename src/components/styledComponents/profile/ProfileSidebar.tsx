import { ProfileSidebar } from '@/components/types/props/Profile/profile';
import { useAuth } from '@/context/AuthContext';
import { faGear, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from '../Button';
import { ProfilePreview } from '../ProfilePreview';

const SidebarWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 0.05rem solid #d3d3d3;
  @media (min-width: 680px) {
    border-bottom: none;
  }
`;

const SidebarHeader = styled.div`
  width: 100%;
  display: grid;
`;

const SubTitle = styled.p`
  font-size: 0.8rem;
  line-height: 0.8rem;
  letter-spacing: 0.029em;
  font-weight: 400;
  color: #7e7e7e;
  text-align: center;
  padding: 0.7rem 0;
`;

const SidebarBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.7rem 0;
  gap: 0.7rem;
`;

const ProfileSidebar = ({ changeSection, activeSection }: ProfileSidebar) => {
  const { user } = useAuth();

  return (
    <SidebarWrapper>
      <SidebarHeader>
        <ProfilePreview
          name={user?.displayName}
          description={'Your profile page'}
          photoURL={user?.photoURL}
          variant="no-link"
        />
        <SubTitle>
          Here you can update your personal information, edit your bio, and
          customize your account settings.
        </SubTitle>
      </SidebarHeader>
      <SidebarBody>
        <Button
          variant="text-icon"
          text="Information"
          icon={faUserAlt}
          onClick={() => changeSection('information')}
          full
          disabled={activeSection === 'information'}
        />
        <Button
          variant="text-icon"
          text="Settings"
          icon={faGear}
          onClick={() => changeSection('settings')}
          full
          disabled={activeSection === 'settings'}
        />
      </SidebarBody>
    </SidebarWrapper>
  );
};

export { ProfileSidebar };
