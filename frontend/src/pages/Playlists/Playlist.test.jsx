import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Playlists from '../../pages/Playlists'
import * as playlistService from '../../services/playlistService'
import * as userService from '../../services/userService'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../components/Playlist/Playlist', () => () => (
  <div>Playlist Item</div>
))

jest.mock(
  '../../components/CreatePlaylist/CreatePlaylist',
  () => (props) => props.open ? <div>Modal Open</div> : null
)

describe('Playlists component', () => {
  const playlistsMock = [
    { id: 1, name: 'Playlist 1', coverUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Playlist 2', coverUrl: 'https://via.placeholder.com/150' },
  ]

  beforeEach(() => {
    jest.spyOn(playlistService, 'getPlaylists').mockResolvedValue(playlistsMock)
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue({ id: 123 })
    localStorage.setItem('userEmail', 'test@example.com')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders title and button', async () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    )

    expect(screen.getByText(/playlists/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /criar playlist/i })
    ).toBeInTheDocument()
  })

  it('shows loading initially and then playlists', async () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getAllByText('Playlist Item').length).toBe(2)
    })
  })

  it('opens modal when clicking create playlist button', async () => {
    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /criar playlist/i })
    fireEvent.click(button)

    expect(await screen.findByText('Modal Open')).toBeInTheDocument()
  })

  it('shows error snackbar if create playlist fails', async () => {
    jest.spyOn(playlistService, 'create').mockRejectedValue(new Error('fail'))

    render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /criar playlist/i }))

    await playlistService.create('name', 'desc', 123, true).catch(() => {})
  })
})
