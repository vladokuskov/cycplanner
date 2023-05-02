import Link from 'next/link';

import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../Icon/Icon';
import {
  StyledPhoto,
  StyledPhotoPlaceholder,
  StyledPhotoWrapper,
  StyledPreviewDescription,
  StyledPreviewInfoWrapper,
  StyledPreviewName,
  StyledProfilePreviewButton,
  StyledProfilePreviewWrapper,
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
    <StyledProfilePreviewWrapper variant={variant}>
      <StyledPhotoWrapper>
        {photoURL && photoURL.length > 0 ? (
          <StyledPhoto
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
          <StyledPhotoPlaceholder>
            <Icon icon={faUser} />
          </StyledPhotoPlaceholder>
        )}
      </StyledPhotoWrapper>
      <StyledPreviewInfoWrapper>
        <StyledPreviewName>{name}</StyledPreviewName>
        {description && description.length !== 0 && (
          <StyledPreviewDescription>{description}</StyledPreviewDescription>
        )}
      </StyledPreviewInfoWrapper>
    </StyledProfilePreviewWrapper>
  ) : variant === 'button' ? (
    <StyledProfilePreviewButton onClick={onClick}>
      <StyledProfilePreviewWrapper variant={variant}>
        <StyledPhotoWrapper>
          {photoURL && photoURL.length > 0 ? (
            <StyledPhoto
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
            <StyledPhotoPlaceholder>
              <Icon icon={faUser} />
            </StyledPhotoPlaceholder>
          )}
        </StyledPhotoWrapper>
      </StyledProfilePreviewWrapper>
    </StyledProfilePreviewButton>
  ) : (
    <Link href="/profile" title="Open Profile">
      <StyledProfilePreviewWrapper variant={variant}>
        <StyledPhotoWrapper>
          {photoURL && photoURL.length > 0 ? (
            <StyledPhoto
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
            <StyledPhotoPlaceholder>
              <Icon icon={faUser} />
            </StyledPhotoPlaceholder>
          )}
        </StyledPhotoWrapper>
        {(variant !== 'photo' || !name) && (
          <StyledPreviewInfoWrapper>
            <StyledPreviewName>{name}</StyledPreviewName>
            {description && description.length !== 0 && (
              <StyledPreviewDescription>{description}</StyledPreviewDescription>
            )}
          </StyledPreviewInfoWrapper>
        )}
      </StyledProfilePreviewWrapper>
    </Link>
  );
};

export { ProfilePreview };
