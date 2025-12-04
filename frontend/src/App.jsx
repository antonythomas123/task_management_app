import { AuthProvider } from "./providers/AuthProvider";
import Routes from "./routes/routes";
import AppTheme from "./theme/AppTheme";

function App() {
  return (
    <AuthProvider>
      <AppTheme>
        <Routes />
      </AppTheme>
    </AuthProvider>
  );
}

export default App;
