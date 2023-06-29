import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Product = ({image,name,price,id}) => {
  return (
      <div className='w-[15rem] grid bg-orange-500'>
          <div className='w-full relative bg-yellow-200 grid place-items-center py-2'>
          <p className='bg-yellow-500 px-3 py-1 text-sm text-semibold rounded-[2rem] text-yellow-800 grid place-items-center absolute top-2 right-2'>23%</p>
          <img src={image} alt="" className='w-full h-[13rem] img' />
          </div>
          <div className='px-3 text-sm text-orange-900 font-medium capitalize py-4'>
          <Link to={`/singleproduct/${id}`}>{name}</Link>
          <div className='flex gap-1 items-center text-[14px] text-yellow-300'><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar/><BsStar/><span className='text-orange-900' >12 reviews</span></div>
          <div className="detail_bottom">
              <span>
              <samp className='text-md font-semibold text-orange-800'>$56</samp>
              <s className=' ml-3 text-xs font-medium text-orange-950 opacity-80'>$50.00</s>
              </span>
              <p className='font-bold text-orange-900 text-lg cursor-pointer'><FaCartPlus /></p>
            </div>
          </div>
      
      </div>
  )
}

export default Product