import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginCredentials, User } from "./authTypes";
import { api } from "@/services/api";

export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
