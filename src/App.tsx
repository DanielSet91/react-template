import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootNavigator from "./navigators/RootNavigator";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RootNavigator />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
