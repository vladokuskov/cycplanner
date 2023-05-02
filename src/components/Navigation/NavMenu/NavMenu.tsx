import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import {
  StyledLinksWrapper,
  StyledMenuFooter,
  StyledMenuFooterButtonsLabel,
  StyledMenuFooterButtonsWrapper,
  StyledMenuMainWrapper,
  StyledMenuWrapper,
} from './NavMenu.styles';
import { NavMenu } from './NavMenu.types';

const NavMenu = ({ sticky, handleMenuClick, router }: NavMenu) => {
  const { user, logoutUser } = useAuth();

  const handleSignOut = () => {
    router.push(`/login`);
    logoutUser();
  };

  return (
    <StyledMenuMainWrapper>
      <StyledMenuWrapper sticky={sticky}>
        <StyledLinksWrapper>
          <Link
            href="/"
            onClick={handleMenuClick}
            className={router.pathname === '/' ? 'active' : ''}
            title="Go to Home"
            aria-label="Go to Home"
          >
            <span>HOME</span>
            <span>
              <Icon icon={faChevronRight} />
            </span>
          </Link>
          <Link
            href="/events"
            onClick={handleMenuClick}
            className={router.pathname === '/events' ? 'active' : ''}
            title="Go to Events"
            aria-label="Go to Events"
          >
            <span>EVENTS</span>
            <span>
              <Icon icon={faChevronRight} />
            </span>
          </Link>
          <Link
            href="/contact"
            onClick={handleMenuClick}
            className={router.pathname === '/contact' ? 'active' : ''}
            title="Go to Contact us"
            aria-label="Go to Contact us"
          >
            <span>CONTACT US</span>
            <span>
              <Icon icon={faChevronRight} />
            </span>
          </Link>
        </StyledLinksWrapper>
        <StyledMenuFooter>
          {user ? (
            <>
              {router.pathname !== '/create' && (
                <Button
                  variant="filled"
                  text="Create event"
                  icon={faPlus}
                  full
                  disabled={router.pathname === '/create'}
                  onClick={() => router.push('/create')}
                />
              )}
              <StyledMenuFooterButtonsWrapper variant="logged">
                <ProfilePreview
                  variant="default"
                  photoURL={user?.photoURL}
                  name={user.displayName}
                />
                <Button
                  variant="danger"
                  text="Sign out"
                  size="sm1"
                  bold
                  onClick={handleSignOut}
                />
              </StyledMenuFooterButtonsWrapper>
            </>
          ) : (
            <StyledMenuFooterButtonsWrapper variant="guest">
              <Button
                variant="outlined"
                text="Sign up"
                size="sm1"
                bold
                onClick={() => router.push('/signup')}
              />
              <StyledMenuFooterButtonsLabel>or</StyledMenuFooterButtonsLabel>
              <Button
                variant="default"
                text="Log in"
                size="sm1"
                bold
                onClick={() => router.push('/login')}
              />
            </StyledMenuFooterButtonsWrapper>
          )}
        </StyledMenuFooter>
      </StyledMenuWrapper>
    </StyledMenuMainWrapper>
  );
};

export default NavMenu;
