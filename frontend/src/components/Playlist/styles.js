import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const PlaylistCard = styled(Box)(({ bgColor }) => ({
  backgroundColor: bgColor,
  borderRadius: 12,
  padding: 20,
  textAlign: 'center',
  width: '100%',
  maxWidth: '300px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '300px',
}))

export const CoverImage = styled('img')({
  width: '100%',
  height: '280px',
  borderRadius: '8px',
  objectFit: 'cover',
})
