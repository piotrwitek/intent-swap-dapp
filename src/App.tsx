import { AppProvider } from "./context/AppProvider";
import Router from "./Router";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      <AppProvider>
        <Router />
      </AppProvider>
    </Providers>
  );
}

export default App;
