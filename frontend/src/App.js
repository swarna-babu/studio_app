import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import Signup from './components/Signup';
import StudiosList from './components/StudiosList';
import NavBar from './components/NavBar';
import StudioDetail from './components/StudioDetail';
import Booking from './components/Booking';
import LocationsList from './components/LocationsList';
import Confirmation from './components/Confirmation';
import Account from './components/Account';
import SavedStudios from './components/SavedStudios';
import MyBookings from './components/MyBookings';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/studios" element={<StudiosList />} />
          <Route path="/studios/:id" element={<StudioDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/saved" element={<SavedStudios />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/locations" element={<LocationsList />} />
          <Route path="/terms" element={<div style={{ padding: 24, background: '#fff', color: '#000' }}><h2>Terms & Conditions</h2><p>Placeholder terms.</p><Link to="/">Back</Link></div>} />
          <Route path="/privacy" element={<div style={{ padding: 24, background: '#fff', color: '#000' }}><h2>Privacy Policy</h2><p>Placeholder privacy policy.</p><Link to="/">Back</Link></div>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
