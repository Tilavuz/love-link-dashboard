import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../interfaces/auth-interface";
import { authService } from "../services/auth.service";

export interface AuthState {
  auth: IAuth | null | undefined;
  loading: boolean;
  authError: string | null;
}

const initialState: AuthState = {
  auth: undefined,
  loading: false,
  authError: null,
};

export const getAuth = createAsyncThunk("getAuth", async () => {
  const data = await authService.getAuth();
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload;
      state.loading = false;
      state.authError = null;
    },
    startLogin: (state) => {
      state.loading = true;
    },
    authErrorLogin: (state, action: PayloadAction<string>) => {
      state.authError = action.payload;
      state.loading = false;
      state.auth = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuth.fulfilled, (state, action: PayloadAction<IAuth>) => {
        state.auth = action.payload;
        state.loading = false;
      })
      .addCase(getAuth.rejected, (state) => {
        state.loading = false;
        state.auth = null
      });
  },
});

export const { login, startLogin, authErrorLogin } = authSlice.actions;
export default authSlice.reducer;
