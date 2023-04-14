import styled from 'styled-components';
import Image from 'next/image';

export const PhotoSectioWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

export const AvatarChangingWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  widows: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const AvatarWrapper = styled.div`
  border-radius: 50%;
  position: relative;
`;

export const AvatarUpload = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: 50%;
`;

export const Avatar = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  width: 6.626rem;
  height: 6.626rem;
  background-color: #d1d1d1;
  color: #7e7e7e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const EditIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -0.6rem;
  right: calc(50% - 0.75rem);
  padding: 0.3rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  background-color: #fbfbfb;
  color: #292929;
`;

export const DetailsDropdown = styled.div`
  position: absolute;
  width: 10rem;
  height: 5.5rem;
  background-color: #f7f7f7;
  border: 0.015rem solid #e7e7e7;
  border-radius: 0.5rem;
  padding: 0.1rem 0;
  bottom: calc(-100% - 0.5rem);
  right: calc(50% - 4.95rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  :after {
    content: '';
    position: absolute;
    top: -0.8rem;
    right: 4.1rem;
    border-width: 0.8rem 0.8rem 0 0.8rem;
    border-style: solid;
    border-color: #e7e7e7 transparent transparent transparent;
    transform: rotate(180deg);
  }
`;

export const DrodpownButton = styled.button<{ isDisabled?: boolean }>`
  font-family: 'Roboto';
  font-size: 0.9rem;
  width: 100%;
  padding: 0.5rem 0;
  color: #2c2c2c;
  transition: 0.1s;
  &:hover,
  &:focus {
    background-color: #f1f1f1;
  }
  &:active {
    background-color: #e9e9e9;
  }
`;

export const AvatarEditingWindowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #00000068;
  z-index: 5000;
`;

export const AvatarEditingWindow = styled.div`
  width: 100%;
  max-width: 30rem;
  background-color: #f7f7f7;
  border: 0.015rem solid #e7e7e7;
  border-radius: 0.3rem;
  margin: 5rem 1rem;
  div {
    padding: 1rem;
  }
`;

export const AvatarEditingTitle = styled.h3`
  font-family: 'Roboto';
  font-size: 0.9rem;
  color: #2c2c2c;
  font-weight: 400;
`;

export const AvatarEditingHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.015rem solid #e7e7e7;
`;

export const AvatarEditingBody = styled.div`
  width: 100%;
  height: 8rem;
`;

export const AvatarEditingFooter = styled.div`
  width: 100%;
  border-top: 0.015rem solid #e7e7e7;
`;
