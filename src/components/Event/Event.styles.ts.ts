import styled, { css } from 'styled-components';
import { Participating } from '@/components/types/shared/event.types';

const EventWrapper = styled.div`
  position: relative;
  max-width: 43rem;
  min-width: 16rem;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 1rem;
  h3,
  h4,
  p,
  a {
    font-family: 'Roboto';
    font-style: normal;
  }
`;

const CopiedMessage = styled.p`
  transition: 0.2s;
  background-color: #d0d0d0;
  color: #fff;
  padding: 0.2rem 0.4rem;
  font-weight: 500;
  letter-spacing: 0.03rem;
  border: none;
  font-size: 0.8rem;
  border-radius: 8px;
  pointer-events: none;
`;
const EventHeaderWrapper = styled.div`
  width: 100%;
  padding: 1rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EventMainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 680px) {
    flex-direction: row;
    padding-bottom: 0.5rem;
  }
`;

const EventContentWrapper = styled.div`
  width: 100%;
  padding: 0.1rem 0.9rem 0.1rem 0.9rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  height: 13rem;
  border-radius: 8px;
`;

const EventMapWrapper = styled.div<{ isMapMaximized: boolean }>`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  height: 13rem;
  border-radius: 8px;
  z-index: 1;
  ${({ isMapMaximized }) =>
    isMapMaximized &&
    css`
      padding: 0.3rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
`;

const ContentInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.4rem;
`;

const ContentButtonsWrapper = styled.div<{
  isBookmarked: boolean;
  participated: Participating;
}>`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  @media (min-width: 680px) {
    margin-bottom: 0;
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
  .bookmarkBtn {
    ${({ isBookmarked }) =>
      isBookmarked &&
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

const EventTitle = styled.h3`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 23px;

  color: #2c2c2c;
`;

const EventDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const EventDetailWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;
`;

const DetailTitle = styled.h4`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #454545;
`;
const DetailDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const ButtonWrapper = styled.div`
  position: relative;
  p {
    position: absolute;
    top: -0.3rem;
    right: -0.6rem;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 0.8rem;
    pointer-events: none;
    color: #959595;
  }
`;

const DetailLocation = styled.a`
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
  DetailLocation,
  DetailDescription,
  DetailTitle,
  EventDetailWrapper,
  EventDescription,
  EventTitle,
  ContentButtonsWrapper,
  ContentInfoWrapper,
  EventMapWrapper,
  MapPlaceholder,
  EventContentWrapper,
  EventMainWrapper,
  EventHeaderWrapper,
  EventWrapper,
  ButtonWrapper,
  CopiedMessage,
};
