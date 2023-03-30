import { GeoPoint } from '@/components/types/props/geoPoint.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  range: number;
  geoPoint: GeoPoint;
  sorting: 'newest' | 'oldest';
}

const initialState: FilterState = {
  range: 40,
  geoPoint: { latitude: 51.509865, longitude: -0.118092 },
  sorting: 'newest',
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

export const { updateGeoPoint, updateSorting, updateRange } =
  filterReducer.actions;
export default filterReducer.reducer;
