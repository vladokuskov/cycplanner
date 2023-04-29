import styled from 'styled-components';

const MainSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.3rem;
  margin-bottom: 1rem;
  div {
    background-color: #d6d6d6ab;
  }
`;

const SidebarSection = styled.div`
  width: 100%;
  border-top: 1px solid #dfdfdf !important;
  border-radius: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media (min-width: 680px) {
    width: 90%;
    padding: 1rem;
    border: none;
    margin: 0 auto;
    border: none !important;
  }
  div {
    background-color: #d6d6d6ab;
  }
`;

const MapSkeleton = styled.div`
  width: 100%;
  max-height: 15rem;
  height: 100%;
  min-height: 15rem;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin: 0.5rem 0;
  background-color: transparent !important;
  @media (min-width: 680px) {
    justify-content: flex-end;
  }
`;

const AuthorWrapper = styled.div`
  width: 100%;
  background-color: transparent !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;
const AuthorImagePlaceholder = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50% !important;
  border: none;
`;

const AuthorTitle = styled.div`
  width: 100%;
  height: 1.2rem;
  max-width: 10rem;
`;

const BigTitle = styled.div`
  width: 100%;
  height: 2rem;
  max-width: 80%;
  margin-top: 1rem;
`;

const MediumTitle = styled.div`
  width: 100%;
  height: 1.2rem;
  max-width: 75%;
  margin-top: 0.3rem;
`;

const SmallTitle = styled.div`
  width: 100%;
  height: 1rem;
  max-width: 65%;
  margin-top: 0.5rem;
`;

const ButtonSkeleton = styled.div`
  width: 2rem;
  height: 2rem;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  background-color: transparent !important;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.3rem;
  margin-top: 2rem;
`;

const DetailsWrapper = styled.div`
  width: 100%;
  background-color: transparent !important;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

const UsersList = styled.div`
  width: 100%;
  background-color: transparent !important;
  margin-top: 1rem;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

export {
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
};
