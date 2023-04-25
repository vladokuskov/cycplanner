export type Sorting = {
  changeSorting: (variant: 'newest' | 'oldest') => void;
  selectedSorting: 'newest' | 'oldest';
};
