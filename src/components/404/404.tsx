import Image from 'next/image';
import Link from 'next/link';

import { Description, LayoutWrapper, Title } from './404.styles';

const FourOFour = () => {
  return (
    <LayoutWrapper>
      <Image src="/assets/logo.svg" alt="" width={200} height={50} />
      <Title>Oops, page not found :c</Title>
      <Description>
        Go back to the homepage and navigate to the page you were trying to
        reach from there.
      </Description>
      <Link href="/">Go to Home page</Link>
    </LayoutWrapper>
  );
};

export { FourOFour };
