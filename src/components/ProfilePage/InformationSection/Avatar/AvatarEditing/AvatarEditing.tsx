import { faCircleNotch, faClose } from '@fortawesome/free-solid-svg-icons';
import {
  AvatarEditingFooter,
  AvatarEditingBody,
  AvatarEditingHeader,
  AvatarEditingTitle,
  AvatarEditingWindow,
  AvatarEditingWindowWrapper,
} from './AvatarEditing.styles';
import { Button } from '../../../../Button/Button';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { RangeSlider } from '../../../../RangeSlider/RangeSlider';
import { AvatarEditing } from '@/components/types/shared/Profile/avatarEditing.types';

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
