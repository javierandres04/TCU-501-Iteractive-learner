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
    resetSelectedTheme: (state) => {
      state.selectedTheme = {
        Grade: 'Grade',
        Unit: 'Unit',
        Theme: 'Theme'
      };
    },
    updateGrade: (state, action) => { state.selectedTheme.Grade = action.payload; },
    updateUnit: (state, action) => { state.selectedTheme.Unit = action.payload; },
    updateTheme: (state, action) => { state.selectedTheme.Theme = action.payload; }
  },

});


export const { updateSelectedTheme, resetSelectedTheme, updateGrade, updateUnit, updateTheme } = themeSlice.actions;
export default themeSlice.reducer;