import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type initialStateProps = {
  mandatePins: any[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  registrationData: any[];
};

const initialState: initialStateProps = {
  mandatePins: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  registrationData: [],
};

export const getRegistrationData = createAsyncThunk(
  "getRegistrationData/mandateSlice",
  async (pin: string) => {
    try {
      const response = await fetch(
        `http://132.10.100.221:9912/crusader/webservices/api/mandate/${pin}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const mandateSlice = createSlice({
  name: "mandate",
  initialState,
  reducers: {
    setMandatePins: (state, action) => {
      state.mandatePins = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRegistrationData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegistrationData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.registrationData = action.payload;
      })
      .addCase(getRegistrationData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { setMandatePins } = mandateSlice.actions;
export const mandateSelector = (state: any) => state.mandate;
export default mandateSlice.reducer;
