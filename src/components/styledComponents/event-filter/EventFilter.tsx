import Geocoder from './geocoder';
import { DatePicker } from './DatePicker';
import RangePicker from './RangePicker';

import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { updateDate, updateGeoPoint, updateRange } from '@/store/filterReducer';

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
  const initialDate = useAppSelector((state) => state.filterReducer.date);
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  const changeDate = (date: Date) => {
    dispatch(updateDate(date));
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
        <DatePicker changeDate={changeDate} initialDate={initialDate} />
        <RangePicker changeRange={changeRange} selectedRange={selectedRange} />
      </FilterSelectorsWrapper>
    </FilterWrapper>
  );
};

export { EventFilter };
