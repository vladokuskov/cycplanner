import { Title } from './PageTitle.styles';
import { PageTitle } from './PageTitle.types';

const PageTitle = ({ title }: PageTitle) => {
  return <Title>{title}</Title>;
};

export default PageTitle;
