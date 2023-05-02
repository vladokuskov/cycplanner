import styled, { css } from 'styled-components';

import { Participating } from '@/components/types/shared/event.types';

const StyledDetailMainSectionWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  h3,
  h4,
  p,
  a {
    font-family: 'Roboto';
    font-style: normal;
  }
`;

const StyledMapWrapper = styled.div<{ isMapMaximized: boolean }>`
  width: 100%;
  height: ${({ isMapMaximized }) => (isMapMaximized ? '20rem' : '15rem')};
  @media (min-width: 680px) {
    height: ${({ isMapMaximized }) => (isMapMaximized ? '25rem' : '15rem')};
  }
`;

const StyledEditingForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  background: #fff8ba4f;
  border-radius: 8px;
  border: none;
  gap: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const StyledEditingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  width: 100%;
  button {
    align-self: flex-end;
  }
`;

const StyledInfoWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  letter-spacing: 0.01em;
  font-weight: 600;
  color: #2c2c2c;
  margin-top: 0.5rem;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
  margin-top: 1rem;
`;

const StyledDetailTitle = styled.h4`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #454545;
`;
const StyledDetailDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const StyledInfoDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.7rem;
`;

const StyledInfoDetail = styled.div`
  width: 100%;
  gap: 0.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledControlsWrapper = styled.div<{
  isFavorite: boolean;
  participated: Participating;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.4rem 0;
  gap: 1rem;
  .deleteEventBtn {
    margin-left: auto;
  }
  .participateBtn {
    ${({ participated }) =>
      participated === Participating.participated
        ? css`
            background-color: #4e8bea;
            &:hover,
            &:focus {
              background-color: #6a9be9;
            }
            &:active {
              background-color: #4e8bea;
            }
          `
        : participated === Participating.awaiting &&
          css`
            background-color: #e4e153;
            &:hover,
            &:focus {
              background-color: #f0ee6c;
            }
            &:active {
              background-color: #e4e153;
            }
          `}
  }
  .favoriteBtn {
    ${({ isFavorite }) =>
      isFavorite &&
      css`
        color: #e25c5c;
        &:hover {
          color: #f37676;
        }
        &:active {
          color: #e25c5c;
        }
      `}
  }
`;

const StyledDetailLocation = styled.a`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #656565;
  text-underline-offset: 0.1rem;
  &:hover,
  &:focus {
    text-decoration-color: #979797;
    p {
      color: #979797;
    }
  }
`;

export {
  StyledControlsWrapper,
  StyledDescription,
  StyledDetailDescription,
  StyledDetailLocation,
  StyledDetailMainSectionWrapper,
  StyledDetailTitle,
  StyledEditingContainer,
  StyledEditingForm,
  StyledInfoDetail,
  StyledInfoDetailsWrapper,
  StyledInfoWrapper,
  StyledMapWrapper,
  StyledTitle,
};
