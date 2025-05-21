import React, { useState, useRef } from 'react'
import { MusicBox, MusicTitle, MusicInfo, PlayButton, MusicRow } from './styles'
import { searchMusic } from '../../services/musicService'

let currentlyPlayingAudio = null

const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Music = ({ name, artist, duration }) => {
  const [audioUrl, setAudioUrl] = useState(null)
  const audioRef = useRef(null)

  const handlePlay = async () => {
    try {
      const result = await searchMusic(name, true)
      const url = result?.url

      if (url) {
        if (currentlyPlayingAudio && !currentlyPlayingAudio.paused) {
          currentlyPlayingAudio.pause()
          currentlyPlayingAudio.currentTime = 0
        }

        setAudioUrl(url)

        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play()
            currentlyPlayingAudio = audioRef.current
          }
        }, 70)
      }
    } catch (error) {
      console.error('Erro ao buscar e tocar música:', error)
    }
  }

  const formattedDuration =
    typeof duration === 'number' ? formatDuration(duration) : duration

  return (
    <MusicBox>
      <MusicRow>
        <div>
          <MusicTitle>{name}</MusicTitle>
          <MusicInfo>
            {artist} • {formattedDuration}
          </MusicInfo>
        </div>
        <PlayButton onClick={handlePlay}>▶️</PlayButton>
      </MusicRow>
      <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />
    </MusicBox>
  )
}

export default Music
