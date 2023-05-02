import styled from 'styled-components';

import {
  StyledSectionSubTitle,
  StyledSectionTitle,
} from './StyledProfile.styles';

const StyledSectionMainWrapper = styled.section`
  width: 100%;
  display: grid;
`;

const StyledSubSectionMainWrapper = styled.div`
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
    <StyledSectionMainWrapper>
      <StyledSectionTitle>{title}</StyledSectionTitle>
      {children}
    </StyledSectionMainWrapper>
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
    <StyledSubSectionMainWrapper>
      <StyledSectionSubTitle>{title}</StyledSectionSubTitle>
      {children}
    </StyledSubSectionMainWrapper>
  );
};
