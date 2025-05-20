import React from 'react'
import { MusicBox, MusicTitle, MusicInfo, AudioPlayer } from './styles'

const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = String(seconds % 60).padStart(2, '0')
  return `${min}:${sec}`
}

export default function Music({ title, artist, duration, url }) {
  return (
    <MusicBox>
      <MusicTitle>{title}</MusicTitle>
      <MusicInfo>
        {artist} • {formatDuration(duration)}
      </MusicInfo>
      <AudioPlayer controls>
        <source src={url} type="audio/mpeg" />
        Seu navegador não suporta o player de áudio.
      </AudioPlayer>
    </MusicBox>
  )
}
