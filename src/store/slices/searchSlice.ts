import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  search: string;
}

const initialState: SearchState = {
  search: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;