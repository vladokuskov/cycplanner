import { StyledLoadingWrapper, StyledLogoImage } from './Loader.styles';

function Loader() {
  return (
    <StyledLoadingWrapper>
      <StyledLogoImage src="/assets/logo.svg" alt="" />
    </StyledLoadingWrapper>
  );
}
export { Loader };
