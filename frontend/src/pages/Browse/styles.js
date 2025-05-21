import styled from '@emotion/styled'
import { Box, Typography, Button } from '@mui/material'

export const Container = styled(Box)({
  backgroundColor: '#f4b400',
  minHeight: '100vh',
  padding: '32px',
  fontFamily: 'Arial, sans-serif',
})

export const HeaderRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px',
})

export const Header = styled(Typography)({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#004d40',
})

export const EditButton = styled(Button)({
  backgroundColor: '#00695c',
  color: '#fff',

  '&:hover': {
    backgroundColor: '#004d40',
  },
  variant: 'contained',
})

export const MainContent = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '300px',
  padding: '32px',
  fontFamily: 'Arial, sans-serif',
  justifyContent: 'center',
})

export const PlaylistInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flex: '0 0 400px',
})

export const Icon = styled('img')({
  width: '300px',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '12px',
})

export const TextInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '400px',
  gap: '8px',
})

export const Title = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#1b1b1b',
})

export const Description = styled(Typography)({
  fontSize: '1rem',
  color: '#333',
})

export const RightPanel = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '10px',
  maxHeight: '60vh',
  overflowY: 'auto',
})

export const DeleteButton = styled(Button)({
  backgroundColor: '#e53935',
  color: '#fff',

  '&:hover': {
    backgroundColor: '#b71c1c',
  },
})

export const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: '8px',
})
