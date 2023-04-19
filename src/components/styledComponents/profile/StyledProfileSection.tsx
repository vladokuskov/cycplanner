import styled from 'styled-components';
import { SectionSubTitle, SectionTitle } from './StyledProfile';

const SectionMainWrapper = styled.section`
  width: 100%;
  display: grid;
`;

const SubSectionMainWrapper = styled.div`
  width: 100%;
  display: grid;
`;

export const ProfileSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <SectionMainWrapper>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionMainWrapper>
  );
};

export const ProfileSubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <SubSectionMainWrapper>
      <SectionSubTitle>{title}</SectionSubTitle>
      {children}
    </SubSectionMainWrapper>
  );
};
