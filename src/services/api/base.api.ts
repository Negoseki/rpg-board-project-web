import { AppState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const { auth } = getState() as AppState;
    if (auth.token) {
      headers.set('Authorization', `Bearer ${auth.token}`);
    }
    return headers;
  },
});

const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export default api;
