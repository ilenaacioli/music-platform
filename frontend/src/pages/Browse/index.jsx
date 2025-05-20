import React from 'react'
import {
  Container,
  Content,
  LeftPanel,
  RightPanel,
  Icon,
  Title,
  Description,
} from './styles'
import Music from '../../components/Music/Music'
import { useLocation } from 'react-router-dom'

export default function Browse() {
  const location = useLocation()
  const { playlist } = location.state || {}

  if (!playlist) return <div>Playlist não encontrada</div>

  return (
    <Container>
      <Content>
        <LeftPanel>
          <Icon
            src={playlist.icon}
            alt={`Ícone da playlist ${playlist.name}`}
          />
          <Title>{playlist.name}</Title>
          <Description>{playlist.description}</Description>
        </LeftPanel>
        <RightPanel>
          {playlist.musics?.map((music, index) => (
            <Music
              key={index}
              title={music.title}
              artist={music.artist}
              duration={music.duration}
              url={music.url}
            />
          ))}
        </RightPanel>
      </Content>
    </Container>
  )
}
