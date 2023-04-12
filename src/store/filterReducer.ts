import { EventsFilter } from '@/components/types/props/eventsFilter.types';
import { GeoPoint } from '@/components/types/props/geoPoint.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  range: number;
  geoPoint: GeoPoint;
  sorting: 'newest' | 'oldest';
  eventsFilter: EventsFilter;
}

const initialState: FilterState = {
  range: 40,
  geoPoint: { lat: '51.509865', lon: '-0.118092' },
  sorting: 'newest',
  eventsFilter: 'all',
};

export const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateEventsFilter: (state, action: PayloadAction<EventsFilter>) => {
      return {
        ...state,
        eventsFilter: action.payload,
      };
    },
    updateGeoPoint: (state, action: PayloadAction<GeoPoint>) => {
      return {
        ...state,
        geoPoint: action.payload,
      };
    },
    updateSorting: (state, action: PayloadAction<'newest' | 'oldest'>) => {
      return {
        ...state,
        sorting: action.payload,
      };
    },
    updateRange: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        range: action.payload,
      };
    },
  },
});

export const {
  updateGeoPoint,
  updateSorting,
  updateRange,
  updateEventsFilter,
} = filterReducer.actions;
export default filterReducer.reducer;
