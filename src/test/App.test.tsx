
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import App from '../App'

afterEach(() => {
  cleanup()
})

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Blog application', () => {
  it('renders the blog posts', async () => {
    renderApp('/posts')

    expect(
      await screen.findByRole('heading', { name: 'All stories' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Building Better Habits' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'My Journey into Web Development' }),
    ).toBeInTheDocument()
  })

  it('updates the like count when the reader clicks like', async () => {
    const user = userEvent.setup()
    renderApp('/posts')

    const likeButton = await screen.findByRole('button', {
      name: 'Like Building Better Habits',
    })

    await user.click(likeButton)

    expect(likeButton).toHaveTextContent('1')
  })

  it('redirects a signed-out reader from the protected page', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Welcome back.' }),
    ).toBeInTheDocument()
  })
})
