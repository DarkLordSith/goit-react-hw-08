import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// ✅ Функция для установки токена в заголовки запросов
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token); // Сохраняем токен в localStorage
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("token"); // Удаляем токен при выходе
  }
};

// ✅ Регистрация пользователя
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Логин пользователя
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Выход из системы
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    setAuthToken(null);
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ✅ Обновление пользователя (чтобы не разлогинивало при перезагрузке)
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    let token = state.auth.token || localStorage.getItem("token"); // Берем токен из store или localStorage

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      setAuthToken(token); // Устанавливаем токен в заголовки
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
