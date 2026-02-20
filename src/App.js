
import './App.css';

import Approutes from "./Routes/Approutes";
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
          <Approutes/>
      </Router>
    </AuthProvider>
  );
}


export default App;
