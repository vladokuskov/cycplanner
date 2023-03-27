import { NextRouter } from 'next/router';

export type NavbarWrapperProps = {
  sticky: boolean;
};

export type NavMenu = {
  sticky: boolean;
  router: NextRouter;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
};
