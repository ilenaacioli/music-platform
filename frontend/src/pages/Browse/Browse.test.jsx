import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Browse from '../../pages/Browse'
import * as playlistService from '../../services/playlistService'
import { MemoryRouter, useLocation } from 'react-router-dom'

jest.mock('../../components/Music/Music', () => ({ name, artist }) => (
  <div>{`${name} - ${artist}`}</div>
))
jest.mock(
  '../../components/AddMusicToPlaylist/AddMusicToPlaylist',
  () =>
    ({ open }) =>
      open ? <div data-testid="modal">Modal Aberta</div> : null
)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}))

jest.mock('../../services/playlistService', () => ({
  getPlaylistById: jest.fn(),
}))

describe('Browse Page', () => {
  const mockPlaylist = {
    id: 1,
    name: 'Forró das Antigas',
    description: 'Só pedrada',
    editable: true,
    musics: [
      {
        name: 'Asa Branca',
        artist: 'Luiz Gonzaga',
        duration: '3:00',
        url: '#',
        md5Cover: 'abc123',
      },
    ],
  }

  beforeEach(() => {
    useLocation.mockReturnValue({
      state: { playlist: mockPlaylist },
    })

    playlistService.getPlaylistById.mockResolvedValue(mockPlaylist)
  })

  it('displays the playlist correctly', async () => {
    render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Forró das Antigas')).toBeInTheDocument()
      expect(screen.getByText('Só pedrada')).toBeInTheDocument()
      expect(screen.getByText('Asa Branca - Luiz Gonzaga')).toBeInTheDocument()
    })
  })

  it('show "Add Songs" button if playlist is editable', async () => {
    render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    )

    expect(await screen.findByText('Adicionar Músicas')).toBeInTheDocument()
  })

  it('opens the modal when clicking on the "Add Songs" button"', async () => {
    render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    )

    const button = await screen.findByText('Adicionar Músicas')
    fireEvent.click(button)

    expect(await screen.findByTestId('modal')).toBeInTheDocument()
  })

  it('do not show button if playlist is not editable', async () => {
    const nonEditablePlaylist = { ...mockPlaylist, editable: false }
    useLocation.mockReturnValue({
      state: { playlist: nonEditablePlaylist },
    })

    playlistService.getPlaylistById.mockResolvedValue(nonEditablePlaylist)

    render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Adicionar Músicas')).not.toBeInTheDocument()
    })
  })
})
