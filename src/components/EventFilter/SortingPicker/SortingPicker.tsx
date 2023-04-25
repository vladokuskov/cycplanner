import { SortingPickerWrapper } from './SortingPicker.styles';
import { SelectorLabel } from '../RangePicker/RangePicker.styles';
import { Button } from '../../Button/Button';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Sorting } from '../../types/shared/sorting.types';

const SortingPicker = ({ changeSorting, selectedSorting }: Sorting) => {
  const handleSorting = () => {
    if (selectedSorting === 'newest') {
      changeSorting('oldest');
    } else {
      changeSorting('newest');
    }
  };

  return (
    <SortingPickerWrapper>
      <SelectorLabel>Sorting</SelectorLabel>
      <Button
        variant="text-icon"
        icon={faSort}
        text={selectedSorting}
        bold
        size="sm2"
        onClick={handleSorting}
      />
    </SortingPickerWrapper>
  );
};

export { SortingPicker };
