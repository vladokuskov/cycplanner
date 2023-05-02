import { useRef, useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { removeProfilePicture, uploadAvatar } from '@/firebase/profile';
import { useClickOutside } from '@/hooks/useClickOutside';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../../../Icon/Icon';
import { AvatarEditing } from './AvatarEditing/AvatarEditing';
import {
  StyledAvatar,
  StyledAvatarChangingWrapper,
  StyledAvatarPlaceholder,
  StyledAvatarSectionWrapper,
  StyledAvatarUpload,
  StyledAvatarWrapper,
  StyledDetailsDropdown,
  StyledDropdownButton,
  StyledEditIcon,
  StyledImageInput,
} from './AvatarSection.styles';

const PhotoSection = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadAvatarRef = useRef<HTMLDivElement>(null);
  const [initialImage, setInitialImage] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useClickOutside(
    uploadAvatarRef,
    false
  );
  const [isAvatarEditing, setIsAvatarEditing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleAvatarRemoving = async () => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete your user profile photo?'
      );
      if (result) {
        await removeProfilePicture();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
    setIsDropdownOpen(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const image = e.target.files[0];
      setInitialImage(image);
      setIsAvatarEditing(true);
    }
  };

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleAvatarEditingClose = () => {
    setIsAvatarEditing(false);
    setInitialImage(null);
  };

  const handleAvatarUpload = async (changedImage: File) => {
    setIsUploading(true);
    if (initialImage) {
      await uploadAvatar(changedImage);
    }
    setIsUploading(false);
    setIsAvatarEditing(false);
    setInitialImage(null);
    window.location.reload();
  };

  return (
    <StyledAvatarSectionWrapper>
      <StyledAvatarChangingWrapper>
        <StyledAvatarWrapper ref={uploadAvatarRef}>
          <StyledAvatarUpload
            isDropdownOpen={isDropdownOpen}
            role="button"
            onClick={handleDropdownOpen}
            title="Edit profile photo"
            tabIndex={0}
          >
            {user?.photoURL ? (
              <StyledAvatar
                src={user?.photoURL}
                alt="User picture"
                width={100}
                height={100}
              />
            ) : (
              <StyledAvatarPlaceholder>
                <Icon icon={faUser} />
              </StyledAvatarPlaceholder>
            )}
            <StyledEditIcon>
              <Icon icon={faPenToSquare} />
            </StyledEditIcon>
          </StyledAvatarUpload>
          {isDropdownOpen && (
            <StyledDetailsDropdown>
              <StyledDropdownButton
                title="Upload a photo"
                disabled={isAvatarEditing}
                onClick={handleUploadButtonClick}
              >
                Upload a photo
              </StyledDropdownButton>
              <StyledDropdownButton
                danger={true}
                isDisabled={user?.photoURL === null}
                title="Remove photo"
                disabled={user?.photoURL === null}
                onClick={handleAvatarRemoving}
              >
                Remove photo
              </StyledDropdownButton>
            </StyledDetailsDropdown>
          )}
        </StyledAvatarWrapper>
        <StyledImageInput
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileUpload}
        />
      </StyledAvatarChangingWrapper>
      {isAvatarEditing && (
        <AvatarEditing
          isUploading={isUploading}
          initialImage={initialImage}
          handleAvatarEditingClose={handleAvatarEditingClose}
          handleAvatarUpload={handleAvatarUpload}
        />
      )}
    </StyledAvatarSectionWrapper>
  );
};

export { PhotoSection };
