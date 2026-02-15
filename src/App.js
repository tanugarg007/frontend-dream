import logo from './logo.svg';
import './App.css';

import Approutes from "./Routes/Approutes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
     
        <Approutes/>
     
    </Router>
  );
}


export default App;
