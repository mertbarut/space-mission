import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Ships from './components/Ships'
import Favorites from './components/Favorites'

const ALL_SHIPS = gql`
query {
  ships {
    year_built
    name
    type
    missions {
      flight
      name
    }
    image
    id
    active
    model
    successful_landings
  }
}
`

const App = () => {
  const [keyword, setkeyword] = useState('')
  const [shipToDisplay, setShipToDisplay] = useState(null)
  const [favoriteShips, setFavoriteShips] = useState(['Your favorites will show up here'])
  const result = useQuery(ALL_SHIPS)

  return (
    <div>
      <NavBar />
      {
        shipToDisplay === null &&
        <div>
          <Favorites
            favoriteShips={favoriteShips}
          />
          <SearchBar
            keyword={keyword}
            setter={setkeyword}
          />
        </div>
      }
      <Ships
        result={result}
        shipToDisplay={shipToDisplay}
        setShipToDisplay={setShipToDisplay}
        keyword={keyword}
        setkeyword={setkeyword}
        favoriteShips={favoriteShips}
        setFavoriteShips={setFavoriteShips}
      />
    </div>
  )
}

export default App