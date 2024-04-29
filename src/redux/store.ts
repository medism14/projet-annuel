import { configureStore } from '@reduxjs/toolkit';
import { AppStateReducer } from './features/AppState';

export const store = () => {
    return configureStore({
        reducer: {
            AppState: AppStateReducer,
        }
    })
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']