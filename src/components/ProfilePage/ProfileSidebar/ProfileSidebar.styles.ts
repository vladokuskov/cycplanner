import styled from 'styled-components';

const StyledSidebarWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 0.05rem solid #d3d3d3;
  @media (min-width: 680px) {
    border-bottom: none;
    height: 100%;
  }
`;

const StyledSidebarHeader = styled.div`
  width: 100%;
  display: grid;
`;

const StyledSubTitle = styled.p`
  font-size: 0.8rem;
  line-height: 0.8rem;
  letter-spacing: 0.029em;
  font-weight: 400;
  color: #7e7e7e;
  text-align: center;
  padding: 0.7rem 0;
`;

const StyledSidebarBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.7rem 0;
  gap: 0.7rem;
`;

export {
  StyledSidebarBody,
  StyledSidebarHeader,
  StyledSidebarWrapper,
  StyledSubTitle,
};
