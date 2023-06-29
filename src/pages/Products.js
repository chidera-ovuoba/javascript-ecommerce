import React from 'react'
import Product from '../components/Product';
import { useGlobalContext } from '../lib/context';
const Products = ({products}) => {
  // const {searchTerm } = useGlobalContext();
  return (
    <div  className='grid place-items-center w-[95vw]'>
    <div className='flex gap-[1rem] mb-10 pt-44 flex-wrap items-center justify-center'>
      {products.map((item) => {
        return <Product {...item} key={item.id} />
      })}
     
      </div>
      </div>
  )
}
//  filter((item)=> searchTerm ? item.fields.name.includes(searchTerm):item)
export default Products