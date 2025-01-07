import React, { useState } from 'react';
import axios from 'axios';

function AdvancedSearchPage() {
  const [params, setParams] = useState({ departmentId: '', q: '' });
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search', { params })
      .then(response => setResults(response.data.objectIDs || []));
  };

  return (
    <div>
      <h1>Advanced Search</h1>
      <input
        type="text"
        placeholder="Search term"
        value={params.q}
        onChange={(e) => setParams({ ...params, q: e.target.value })}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdvancedSearchPage;
