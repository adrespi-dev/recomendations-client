import { RecoilRoot } from "recoil";
import { AntdTheme } from "./core/AntdTheme";
import { AppRouter } from "./core/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Suspense } from "react";
import RecoilNexus from "recoil-nexus";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

function App() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
        <AntdTheme>
          <Suspense>
            <AppRouter />
          </Suspense>
        </AntdTheme>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
