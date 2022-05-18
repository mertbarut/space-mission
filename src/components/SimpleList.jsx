const SimpleUnorderedList = ({ list }) => {
  return (
    <div className="flex justify-center pb-5">
      <ul className="bg-white rounded-lg border border-gray-200 w-64 text-gray-900">
        {list.map(item => (
          <li className={`px-6 py-2 ${list.indexOf(item) === list.length - 1 ? '' : 'border-b'} border-gray-200 w-full text-sm`} key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SimpleUnorderedList
