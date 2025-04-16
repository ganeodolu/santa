import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import { ReactNode, useState } from "react";

type AppProvidersProps = {
  readonly children: ReactNode;
  readonly dehydratedState?: unknown;
}

export default function AppProviders({
  children,
  dehydratedState
}: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 60 * 1000, // 1시간
            gcTime: 3 * 60 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1
          }
        }
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <Provider>{children}</Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </HydrationBoundary>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}
