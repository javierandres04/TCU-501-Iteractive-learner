import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {
    selectedTheme: {
      Grade: 'Grade',
      Unit: 'Unit',
      Theme: 'Theme'
    },
  },
  reducers: {
    updateSelectedTheme: (state, action) => { state.selectedTheme = action.payload; },
    resetSelectedTheme: (state) => { state.selectedTheme = {
      Grade: 'Grade',
      Unit: 'Unit',
      Theme: 'Theme'
    }; },
  },

});


export const { updateSelectedTheme,resetSelectedTheme} = themeSlice.actions;
export default themeSlice.reducer;