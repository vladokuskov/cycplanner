import Geocoder from './geocoder';
import { SortingPicker } from './SortingPicker';
import RangePicker from './RangePicker';

import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import {
  updateSorting,
  updateGeoPoint,
  updateRange,
} from '@/store/filterReducer';

import { GeoPoint } from '@/components/types/props/geoPoint.types';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 680px) {
    align-items: center;
  }
`;

const FilterSelectorsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: flex-end;
`;

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
