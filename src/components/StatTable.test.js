import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import StatTable from './StatTable'

describe('stattable works correctly', () => {
  test('given attributes are in the table', () => {
    const item = {
      year_built: 2022,
      missions: [
        'mission1',
        'mission2',
        'mission3',
      ]
    }
    const { unmount } = render(<StatTable item={item}/>)
    const div = screen.getByTestId('stattable')
    expect(div).toHaveTextContent('Build DateMissions20223')
    unmount()
  }),
  test('items with no missions are displayed correctly', () => {
    const item_nomissions = {
      year_built: 2022,
      missions: []
    }
    const { unmount } = render(<StatTable item={item_nomissions}/>)
    const div = screen.getByTestId('stattable')
    expect(div).toHaveTextContent('Build DateMissions20220')
    unmount()
  })
})