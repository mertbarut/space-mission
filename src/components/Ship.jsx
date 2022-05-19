import React from 'react'

export default function Ship({ ship, onClose }) {
  return (
    <div
      className="lg:flex lg:flex-nowrap max-w-sm lg:max-w-3xl rounded overflow-hidden shadow-lg my-4 sm:mx-4 lg:mx-16"
    >
      <img
        src={ship.image} alt="ship-img"
        className="w-full lg:w-96 lg:m-8"
      />
      <div
        className="px-6 py-4 "
      >
        <div
          className="font-bold text-xl text-center mb-2"
        >
          {ship.name}
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full px-1">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <tbody>
                    <tr className="bg-white border-y transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="sm:px-2 lg:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:text-left lg:text-center">
                        Build Year
                      </td>
                      <td className="text-sm text-gray-900 font-light sm:px-2 lg:px-8 py-4 whitespace-nowrap sm:text-right lg:text-center">
                        {ship.year_built}
                      </td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="sm:px-2 lg:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:text-left lg:text-center">
                        Type
                      </td>
                      <td className="text-sm text-gray-900 font-light sm:px-2 lg:px-8 py-4 whitespace-nowrap sm:text-right lg:text-center">
                        {ship.type}
                      </td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="sm:px-2 lg:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:text-left lg:text-center">
                        Model
                      </td>
                      <td className="text-sm text-gray-900 font-light sm:px-2 lg:px-8 py-4 whitespace-nowrap sm:text-right lg:text-center">
                        {ship.model ? ship.model : 'N/A' }
                      </td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="sm:px-2 lg:px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sm:text-left lg:text-center">
                        Landings
                      </td>
                      <td className="text-sm text-gray-900 font-light sm:px-2 lg:px-8 py-4 whitespace-nowrap sm:text-right lg:text-center">
                        {ship.successful_landings ? ship.model : 'N/A'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button
            id={`back-button-${ship.id}`}
            style={{ backgroundColor: 'royalblue', color: 'rgb(255 255 255)' }} type="button"
            className="inline-block px-6 py-2.5 mb-2 font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:shadow-lg"
            onClick={onClose}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
