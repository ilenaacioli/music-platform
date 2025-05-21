import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { getPlaylists, create } from '../../services/playlistService'
import Playlist from '../../components/Playlist/Playlist'
import CreatePlaylistModal from '../../components/CreatePlaylist/CreatePlaylist'
import { useNavigate } from 'react-router-dom'
import { getUserByEmail } from '../../services/userService'

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const data = await getPlaylists()
        setPlaylists(data)

        const email = localStorage.getItem('userEmail')
        const user = await getUserByEmail(email)
        setUserId(user.id)
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

  const handleCreatePlaylist = async (playlistData) => {
    try {
      await create(playlistData.name, playlistData.description, userId, true)
      const updated = await getPlaylists()
      setPlaylists(updated)
    } catch (error) {
      showSnackbar('Erro ao criar playlist', 'error')
    }
  }

  return (
    <>
      <Box sx={{ padding: 4, backgroundColor: '#42C8AE', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: '#0A2E36' }}
          >
            Playlists
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FF4C72', color: '#fff' }}
            onClick={() => setModalOpen(true)}
          >
            Criar Playlist
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            spacing={3}
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              marginTop: '20px',
            }}
          >
            {playlists.map((playlist) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={playlist.id || playlist.name}
                onClick={() => handleClick(playlist)}
                style={{
                  cursor: 'pointer',
                }}
              >
                <Playlist playlist={playlist} />
              </Grid>
            ))}
          </Grid>
        )}

        <CreatePlaylistModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
