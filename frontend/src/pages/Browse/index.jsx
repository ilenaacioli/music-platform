import React, { useState, useEffect } from 'react'
import {
  Container,
  Header,
  HeaderRow,
  MainContent,
  PlaylistInfo,
  Icon,
  TextInfo,
  Title,
  Description,
  RightPanel,
  EditButton,
  DeleteButton,
  ButtonGroup,
} from './styles'
import Music from '../../components/Music/Music'
import { useLocation, useNavigate } from 'react-router-dom'
import AddMusicToPlaylist from '../../components/AddMusicToPlaylist/AddMusicToPlaylist'
import {
  getPlaylistById,
  deletePlaylistById,
} from '../../services/playlistService'
import Cover from '../../assets/playlist-cover.png'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { deleteFromPlaylist } from '../../services/musicService'

export default function Browse() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialPlaylist = location.state?.playlist

  const [playlist, setPlaylist] = useState(initialPlaylist)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

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

  const fetchPlaylist = async () => {
    try {
      const response = await getPlaylistById(initialPlaylist.id)
      setPlaylist(response)
    } catch (error) {
      console.error('Erro ao buscar playlist atualizada:', error)
    }
  }

  useEffect(() => {
    if (initialPlaylist?.id) {
      fetchPlaylist()
    }
  }, [])

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => {
    setIsModalOpen(false)
    fetchPlaylist()
  }

  const handleOpenDeleteConfirm = () => setIsDeleteConfirmOpen(true)
  const handleCloseDeleteConfirm = () => setIsDeleteConfirmOpen(false)

  const handleConfirmDelete = async () => {
    try {
      await deletePlaylistById(playlist.id)

      navigate('/playlists')
    } catch (error) {
      showSnackbar('Erro ao excluir playlist', 'error')
    }
  }

  const handleRemoveMusicFromPlaylist = async (musicId) => {
    try {
      await deleteFromPlaylist(musicId, playlist.id)
      fetchPlaylist()
    } catch (error) {
      showSnackbar('Erro ao remover música da playlist', 'error')
    }
  }

  if (!playlist) return <div>Playlist não encontrada</div>

  const buttons = () => {
    if (playlist?.editable)
      return (
        <ButtonGroup>
          <EditButton onClick={handleOpenModal}>Adicionar Músicas</EditButton>
          <DeleteButton onClick={handleOpenDeleteConfirm}>
            Excluir Playlist
          </DeleteButton>
        </ButtonGroup>
      )
    return <></>
  }

  const getCoverUrl = () => {
    if (playlist?.musics?.[0]?.md5Cover) {
      return `https://e-cdns-images.dzcdn.net/images/cover/${playlist.musics[0].md5Cover}/250x250-000000-80-0-0.jpg`
    }
    return Cover
  }

  return (
    <Container>
      <HeaderRow>
        <Header>Browse</Header>
        {buttons()}
      </HeaderRow>

      <MainContent>
        <PlaylistInfo>
          <Icon
            src={getCoverUrl()}
            alt={`Ícone da playlist ${playlist.name}`}
          />
          <TextInfo>
            <Title>{playlist.name}</Title>
            <Description>{playlist.description}</Description>
          </TextInfo>
        </PlaylistInfo>

        <RightPanel>
          {playlist.musics?.map((music, index) => (
            <Music
              key={index}
              name={music.name}
              artist={music.artist}
              duration={music.duration}
              url={music.url}
              onDelete={() => handleRemoveMusicFromPlaylist(music.id)}
              editable={playlist?.editable}
            />
          ))}
        </RightPanel>
      </MainContent>

      <AddMusicToPlaylist
        open={isModalOpen}
        onClose={handleCloseModal}
        playlistId={playlist.id}
      />

      <Dialog open={isDeleteConfirmOpen} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Deseja excluir a playlist?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Atenção! Essa ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancelar</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Confirmar Exclusão
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  )
}
