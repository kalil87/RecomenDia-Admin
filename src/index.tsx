import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
  mutationCache: new MutationCache({
    onError: (error, mutation) => {
      const { messages } = (error as AxiosError).response?.data as { messages: string[] };
      console.log(messages)
    },
  }),
});
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);