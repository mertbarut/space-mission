import { useState, Component } from 'react'
import { gql, useQuery } from '@apollo/client'
import Ship from './components/Ship'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  button: {
    "background-color": "#4CAF50"
  },

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "steelblue" : "silver",
  padding: grid,
  width: 350
});

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
    .filter(s => (
      s.year_built >= limit && (
        s.name.toLowerCase().includes(`${keyword.toLowerCase()}`) || 
        s.type.toLowerCase().includes(`${keyword.toLowerCase()}`) ||
        s.missions.some(mission => (
          mission.name.toLowerCase().includes(`${keyword.toLowerCase()}`)
          ))
        )
      )
    )

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
        <div class="flex justify-center">
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
                        <div class="flex-none justify-center">
                          <div class="rounded-lg bg-white max-w-sm">
                            <a href="#!">
                              <img class="rounded-t-lg h-48 max-h-48 min-w-full" src={item.image} alt="img-ship"/>
                            </a>
                              <div class="p-6 min-w-lg">
                                <h6 class="text-xs py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">{item.active ? 'Active' : 'Retired'}</h6>
                                <h5 class="text-gray-900 text-lg text-center font-medium mb-1">{item.name}</h5>
                                <div class="flex flex-col">
                                  <div class="overflow-x-auto sm:-mx-2 lg:-mx-4">
                                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                      <div class="overflow-hidden">
                                        <table class="min-w-full">
                                          <thead>
                                            <tr>
                                              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-1 text-center">
                                                Built in
                                              </th>
                                              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-1 text-center">
                                                Missions
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td class="px-6 pb-4 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                                {item.year_built}
                                              </td>
                                              <td class="px-6 pb-4 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                                {item.missions.length}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <button type="button" onClick={() => setShipToDisplay(item.name)} class="inline-block px-6 py-2.5 mb-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Show Info</button>
                                  <button type="button" onClick={() => setShipToDisplay(item.name)} class="inline-block px-6 py-2.5 mb-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Add to Favorites</button>
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
  const result = useQuery(ALL_SHIPS)

  return (
    <div>
      <NavBar />
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
      />
    </div>
  )
}

export default App