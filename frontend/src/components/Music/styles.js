import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const MusicBox = styled(Box)({
  backgroundColor: '#f0f0f0',
  padding: '16px',
  borderRadius: '12px',
  marginBottom: '12px',
  maxWidth: '100%',
  minWidth: '250px',
})

export const MusicRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const MusicTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
})

export const MusicInfo = styled(Typography)({
  fontSize: '14px',
  color: '#666',
})

export const PlayButton = styled('button')({
  backgroundColor: '#42C8AE',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '8px 12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#36a893',
  },
})
