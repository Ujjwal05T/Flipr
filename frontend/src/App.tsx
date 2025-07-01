import { Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import './App.css'
import LandingPage from './pages/LandingPage';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    
  )
}

export default App
