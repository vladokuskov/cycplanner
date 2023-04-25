import { faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from '../../../../Button/Button';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { RangeSlider } from '../../../../RangeSlider/RangeSlider';
import { AvatarEditing } from '@/components/types/shared/Profile/avatarEditing.types';

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
  gap: 0.2rem;
`;

const AvatarEditingFooter = styled.div`
  width: 100%;
  height: 100%;
  border-top: 0.015rem solid #e7e7e7;
`;

const AvatarEditing = ({
  isUploading,
  initialImage,
  handleAvatarEditingClose,
  handleAvatarUpload,
}: AvatarEditing) => {
  const tempAvatarUrl = initialImage
    ? URL.createObjectURL(initialImage)
    : undefined;
  const editorRef = useRef<AvatarEditor | null>(null);
  const [scale, setScale] = useState<number>(1);

  const saveChanges = () => {
    if (editorRef.current && initialImage) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const changedImage = new File([blob], initialImage.name, {
            type: initialImage.type,
          });
          handleAvatarUpload(changedImage);
        }
      }, initialImage.type);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(+e.target.value);
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
              scale={scale}
              rotate={0}
            />
          )}
          <RangeSlider
            step={0.1}
            startValue={1}
            endValue={3}
            value={scale}
            onChange={handleScaleChange}
            label="Scale"
          />
        </AvatarEditingBody>
        <AvatarEditingFooter>
          <Button
            variant="filled"
            text={isUploading ? 'Saving changes' : 'Set new profile picture'}
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
