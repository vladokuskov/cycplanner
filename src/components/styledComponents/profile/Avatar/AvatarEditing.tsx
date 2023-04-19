import { faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from '../../Button';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

type AvatarEditing = {
  isUploading: boolean;
  file: File | null;
  handleAvatarEditingClose: () => void;
  handleAvatarUpload: (image: File) => void;
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const AvatarEditingFooter = styled.div`
  width: 100%;
  height: 100%;
  border-top: 0.015rem solid #e7e7e7;
`;

const ScaleSliderWrapper = styled.div``;

const AvatarEditing = ({
  isUploading,
  file,
  handleAvatarEditingClose,
  handleAvatarUpload,
}: AvatarEditing) => {
  const tempAvatarUrl = file ? URL.createObjectURL(file) : undefined;
  const editorRef = useRef<AvatarEditor | null>(null);

  const saveChanges = () => {
    if (editorRef.current && file) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const newFile = new File([blob], file.name, { type: file.type });
          handleAvatarUpload(newFile);
        }
      }, file.type);
    }
  };

  return (
    <AvatarEditingWindowWrapper>
      <AvatarEditingWindow>
        <AvatarEditingHeader>
          <AvatarEditingTitle>Crop your new profile picture</AvatarEditingTitle>
          <Button
            variant="icon"
            icon={faClose}
            text="Close"
            onClick={handleAvatarEditingClose}
          />
        </AvatarEditingHeader>
        <AvatarEditingBody>
          {tempAvatarUrl && (
            <AvatarEditor
              ref={editorRef}
              image={tempAvatarUrl}
              width={200}
              height={200}
              border={50}
              borderRadius={100}
              color={[255, 255, 255, 0.6]}
              scale={1}
              rotate={0}
            />
          )}
          <ScaleSliderWrapper></ScaleSliderWrapper>
        </AvatarEditingBody>
        <AvatarEditingFooter>
          <Button
            variant="filled"
            text={isUploading ? 'Uploading' : 'Set new profile picture'}
            icon={isUploading ? faCircleNotch : null}
            onClick={saveChanges}
            size="sm2"
            full
            disabled={isUploading}
            rotate={isUploading}
          />
        </AvatarEditingFooter>
      </AvatarEditingWindow>
    </AvatarEditingWindowWrapper>
  );
};

export { AvatarEditing };
