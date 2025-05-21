import styled from '@emotion/styled'
import { IconButton } from '@mui/material'

export const ModalOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
})

export const ModalContent = styled('div')({
  background: 'white',
  padding: '24px',
  borderRadius: '12px',
  minWidth: '600px',
  maxHeight: '80vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 8,
  color: '#fff',
  backgroundColor: '#1b1b1b',
  '&:hover': {
    backgroundColor: '#333',
  },
})

export const Input = styled('input')({
  width: '100%',
  margin: '16px 0',
  fontSize: '1rem',
  minHeight: '40px',
})

export const MusicList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  overflowY: 'auto',
  paddingRight: '8px',
  boxSizing: 'border-box',
})

export const MusicItem = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#f0f0f0',
  padding: '10px',
  borderRadius: '8px',
})

export const AddButton = styled('button')({
  background: '#4caf50',
  color: 'white',
  border: 'none',
  fontSize: '1.2rem',
  padding: '4px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    background: '#388e3c',
  },
})
