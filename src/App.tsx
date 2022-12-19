import AppRoute from "./Routes";
import './App.css'
import AuthProvider from "./Context/authContext";

function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}

export default App;
