import { faSort } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { SelectedSorting, Sorting } from '../../types/shared/sorting.types';
import { StyledSelectorLabel } from '../EventFilterShared.styles';
import { StyledSortingPickerWrapper } from './SortingPicker.styles';

const SortingPicker = ({ changeSorting, selectedSorting }: Sorting) => {
  const handleSorting = () => {
    if (selectedSorting === SelectedSorting.newest) {
      changeSorting(SelectedSorting.oldest);
    } else {
      changeSorting(SelectedSorting.newest);
    }
  };

  return (
    <StyledSortingPickerWrapper>
      <StyledSelectorLabel>Sorting</StyledSelectorLabel>
      <Button
        variant="text-icon"
        icon={faSort}
        text={selectedSorting}
        bold
        size="sm2"
        onClick={handleSorting}
      />
    </StyledSortingPickerWrapper>
  );
};

export { SortingPicker };
