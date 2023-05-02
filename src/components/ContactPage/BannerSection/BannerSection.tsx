import {
  StyledBannerImage,
  StyledBannerImageWrapper,
  StyledBannerSectionMainWrapper,
  StyledTitle,
} from './BannerSection.styles';

const BannerSection = () => {
  return (
    <StyledBannerSectionMainWrapper>
      <StyledTitle>
        At cycplanner, we are committed to providing our users with the best
        possible experience. Whether you&apos;re a seasoned pro or a beginner,
        we&apos;re here to help you achieve your cycling goals and make the most
        of your passion for the sport. Thank you for joining our community and
        we look forward to helping you discover your next cycling adventure.
      </StyledTitle>
      <StyledBannerImageWrapper>
        <StyledBannerImage
          src="/assets/contact/contact-banner.webp"
          alt="Picture of banner"
          fill
          quality={90}
        />
      </StyledBannerImageWrapper>
    </StyledBannerSectionMainWrapper>
  );
};

export { BannerSection };
