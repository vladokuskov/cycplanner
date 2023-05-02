import React, { useRef, useState } from 'react';

import AvatarEditor from 'react-avatar-editor';

import { AvatarEditing } from '@/components/types/shared/Profile/avatarEditing.types';
import { faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../../Button/Button';
import { RangeSlider } from '../../../../RangeSlider/RangeSlider';
import {
  StyledAvatarEditingBody,
  StyledAvatarEditingFooter,
  StyledAvatarEditingHeader,
  StyledAvatarEditingTitle,
  StyledAvatarEditingWindow,
  StyledAvatarEditingWindowWrapper,
} from './AvatarEditing.styles';

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
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

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

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position);
  };

  return (
    <StyledAvatarEditingWindowWrapper>
      <StyledAvatarEditingWindow>
        <StyledAvatarEditingHeader>
          <StyledAvatarEditingTitle>
            Crop your new profile picture
          </StyledAvatarEditingTitle>
          <Button
            variant="icon"
            icon={faClose}
            text="Close"
            onClick={handleAvatarEditingClose}
          />
        </StyledAvatarEditingHeader>
        <StyledAvatarEditingBody>
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
              position={position}
              onPositionChange={handlePositionChange}
            />
          )}
          <RangeSlider
            step={0.001}
            startValue={1}
            endValue={3}
            value={scale}
            onChange={handleScaleChange}
            label="Scale"
          />
        </StyledAvatarEditingBody>
        <StyledAvatarEditingFooter>
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
        </StyledAvatarEditingFooter>
      </StyledAvatarEditingWindow>
    </StyledAvatarEditingWindowWrapper>
  );
};

export { AvatarEditing };
