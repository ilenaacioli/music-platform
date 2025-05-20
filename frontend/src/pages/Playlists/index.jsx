import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getPlaylists } from '../../services/playlistService'
import Playlist from '../../components/Playlist/Playlist'

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const data = await getPlaylists()
        console.log(data)
        setPlaylists(data)
      } catch (err) {
        console.error('Erro ao buscar playlists:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylists()
  }, [])

  const handleClick = (playlist) => {
    navigate('/browse', { state: { playlist } })
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#42C8AE', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', color: '#0A2E36', mb: 4 }}
      >
        Playlists
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {playlists.map((playlist) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={playlist.id || playlist.name}
              onClick={() => handleClick(playlist)}
              style={{ cursor: 'pointer' }}
            >
              <Playlist playlist={playlist} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
