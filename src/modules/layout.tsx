import React, { ReactNode } from 'react';

import Footer from '@/modules/footer';
import Navbar from '@/modules/navbar/nav';

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
