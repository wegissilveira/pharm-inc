import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

import http from 'services/services' 
import IPatientsData from 'models/PatientsModel'


export interface PatientsState {
  patients: IPatientsData[],
  status: 'success' | 'loading' | 'failed'
}

const initialState: PatientsState = {
  patients: [],
  status: 'loading',
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
        state.status = 'success'
        state.patients = state.patients.concat(action.payload.results)
      })
      .addCase(fetchPatients.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const getData = (state: RootState) => state.patients

export default patientsSlice.reducer;
