import { EventsFilter } from '@/components/types/shared/eventsFilter.types';
import { GeoPoint } from '@/components/types/shared/geoPoint.types';
import { SelectedSorting } from '@/components/types/shared/sorting.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  range: number;
  geoPoint: GeoPoint;
  sorting: SelectedSorting;
  eventsFilter: EventsFilter;
}

const initialState: FilterState = {
  range: 40,
  geoPoint: { lat: '51.509865', lon: '-0.118092' },
  sorting: SelectedSorting.newest,
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
    updateSorting: (state, action: PayloadAction<SelectedSorting>) => {
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
