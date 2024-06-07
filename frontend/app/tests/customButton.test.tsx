import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CustomButton from '../_components/customButton'

const mockClick = jest.fn()

describe('customButton test', () => {
  it('should render a button', () => {
    render(<CustomButton onClick={mockClick} />)

    expect(
      screen.getByTestId('custombutton')
    ).toBeInTheDocument()
  })

  it('should run the function specified at onClick prop after a click', () => {
    render(<CustomButton onClick={mockClick} />)

    const btn = screen.getByTestId('custombutton')
    fireEvent.click( btn )

    expect(
        mockClick
    ).toHaveBeenCalledTimes(1)
  })
})