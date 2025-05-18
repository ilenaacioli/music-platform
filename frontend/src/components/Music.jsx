import React from 'react';

export default function Music({ title, artist, duration }) {
  return (
    <div>
      <p>{title} - {artist} - {duration}</p>
    </div>
  );
}
