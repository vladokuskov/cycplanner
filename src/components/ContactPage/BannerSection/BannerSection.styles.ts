import Image from 'next/image';
import styled from 'styled-components';

const BannerSectionMainWrapper = styled.section`
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: -0.015em;
  color: rgba(32, 32, 32, 0.77);
  padding: 1rem;
  max-width: 35rem;
  width: 100%;
  margin: 0 auto;
`;
const BannerImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 19rem;
  color: #727272;
  font-family: 'Roboto';
  font-size: 0.9rem;
  margin-top: 1rem;
`;
const BannerImage = styled(Image)`
  object-fit: cover;
  object-position: left;
`;

export { BannerSectionMainWrapper, BannerImageWrapper, BannerImage, Title };
