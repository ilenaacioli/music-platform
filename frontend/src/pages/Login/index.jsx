import React, { useState } from 'react'
import { Typography, Snackbar, Alert } from '@mui/material'
import {
  LoginContainer,
  LeftSection,
  RightSection,
  StyledTextField,
  StyledButton,
  Row,
} from './styles'
import { getUserByEmail } from '../../services/userService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleLogin = async () => {
    try {
      const response = await getUserByEmail(email)
      localStorage.setItem('userEmail', email)
      window.location.href = '/playlists'
    } catch (error) {
      showSnackbar('Erro ao fazer login: usuário não encontrado', 'error')
    }
  }

  return (
    <LoginContainer>
      <LeftSection>
        <Typography variant="h2" fontWeight="bold" color="white">
          Bora <span style={{ color: '#fdd835' }}>Dançar?</span>
        </Typography>
      </LeftSection>

      <RightSection>
        <StyledTextField
          label="Email "
          variant="filled"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          label="Senha"
          variant="filled"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Row>
          <div></div>
          <StyledButton variant="contained" onClick={handleLogin}>
            Entrar
          </StyledButton>
        </Row>
      </RightSection>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LoginContainer>
  )
}
