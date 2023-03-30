import styled, { css } from 'styled-components';
import { ProfilePreviewProps } from '../types/styledComponents/profilePreview.types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';
import Link from 'next/link';

const ProfilePreviewWrapper = styled.div<ProfilePreviewProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  border: none;
  border-radius: 4px;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  ${({ variant }) =>
    variant === 'default'
      ? css`
          flex-direction: row;
        `
      : variant === 'default-rev'
      ? css`
          flex-direction: row-reverse;
        `
      : css`
          flex-direction: row;
        `}
`;
const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.3rem;
  height: 2.3rem;
  border: none;
  border-radius: 50%;
  @media (min-width: 680px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const PhotoPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d1d1d1;
  color: #7e7e7e;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
`;
const PreviewName = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 18px;
  letter-spacing: 0.015em;
  color: #424242;
  @media (min-width: 680px) {
    font-size: 1rem;
  }
`;

const ProfilePreview = ({ variant, photoURL, name }: ProfilePreviewProps) => {
  return (
    <Link href="/profile" title="Open Profile">
      <ProfilePreviewWrapper variant={variant}>
        <PhotoWrapper>
          {photoURL ? (
            <Photo src={photoURL} alt="" />
          ) : (
            <PhotoPlaceholder>
              <Icon icon={faUser} />
            </PhotoPlaceholder>
          )}
        </PhotoWrapper>
        {(variant !== 'photo' || !name) && <PreviewName>{name}</PreviewName>}
      </ProfilePreviewWrapper>
    </Link>
  );
};

export { ProfilePreview };
