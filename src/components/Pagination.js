import React, { useState } from 'react'
import { BsArrowDownLeft, BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Pagination = ({ totalPages, postsPerPage, currentPage, setCurrentPage }) => {
    const [leftPage, setLeftPage] = useState(1);
    const [rightPage, setRightPage] = useState(3);

   let middlePage = Math.floor((leftPage+rightPage)/ 2)
    const leftArrow = () => {
        if (leftPage <= 1 || totalPages < 2 ) return;
        setLeftPage((prev)=> prev - 1)
        setCurrentPage((prev)=> prev - 1)
        setRightPage((prev)=> prev - 1)
    } 
    const rightArrow = () => {
        if (rightPage >= Math.floor( totalPages / postsPerPage) || totalPages < 2) return;
        setLeftPage((prev)=> prev + 1)
        setCurrentPage((prev)=> prev + 1)
        setRightPage((prev)=> prev + 1)
    } 
    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

  return (
    <div className='w-full items-center justify-center flex gap-3'>
    <span className='border-2 border-yellow-800 rounded-full text-yellow-800 p-3 grid place-items-center cursor-pointer' onClick={leftArrow}><BsArrowLeft/></span>
            <li className={`p-4 rounded-full grid place-items-center font-semibold cursor-pointer ${totalPages >= 1 ? '':'hidden'} ${currentPage ===leftPage ? 'bg-orange-500 text-white':'bg-yellow-200 text-yellow-700'}`} onClick={()=>handlePageClick(leftPage)}>
            {leftPage}
            </li>
            <li className={`p-4 rounded-full grid place-items-center font-semibold cursor-pointer ${totalPages >= 2 ? '':'hidden'} ${currentPage ===middlePage ? 'bg-orange-500 text-white':'bg-yellow-200 text-yellow-700'}`} onClick={()=>handlePageClick(middlePage)}>
            {middlePage}
            </li>
            <li className={`p-4 rounded-full grid place-items-center font-semibold cursor-pointer ${totalPages >= 3 ? '':'hidden'} ${currentPage ===rightPage ? 'bg-orange-500 text-white':'bg-yellow-200 text-yellow-700'}`} onClick={()=>handlePageClick(rightPage)}>
            {rightPage}
            </li>
    <span className='border-2 border-yellow-800 rounded-full text-yellow-800 p-3 grid place-items-center cursor-pointer' onClick={rightArrow}><BsArrowRight/></span>
    </div>
  )
}

export default Pagination