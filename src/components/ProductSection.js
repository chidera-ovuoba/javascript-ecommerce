import React, { useRef } from 'react'
import { useGlobalContext } from '../lib/context';
// import { BsStar } from "react-icons/bs";
import { FaCartPlus } from 'react-icons/fa'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { ImArrowRight } from 'react-icons/im';
import { BsFire } from 'react-icons/bs';

const ProductSection = () => {
  const { ProductsData } = useGlobalContext();
   const productSectionRef = useRef(null);
  const moveLeft = () => {
   productSectionRef.current.scrollLeft -= 170
  }
  const moveRight = () => {
    productSectionRef.current.scrollLeft += 170
     
   }
  // console.log(ProductsData)
  return (
    <div className='productSection_wrapper'>
      <header className='product_section_carousel_header'>
        <h1 className='text-lg text-orange-900 font-bold capitalize flex items-baseline gap-1 sm:text-sm'>Top Hottest Products<span className='text-red-500 text-2xl sm:text-lg xs:hidden'><BsFire/></span></h1>
        <p>
        <span onClick={moveLeft}><MdNavigateBefore/></span>
        <span onClick={moveRight}><MdNavigateNext/></span>
        </p>

      </header>
      <section ref={productSectionRef}>
        {ProductsData.slice(0, 5).map(({ fields: { image, name, price }, id }) => {
          return <div className="product bg-yellow-300" key={id}>
            <picture>
              <p className='bg-yellow-200 px-3 py-1 text-sm text-semibold rounded-[2rem] text-yellow-800 grid place-items-center absolute top-2 right-2'>23%</p>
              <img src={image[0].url} alt={name} />
            </picture>
            <div className='flex flex-col p-3 h-[30%] justify-between'>
            <div className="detail">
            <p className='text-[15px] font-bold text-orange-800 capitalize cursor-pointer'>
                <b>{name}</b><br />
              </p>
            </div>
            <div className="detail_bottom">
              <span>
              <samp className='text-md font-semibold text-orange-800'>$45.00</samp>
              <s className=' ml-3 text-xs font-medium text-orange-950 opacity-80'>$50.00</s>
              </span>
              <p className='font-bold text-orange-900 text-lg cursor-pointer'><FaCartPlus /></p>
            </div>
            </div>
            </div>
        })}
        <div className='mx-20 text-lg font-medium text-center text-orange-950 flex justify-center items-center gap-2 bg-orange-600 rounded-lg p-3'>
        <a href="#" className='whitespace-nowrap'>SEE ALL</a>
        <span className='text-xl'><ImArrowRight /></span>
        </div>
      </section>
    </div>
  )
}

export default ProductSection