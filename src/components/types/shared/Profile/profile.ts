export type ProfileSections = 'information' | 'settings';

export type ProfileSidebar = {
  changeSection: (e: ProfileSections) => void;
  activeSection: ProfileSections;
};
