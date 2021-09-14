import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

import http from 'services/services' 
import IPatientsData from 'models/PatientsModel'


export interface PatientsState {
  patients: IPatientsData[],
  page: number;
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PatientsState = {
  patients: [],
  page: 1,
  status: 'idle',
}

export const fetchPatients = createAsyncThunk(
  'patientsList/fetchPatients',
  async (page: number) => {
    const response = await http.getPatients(page)
    return response.data;
  }
);

export const patientsSlice = createSlice({
  name: 'patientsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'idle'
        state.page += 1
        state.patients = [...state.patients, ...action.payload.results]
      })
      .addCase(fetchPatients.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const getData = (state: RootState) => state.patients

export default patientsSlice.reducer;
