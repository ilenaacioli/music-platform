import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/playlists')
      .then(res => setPlaylists(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {playlists.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
