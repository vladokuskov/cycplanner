import { NextRouter } from 'next/router';

export type NavbarWrapperProps = {
  sticky: boolean;
};

export type NavMenuProps = {
  sticky: boolean;
  router: NextRouter;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
};
