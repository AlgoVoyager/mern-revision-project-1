
const SearchTask = ({onSearchChange, searchTerm}) => <input type="text" name='searchTerm' placeholder='Search Tasks...' className='px-2 border border-slate-600 rounded-lg' value={searchTerm}  onChange={onSearchChange}/>

export default SearchTask