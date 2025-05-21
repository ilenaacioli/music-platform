// src/components/CreatePlaylist/styles.js
import styled from '@emotion/styled'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Fade,
  IconButton,
} from '@mui/material'

export const StyledModal = styled(Modal)({})
export const StyledFade = styled(Fade)({})
export const StyledBackdrop = styled(Backdrop)({})

export const StyledBox = styled(Box)({
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FF4C72',
  color: '#fff',
  borderRadius: '16px',
  boxShadow: 24,
  padding: '32px',
  width: '90%',
  maxWidth: '400px',
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  fontFamily: 'Arial, sans-serif',
})

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 8,
  color: '#fff',
})

export const StyledTitle = styled(Typography)({
  fontWeight: 'bold',
})

export const StyledTextField = styled(TextField)({
  '& label': {
    color: '#fff',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
})

export const StyledButton = styled(Button)({
  backgroundColor: '#0A2E36',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#08323b',
  },
  marginTop: '8px',
})
