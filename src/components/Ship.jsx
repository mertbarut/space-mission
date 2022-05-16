import React from 'react'

export default function Ship({ ship, onClose }) {
  return (
    <div>
    <h2>{ship.name}</h2>
    <div>
        {ship.year_built} - {ship.type} - {ship.model ? ship.model : 'N/A' } - {ship.successful_landings ? ship.model : 'N/A'}
    </div>
    <button onClick={onClose}>back</button>
    </div>
  )
}
