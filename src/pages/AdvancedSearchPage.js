import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemPage from './ItemPage.js';

function AdvancedSearchPage() {
  const [params, setParams] = useState({ q: '' });
  const [results, setResults] = useState([]);
  const [detailedResults, setDetailedResults] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) setParams({ q: qParam });
  }, []);

  const handleSearch = () => {
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${params.q}&hasImages=true`)
      .then(response => {
        const objectIDs = response.data.objectIDs || [];
        setResults(objectIDs);
        return Promise.all(objectIDs.map(id => 
          axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        ));
      })
      .then(results => {
        setDetailedResults(results.map(result => result.data));
      });
  };

  return (
    <div>
      <h1>Advanced Search</h1>
      <input
        type="text"
        placeholder="Search term"
        value={params.q}
        onChange={(e) => setParams({ q: e.target.value })}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h1>Results</h1>
        <ul>
          {detailedResults.map(item => (
            <ItemPage key={item.objectID} id={item.objectID} />
          ))}
        </ul>
        
      </div>
    </div>
  );
}

export default AdvancedSearchPage;
