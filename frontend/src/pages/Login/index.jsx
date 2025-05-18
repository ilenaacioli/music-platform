import React from 'react'
import { Typography } from '@mui/material'
import {
  LoginContainer,
  LeftSection,
  RightSection,
  StyledTextField,
  StyledButton,
  Row,
} from './styles'

export default function Login() {
  return (
    <LoginContainer>
      <LeftSection>
        <Typography variant="h2" fontWeight="bold" color="white">
          Bora <span style={{ color: '#fdd835' }}>Dançar?</span>
        </Typography>
      </LeftSection>

      <RightSection>
        <StyledTextField label="Email address" variant="filled" fullWidth />
        <StyledTextField
          label="Password"
          variant="filled"
          type="password"
          fullWidth
        />
        <Row>
          <div></div>
          <StyledButton variant="contained">Log in</StyledButton>
        </Row>
      </RightSection>
    </LoginContainer>
  )
}
