import styled from 'styled-components';
import { PageTitle } from '../types/styledComponents/pageTitle.types';

const Title = styled.h2`
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2.9rem;
  line-height: 48px;
`;

const PageTitle = ({ title }: PageTitle) => {
  return <Title>{title}</Title>;
};

export default PageTitle;
