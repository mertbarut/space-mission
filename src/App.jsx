import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Ship from './components/Ship'
import Filter from './components/Filter'

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

const Ships = ({ result, shipToDisplay, setShipToDisplay, keyword, setKeyword}) => {

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (shipToDisplay && result.data) {
    //console.log(shipToDisplay)
    //console.log(result.data.ships.filter(s => s.name === shipToDisplay)[0])
    return (
      <Ship
        ship={result.data.ships.filter(s => s.name === shipToDisplay)[0]}
        onClose={() => setShipToDisplay(null)}
      />
    )
  }

  const today = new Date().getFullYear()
  const limit = today - 10
  //console.log(limit)

  const ships = result.data.ships
  //console.log(ships)

  return (
    <div>
    <h2>Ships</h2>
    {ships
      .filter(s => (
        s.year_built >= limit && (
          s.name.toLowerCase().includes(`${keyword.toLowerCase()}`) || 
          s.type.toLowerCase().includes(`${keyword.toLowerCase()}`) ||
          s.missions.some(mission => (
            mission.flight.toLowerCase().includes(`${keyword.toLowerCase()}`)
          )) ||
          s.missions.some(mission => (
            mission.name.toLowerCase().includes(`${keyword.toLowerCase()}`)
          ))
        )
      )
      )
      .map((s) => (
      <div key={s.id}>
        {s.name} {s.year_built} {s.missions.length}
        <p>{s.active ? 'Active' : 'Dormant'}</p>
        <div>
        <img src={s.image} alt={s.id} style=
        {{
          height: "60px",
          width: "80px"
        }}
          />
        </div>
        <button onClick={() => setShipToDisplay(s.name)}>
          show info
        </button>
      </div>
    ))}
    </div>
  )
}

const App = () => {
  const [keyword, setkeyword] = useState('')
  const [shipToDisplay, setShipToDisplay] = useState(null)
  const result = useQuery(ALL_SHIPS)

  return (
    <div>
      {
        shipToDisplay === null &&
        <Filter
          keyword={keyword}
          setter={setkeyword}
        />
      }
      <Ships
        result={result}
        shipToDisplay={shipToDisplay}
        setShipToDisplay={setShipToDisplay}
        keyword={keyword}
        setkeyword={setkeyword}
      />
    </div>
  )
}

export default App