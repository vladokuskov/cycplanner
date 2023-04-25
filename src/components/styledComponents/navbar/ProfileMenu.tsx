import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { Button } from '../Button';
import { ProfileMenu } from '@/components/types/styledComponents/profileMenu.types';
import { useRouter } from 'next/router';
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '@/context/AuthContext';

const ProfileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 2.8rem;
  right: 0.5rem;
  position: absolute;
  width: 15rem;
  height: 20rem;
  background-color: #ffffff !important;
  z-index: 5;
  border-radius: 10px;
  border: 2px solid #cacaca;
  padding: 0;
  margin: 0;
  -webkit-box-shadow: 0px 9px 21px -17px rgba(0, 0, 0, 0.233);
  -moz-box-shadow: 0px 9px 21px -17px rgba(0, 0, 0, 0.233);
  box-shadow: 0px 9px 21px -17px rgba(0, 0, 0, 0.233);
`;

const ProfileMenuHeader = styled.div`
  width: 100%;
  background-color: #fafafa7f;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid #d6d6d6;
`;
const ProfileMenuFooter = styled.div`
  background-color: #fafafa7f;
  border-radius: 0 0 10px 10px;
  border-top: 1px solid #d6d6d6;
  width: 100%;
  padding: 1rem 2rem;
  height: 100%;
  max-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 1rem;
`;

const AuthorTitle = styled.p`
  font-weight: 600;
  color: #303030;
  font-family: 'Inter';
  padding: 0;
  margin: 0;
`;

const ProfileMenuListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem;
  gap: 0.4rem;
`;

const ProfileMenuListItem = styled.li`
  width: 100%;
`;

const ProfileMenu = ({ name, navRef, onClose, isOpen }: ProfileMenu) => {
  const { logoutUser } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        navRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !navRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    logoutUser();
    onClose();
    router.push(`/login`);
  };

  const handleRouteChange = (e: string) => {
    router.push(`/${e}`);

    onClose();
  };

  return (
    <ProfileMenuWrapper ref={dropdownRef}>
      <ProfileMenuHeader>
        <AuthorWrapper>
          <AuthorTitle>{name ? name : 'Guest'}</AuthorTitle>
        </AuthorWrapper>
      </ProfileMenuHeader>
      <ProfileMenuListWrapper>
        <ProfileMenuListItem>
          <Button
            variant="filled"
            icon={faUser}
            size="sm3"
            full
            text="My profile"
            onClick={() => handleRouteChange('profile')}
          />
        </ProfileMenuListItem>
        <ProfileMenuListItem>
          <Button
            variant="outlined"
            icon={faPlus}
            size="sm3"
            full
            text="Create event"
            onClick={() => handleRouteChange('create')}
          />
        </ProfileMenuListItem>
      </ProfileMenuListWrapper>
      <ProfileMenuFooter>
        <Button
          variant="text-icon"
          size="sm2"
          text="Sign out"
          icon={faRightFromBracket}
          full
          bold
          onClick={handleSignOut}
        />
      </ProfileMenuFooter>
    </ProfileMenuWrapper>
  );
};

export { ProfileMenu };
