import StyledContainer from '@/components/StyledContainer/StyledContainer';

import {
  StyledAuthorImagePlaceholder,
  StyledAuthorMainWrapper,
  StyledAuthorTitle,
  StyledAuthorWrapper,
  StyledBigTitle,
  StyledButtonSkeleton,
  StyledButtonsWrapper,
  StyledDescriptionWrapper,
  StyledDetailsWrapper,
  StyledMainSection,
  StyledMapSkeleton,
  StyledMediumTitle,
  StyledSidebarSection,
  StyledSmallTitle,
  StyledUsersList,
} from './DetailSkeleton.styles';

const DetailSkeleton = () => {
  const buttons = Array.from({ length: 3 });
  const description = Array.from({ length: 2 });
  const details = Array.from({ length: 3 });
  const users = Array.from({ length: 15 });

  return (
    <StyledContainer variant="detail-page">
      <StyledMainSection>
        <StyledMapSkeleton />
        <StyledButtonsWrapper>
          {buttons.map((_, count) => (
            <StyledButtonSkeleton key={count} />
          ))}
        </StyledButtonsWrapper>
        <StyledAuthorMainWrapper>
          <StyledAuthorWrapper>
            <StyledAuthorImagePlaceholder />
            <StyledAuthorTitle />
          </StyledAuthorWrapper>
        </StyledAuthorMainWrapper>

        <StyledBigTitle />
        <StyledDescriptionWrapper>
          {description.map((_, count) => (
            <StyledMediumTitle key={count} />
          ))}
        </StyledDescriptionWrapper>

        <StyledDetailsWrapper>
          {details.map((_, count) => (
            <StyledSmallTitle key={count} />
          ))}
        </StyledDetailsWrapper>
      </StyledMainSection>
      <StyledSidebarSection>
        <StyledBigTitle />
        <StyledBigTitle />
        <StyledUsersList>
          {users.map((_, count) => (
            <StyledAuthorWrapper key={count}>
              <StyledAuthorImagePlaceholder />
              <StyledAuthorTitle />
            </StyledAuthorWrapper>
          ))}
        </StyledUsersList>
      </StyledSidebarSection>
    </StyledContainer>
  );
};

export { DetailSkeleton };
