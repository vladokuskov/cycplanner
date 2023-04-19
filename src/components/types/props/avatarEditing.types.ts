export type AvatarEditing = {
  isUploading: boolean;
  initialImage: File | null;
  handleAvatarEditingClose: () => void;
  handleAvatarUpload: (changedImage: File) => void;
};
