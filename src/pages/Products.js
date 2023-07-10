import React from 'react'
import Product from '../components/Product';
import { useGlobalContext } from '../lib/context';
const Products = ({products}) => {
  // const {searchTerm } = useGlobalContext();
  return (
    <div  className='grid place-items-center w-[95vw] mx-auto'>
    <div className="bg-[url('assests/headphones.jpg')] bg-cover w-full h-[25rem] pt-20">
    
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