import styled, { css } from 'styled-components';
import { ProfilePreview } from '../types/styledComponents/profilePreview.types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';
import Link from 'next/link';

const ProfilePreviewWrapper = styled.div<ProfilePreview>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: ${({ variant }) => (variant === 'no-link' ? 'default' : 'pointer')};
  transition: 0.2s;
  border: none;
  border-radius: 4px;
  &:hover,
  &:focus {
    opacity: ${({ variant }) => (variant === 'no-link' ? 1 : 0.8)};
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
  object-fit: cover;
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

const PreviewInfoWrapper = styled.div`
  display: grid;
`;
const PreviewDescription = styled.p`
  font-family: 'Roboto';
  font-size: 0.8rem;
  line-height: 0.8rem;
  letter-spacing: 0.029em;
  font-weight: 400;
  color: #7e7e7e;
`;

const ProfilePreviewButton = styled.button``;

const ProfilePreview = ({
  variant,
  photoURL,
  name,
  description,
  onClick,
}: ProfilePreview) => {
  return variant === 'no-link' ? (
    <ProfilePreviewWrapper variant={variant}>
      <PhotoWrapper>
        {photoURL && photoURL.length > 0 ? (
          <Photo src={photoURL} alt="" />
        ) : (
          <PhotoPlaceholder>
            <Icon icon={faUser} />
          </PhotoPlaceholder>
        )}
      </PhotoWrapper>
      <PreviewInfoWrapper>
        <PreviewName>{name}</PreviewName>
        {description && description.length !== 0 && (
          <PreviewDescription>{description}</PreviewDescription>
        )}
      </PreviewInfoWrapper>
    </ProfilePreviewWrapper>
  ) : variant === 'button' ? (
    <ProfilePreviewButton onClick={onClick}>
      <ProfilePreviewWrapper variant={variant}>
        <PhotoWrapper>
          {photoURL && photoURL.length > 0 ? (
            <Photo src={photoURL} alt="" />
          ) : (
            <PhotoPlaceholder>
              <Icon icon={faUser} />
            </PhotoPlaceholder>
          )}
        </PhotoWrapper>
      </ProfilePreviewWrapper>
    </ProfilePreviewButton>
  ) : (
    <Link href="/profile" title="Open Profile">
      <ProfilePreviewWrapper variant={variant}>
        <PhotoWrapper>
          {photoURL && photoURL.length > 0 ? (
            <Photo src={photoURL} alt="" />
          ) : (
            <PhotoPlaceholder>
              <Icon icon={faUser} />
            </PhotoPlaceholder>
          )}
        </PhotoWrapper>
        {(variant !== 'photo' || !name) && (
          <PreviewInfoWrapper>
            <PreviewName>{name}</PreviewName>
            {description && description.length !== 0 && (
              <PreviewDescription>{description}</PreviewDescription>
            )}
          </PreviewInfoWrapper>
        )}
      </ProfilePreviewWrapper>
    </Link>
  );
};

export { ProfilePreview };
