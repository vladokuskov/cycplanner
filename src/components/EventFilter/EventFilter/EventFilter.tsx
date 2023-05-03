import { SelectedSorting } from '@/components/types/shared/sorting.types';
import {
  updateGeoPoint,
  updateRange,
  updateSorting,
} from '@/store/filterReducer';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';

import { GeoPoint } from '../../types/shared/geoPoint.types';
import Geocoder from '../Geocoder/Geocoder';
import RangePicker from '../RangePicker/RangePicker';
import { SortingPicker } from '../SortingPicker/SortingPicker';
import {
  StyledFilterSelectorsWrapper,
  StyledFilterWrapper,
} from './EventFilter.styles';
import { useEffect } from 'react';

const EventFilter = () => {
  const dispatch = useAppDispatch();

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  const changeSorting = (variant: SelectedSorting) => {
    dispatch(updateSorting(variant));
  };

  const changeGeoPoint = (point: GeoPoint) => {
    dispatch(updateGeoPoint(point));
  };

  const changeRange = (range: number) => {
    dispatch(updateRange(range));
  };

  return (
    <StyledFilterWrapper>
      <Geocoder changeGeoPoint={changeGeoPoint} geoPoint={geoPoint} />
      <StyledFilterSelectorsWrapper>
        <SortingPicker
          changeSorting={changeSorting}
          selectedSorting={selectedSorting}
        />
        <RangePicker changeRange={changeRange} selectedRange={selectedRange} />
      </StyledFilterSelectorsWrapper>
    </StyledFilterWrapper>
  );
};

export { EventFilter };
