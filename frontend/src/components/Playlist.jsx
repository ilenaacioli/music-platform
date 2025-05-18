import React from 'react'

export default function Playlist({ title, image }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <img src={image} alt={title} style={{ width: '100px' }} />
      <h3>{title}</h3>
    </div>
  )
}
