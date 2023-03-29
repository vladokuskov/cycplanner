import styled, { keyframes } from 'styled-components';

const LoadingBar = styled.div`
  height: 0.4rem;
  width: 100%;
  background-color: #a3d168;
  position: fixed;
  top: 0;
  left: 0;
  position: absolute;
`;

const progress = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #ebebeb;
  animation: ${progress} 1s linear infinite;
  will-change: width;
  transform: translate3d(0, 0, 0);
`;

function Loader() {
  return (
    <LoadingBar>
      <ProgressBar />
    </LoadingBar>
  );
}
export { Loader };
