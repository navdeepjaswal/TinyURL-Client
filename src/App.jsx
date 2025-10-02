import "./App.css";
import Landing from "./pages/landing";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Landing/>
    </QueryClientProvider>
  );
}

export default App;
