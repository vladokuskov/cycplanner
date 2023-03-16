import React, { ReactNode } from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar/nav';

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
