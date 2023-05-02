import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faPlus,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import {
  StyledAuthorTitle,
  StyledAuthorWrapper,
  StyledProfileMenuFooter,
  StyledProfileMenuHeader,
  StyledProfileMenuListItem,
  StyledProfileMenuListWrapper,
  StyledProfileMenuWrapper,
} from './ProfileMenu.styles';
import { ProfileMenu } from './ProfileMenu.types';

const ProfileMenu = ({ name, onClose }: ProfileMenu) => {
  const { logoutUser } = useAuth();

  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <StyledProfileMenuWrapper ref={dropdownRef}>
      <StyledProfileMenuHeader>
        <StyledAuthorWrapper>
          <StyledAuthorTitle>{name ? name : 'Guest'}</StyledAuthorTitle>
        </StyledAuthorWrapper>
      </StyledProfileMenuHeader>
      <StyledProfileMenuListWrapper>
        <StyledProfileMenuListItem>
          <Button
            variant="filled"
            icon={faUser}
            size="sm3"
            full
            text="My profile"
            onClick={() => handleRouteChange('profile')}
          />
        </StyledProfileMenuListItem>
        <StyledProfileMenuListItem>
          <Button
            variant="outlined"
            icon={faPlus}
            size="sm3"
            full
            text="Create event"
            onClick={() => handleRouteChange('create')}
          />
        </StyledProfileMenuListItem>
      </StyledProfileMenuListWrapper>
      <StyledProfileMenuFooter>
        <Button
          variant="text-icon"
          size="sm2"
          text="Sign out"
          icon={faRightFromBracket}
          full
          bold
          onClick={handleSignOut}
        />
      </StyledProfileMenuFooter>
    </StyledProfileMenuWrapper>
  );
};

export { ProfileMenu };
