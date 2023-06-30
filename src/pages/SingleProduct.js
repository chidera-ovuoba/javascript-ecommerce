import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BsStar } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineWarning } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// import { useGlobalContext } from '../lib/context';
import Stripe from 'stripe';
import { FaCartPlus, FaUserAlt } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import { auth, db, handleSubmitReview } from '../lib/firebase';
import { collectionGroup, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import Loader from '../components/Loader';
const SingleProduct = () => {
    // const { ProductsData, addToCart, changeAmount } = useGlobalContext();
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [userCommentExists, setUserCommentExists] = useState(false);
    

    // const [reviewsData, setReviewsData] = useState([]);
    const reviewRef = useRef(null);
    const { name, price_1, images, description, metadata } = productData;
    console.log(metadata);

    // const nameInitialsArr = localStorage.getItem('username')?.split(' ');
    // const userImg = localStorage.getItem('userImg');

    const timeFormat = (reviewTimestamp) => {
        const secondsMilli = 1000
        const minuteMilli = secondsMilli * 60;
        const hourMilli = minuteMilli * 60;
        const dayMilli = hourMilli * 24;
        const weekMilli = dayMilli * 7;
        const monthMilli = weekMilli * 4;
        const yearMilli = dayMilli * 365;

        // Divide Time with a year
        const d = new Date();
        let currentMilliTime = d.getTime()

        const savedMilliTime = new Date(reviewTimestamp*secondsMilli).getTime();
        let seconds = Math.round((currentMilliTime - savedMilliTime) / secondsMilli)
        let minute = Math.round((currentMilliTime - savedMilliTime) / minuteMilli)
        let hour = Math.round((currentMilliTime - savedMilliTime) / hourMilli)
        let day = Math.round((currentMilliTime - savedMilliTime) / dayMilli)
        let week = Math.round((currentMilliTime - savedMilliTime) / weekMilli)
        let month = Math.round((currentMilliTime - savedMilliTime) / monthMilli)
        let years = Math.round((currentMilliTime - savedMilliTime) / yearMilli)

        if(seconds > 0 && seconds < 60){
         return`${seconds} second${seconds === 1 ? '':'s'}`
        }
        if(minute > 0 && minute < 60){
         return`${minute} minute${minute === 1 ? '':'s'}`
        }
        if(hour > 0 && day <  24){
         return`${hour} hour${hour === 1 ? '':'s'}`
        }
        if(day > 0 && day <  7){
         return`${day} day${day === 1 ? '':'s'}`
        }
        if(week> 0 && day <  4){
         return`${week} week${week === 1 ? '':'s'}`
        }
        if(month > 0 && month <  12){
         return`${month} month${month === 1 ? '':'s'}`
        }
        if(years > 0 ){
         return`${years} year${years === 1 ? '':'s'}`
        }

    }


    
    const retrieveProduct = useCallback(async () => {
        const stripe = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY)
        const product = await stripe.products.retrieve(
            id
            );
            console.log(product)
        const price = await stripe.prices.retrieve(
            product.default_price
        );
        setProductData({ ...product, price_1: price.unit_amount_decimal })

    }, [id])
    
    
    useEffect(() => {
        retrieveProduct()
        const qSnap = query(collectionGroup(db, 'comments'), where('commentID', '==', id));
        async function fetchData() {
            const querySnapshot = await getDocs(qSnap);
            // console.log(qSnap);
            // console.log(querySnapshot);
        // const qSnap = query(collection(db, "cities"), where("state", "==", "CA"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
    const docRef = doc(db, `users/${auth.currentUser.uid}/comments`,id);
    const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const { rating, text } = docSnap.data();
            reviewRef.current.value = text;
            setRating(rating);
            setUserCommentExists(true);
        console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
            console.log("No such document! ");
            setUserCommentExists(false);
        }
    }
    
        
    const unsubscribe = onSnapshot(qSnap, (querySnapshot) => {
        const commentsData = [];
        querySnapshot.forEach((doc) => {
        commentsData.push(doc.data());
        });
        setComments(commentsData)
        
   });
        fetchData();
        return () => {
            unsubscribe()
        }
    }, [id, retrieveProduct])
    
    const averageReview = useMemo(() => Math.round(comments?.reduce((total,comment)=>{
        return total + comment.rating
    }, 0) / comments.length), [comments])

    console.log(averageReview)
    
    const price = `${price_1?.slice(0, price_1?.length - 2)}.${price_1?.slice(price_1?.length - 2, price_1?.length)}`;
    return (
        <div className='w-[90vw] mx-auto py-10 pt-[7rem]'>
            <Link className='p-3 rounded-lg bg-white shadow-3xl mb-5' to='/'>Go Back</Link>
            <div className="grid gap-10 justify-between grid-cols-4 xl_1:grid-cols-3 my-10 lg_12:grid-cols-1">
                <div className='max-w-[32rem] h-[32rem] sm:h-[22rem] col-span-2 bg-yellow-200 p-5 rounded-xl lg_12:col-span-1 lg_12:justify-self-center'>
                    <img src={images?.[0]} alt={name} className='w-full h-full img' />
                </div>


            <div className='xl_1:col-start-1 xl_1:row-start-2 xl_1:col-span-3 xl_1:max-w-[80%] xl_1:justify-self-center lg_12:col-span-1 lg_12:row-start-3'>
            <h2 className='p-5 border-b-2 border-yellow-800 border-solid'>{name}</h2>
            <div className='p-4 border-b-2 border-yellow-800 border-solid gap-1 flex items-center justify-center'><StarRating size={12} star_R={averageReview || 0} /> <span className='ml-4'>{comments.length} reviews</span></div>
                    <div className='p-4 border-b-2 border-yellow-800 border-solid font-semibold'>
                        <span className='mr-5'>Price:</span>{`$${price}`}
                    </div>
                    <p className="mt-4">Description: {description}</p>
                </div>

                <div className="shadow-3xl min-w-[220px] lg_12:justify-self-center">
                    <div className="flex p-5 justify-between border-b-2 border-yellow-800 border-solid">
                        <span>Price:</span>
                        <p className="font-bold">${price}</p>
                    </div>
                    <div className="flex p-5 justify-between border-b-2 border-yellow-800 border-solid">
                        <span>Status</span>
                        <p className="font-bold">in Stock</p>
                    </div>
                    <div className="flex p-5 justify-between border-b-2 border-yellow-800 border-solid">
                        <span>Qty:</span>
                        <input type="number" className='border-black border-b-2 w-2/4 outline-none focus:border-blue-500' onChange={(e) =>console.log('changeAmount')} />
                    </div>
                    <div className="p-5">
                        <Link className="flex px-10 py-2 gap-3 items-center justify-center text-lg uppercase text-orange-800 shadow-xl rounded-md bg-orange-400 font-bold cursor-pointer" to='/carts' onClick={() =>console.log('addToCart')}>
                            <FaCartPlus /> add to cart
                        </Link>
                    </div>
                </div>
            </div>
            <h3 className='text-2xl uppercase font-bold mb-6'>Reviews</h3>
            
            {
                comments ? 
                comments.map(({imgUrl,timestamp,text,name,rating}) => {
                  const nameInitialsArr = name?.split(' ')

                    
                return(<div className='pb-8  grid gap-2' key={timestamp.seconds}>
                <div className='flex justify-between items-center gap-2 flex-wrap'>
                <div className='w-[45px] h-[45px] bg-orange-500 grid place-items-center rounded-full mr-2'>
                <div className={imgUrl != 'null' && imgUrl  ? 'hidden':'text-xl font-bold uppercase'} id='image_profileName'>{nameInitialsArr.length > 1 ? nameInitialsArr?.[0]?.charAt(0).concat(nameInitialsArr?.[1]?.charAt(0)) : nameInitialsArr?.[0]?.slice(0, 2)}{!nameInitialsArr?.[0] && <FaUserAlt />}
                    </div>
                <img src={imgUrl} alt='userImg' className={imgUrl != 'null' && imgUrl  ? 'w-full h-full rounded-full img userImage': 'hidden'} />
                </div>
                <div className='grid mr-auto gap-1'>
                <span className='bold'>{name}</span>
                <span className='flex gap-1'><StarRating size={20} star_R={rating} /></span>
                </div> 
                <span className='font-bold self-end min-w-[110px]'>{timeFormat(timestamp.seconds)} ago</span>
                </div>
                <p>{text}</p>
                </div>
            )}
            ) 
            : <Loader h='h-[5rem] xs:h-[3.5rem]' w='w-[5rem] xs:w-[3.5rem] mx-auto' color='red' />
        }
            <h3 className='text-2xl uppercase font-bold mb-6'>WRITE A CUSTOMER REVIEW</h3>
            <div className='bg-amber-400 text-white font-semibold p-5 rounded-md items-center flex gap-3'><AiOutlineWarning size={23}/>Please sign in to write a review</div>
            <form onSubmit={(e)=>handleSubmitReview(e,id,rating,reviewRef.current.value)} className='flex  flex-col justify-center items-center gap-6 min-w-[500px] md:min-w-full text-md text-yellow-950 flex-wrap'>
                <textarea style={{ width: '90vw', height: '15rem' }} className='bg-yellow-200 p-3 resize-none' placeholder="what's your pick on the product?" ref={reviewRef} />
                <div className="flex items-center justify-center gap-2">Rate :  <StarRating rating={rating} setRating={setRating} /></div>
                <button type='submit' className='mx-auto px-6 py-3 bg-orange-500 font-semibold text-md capitalize'>{userCommentExists ? 'Edit':'submit'} review</button>
            </form>

        </div>
    )
}

export default SingleProduct