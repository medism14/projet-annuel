import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    userState: boolean;
}

const initialState: UserState = {
    userState: true,
}

export const AppState = createSlice({
    name: "AppState",
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<boolean>) => {
            state.userState = action.payload;
        }
    }
})

export const { setUserState } = AppState.actions;
export const AppStateReducer = AppState.reducer;