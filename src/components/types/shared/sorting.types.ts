export enum SelectedSorting {
  newest = 'newest',
  oldest = 'oldest',
}

export type Sorting = {
  changeSorting: (variant: SelectedSorting) => void;
  selectedSorting: SelectedSorting;
};
