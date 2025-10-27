import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from '../Todo'

describe('<Todo />', () => {
  const todo = { text: 'Write unit tests', done: false }
  const mockDelete = vi.fn()
  const mockComplete = vi.fn()

  beforeEach(() => {
    render(
      <Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />
    )
  })

  it('renders todo text', () => {
    expect(screen.getByText('Write unit tests')).toBeInTheDocument()
  })

  it('calls delete handler when delete button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledTimes(1)
  })

  it('calls complete handler when set as done button is clicked', () => {
    fireEvent.click(screen.getByText('Set as done'))
    expect(mockComplete).toHaveBeenCalledTimes(1)
  })
})