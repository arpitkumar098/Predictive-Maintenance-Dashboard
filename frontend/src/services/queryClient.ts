/**
 * React Query client configuration.
 */
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,       // 10 seconds before data is considered stale
      refetchInterval: 15_000, // Re-fetch every 15 seconds for near-real-time
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});
