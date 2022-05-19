import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import SimpleList from './SimpleList'

describe('favorites list works correctly', () => {
  beforeEach(() => {
    const favorites = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    render(<SimpleList list={favorites}/>)
  }),
  test('all given items are in the list', () => {
    const ul = screen.getByTestId('favorites')
    expect(ul).toHaveTextContent('123456789')
  })
})