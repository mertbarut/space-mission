import React from 'react'
import SimpleList from './SimpleList'

const Favorites = ({ favoriteShips }) => {
  return (
    <div>
      <h3
        className="text-center font-medium text-xl my-2 text-blue-600"
      >
        Favorites
      </h3>
      <SimpleList
        list={favoriteShips}
      />
    </div>
  )
}

export default Favorites