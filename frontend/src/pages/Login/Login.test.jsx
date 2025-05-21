import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '../../pages/Login'
import * as userService from '../../services/userService'
import { MemoryRouter, useLocation } from 'react-router-dom'

jest.mock('../../services/userService', () => ({
  getUserByEmail: jest.fn(),
}))

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.localStorage.clear()
    delete window.location
    window.location = { href: '' }
  })

  it('renderiza campos de email e senha', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByText(/entrar/i)).toBeInTheDocument()
  })

  it('permite digitar nos campos', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(emailInput, { target: { value: 'user@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(emailInput.value).toBe('user@email.com')
    expect(passwordInput.value).toBe('123456')
  })

  it('faz login com email válido e redireciona', async () => {
    const mockEmail = 'user@email.com'
    userService.getUserByEmail.mockResolvedValue({ email: mockEmail })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/senha/i)
    const button = screen.getByText(/entrar/i)

    fireEvent.change(emailInput, { target: { value: mockEmail } })
    fireEvent.change(passwordInput, { target: { value: 'senha123' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(userService.getUserByEmail).toHaveBeenCalledWith(mockEmail)
      expect(window.localStorage.getItem('userEmail')).toBe(mockEmail)
      expect(window.location.href).toBe('/playlists')
    })
  })

  it('trata erro no login', async () => {
    userService.getUserByEmail.mockRejectedValue(
      new Error('Usuário não encontrado')
    )

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalido@email.com' },
    })
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'senhaerrada' },
    })

    fireEvent.click(screen.getByText(/entrar/i))

    await waitFor(() => {
      expect(userService.getUserByEmail).toHaveBeenCalled()
    })
  })
})
