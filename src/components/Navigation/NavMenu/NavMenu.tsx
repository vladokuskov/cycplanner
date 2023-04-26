import Link from 'next/link';
import { NavMenu } from './NavMenu.types';
import { Icon } from '../../Icon/Icon';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../../Button/Button';
import {
  MenuFooterButtonsLabel,
  MenuFooterButtonsWrapper,
  MenuFooter,
  LinksWrapper,
  MenuWrapper,
  MenuMainWrapper,
} from './NavMenu.styles';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';

const NavMenu = ({ sticky, handleMenuClick, router }: NavMenu) => {
  const { user, logoutUser } = useAuth();

  const handleSignOut = () => {
    router.push(`/login`);
    logoutUser();
  };

  return (
    <MenuMainWrapper>
      <MenuWrapper sticky={sticky}>
        <LinksWrapper>
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
        </LinksWrapper>
        <MenuFooter>
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
              <MenuFooterButtonsWrapper variant="logged">
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
              </MenuFooterButtonsWrapper>
            </>
          ) : (
            <MenuFooterButtonsWrapper variant="guest">
              <Button
                variant="outlined"
                text="Sign up"
                size="sm1"
                bold
                onClick={() => router.push('/signup')}
              />
              <MenuFooterButtonsLabel>or</MenuFooterButtonsLabel>
              <Button
                variant="default"
                text="Log in"
                size="sm1"
                bold
                onClick={() => router.push('/login')}
              />
            </MenuFooterButtonsWrapper>
          )}
        </MenuFooter>
      </MenuWrapper>
    </MenuMainWrapper>
  );
};

export default NavMenu;
