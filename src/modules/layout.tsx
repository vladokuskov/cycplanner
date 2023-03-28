import React, { ReactNode } from 'react';

import Navbar from '@/components/styledComponents/navbar/Navbar';
import StyledContainer from '@/components/styledComponents/StyledContainer';
import Footer from '@/components/styledComponents/Footer';

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
