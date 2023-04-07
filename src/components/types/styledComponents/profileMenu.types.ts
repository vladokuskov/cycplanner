export type ProfileMenuProps = {
  name?: string | null;
  navRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  isOpen: boolean;
};
