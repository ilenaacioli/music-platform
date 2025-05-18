import React from 'react';

export default function Browse() {
  const mockSongs = [
    { title: "Song Title", artist: "Artist Name", duration: "3:45" },
    { title: "Song Title", artist: "Artist Name", duration: "2:27" },
    { title: "Song Title", artist: "Artist Name", duration: "4:20" },
    { title: "Song Title", artist: "Artist Name", duration: "3:10" }
  ];

  return (
    <div>
      <h2>Browse - Forró</h2>
      <button>Play</button>
      <ul>
        {mockSongs.map((song, index) => (
          <li key={index}>{song.title} - {song.artist} - {song.duration}</li>
        ))}
      </ul>
    </div>
  );
}