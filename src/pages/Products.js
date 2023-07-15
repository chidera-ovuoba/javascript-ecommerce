import React from 'react'
import Product from '../components/Product';
import { useGlobalContext } from '../lib/context';
import logo from '../assests/logo (1).png';
const Products = ({products}) => {
  // const {searchTerm } nb= useGlobalContext();
  return (
    <div  className='w-[95vw] mx-auto'>
    <div className="bg-yellow-400 w-full pt-14 pb-8 px-10">
    <div className="flex justify-center gap-[3rem] flex-wrap">
    <div className="flex flex-col gap-8 justify-center md:items-center flex-[1.5] min-w-[15rem] overflow-hidden">
    <h2 className="text-2xl text-yellow-800 font-extrabold align-top tracking-wide capitalize animate-fadeIn md:text-center">get up to 50% off on kia headphones</h2>
    <button className="bg-yellow-200 cursor-pointer hover:text-white hover:bg-yellow-500 rounded-lg py-2 px-10 w-[max-content] text-yellow-700 text-md font-bold capitalize">buy now</button>
    </div>
    <div className="w-[10rem] h-[11rem] min-w-[11rem] rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex justify-start overflow-hidden p-5">
    <img src={logo} alt="headphone" className="img w-full h-full  animate-fadeIn_bounce" />
    </div>
    </div>
    <div className="flex gap-2 items-center justify-center mt-8">
    <span className="w-4 h-4 rounded-full bg-amber-500 animate-stretch"></span>
    <span className="w-4 h-4 rounded-full bg-amber-500"></span>
    <span className="w-4 h-4 rounded-full bg-amber-500"></span>
    <span className="w-4 h-4 rounded-full bg-amber-500"></span>
    </div>
    </div>
    <div className="flex items-center gap-3 mt-8">
     <div className="text-center px-8 py-2 rounded-3xl bg-yellow-400 ">price</div>
     <div className="text-center px-8 py-2 rounded-3xl bg-yellow-400 ">price</div>
     <div className="text-center px-8 py-2 rounded-3xl bg-yellow-400 ">price</div>
    </div>
    <div className='flex gap-[1rem] mb-10 pt-10 flex-wrap items-center justify-center'>
      {products.map((item) => {
        return <Product {...item} key={item.id} />
      })}
     
      </div>
      </div>
  )
}
//  filter((item)=> searchTerm ? item.fields.name.includes(searchTerm):item)
export default Products