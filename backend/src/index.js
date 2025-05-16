const express = require('express');
const app = express();
const playlistRoutes = require('./routes/playlists');

app.use(express.json());
app.use('/playlists', playlistRoutes);

app.listen(5000, () => {
  console.log('API rodando na porta 5000');
});
