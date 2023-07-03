import { collectionGroup, onSnapshot, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import StarRating from './StarRating';
import Stripe from 'stripe';
const Product = ({ image, name, id }) => {
  const [comments, setComments] = useState(null);
  const [price, setPrice] = useState(null);

  const retrieveProduct = useCallback(async () => {
        const stripe = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY)
        const product = await stripe.products.retrieve(
            id
            );
        const price = await stripe.prices.retrieve(
            product.default_price
    );
    setPrice(price?.unit_amount_decimal)

    }, [id])

  useEffect(() => {
    retrieveProduct()
    const qSnap = query(collectionGroup(db, 'comments'), where('commentID', '==', id));
    const unsubscribe = onSnapshot(qSnap, (querySnapshot) => {
        const commentsData = [];
        querySnapshot.forEach((doc) => {
        commentsData.push(doc.data());
        });
        setComments(commentsData)
        
   });
        return () => {
          unsubscribe()
        }
    }, [id,retrieveProduct])

  const averageReview = useMemo(() => Math.round(comments?.reduce((total,comment)=>{
        return total + comment.rating
    }, 0) / comments?.length), [comments])
   
    const price_1 = price && `$${price?.slice(0, price?.length - 2)}.${price?.slice(price?.length - 2, price?.length)}`;
    
    function percentagePrice() {
      return (price_1 - 50)*100/50
    }
  return (
      <div className='w-[15rem] grid bg-orange-500'>
          <div className='w-full relative bg-yellow-200 grid place-items-center py-2'>
        {price && <p className='bg-yellow-500 px-3 py-1 text-sm text-semibold rounded-[2rem] text-yellow-800 grid place-items-center absolute top-2 right-2'>{percentagePrice()}%</p>}
          <img src={image} alt="" className='w-full h-[13rem] img' />
          </div>
          <div className='px-3 text-sm text-orange-900 font-medium capitalize py-4'>
          <Link to={`/singleproduct/${id}`}>{name}</Link>
          <div className='flex gap-1 items-center text-[14px] text-yellow-300'><StarRating size={12} star_R={averageReview || 0} color='yellow' /><span className='text-orange-900' >{comments?.length} reviews</span></div>
          <div className="detail_bottom">
              <span>
              <samp className='text-md font-semibold text-orange-800'>{price_1}</samp>
              <s className=' ml-3 text-xs font-medium text-orange-950 opacity-80'>$50.00</s>
              </span>
              <p className='font-bold text-orange-900 text-lg cursor-pointer'><FaCartPlus /></p>
            </div>
          </div>
      
      </div>
  )
}

export default Product