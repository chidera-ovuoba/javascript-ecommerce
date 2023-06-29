import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../lib/context';
const Search = () => {
  const { search,searchTerm } = useGlobalContext();
  return (
    <div className='mr-8 relative lg:hidden'>
          <input type="text" className='outline-none rounded-3xl w-60 h-9 pl-5 ring-2 ring-orange-900 focus:ring-orange-600 focus:border-transparent' value={searchTerm} onChange={(e)=>search(e.target.value)} />
          <Link to='/products' className='p-3  rounded-full text-xl bg-orange-600 absolute -top-1 -right-1 text-orange-900'>
         <BiSearch />
          </Link>
    </div>
  )
}

export default Search