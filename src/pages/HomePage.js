import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=art')
      .then((response) => {
        const objectIDs = response.data.objectIDs.slice(0, 10); // Limit to 10 highlights
        Promise.all(objectIDs.map(id => 
          axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        )).then(results => {
          setHighlights(results.map(result => result.data));
        });
      });
  }, []);

  return (
    <div>
      <h1>Highlights</h1>
      <div className="highlights-grid">
        {highlights.map((item) => (
          <div key={item.objectID} className="highlight-item">
            <img src={item.primaryImageSmall} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
