import { useState, Component } from 'react'
import { gql, useQuery } from '@apollo/client'
import Ship from './components/Ship'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SimpleUnorderedList from './components/SimpleList'

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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightyellow" : "snow",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "steelblue" : "silver",
  padding: grid,
  width: 350
});

const Ships = ({ result, shipToDisplay, setShipToDisplay, keyword, setKeyword, favoriteShips, setFavoriteShips}) => {

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

  const ships = result.data.ships.filter(s => (
    s.year_built >= limit && (
      s.name.toLowerCase().includes(`${keyword.toLowerCase()}`) || 
      s.type.toLowerCase().includes(`${keyword.toLowerCase()}`) ||
      s.missions.some(mission => (
        mission.name.toLowerCase().includes(`${keyword.toLowerCase()}`)
        ))
      )
    )
  )

  const handleChangeFavoriteShips = (event) => {
    event.preventDefault()

    const clickedShip = event.target.name

    //console.log(clickedShip)
    if (favoriteShips.includes(clickedShip)) {
      if (favoriteShips.length !== 1) {
        setFavoriteShips(favoriteShips.filter(ship => ship !== clickedShip && ship !== 'Your favorites will show up here'))
      } else {
        setFavoriteShips(['Your favorites will show up here'])
      }
    } else {
      setFavoriteShips(favoriteShips => [...favoriteShips, clickedShip].filter(ship => ship !== 'Your favorites will show up here'))
    }
  }
  

  class ShipList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: ships
      };
      this.onDragEnd = this.onDragEnd.bind(this);
    }
  
    onDragEnd(result) {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
  
      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      );
  
      this.setState({
        items
      });
    }
  
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
      return (
        <div className="flex justify-center">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="flex-none justify-center">
                          <div className="rounded-lg bg-white max-w-sm">
                            <a href="#!">
                              <img className="rounded-t-lg h-48 max-h-48 min-w-full" src={item.image} alt="img-ship"/>
                            </a>
                              <div className="p-6 min-w-lg">
                                <h6 style={item.active ? {color: 'white', backgroundColor: 'rgb(34 197 94)'} : {color: 'white', backgroundColor: 'rgb(168 85 247)'}} className="text-xs py-1 px-1 mx-16 leading-none text-center whitespace-nowrap align-baseline font-bold rounded-full">{item.active ? 'Active' : 'Retired'}</h6>
                                <h5 className="text-gray-900 text-lg text-center font-medium mb-1">{item.name}</h5>
                                <div className="card-container flex flex-col">
                                  <div className="overflow-x-auto sm:-mx-2 lg:-mx-4">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                      <div className="overflow-hidden">
                                        <table className="min-w-full">
                                          <thead>
                                            <tr>
                                              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-1 text-center">
                                                Build Date
                                              </th>
                                              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-1 text-center">
                                                Missions
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td className="px-6 pb-4 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                                {item.year_built}
                                              </td>
                                              <td className="px-6 pb-4 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                                {item.missions.length}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <button style={{ backgroundColor: 'rgb(52 211 153)', color: 'rgb(255 255 255)' }} type="button" onClick={() => setShipToDisplay(item.name)} className="button-info inline-block px-6 py-2.5 mb-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:shadow-lg">Show Details</button>
                                  <button name={item.name} style={ favoriteShips.includes(item.name) ? { backgroundColor: 'rgb(251 113 133)', color: 'rgb(255 255 255)' } : { backgroundColor: 'rgb(129 140 248)', color: 'rgb(255 255 255)' }} type="button" onClick={handleChangeFavoriteShips} className="button-favo inline-block px-6 py-2.5 mb-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:shadow-lg">{favoriteShips.includes(item.name) ? 'Remove From Favorites': 'Add to Favorites'}</button>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
      );
    }
  }


  //console.log(ships)



  return (
    <div>
      <ShipList />
    </div>
  )
}

const App = () => {
  const [keyword, setkeyword] = useState('')
  const [shipToDisplay, setShipToDisplay] = useState(null)
  const [favoriteShips, setFavoriteShips] = useState(['Your favorites will show up here'])
  const result = useQuery(ALL_SHIPS)

  //console.log(result)
  return (
    <div>
      <NavBar />
      <h3 className="text-center font-medium text-xl my-2 text-blue-600">Favorites</h3>
      <SimpleUnorderedList list={favoriteShips}/>
      {
        shipToDisplay === null &&
        <SearchBar 
        keyword={keyword}
        setter={setkeyword}/>
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