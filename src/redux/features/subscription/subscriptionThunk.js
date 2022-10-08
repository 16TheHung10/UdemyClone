import { createAsyncThunk } from "@reduxjs/toolkit";
import {getMySubscription} from 'apis/features/Subscription/Subscription'

export const getMySubscriptionThunk = createAsyncThunk(
    "subcribtion",
    async () => {
        const response = (await getMySubscription()).data;
        const data = response.data;
        return data
    }
);
