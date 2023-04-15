import { faClose } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from '../../Button';

type AvatarEditing = {
  isUploading: boolean;
  file: File | null;
  handleAvatarEditingClose: () => void;
  handleAvatarUpload: () => void;
};

const AvatarEditingWindowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #00000068;
  z-index: 5000;
`;

const AvatarEditingWindow = styled.div`
  width: 100%;
  max-width: 30rem;
  background-color: #f7f7f7;
  border: 0.015rem solid #e7e7e7;
  border-radius: 0.3rem;
  margin: 5rem 1rem;
  div {
    padding: 1rem;
  }
`;

const AvatarEditingTitle = styled.h3`
  font-family: 'Roboto';
  font-size: 0.9rem;
  color: #2c2c2c;
  font-weight: 400;
`;
const AvatarEditingHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.015rem solid #e7e7e7;
`;

const AvatarEditingBody = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarEditingFooter = styled.div`
  width: 100%;
  border-top: 0.015rem solid #e7e7e7;
`;

const AvatarImage = styled.img`
  max-width: 100%;
  height: 6rem;
  width: 6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  box-shadow: 0 0 0 0.2rem #fff, 0 0 0.2rem 0.3rem #888888a2; /* add a border and shadow */
`;

const AvatarEditing = ({
  isUploading,
  file,
  handleAvatarEditingClose,
  handleAvatarUpload,
}: AvatarEditing) => {
  const tempAvatarUrl = file ? URL.createObjectURL(file) : undefined;

  return (
    <AvatarEditingWindowWrapper>
      <AvatarEditingWindow>
        <AvatarEditingHeader>
          <AvatarEditingTitle>
            Preview your new profile picture
          </AvatarEditingTitle>
          <Button
            variant="icon"
            icon={faClose}
            text="Close"
            onClick={handleAvatarEditingClose}
          />
        </AvatarEditingHeader>
        <AvatarEditingBody>
          <AvatarImage src={tempAvatarUrl} alt=""></AvatarImage>
        </AvatarEditingBody>
        <AvatarEditingFooter>
          <Button
            variant="filled"
            text="Set new profile picture"
            onClick={handleAvatarUpload}
            size="sm2"
            full
            disabled={isUploading}
          />
        </AvatarEditingFooter>
      </AvatarEditingWindow>
    </AvatarEditingWindowWrapper>
  );
};

export { AvatarEditing };
