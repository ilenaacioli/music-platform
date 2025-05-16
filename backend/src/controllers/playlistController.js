const db = require('../db');

exports.list = async (req, res) => {
  const playlists = await db('playlists');
  res.json(playlists);
};

exports.create = async (req, res) => {
  const { name, description } = req.body;
  const [id] = await db('playlists').insert({ name, description });
  res.status(201).json({ id });
};
