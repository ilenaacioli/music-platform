// src/components/CreatePlaylist/CreatePlaylist.jsx
import React, { useState } from 'react'
import {
  StyledModal,
  StyledBox,
  StyledTitle,
  StyledTextField,
  StyledButton,
  StyledBackdrop,
  StyledFade,
  CloseButton,
} from './styles'

import CloseIcon from '@mui/icons-material/Close'

export default function CreatePlaylist({ open, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name, description })
      setName('')
      setDescription('')
      onClose()
    }
  }

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={StyledBackdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <StyledFade in={open}>
        <StyledBox>
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>

          <StyledTitle variant="h5">Criar Playlist</StyledTitle>

          <StyledTextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
          />

          <StyledTextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />

          <StyledButton onClick={handleSubmit}>Salvar</StyledButton>
        </StyledBox>
      </StyledFade>
    </StyledModal>
  )
}
