import styled from 'styled-components';

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
  margin-top: 1rem;

  @media (min-width: 680px) {
    margin-bottom: 1rem;
  }
`;

export const ProfileEditingSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (min-width: 680px) {
    flex-direction: row;
  }
`;
