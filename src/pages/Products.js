import React from 'react'
import Product from '../components/Product';
import { useGlobalContext } from '../lib/context';
const Products = ({products}) => {
  // const {searchTerm } = useGlobalContext();
  return (
    <div  className='w-[95vw] mx-auto'>
    <div className="bg-yellow-400 w-full pt-14 pb-8 px-10">
    <div className="flex justify-between items-center gap-8 flex-wrap">
    <div className="flex flex-col gap-8 justify-center items-center min-w-min">
    <h2 className="text-2xl text-yellow-800 font-extrabold align-top tracking-wide capitalize">get up to 50% off on kia headphones</h2>
    <button className="bg-yellow-100 rounded-lg py-2 px-10 text-yellow-600 text-md font-bold capitalize self-start">buy now</button>
    </div>
    <div className="w-[10rem] h-[11rem] min-w-[11rem] rounded-full bg-gradient-to-r from-yellow-300 to-amber-400">
    
    </div>
    </div>
    <div className="flex gap-2 items-center justify-center mt-8">
    <span className="w-4 h-4 rounded-full bg-amber-500 animate-stretch"></span>
    <span className="w-4 h-4 rounded-full bg-amber-500"></span>
    <span className="w-4 h-4 rounded-full bg-amber-500"></span>
    <span className="w-4 h-4 rounded-full bg-amber-500"></span>
    </div>
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