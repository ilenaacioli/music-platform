import React, { useEffect, useState } from 'react'
import {
  ModalOverlay,
  ModalContent,
  Input,
  MusicList,
  MusicItem,
  AddButton,
} from './styles'
import { IconButton, Snackbar, Alert } from '@mui/material'
import Close from '@mui/icons-material/Close'
import { searchMusic, addToPlaylist } from '../../services/musicService'

export default function AddMusicToPlaylist({ open, onClose, playlistId }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

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
    if (query.length > 2) {
      const fetch = async () => {
        try {
          const data = await searchMusic(query, false)
          const dataToUse = data.map((music) => ({
            name: music.title,
            artist: music.artist.name,
            duration: music.duration,
            md5Cover: music.md5_image,
            url: music.preview,
          }))
          setResults(dataToUse)
        } catch (err) {
          showSnackbar('Erro ao buscar músicas', 'error')
        }
      }
      fetch()
    } else {
      setResults([])
    }
  }, [query])

  const handleAdd = async (music) => {
    try {
      await addToPlaylist(
        playlistId,
        music.name,
        music.url,
        music.md5Cover,
        music.artist,
        music.duration
      )
      showSnackbar('Música adicionada com sucesso!', 'success')
    } catch (error) {
      showSnackbar('Falha ao adicionar música à playlist', 'error')
    }
  }

  if (!open) return null

  return (
    <>
      <ModalOverlay>
        <ModalContent>
          <IconButton
            onClick={onClose}
            style={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Close />
          </IconButton>

          <h2>Buscar Músicas</h2>
          <Input
            placeholder="Digite o nome da música..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <MusicList>
            {results.map((music, idx) => (
              <MusicItem key={idx}>
                {music.name} — {music.artist}
                <AddButton onClick={() => handleAdd(music)}>+</AddButton>
              </MusicItem>
            ))}
          </MusicList>
        </ModalContent>
      </ModalOverlay>

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
