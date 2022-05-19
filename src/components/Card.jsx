import React from 'react'
import StatTable from './StatTable'

const Card = ({ item, favoriteShips, setShipToDisplay, handleChangeFavoriteShips }) => {
  return (
    <div
      className="flex-none justify-center"
    >
      <div
        className="rounded-lg bg-white max-w-sm"
      >
        <a>
          <img
            className="rounded-t-lg h-48 max-h-48 min-w-full"
            src={item.image}
            alt="img-ship"
          />
        </a>
        <div
          className="p-6 min-w-lg"
        >
          <h6
            style={item.active ? { color: 'white', backgroundColor: 'rgb(34 197 94)' } : { color: 'white', backgroundColor: 'rgb(168 85 247)' }}
            className="text-xs py-1 px-1 mx-16 leading-none text-center whitespace-nowrap align-baseline font-bold rounded-full"
          >
            {item.active ? 'Active' : 'Retired'}
          </h6>
          <h5
            className="text-gray-900 text-lg text-center font-medium mb-1"
          >
            {item.name}
          </h5>
          <div className="flex flex-col">
            <StatTable
              item={item}
            />
            <button
              id={`display-button-${item.id}`}
              style={{ backgroundColor: 'rgb(52 211 153)', color: 'rgb(255 255 255)' }} type="button"
              onClick={() => setShipToDisplay(item.name)}
              className="inline-block px-6 py-2.5 mb-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:shadow-lg"
            >
              Show Details
            </button>
            <button
              data-testid={`fav-button-${item.id}`}
              name={item.name}
              style={ favoriteShips.includes(item.name) ? { backgroundColor: 'rgb(251 113 133)', color: 'rgb(255 255 255)' } : { backgroundColor: 'rgb(129 140 248)', color: 'rgb(255 255 255)' }}
              type="button"
              onClick={handleChangeFavoriteShips}
              className="inline-block px-6 py-2.5 mb-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:shadow-lg"
            >
              {favoriteShips.includes(item.name) ? 'Remove From Favorites': 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card