import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Home from './pages';
import Login from './pages/login';
import SignUp from './pages/signup';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="Profile" element={<Profile/>}></Route>
        <Route path="Login" element={<Login/>}></Route>
        <Route path="Sign Up" element={<SignUp/>}></Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn react
        </a>
      </header>
    </div>*/