import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      console.warn("⚠️ Нет токена, отменяем загрузку контактов!");
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`; // ✅ Устанавливаем токен
      const response = await axios.get("/contacts");
      console.log("✅ Полученные контакты:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Ошибка загрузки контактов:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
