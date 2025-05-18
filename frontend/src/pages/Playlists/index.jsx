import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, CircularProgress } from '@mui/material'
import { PlaylistCard } from './styles'
import { getPlaylists } from '../../services/playlistService'

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const data = await getPlaylists() // ou getPlaylists('forró') por exemplo
        setPlaylists(data)
      } catch (err) {
        console.error('Erro ao buscar playlists:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaylists()
  }, [])

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
            <Grid item xs={12} sm={6} md={3} key={playlist.id || playlist.name}>
              <PlaylistCard bgColor={playlist.bgColor || '#F84E7D'}>
                <img
                  src={playlist.image || '/images/default.png'}
                  alt={playlist.name}
                  style={{ width: '100%', borderRadius: 8 }}
                />
                <Typography
                  variant="h6"
                  sx={{ mt: 1, fontWeight: 'bold', color: '#fff' }}
                >
                  {playlist.name}
                </Typography>
              </PlaylistCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
