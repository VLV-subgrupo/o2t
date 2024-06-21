import { render, fireEvent } from '@testing-library/react';
import InputNum from '../(trackerPage)/components/inputNum'

describe('InputNum', () => {
  // Testes de Particionamento em Classes de Equivalência
  it('should render the component', () => {
    const { getByPlaceholderText } = render(<InputNum />);
    expect(getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('should handle key down events', () => {
    const { getByPlaceholderText } = render(<InputNum />);
    const input = getByPlaceholderText('0');
    fireEvent.keyDown(input, { key: '1', code: 'Digit1' });
    expect((input as HTMLInputElement).value).toBe('1');
  });

  // Testes de Análise de Valor Limite
  it('should handle key down events limit 0', () => {
    const { getByPlaceholderText } = render(<InputNum />);
    const input = getByPlaceholderText('0');
    fireEvent.keyDown(input, { key: '0', code: 'Digit0' });
    expect((input as HTMLInputElement).value).toBe('0');
  });

  it('should handle key down events limit 9', () => {
    const { getByPlaceholderText } = render(<InputNum />);
    const input = getByPlaceholderText('0');
    fireEvent.keyDown(input, { key: '9', code: 'Digit9' });
    expect((input as HTMLInputElement).value).toBe('9');
  });

  it('should not allow non-numeric input', () => {
    const { getByPlaceholderText } = render(<InputNum />);
    const input = getByPlaceholderText('0');
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('should handle backspace key', () => {
    const { getByPlaceholderText } = render(<InputNum />);
    const input = getByPlaceholderText('0');
    fireEvent.keyDown(input, { key: '1', code: 'Digit1' });
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });
    expect((input as HTMLInputElement).value).toBe('');
  });
});