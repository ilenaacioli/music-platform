import styled from '@emotion/styled'
import { Box, TextField, Button } from '@mui/material'

export const LoginContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#ed4264',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
})

export const LeftSection = styled(Box)({
  flex: 1,
  padding: '64px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const RightSection = styled(Box)({
  flex: 1,
  padding: '64px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '16px',
})

export const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: '#005bbb',
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
})

export const StyledButton = styled(Button)({
  backgroundColor: '#fdd835',
  color: 'black',
  fontWeight: 'bold',
  padding: '8px 24px',
  borderRadius: '16px',
  '&:hover': {
    backgroundColor: '#fbc02d',
  },
})

export const Row = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px',
})
