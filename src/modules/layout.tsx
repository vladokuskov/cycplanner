import React, { ReactNode } from 'react';

import Navbar from '@/components/styledComponents/navbar/Navbar';
import StyledContainer from '@/components/StyledContainer';
import Footer from '@/components/styledComponents/navbar/Footer';

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
