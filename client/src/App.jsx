import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import Navbar from './Components/Navigation/Navbar';
import HomePage from './Components/routes/HomePage'
import LogInPage from './Components/routes/LoginPage'
import RegisterPage from './Components/routes/RegisterPage'
import LandingPage from './Components/routes/LandingPage'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LogInPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/landing" element={<LandingPage/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
