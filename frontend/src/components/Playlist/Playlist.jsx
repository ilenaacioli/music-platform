import React from 'react'
import { PlaylistCard, CoverImage } from './styles'
import { Typography } from '@mui/material'
import Cover from '../../assets/playlist-cover.png'

export default function Playlist({ playlist }) {
  const getCoverUrl = () => {
    if (playlist?.musics?.[0]?.md5Cover) {
      return `https://e-cdns-images.dzcdn.net/images/cover/${playlist.musics[0].md5Cover}/250x250-000000-80-0-0.jpg`
    }
    return Cover
  }

  return (
    <PlaylistCard bgColor={playlist.bgColor || '#F84E7D'}>
      <CoverImage src={getCoverUrl()} alt={playlist.name} />
      <Typography
        variant="h6"
        sx={{ mt: 1, fontWeight: 'bold', color: '#fff' }}
      >
        {playlist.name}
      </Typography>
    </PlaylistCard>
  )
}
