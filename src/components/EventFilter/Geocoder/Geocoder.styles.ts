import styled from 'styled-components';

const StyledGeocoderMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.3rem;
`;
const StyledGeocoderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const StyledGeocoderInputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const StyledGeocoderResultsWrapper = styled.ul`
  position: absolute;
  top: 2.2rem;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 5px 15px -1px rgba(0, 0, 0, 0.09);
  background-color: #e5e5e5;
  z-index: 2;
`;

const StyledResultWrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(138, 138, 138);
  &:last-child {
    border-bottom: none;
  }
`;

export {
  StyledGeocoderInputWrapper,
  StyledGeocoderMainWrapper,
  StyledGeocoderResultsWrapper,
  StyledGeocoderWrapper,
  StyledResultWrapper,
};
