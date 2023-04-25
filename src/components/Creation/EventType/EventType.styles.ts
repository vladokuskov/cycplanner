import styled from 'styled-components';

const EventTypeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const StyledTypeButton = styled.button`
  font-family: 'Roboto';
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.3rem;
  background-color: #d6d6d6;
  border-radius: 5px;
  color: #1d1d1d;
  flex: 1;
  white-space: nowrap;

  transition: 0.1s;
  width: 100%;
  &:hover,
  &:focus {
    background-color: #e6e6e6;
  }
  &:active {
    background-color: #d6d6d6;
  }
`;

export { EventTypeWrapper, StyledTypeButton };
