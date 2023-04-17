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

export const FailedText = styled.p`
  color: #df3737;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 13px;
  margin: 0;
  align-self: flex-start;
  padding: 0.2rem 0;
`;

export const SubTitle = styled.h3`
  width: 100%;
  color: #2c2c2c50;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
`;
