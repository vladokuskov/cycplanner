import {
  BannerSectionMainWrapper,
  BannerImageWrapper,
  BannerImage,
  Title,
} from './BannerSection.styles';

const BannerSection = () => {
  return (
    <BannerSectionMainWrapper>
      <Title>
        At cycplanner, we are committed to providing our users with the best
        possible experience. Whether you&apos;re a seasoned pro or a beginner,
        we&apos;re here to help you achieve your cycling goals and make the most
        of your passion for the sport. Thank you for joining our community and
        we look forward to helping you discover your next cycling adventure.
      </Title>
      <BannerImageWrapper>
        <BannerImage
          src="/assets/contact/contact-banner.webp"
          alt="Picture of banner"
          fill
        />
      </BannerImageWrapper>
    </BannerSectionMainWrapper>
  );
};

export { BannerSection };
