import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/redux-hooks';

const InfoWrapper = styled.div`
  position: relative;
`;
const InfoButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  width: 1.2rem;
  height: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #e0e0e0;
  color: #2c2c2c;
`;
const InfoTitle = styled.p`
  z-index: 1001;
  position: absolute;
  top: 0;
  left: 1.5rem;
  width: 100%;
  width: 100%;
  max-width: 10rem;
  min-width: 12rem;
  text-align: center;
  padding: 0.1rem 0.3rem;
  border-radius: 10px;
  color: #2c2c2c;
  background-color: #e0e0e0;
  margin-right: 1rem;
`;
const InfoTitleBolder = styled.span`
  font-weight: 600;
`;

const HomeInfo = () => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  const handleHover = () => {
    setIsInfoOpen(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInfoOpen) {
      timeoutId = setTimeout(() => {
        setIsInfoOpen(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInfoOpen]);

  return (
    <InfoWrapper>
      <InfoButton
        title="How it works?"
        onMouseEnter={handleHover}
        onTouchStart={handleHover}
      >
        ?
      </InfoButton>
      {isInfoOpen && (
        <InfoTitle>
          The nearest events are within a radius of
          <InfoTitleBolder> {selectedRange} km</InfoTitleBolder>
        </InfoTitle>
      )}
    </InfoWrapper>
  );
};

export default HomeInfo;
