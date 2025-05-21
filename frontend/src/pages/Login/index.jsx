import React, { useState } from 'react'
import { Typography } from '@mui/material'
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

  const handleLogin = async () => {
    try {
      await getUserByEmail(email)
      localStorage.setItem('userEmail', email)
      window.location.href = '/playlists'
    } catch (error) {
      console.error('Erro ao fazer login:', error)
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
    </LoginContainer>
  )
}
