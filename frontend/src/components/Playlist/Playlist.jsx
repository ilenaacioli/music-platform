import React from 'react'
import { PlaylistCard } from './styles'
import { Typography } from '@mui/material'

export default function Playlist({ playlist }) {
  return (
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
  )
}
