import React, { ReactNode } from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/styledComponents/navbar/Navbar';
import StyledContainer from '@/components/StyledContainer';

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
