import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Browse from '../Browse'
import { useLocation } from 'react-router-dom'
import * as playlistService from '../../services/playlistService'

// Mock do useLocation para fornecer playlist inicial
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}))

// Mock do serviço getPlaylistById
jest.mock('../../services/playlistService', () => ({
  getPlaylistById: jest.fn(),
}))

// Mock do componente AddMusicToPlaylist só pra não renderizar o real
jest.mock(
  '../../components/AddMusicToPlaylist/AddMusicToPlaylist',
  () => (props) =>
    (
      <div data-testid="add-music-modal">
        {props.open ? 'Modal Open' : 'Modal Closed'}
      </div>
    )
)

describe('Browse Page', () => {
  const mockPlaylist = {
    id: 1,
    name: 'Playlist Test',
    description: 'Playlist Description',
    editable: true,
    musics: [
      {
        name: 'Song 1',
        artist: 'Artist 1',
        duration: 180,
        url: 'https://song1.url',
      },
      {
        name: 'Song 2',
        artist: 'Artist 2',
        duration: 200,
        url: 'https://song2.url',
      },
    ],
  }

  beforeEach(() => {
    useLocation.mockReturnValue({ state: { playlist: mockPlaylist } })
    playlistService.getPlaylistById.mockResolvedValue(mockPlaylist)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render playlist data and songs', async () => {
    render(<Browse />)

    // Espera o fetch atualizar o estado
    await waitFor(() => {
      expect(playlistService.getPlaylistById).toHaveBeenCalledWith(
        mockPlaylist.id
      )
    })

    // Verifica se o nome e descrição aparecem
    expect(screen.getByText('Playlist Test')).toBeInTheDocument()
    expect(screen.getByText('Playlist Description')).toBeInTheDocument()

    // Verifica se músicas aparecem
    expect(screen.getByText('Song 1')).toBeInTheDocument()
    expect(screen.getByText('Song 2')).toBeInTheDocument()

    // Verifica botão "Adicionar Músicas" aparece (porque editable é true)
    expect(screen.getByText('Adicionar Músicas')).toBeInTheDocument()
  })

  it('should open and close the modal when button clicked', async () => {
    render(<Browse />)

    // Espera o fetch
    await waitFor(() =>
      expect(playlistService.getPlaylistById).toHaveBeenCalled()
    )

    // Modal começa fechado
    expect(screen.getByTestId('add-music-modal')).toHaveTextContent(
      'Modal Closed'
    )

    // Clica para abrir modal
    fireEvent.click(screen.getByText('Adicionar Músicas'))
    expect(screen.getByTestId('add-music-modal')).toHaveTextContent(
      'Modal Open'
    )

    // Chama a função de fechar (simula o onClose)
    fireEvent.click(screen.getByTestId('add-music-modal'))
    // Como o onClose chama fetchPlaylist, espera a chamada
    await waitFor(() => {
      expect(playlistService.getPlaylistById).toHaveBeenCalledTimes(2)
    })
  })

  it('should show fallback text if playlist is null', () => {
    useLocation.mockReturnValue({ state: { playlist: null } })
    render(<Browse />)

    expect(screen.getByText('Playlist não encontrada')).toBeInTheDocument()
  })

  it('should not show "Adicionar Músicas" button if playlist is not editable', async () => {
    const notEditablePlaylist = { ...mockPlaylist, editable: false }
    playlistService.getPlaylistById.mockResolvedValue(notEditablePlaylist)
    render(<Browse />)

    await waitFor(() =>
      expect(playlistService.getPlaylistById).toHaveBeenCalled()
    )

    expect(screen.queryByText('Adicionar Músicas')).not.toBeInTheDocument()
  })
})
