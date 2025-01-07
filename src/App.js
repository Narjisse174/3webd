import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar.js';
import HomePage from './pages/HomePage.js';
import ItemPage from './pages/ItemPage.js';
import AdvancedSearchPage from './pages/AdvancedSearchPage.js';

function App() {
  return (
    <Router>
      <SearchBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/advanced-search" element={<AdvancedSearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
