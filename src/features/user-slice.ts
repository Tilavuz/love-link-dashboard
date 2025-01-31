import { IUser } from "@/interfaces/user-interface";
import { userService } from "@/services/user.service";
import { userSearchQueryStorage } from "@/utils/user-search-query-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  users: {
    [key: string]: IUser[];
  };
  paginations: {
    [key: string]: {
      page: number;
      totalPages: number;
      totalUsers: number;
    };
  };
  loading: boolean;
}

const initialState: UserState = {
  users: {},
  loading: false,
  paginations: {},
};

export const searchUsersThunk = createAsyncThunk(
  "users/search/admin",
  async ({
    page,
    ages,
    gender,
    location,
    goal,
  }: {
    page: number;
    ages?: string;
    gender?: number;
    location?: string;
    goal?: string;
  }) => {
    const data = await userService.usersSearch({
      page,
      ages,
      gender,
      location,
      goal,
    });
    const query = {
      page,
      ages,
      gender,
      location,
      goal,
    };

    userSearchQueryStorage.setQuery({ query });

    return {
      users: data.users,
      query: userSearchQueryStorage.stringQuery(query),
      pagination: data.pagination,
    };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changePage: (
      state,
      action: PayloadAction<{ page: number; query: string }>
    ) => {
      state.paginations[action.payload.query] = {
        ...state.paginations[action.payload.query],
        page: action.payload.page,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        searchUsersThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            users: IUser[];
            query: string;
            pagination: {
              page: number;
              totalPages: number;
              totalUsers: number;
            };
          }>
        ) => {
          state.users[action.payload.query] = action.payload.users;
          state.paginations[action.payload.query] = action.payload.pagination;
          state.loading = false;
        }
      );
  },
});

export const { changePage } = userSlice.actions;
export default userSlice.reducer;
