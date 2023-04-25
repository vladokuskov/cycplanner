import { ProfilePreview } from './ProfilePreview.types';
import {
  ProfilePreviewWrapper,
  ProfilePreviewButton,
  PreviewDescription,
  PreviewInfoWrapper,
  PreviewName,
  PhotoPlaceholder,
  Photo,
  PhotoWrapper,
} from './ProfilePreview.styles';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon/Icon';
import Link from 'next/link';

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
