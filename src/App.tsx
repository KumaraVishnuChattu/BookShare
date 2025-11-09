import { AppProvider } from './context/AppContext';
import Router from './Router';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
