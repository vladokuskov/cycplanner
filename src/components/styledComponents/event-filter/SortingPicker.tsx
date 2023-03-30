import styled from 'styled-components';

import { SelectorLabel } from './RangePicker';
import { Button } from '../Button';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { Sorting } from '@/components/types/props/sorting.types';

const SortingPickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  gap: 0.3rem;
`;

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
