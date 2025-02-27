import { IAdmin } from "@/interfaces/auth-interface";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  admins: IAdmin[] | null;
  loading: boolean;
}

const initialState: AdminState = {
  admins: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    getAdmins: (state, action: PayloadAction<IAdmin[]>) => {
      state.admins = action.payload;
      state.loading = false;
    },
  },
});

export const { getAdmins } = adminSlice.actions;
export default adminSlice.reducer;
