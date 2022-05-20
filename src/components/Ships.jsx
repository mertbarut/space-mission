import { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Ship from './Ship'
import Card from './Card'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 10

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? 'lightyellow' : 'snow',

  ...draggableStyle
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'steelblue' : 'silver',
  padding: grid,
  width: 350
})

const Ships = ({ result, shipToDisplay, setShipToDisplay, keyword, favoriteShips, setFavoriteShips }) => {

  if (result.loading) {
    return <div
      className='flex justify-center'
    >
      <button
        disabled type="button" style={{ backgroundColor: 'rgb(37 99 235)', color: 'rgb(255 255 255)' }}
        className="focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center">
        <svg role="status"
          className="inline w-4 h-4 mr-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...
      </button>
    </div>
  }

  if (result.error) {
    return (
      <div className="flex justify-center bg-red-100 border border-red-400 text-red-700 py-3 rounded relative sm:mx-2 lg:mx-64" role="alert">
        <strong className="font-bold px-2">Error!</strong>
        <span className="block sm:inline ">Cannot communicate with API.</span>
      </div>
    )
  }

  if (shipToDisplay && result.data) {
    return (
      <Ship
        ship={result.data.ships.filter(s => s.name === shipToDisplay)[0]}
        onClose={() => setShipToDisplay(null)}
      />
    )
  }

  const ships = result.data.ships.filter(s => (
    s.year_built >= new Date().getFullYear() - 10 && (
      s.name.toLowerCase().includes(`${keyword.toLowerCase()}`) ||
      s.type.toLowerCase().includes(`${keyword.toLowerCase()}`) ||
      s.missions.some(mission => (
        mission.name.toLowerCase().includes(`${keyword.toLowerCase()}`)
      ))
    )
  ))

  const handleChangeFavoriteShips = (event) => {
    event.preventDefault()
    const clickedShip = event.target.name

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
      super(props)
      this.state = {
        items: ships
      }
      this.onDragEnd = this.onDragEnd.bind(this)
    }
    onDragEnd(result) {
      if (!result.destination) {
        return
      }
      const items = reorder(
        this.state.items,
        result.source.index,
        result.destination.index
      )
      this.setState({
        items
      })
    }

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
                          <Card
                            item={item}
                            favoriteShips={favoriteShips}
                            setShipToDisplay={setShipToDisplay}
                            handleChangeFavoriteShips={handleChangeFavoriteShips}
                          />
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
      )
    }
  }

  return (
    <div
      id="results"
    >
      {
        ships.length !== 0
          ?
          <ShipList />
          :
          <div
            className="flex justify-center bg-red-100 border border-red-400 text-red-700 py-3 rounded relative sm:mx-2 lg:mx-64"
            role="alert"
          >
            <strong className="font-bold px-2">No Match.</strong>
            <span className="block sm:inline ">Please try another query.</span>
          </div>
      }
    </div>
  )
}

export default Ships