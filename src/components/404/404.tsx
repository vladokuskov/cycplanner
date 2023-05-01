import Image from 'next/image';
import Link from 'next/link';

import {
  StyledDescription,
  StyledLayoutWrapper,
  StyledTitle,
} from './404.styles';

const FourOFour = () => {
  return (
    <StyledLayoutWrapper>
      <Image src="/assets/logo.svg" alt="" width={200} height={50} />
      <StyledTitle>Oops, page not found :c</StyledTitle>
      <StyledDescription>
        Go back to the homepage and navigate to the page you were trying to
        reach from there.
      </StyledDescription>
      <Link href="/">Go to Home page</Link>
    </StyledLayoutWrapper>
  );
};

export { FourOFour };
