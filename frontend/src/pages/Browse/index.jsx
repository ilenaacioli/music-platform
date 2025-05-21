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
} from './styles'
import Music from '../../components/Music/Music'
import { useLocation } from 'react-router-dom'
import AddMusicToPlaylist from '../../components/AddMusicToPlaylist/AddMusicToPlaylist'
import { getPlaylistById } from '../../services/playlistService'
import Cover from '../../assets/playlist-cover.png'

export default function Browse() {
  const location = useLocation()
  const initialPlaylist = location.state?.playlist

  const [playlist, setPlaylist] = useState(initialPlaylist)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  if (!playlist) return <div>Playlist não encontrada</div>

  const button = () => {
    if (playlist?.editable)
      return (
        <EditButton onClick={handleOpenModal}>Adicionar Músicas</EditButton>
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
        {button()}
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
            />
          ))}
        </RightPanel>
      </MainContent>

      <AddMusicToPlaylist
        open={isModalOpen}
        onClose={handleCloseModal}
        playlistId={playlist.id}
      />
    </Container>
  )
}
