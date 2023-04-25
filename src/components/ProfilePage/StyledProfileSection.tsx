import styled from 'styled-components';
import { SectionSubTitle, SectionTitle } from './StyledProfile.styles';

const SectionMainWrapper = styled.section`
  width: 100%;
  display: grid;
`;

const SubSectionMainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
