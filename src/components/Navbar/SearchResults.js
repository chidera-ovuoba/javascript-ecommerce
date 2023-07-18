import React from 'react'
import StarRating from '../StarRating'
import logo from '../../assests/logo (1).png'

const SearchResults = () => {

  return (
    <section className='fixed transform -translate-x-1/2 -translate-y-1/2 top-[60%] left-1/2 z-20 grid place-items-center'>
    <div className="bg-amber-400 rounded-lg p-5 w-[65%] h-[20rem] flex flex-col justify-between hidden">
    <h3 className="text-lg font-bold pb-4 border-b-2 border-b-yellow-800 mb-4 capitalize">popular categories</h3>
    <div className="grid grid-cols-2 lg_1:grid-cols-1 place-items-center overflow-scroll h-[85%] gap-3">
    {
      [...Array(6)].map((item,i)=>(
            <div className="flex items-center gap-2 p-2 bg-[#ebb01bd0] rounded-md w-full h-full" key={i}>
            <div className="w-[40px] bg-orange-400 rounded-sm h-[40px] p-[2px 1px]">
            <img src={logo} alt="img_name" className='img w-full h-full' />
            </div>
            <div className="flex flex-col justify-between text-yellow-800">
            <span className="capitalize text-md font-bold">HeadPhone</span>
            <small className="text-xs capitalize" style={{wordSpacing:'3px'}}>240 items available</small>
            </div>
            </div>
    ))
  }
    </div>
    </div>
    
    <div className="bg-amber-400 rounded-lg px-5 py-[6px] w-[65%] md_1:w-[75%] h-[auto] flex flex-col justify-center [&_>_*:not(:last-child)]:border-b-[1px] [&_>_*:not(:last-child)]:border-b-yellow-800 hidden">
    {
      [...Array(5)].map((item,i)=>(
        <article className="flex items-center justify-between h-full py-[12px]" key={i}>
        <div className="flex items-center justify-center">
        <div className="w-[40px] bg-orange-400 rounded-sm h-[40px] p-[2px 1px] xs:w-[35px] xs:h-[35px]">
            <img src={logo} alt="img_name" className='img w-full h-full' />
            </div>
        <h4 className="capitalize text-md font-bold ml-5 xs:ml-3 xs:text-[13px]">wireless plug</h4>
        <span className="flex items-center justify-center ml-[6vw] gap-2 font-bold text-xs lg_1:hidden">
        <StarRating size={13} star_R={4} />
        (121)
        </span>    
        </div>
        <span className="ml-auto font-bold text-md xs:text-[13px]">$120</span>
        </article>
    ))
  }
    </div>
    </section>
  )
}

export default SearchResults;