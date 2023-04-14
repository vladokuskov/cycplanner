import { useAuth } from '@/context/AuthContext';
import { removeProfilePicture, uploadImage } from '@/firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from '../Button';
import { faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon';
import { useEffect, useRef, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const PhotoSectioWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const Subtitle = styled.p`
  font-family: 'Roboto';
  width: 100%;
  text-align: center;
  color: rgba(151, 151, 151, 0.77);
  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1rem;
`;

const PhotoChangingWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  widows: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PhotoWrapper = styled.div`
  border-radius: 50%;
  position: relative;
`;

const AvatarUpload = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: 50%;
`;

const Photo = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

const PhotoPlaceholder = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #d1d1d1;
  color: #7e7e7e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ImageInput = styled.input`
  display: none;
`;

const EditIcon = styled.div`
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

const DetailsDropdown = styled.dialog`
  position: absolute;
  width: 10rem;
  height: 5.5rem;
  background-color: #f7f7f7;
  border: 0.015rem solid #e7e7e7;
  border-radius: 0.5rem;
  padding: 0.1rem 0;
  bottom: -100%;
  margin: -1rem -2rem;
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

const DrodpownButton = styled.button`
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

const PhotoSection = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadPhotoRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleRemovePhoto = async () => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete your user profile photo?'
      );
      if (result) {
        await removeProfilePicture();
      }
      setIsDropdownOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const image = e.target.files[0];
      await uploadImage(image);
      setFile(image);
    }
  };

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        uploadPhotoRef.current &&
        !uploadPhotoRef.current.contains(e.target as Node)
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
    <PhotoSectioWrapper>
      <Title>My profile</Title>
      <Subtitle>Update photo</Subtitle>
      <dialog>123</dialog>
      <PhotoChangingWrapper>
        <PhotoWrapper ref={uploadPhotoRef}>
          <AvatarUpload
            role="button"
            onClick={handleDropdownOpen}
            title="Edit profile photo"
            tabIndex={0}
          >
            {user?.photoURL ? (
              <Photo
                src={user?.photoURL}
                alt="User picture"
                width={100}
                height={100}
              />
            ) : (
              <PhotoPlaceholder>
                <Icon icon={faUser} />
              </PhotoPlaceholder>
            )}
            <EditIcon>
              <Icon icon={faPenToSquare} />
            </EditIcon>
          </AvatarUpload>
          {isDropdownOpen && (
            <DetailsDropdown>
              <DrodpownButton
                title="Upload a photo"
                onClick={handleUploadButtonClick}
              >
                Upload a photo
              </DrodpownButton>
              <DrodpownButton title="Remove photo" onClick={handleRemovePhoto}>
                Remove photo
              </DrodpownButton>
            </DetailsDropdown>
          )}
        </PhotoWrapper>
        <ImageInput
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
        />
      </PhotoChangingWrapper>
    </PhotoSectioWrapper>
  );
};

export { PhotoSection };
