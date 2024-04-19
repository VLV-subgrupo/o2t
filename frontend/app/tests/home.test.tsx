import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../(Home)/page'

describe('Home test', () => {
  it('should render a heading', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', {name: /Hello World!/i})
    ).toBeInTheDocument()
  })
})