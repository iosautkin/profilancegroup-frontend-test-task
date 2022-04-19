import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { auth } from './authAPI';


type RoleType = 'admin' | 'user';

export interface IUser {
  id: number,
  role: RoleType,
  login: string,
}

export interface IAuthState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | undefined;
}

const initialState: IAuthState = {
  user: null,
  status: 'idle',
  error: undefined,
};

export const loginAction = createAsyncThunk(
  'auth/auth',
  async ({ login, password }: { login: string, password: string }) => {
    const response: any = await auth(login, password);
    if (response.status === 'success') {
      return response.data;
    } else throw new Error(response.error);
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });;
  },
});

export const { logoutAction } = userSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;


export default userSlice.reducer;
 