import Geocoder from '../Geocoder/Geocoder.tsx';
import { SortingPicker } from '../SortingPicker/SortingPicker';
import RangePicker from '../RangePicker/RangePicker';
import { FilterWrapper, FilterSelectorsWrapper } from './EventFilter.styles';

import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import {
  updateSorting,
  updateGeoPoint,
  updateRange,
} from '@/store/filterReducer';

import { GeoPoint } from '../../types/shared/geoPoint.types';

const EventFilter = () => {
  const dispatch = useAppDispatch();

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  const changeSorting = (variant: 'newest' | 'oldest') => {
    dispatch(updateSorting(variant));
  };

  const changeGeoPoint = (point: GeoPoint) => {
    dispatch(updateGeoPoint(point));
  };

  const changeRange = (range: number) => {
    dispatch(updateRange(range));
  };

  return (
    <FilterWrapper>
      <Geocoder changeGeoPoint={changeGeoPoint} geoPoint={geoPoint} />
      <FilterSelectorsWrapper>
        <SortingPicker
          changeSorting={changeSorting}
          selectedSorting={selectedSorting}
        />
        <RangePicker changeRange={changeRange} selectedRange={selectedRange} />
      </FilterSelectorsWrapper>
    </FilterWrapper>
  );
};

export { EventFilter };
