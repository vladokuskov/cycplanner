import Image from 'next/image';
import styled from 'styled-components';

export const AvatarSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-right: 2.5rem;
`;

export const AvatarChangingWrapper = styled.div`
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

export const AvatarUpload = styled.div<{ isDropdownOpen?: boolean }>`
  cursor: ${({ isDropdownOpen }) => (isDropdownOpen ? 'default' : 'pointer')};
  position: relative;
  border-radius: 50%;
  -webkit-tap-highlight-color: none;
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

export const DropdownButton = styled.button<{
  isDisabled?: boolean;
  danger?: boolean;
}>`
  font-family: 'Roboto';
  font-size: 0.9rem;
  width: 100%;
  padding: 0.5rem 0;
  color: ${({ danger }) => (danger ? '#e62e2e' : '#2c2c2c')};
  transition: 0.1s;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : '#f1f1f1'};
  }
  &:active {
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : '#e9e9e9'};
  }
`;
