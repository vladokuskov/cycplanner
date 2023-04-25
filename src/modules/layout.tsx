import React, { ReactNode } from 'react';

import Navbar from '@/components/Navigation/NavBar/NavBar';
import StyledContainer from '@/components/StyledContainer/StyledContainer';
import Footer from '@/components/Footer/Footer';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <StyledContainer variant="page">
      <Navbar />
      {children}
      <Footer />
    </StyledContainer>
  );
}
