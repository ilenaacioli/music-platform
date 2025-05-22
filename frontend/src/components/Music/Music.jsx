import React, { useState, useRef } from 'react'
import {
  MusicBox,
  MusicTitle,
  MusicInfo,
  MusicRow,
  ButtonGroup,
} from './styles'
import { searchMusic } from '../../services/musicService'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

let currentlyPlayingAudio = null

const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Music = ({ name, artist, duration, onDelete, editable }) => {
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
        }, 50)
      }
    } catch (error) {
      console.error('Erro ao buscar e tocar música:', error)
    }
  }

  const handlePause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }

  const resolveDeleteButton = () => {
    if (onDelete && editable)
      return (
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      )

    return <></>
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

        <ButtonGroup>
          <IconButton aria-label="play" onClick={handlePlay}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton aria-label="pause" onClick={handlePause}>
            <PauseIcon />
          </IconButton>
          {resolveDeleteButton()}
        </ButtonGroup>
      </MusicRow>
      <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />
    </MusicBox>
  )
}

export default Music
