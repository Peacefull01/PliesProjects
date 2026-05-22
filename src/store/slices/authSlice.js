import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginUser} from '../../api/api';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      return await loginUser(credentials);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
