import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import ListingDetail from './pages/ListingDetail';
import MyListings from './pages/MyListings';


function App() {
  const [authKey, setAuthKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setAuthKey(prev => prev + 1);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [authKey]);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/create">Create Listing</Link>
            <Link to="/my-listings">My Listings</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home key={authKey} />} />
        <Route path="/login" element={<Login setAuthKey={setAuthKey} />} />
        <Route path="/register" element={<Register setAuthKey={setAuthKey} />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/edit/:id" element={<EditListing />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/my-listings" element={<MyListings />} />
      </Routes>
    </Router>
  );
}

export default App;
