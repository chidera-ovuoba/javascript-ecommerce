import React, { useEffect, useState } from 'react'
import { BsArrowDownLeft, BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Pagination = ({ totalPages, postsPerPage, currentPage, setCurrentPage }) => {
  let averagePage = Math.ceil(totalPages / postsPerPage);

  const pagesArr = []
  for (let i = 1; i <= averagePage && i <= 3; i++){
    pagesArr.push(i)
    }
  if (currentPage >= pagesArr[2] && currentPage <= averagePage) {
    pagesArr.forEach((item,i,arr) => {
      arr[i]= item + 1
    })
  }
  if (currentPage < pagesArr[0]) {
    pagesArr.forEach((item,i,arr) => {
      arr[i]= item - 1
    });
  }

    const leftArrow = (e) => {
      if (currentPage <= 1) return;
      setCurrentPage((prev) => prev - 1)
      e.target.scrollIntoView({ block: "center", inline: "nearest" });
    } 
    const rightArrow = (e) => {
      if (currentPage >= averagePage ) return;
      setCurrentPage((prev) => prev + 1)
      e.target.scrollIntoView({ block: "center", inline: "nearest" });
    } 
    const handlePageClick = (e,page) => {
      setCurrentPage(page);
      e.target.scrollIntoView({ block: "center", inline: "nearest" });
    }

  return (
    <ul className='w-full items-center justify-center flex gap-3'>
    <span className='border-2 border-yellow-800 rounded-full text-yellow-800 p-3 grid place-items-center cursor-pointer' onClick={(e)=>leftArrow(e)}><BsArrowLeft/></span>
    {
        pagesArr?.map((item) => (
          <li className={`p-4 rounded-full grid place-items-center font-semibold cursor-pointer ${currentPage ===item ? 'bg-orange-500 text-white':'bg-yellow-200 text-yellow-700'}`} onClick={(e)=>handlePageClick(e,item)} key={item}>
          {item}
          </li>
          ))
      
    }
    <span className='border-2 border-yellow-800 rounded-full text-yellow-800 p-3 grid place-items-center cursor-pointer' onClick={(e)=>rightArrow(e)}><BsArrowRight/></span>
    </ul>
  )
}

export default Pagination