import { GeoPoint } from '@/components/event-filter/eventFilter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  range: number;
  geoPoint: GeoPoint;
  date: Date;
}

const initialState: FilterState = {
  range: 40,
  geoPoint: { latitude: 51.509865, longitude: -0.118092 },
  date: new Date(),
};

export const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateGeoPoint: (state, action: PayloadAction<GeoPoint>) => {
      return {
        ...state,
        geoPoint: action.payload,
      };
    },
    updateDate: (state, action: PayloadAction<Date>) => {
      return {
        ...state,
        date: action.payload,
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

export const { updateGeoPoint, updateDate, updateRange } =
  filterReducer.actions;
export default filterReducer.reducer;
