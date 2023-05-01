import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import {
  AuthorTitle,
  AuthorWrapper,
  ProfileMenuFooter,
  ProfileMenuHeader,
  ProfileMenuListItem,
  ProfileMenuListWrapper,
  ProfileMenuWrapper,
} from './ProfileMenu.styles';
import { ProfileMenu } from './ProfileMenu.types';

const ProfileMenu = ({ name, onClose }: ProfileMenu) => {
  const { logoutUser } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignOut = () => {
    router.push(`/login`);
    logoutUser();
    onClose();
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
