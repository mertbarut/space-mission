import React from 'react'

const StatTable = ({ item }) => {
  return (
    <div data-testid="stattable"
      className="overflow-x-auto sm:-mx-2 lg:-mx-4"
    >
      <div
        className="py-2 inline-block min-w-full sm:px-6 lg:px-8"
      >
        <div
          className="overflow-hidden"
        >
          <table
            className="min-w-full"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-1 text-center"
                >
                  Build Date
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-1 text-center"
                >
                  Missions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="px-6 pb-4 whitespace-nowrap text-sm font-light text-gray-900 text-center"
                >
                  {item.year_built}
                </td>
                <td
                  className="px-6 pb-4 whitespace-nowrap text-sm font-light text-gray-900 text-center"
                >
                  {item.missions.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StatTable