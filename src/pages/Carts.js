import React from 'react'
import { MdDelete } from 'react-icons/md';
// import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../lib/context';
const Carts = () => {
  const { cart, changeAmount, total, amount, removeItem,id } = useGlobalContext();
  // const { id } = useParams()
  
  return (
    <>
      <div className="pt-40 ml-20">
        <Link className='p-3 rounded-lg bg-white shadow-3xl mb-5' to={`/singleproduct/${id}`}>Go Back</Link>
      
        <div className='flex gap-36 py-10 pt-[10rem]'>
      
           <div>
          <h3 className='text-2xl uppercase font-bold mb-6'>SHOPPING CART</h3>
           <div className='mt-12 w-[50rem]'>
          {cart.map((item,i) => {
            const  {name,price,image,} = item.fields
         return  <div className='flex gap-11 items-center' key ={i}>
              <div className='w-28 h-28 flex items-center'>
             <img src={image[0].url} alt="" className='object-cover rounded-md' />
              </div>
              
           <p className='w-[150px]'>{name}</p>
           <p>${price}</p>
           <input type="number" value={item.amount} className='w-[100px] p-3 border-b-2 border-gray-400 outline-none'
             onChange={(e) => changeAmount(item.id,parseFloat(e.target.value),'cart')}
           />
              <button className='p-3 rounded-lg bg-white shadow-3xl' onClick= {()=>removeItem(item.id)}><MdDelete/></button>
          </div>})}
            </div>
            </div>
            <div className="shadow-3xl h-5/6 w-1/4">
                  <div className="p-5  border-b-2 border-gray-300 border-solid">
                    <h3 className='text-2xl uppercase font-bold mb-6'>SUBTOTAL ({amount}) ITEMS</h3>
            <p>${!total.toString().includes('.') ? `${total}.00`:total}</p>
                </div>
                  <div className="p-5">
                      <div className="flex px-10 py-2 gap-3 items-center justify-center text-sm uppercase text-white shadow-xl rounded-md bg-sky-400">
                     proceed to checkout 
                      </div>
                </div>
               </div>
        </div>
        </div>
      </>
  )
}

export default Carts