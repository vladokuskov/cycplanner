import { useAuth } from '@/context/AuthContext';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../../../Icon';
import { useEffect, useRef, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  AvatarSectioWrapper,
  AvatarChangingWrapper,
  Avatar,
  AvatarPlaceholder,
  AvatarUpload,
  AvatarWrapper,
  EditIcon,
  DetailsDropdown,
  DrodpownButton,
  ImageInput,
} from './StyledAvatarSection';
import { AvatarEditing } from './AvatarEditing';
import { removeProfilePicture, uploadAvatar } from '@/firebase/profile';

const PhotoSection = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadAvatarRef = useRef<HTMLDivElement>(null);
  const [initialImage, setInitialImage] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAvatarEditing, setIsAvatarEditing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleAvatarRemoving = async () => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete your user profile photo?'
      );
      result && (await removeProfilePicture());
      window.location.reload();
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

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        uploadAvatarRef.current &&
        !uploadAvatarRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen((prev) => !prev);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  return (
    <AvatarSectioWrapper>
      <AvatarChangingWrapper>
        <AvatarWrapper ref={uploadAvatarRef}>
          <AvatarUpload
            isDropdownOpen={isDropdownOpen}
            role="button"
            onClick={handleDropdownOpen}
            title="Edit profile photo"
            tabIndex={0}
          >
            {user?.photoURL ? (
              <Avatar
                src={user?.photoURL}
                alt="User picture"
                width={100}
                height={100}
              />
            ) : (
              <AvatarPlaceholder>
                <Icon icon={faUser} />
              </AvatarPlaceholder>
            )}
            <EditIcon>
              <Icon icon={faPenToSquare} />
            </EditIcon>
          </AvatarUpload>
          {isDropdownOpen && (
            <DetailsDropdown>
              <DrodpownButton
                title="Upload a photo"
                disabled={isAvatarEditing}
                onClick={handleUploadButtonClick}
              >
                Upload a photo
              </DrodpownButton>
              <DrodpownButton
                danger={true}
                isDisabled={user?.photoURL === null}
                title="Remove photo"
                disabled={user?.photoURL === null}
                onClick={handleAvatarRemoving}
              >
                Remove photo
              </DrodpownButton>
            </DetailsDropdown>
          )}
        </AvatarWrapper>
        <ImageInput
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileUpload}
        />
      </AvatarChangingWrapper>
      {isAvatarEditing && (
        <AvatarEditing
          isUploading={isUploading}
          initialImage={initialImage}
          handleAvatarEditingClose={handleAvatarEditingClose}
          handleAvatarUpload={handleAvatarUpload}
        />
      )}
    </AvatarSectioWrapper>
  );
};

export { PhotoSection };
