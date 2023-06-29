import React, { useRef } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const ProductsPanel = ({ productsPanelData }) => {
  const productsPanelRef = useRef(null);
  const moveLeft = () => {
   productsPanelRef.current.scrollLeft -= 170
  }
  const moveRight = () => {
    productsPanelRef.current.scrollLeft += 170
     
   }

  return (
    <div className='relative pb-20 grid place-items-center'>
    <div className='absolute bottom-[5%] p-4 md_1:p-3 md_1:text-lg cursor-pointer rounded-full text-orange-900 text-xl bg-orange-500 z-10 left-[20vw] lg_1:left-[20%]' onClick={moveLeft}><BsArrowLeft/>
    </div>
    <div className='absolute bottom-[5%] p-4 md_1:p-3 md_1:text-lg cursor-pointer rounded-full text-orange-900 text-xl bg-orange-500 z-10 right-[20vw] lg_1:right-[20%]' onClick={moveRight}><BsArrowRight/>
      </div>
    <div className='grid grid-flow-col auto-cols-1fr place-items-center w-[70vw] overflow-x-scroll gap-[1rem] py-8 products_panel max-w-[990px]' ref={productsPanelRef}>
      {
        productsPanelData.map(({image,text}) => (
          <div key={text} className='text-center grid place-items-center w-full h-[170px]'>
            <div className='grid place-items-center bg-orange-400 w-full h-[150px] overflow-hidden rounded-lg'>
            <img src={image} alt={text}  className='w-[90%] h-[90%] img' />
            </div>
            <p className='text-lg capitalize text-orange-900 font-medium pt-2'>{text}</p>
          </div>
        ))
    }
    </div>
    </div>
  )
}

export default ProductsPanel