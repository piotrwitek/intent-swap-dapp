import { AppProvider } from "./context/AppProvider";
import { Providers } from "./providers";
import TanStackRouter from "./TanStackRouter";

function App() {
  return (
    <Providers>
      <AppProvider>
        <TanStackRouter />
      </AppProvider>
    </Providers>
  );
}

export default App;
