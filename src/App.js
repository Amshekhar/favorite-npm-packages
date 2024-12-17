import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const App = () => (
  <Router>
    <div className="p-4">
      <nav className="mb-4 border-2 border-gray-400 px-3 py-2">
        <Link to="/" className="mr-4 hover:text-blue-400">Home</Link>
        <Link to="/favorites" className='hover:text-blue-400'>Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  </Router>
);

export default App;
