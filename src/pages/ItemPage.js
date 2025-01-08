import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      .then(response => setItem(response.data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h1>{item.title}</h1>
      <img src={item.primaryImageSmall} alt={item.title} />
      <p>Artist: {item.artistDisplayName}</p>
      <p>Period: {item.period}</p>
      <p>Department: {item.department}</p>
      <p>Medium: {item.medium}</p>
    </div>
  );
}

export default ItemPage;
