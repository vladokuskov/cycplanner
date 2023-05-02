import { useEffect, useState } from 'react';

import { useAppSelector } from '@/store/redux-hooks';

import {
  StyledInfoButton,
  StyledInfoTitle,
  StyledInfoTitleBolder,
  StyledInfoWrapper,
} from './HomeInfo.styles';

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
    <StyledInfoWrapper>
      <StyledInfoButton
        title="How it works?"
        onMouseEnter={handleHover}
        onTouchStart={handleHover}
      >
        ?
      </StyledInfoButton>
      {isInfoOpen && (
        <StyledInfoTitle>
          The nearest events are within a radius of
          <StyledInfoTitleBolder>{selectedRange} km</StyledInfoTitleBolder>
        </StyledInfoTitle>
      )}
    </StyledInfoWrapper>
  );
};

export default HomeInfo;
