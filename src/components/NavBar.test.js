import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'

describe('navbar is rendered correctly', () => {
  beforeEach(() => {
    render(<NavBar />)
  }),
  test('app title is correct', () => {
    const div = screen.getByTestId('navbar')
    expect(div).toHaveTextContent('Spaceship Database App')
  }),
  test('logo is rendered', () => {
    const logo = screen.getByTestId('logo')
    expect(logo).toBeDefined()
  })
})