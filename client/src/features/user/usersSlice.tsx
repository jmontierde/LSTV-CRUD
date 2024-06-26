import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRequest } from "../../lib/apiRequest";

// type UserState = {
//     users:
// }

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  avatar: string | null;
}

interface User {
  username: string;
  avatar?: string | undefined;
  password: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

interface LoginPayload {
  username: string;
  password: string;
}

export const registerUser = createAsyncThunk<void, RegisterUserData>(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post(`/auth/register`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error
        return rejectWithValue(error.response?.data.message);
      } else {
        // Other types of errors
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      console.log("Login products");
      const response = await apiRequest.post(`/auth/login`, payload);

      const { token, userInfo } = response.data;

      localStorage.setItem("token", response.data.token);

      console.log("userInfo", userInfo);

      return { token, user: userInfo };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error
        return rejectWithValue(error.response?.data.message);
      } else {
        // Other types of errors
        return rejectWithValue("An error occurred");
      }
    }
  }
);
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    await apiRequest.post(`/auth/logout`);
    localStorage.removeItem("token"); // Remove token from localStorage
  } catch (error) {
    throw new Error("Failed to logout");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
      builder.addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = false;
      state.error = null;
    }),
      builder.addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      }),
      builder.addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      });
  },
});

export default userSlice.reducer;
