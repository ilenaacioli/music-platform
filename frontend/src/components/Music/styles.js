import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const MusicBox = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '12px',
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
})

export const MusicTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#0A2E36',
})

export const MusicInfo = styled(Typography)({
  color: '#666',
  fontSize: '14px',
})

export const AudioPlayer = styled('audio')({
  width: '100%',
  outline: 'none',
})
