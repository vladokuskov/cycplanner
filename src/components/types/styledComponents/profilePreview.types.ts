export type ProfilePreview = {
  variant?:
    | 'default'
    | 'default-rev'
    | 'photo'
    | 'photo-btn'
    | 'no-link'
    | 'button';
  photoURL?: string | null;
  name?: string | null;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
