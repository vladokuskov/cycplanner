import StyledContainer from '@/components/StyledContainer/StyledContainer';
import {
  UsersList,
  DetailsWrapper,
  DescriptionWrapper,
  ButtonSkeleton,
  SmallTitle,
  MediumTitle,
  BigTitle,
  AuthorTitle,
  AuthorImagePlaceholder,
  AuthorWrapper,
  ButtonsWrapper,
  SidebarSection,
  MainSection,
  MapSkeleton,
  AuthorMainWrapper,
} from './DetailSkeleton.styles';

const DetailSkeleton = () => {
  const buttons = Array.from({ length: 3 });
  const description = Array.from({ length: 2 });
  const details = Array.from({ length: 3 });
  const users = Array.from({ length: 15 });

  return (
    <StyledContainer variant="detail-page">
      <MainSection>
        <MapSkeleton />
        <ButtonsWrapper>
          {buttons.map((_, count) => (
            <ButtonSkeleton key={count} />
          ))}
        </ButtonsWrapper>
        <AuthorMainWrapper>
          <AuthorWrapper>
            <AuthorImagePlaceholder />
            <AuthorTitle />
          </AuthorWrapper>
        </AuthorMainWrapper>

        <BigTitle />
        <DescriptionWrapper>
          {description.map((_, count) => (
            <MediumTitle key={count} />
          ))}
        </DescriptionWrapper>

        <DetailsWrapper>
          {details.map((_, count) => (
            <SmallTitle key={count} />
          ))}
        </DetailsWrapper>
      </MainSection>
      <SidebarSection>
        <BigTitle />
        <BigTitle />
        <UsersList>
          {users.map((_, count) => (
            <AuthorWrapper key={count}>
              <AuthorImagePlaceholder />
              <AuthorTitle />
            </AuthorWrapper>
          ))}
        </UsersList>
      </SidebarSection>
    </StyledContainer>
  );
};

export { DetailSkeleton };