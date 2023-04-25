import { useState, useEffect } from 'react';
import {
  InfoWrapper,
  InfoTitleBolder,
  InfoTitle,
  InfoButton,
} from './HomeInfo.styles';
import { useAppSelector } from '@/store/redux-hooks';

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
