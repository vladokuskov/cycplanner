import Geocoder from './geocoder';
import DatePicker from './datePicker';
import RangePicker from './rangePicker';

import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import { updateDate, updateGeoPoint, updateRange } from '@/store/filterReducer';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

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
    <div className="filter-wrapper">
      <Geocoder changeGeoPoint={changeGeoPoint} geoPoint={geoPoint} />
      <div className="filter-selectors-wrapper">
        <DatePicker changeDate={changeDate} initialDate={initialDate} />
        <RangePicker changeRange={changeRange} selectedRange={selectedRange} />
      </div>
    </div>
  );
};

export default EventFilter;
