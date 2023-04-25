import Link from 'next/link';
import { Title, Description, LayoutWrapper } from './404.styles';

const FourOFour = () => {
  return (
    <LayoutWrapper>
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
