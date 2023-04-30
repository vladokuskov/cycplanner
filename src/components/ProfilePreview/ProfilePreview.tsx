import Link from 'next/link';

import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../Icon/Icon';
import {
  Photo,
  PhotoPlaceholder,
  PhotoWrapper,
  PreviewDescription,
  PreviewInfoWrapper,
  PreviewName,
  ProfilePreviewButton,
  ProfilePreviewWrapper,
} from './ProfilePreview.styles';
import { ProfilePreview } from './ProfilePreview.types';

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
          <Photo
            src={photoURL}
            alt=""
            width={120}
            height={120}
            blurDataURL={photoURL}
            placeholder="blur"
            priority={true}
            quality={90}
          />
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
            <Photo
              src={photoURL}
              alt=""
              width={120}
              height={120}
              blurDataURL={photoURL}
              placeholder="blur"
              priority={true}
              quality={90}
            />
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
            <Photo
              src={photoURL}
              alt=""
              width={120}
              height={120}
              blurDataURL={photoURL}
              placeholder="blur"
              priority={true}
              quality={90}
            />
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
