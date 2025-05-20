import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const PlaylistCard = styled(Box)(({ bgColor }) => ({
  backgroundColor: bgColor,
  borderRadius: 12,
  padding: '16px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}))
