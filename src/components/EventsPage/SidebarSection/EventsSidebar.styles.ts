import styled from 'styled-components';

const StyledEventsSidebarWrapper = styled.aside`
  width: 100%;
  border-radius: 8px;
  border: 0.2rem solid #b8b8b8;
  max-width: 100%;
  min-width: 10rem;
  height: 16rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.5rem;
  @media (min-width: 680px) {
    max-width: 16rem;
  }
`;
export { StyledEventsSidebarWrapper };
