import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLocked: boolean;

  biometricEnabled: boolean;
}

const initialState: AuthState = {
  isLocked: true,

  biometricEnabled: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    unlockApp: (state) => {
      state.isLocked = false;
    },

    lockApp: (state) => {
      state.isLocked = true;
    },

    setBiometricEnabled: (state, action: PayloadAction<boolean>) => {
      state.biometricEnabled = action.payload;
    },
  },
});

export const { unlockApp, lockApp, setBiometricEnabled } = authSlice.actions;

export default authSlice.reducer;
