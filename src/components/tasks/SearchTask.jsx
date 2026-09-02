import React from 'react'

const SearchTask = ({onSearchChange, searchTerm}) => {
  return (
    <>
        <input type="text" name='searchTerm' placeholder='Search Tasks...' className='px-2 border border-slate-600 rounded-lg' value={searchTerm}  onChange={onSearchChange}/>
    </>
  )
}

export default SearchTask