import { StyledTitle } from './PageTitle.styles';
import { PageTitle } from './PageTitle.types';

const PageTitle = ({ title }: PageTitle) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default PageTitle;
