import { useEffect, useRef } from 'react';
import {
  ProfileMenuListItem,
  ProfileMenuListWrapper,
  AuthorTitle,
  AuthorWrapper,
  ProfileMenuFooter,
  ProfileMenuHeader,
  ProfileMenuWrapper,
} from './ProfileMenu.styles';
import { Button } from '../../Button/Button';
import { ProfileMenu } from './ProfileMenu.types';
import { useRouter } from 'next/router';
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '@/context/AuthContext';

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
