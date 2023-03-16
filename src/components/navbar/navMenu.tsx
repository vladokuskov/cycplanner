import Link from 'next/link';
import { NextRouter } from 'next/router';

import Button from '@/components/button';

type NavMenu = {
  sticky: string;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  router: NextRouter;
};

const NavMenu = ({ sticky, handleMenuClick, router }: NavMenu) => {
  return (
    <div className={`navbar-menu--content ${sticky}`}>
      <div className="navbar-menu--links" tabIndex={0}>
        <Link
          href="/"
          onClick={handleMenuClick}
          className={
            router.pathname == '/' ? 'menu--link active' : 'menu--link'
          }
          title="Go to Home"
          aria-label="Go to Home"
        >
          HOME
          <i className="arrow-right" />
        </Link>

        <Link
          href="/events"
          onClick={handleMenuClick}
          className={
            router.pathname == '/events' ? 'menu--link active' : 'menu--link'
          }
          title="Go to Events"
          aria-label="Go to Events"
        >
          EVENTS
          <i className="arrow-right" />
        </Link>
        <Link
          href="/contact"
          onClick={handleMenuClick}
          className={
            router.pathname == '/contact' ? 'menu--link active' : 'menu--link'
          }
          title="Go to Contact us"
          aria-label="Go to Contact us"
        >
          CONTACT US
          <i className="arrow-right" />
        </Link>
      </div>
      <div className="navbar-menu--footer">
        <Button type="outline" label="SIGN UP" size="sm" />
        <p className="footer-label">or</p>
        <Button type="text" label="Log in" size="sm" />
      </div>
    </div>
  );
};

export default NavMenu;
