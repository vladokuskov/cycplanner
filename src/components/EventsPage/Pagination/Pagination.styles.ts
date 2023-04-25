import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  font-family: 'Roboto';
  background-color: ${({ isActive }) => (isActive ? '#A3D168' : '#d4d4d4')};
  color: ${({ isActive }) => (isActive ? '#FBFBFB' : '#7a7a7a')};
  border: none;
  border-radius: 5px;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  transition: 0.2s;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${({ isActive }) => (isActive ? '#A3D168' : '#e6e6e6')};
    color: ${({ isActive }) => (isActive ? '#FBFBFB' : '#616161')};
  }
`;

export { PaginationContainer, PageButton };
