import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchEvents} from '../../api/api';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async (_, {getState, rejectWithValue}) => {
    const {token} = getState().auth;
    if (!token) {
      return rejectWithValue('Please login first');
    }

    try {
      return await fetchEvents(token);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Could not load events',
      );
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // heart toggle is local only (no API in brief)
    toggleFavorite: (state, action) => {
      const event = state.list.find(item => item.id === action.payload);
      if (event) {
        event.isFavorite = !event.isFavorite;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load';
      });
  },
});

export const {toggleFavorite} = eventsSlice.actions;
export default eventsSlice.reducer;
