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
      const message =
        error instanceof Error ? error.message : 'Could not load events';
      return rejectWithValue(message);
    }
  },
);

export const toggleFavorite = createAsyncThunk(
  'events/toggleFavorite',
  async (eventId, {getState, rejectWithValue}) => {
    const event = getState().events.list.find(item => item.id === eventId);

    if (!event) {
      return rejectWithValue('Event not found');
    }

    return {eventId, isFavorite: !event.isFavorite};
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEvents: state => {
      state.list = [];
      state.error = null;
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
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const {eventId, isFavorite} = action.payload;
        const event = state.list.find(item => item.id === eventId);
        if (event) {
          event.isFavorite = isFavorite;
        }
      });
  },
});

export const {clearEvents} = eventsSlice.actions;
export default eventsSlice.reducer;
