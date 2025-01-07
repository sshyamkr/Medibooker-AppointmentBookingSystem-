import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.get(`${API_BASE_URL}/api/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Ensure this contains doctor and patient references
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/appointments`,
        appointmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Ensure this contains doctor and patient details
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await axios.delete(`${API_BASE_URL}/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // This should be the id of the appointment to be removed
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload; // Ensure payload has the right structure
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error for later use
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload); // Ensure payload has doctor and patient data
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error for later use
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload // Remove appointment by ID
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error for later use
      });
  },
});

export default appointmentSlice.reducer;
