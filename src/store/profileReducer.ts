import { ProfileSections } from '@/components/types/shared/Profile/profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  activeProfileSection: 'information',
};

export const profileReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeSection: (state, action: PayloadAction<ProfileSections>) => {
      return {
        ...state,
        activeProfileSection: action.payload,
      };
    },
  },
});

export const { changeSection } = profileReducer.actions;
export default profileReducer.reducer;
