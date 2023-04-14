import { useAuth } from '@/context/AuthContext';
import { removeProfilePicture, uploadImage } from '@/firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from '../Button';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon';
import { useRef, useState } from 'react';

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
`;

const Photo = styled(Image)`
  border-radius: 50%;
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

const PhotoSection = () => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleRemovePhoto = async () => {
    try {
      await removeProfilePicture();
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const image = e.target.files[0];
      await uploadImage(image);
      setImage(image);
    }
  };

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <PhotoSectioWrapper>
      <Title>My profile</Title>
      <Subtitle>Update photo</Subtitle>
      <PhotoChangingWrapper>
        <PhotoWrapper>
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
        </PhotoWrapper>
        <Button
          variant="filled"
          text="Upload photo"
          onClick={handleUploadButtonClick}
        />
        <p>{image ? image.name : ''}</p>
        <ImageInput
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
        />
        <Button
          variant="danger"
          text="Remove"
          icon={faTrash}
          onClick={handleRemovePhoto}
        />
      </PhotoChangingWrapper>
    </PhotoSectioWrapper>
  );
};

export { PhotoSection };
