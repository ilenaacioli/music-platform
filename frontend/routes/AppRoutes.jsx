import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Playlist from '../pages/Playlist';
import Player from '../pages/Player';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </Router>
  );
}