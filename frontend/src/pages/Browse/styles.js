// src/pages/Playlist/styles.js
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)({
  backgroundColor: '#f4b400', // amarelo
  minHeight: '100vh',
  padding: '32px',
  fontFamily: 'Arial, sans-serif',
})

export const Content = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '48px',
})

export const LeftPanel = styled(Box)({
  flex: '0 0 300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
})

export const Icon = styled('img')({
  width: '100px',
  height: 'auto',
})

export const Title = styled(Typography)({
  fontSize: '2.5rem',
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
  gap: '16px',
})
