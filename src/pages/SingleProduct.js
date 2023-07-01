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
import { Timestamp, collectionGroup, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import Loader from '../components/Loader';
import ErrorSnackbar from '../components/ErrorSnackbar';
import SuccessSnackbar from '../components/SuccessSnackbar';
const SingleProduct = () => {
    // const { ProductsData, addToCart, changeAmount } = useGlobalContext();
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState(null);
    const [userCommentExists, setUserCommentExists] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({error:false,message:""});

    console.log(Boolean(comments))


    // const [reviewsData, setReviewsData] = useState([]);
    const reviewRef = useRef(null);
    const { name, price_1, images, description, metadata } = productData;
    console.log(metadata);

    // const nameInitialsArr = localStorage.getItem('username')?.split(' ');
    // const userImg = localStorage.getItem('userImg');
    
    const timeFormat = async(savedTimestamp,currentTimestamp) => {
        
        const secondsMilli = 1000
        const minuteMilli = secondsMilli * 60;
        const hourMilli = minuteMilli * 60;
        const dayMilli = hourMilli * 24;
        const weekMilli = dayMilli * 7;
        const monthMilli = weekMilli * 4;
        const yearMilli = dayMilli * 365;

        // Divide Time with a year
        // const d = new Date();
        const docRef = doc(db, `users/${auth.currentUser?.uid}/comments`,id);
        await updateDoc(docRef, {
            currentTimestamp:serverTimestamp() 
        })
        let currentMilliTime = currentTimestamp * secondsMilli
        const savedMilliTime = savedTimestamp * secondsMilli
        // console.log(ServerValue,new Date(reviewTimestamp * secondsMilli))
        // const savedMilliTime = new Date(reviewTimestamp * secondsMilli).getTime();
        // console.log(new Date(reviewTimestamp * secondsMilli),d)
        let seconds = Math.floor((currentMilliTime - savedMilliTime) / secondsMilli)
        let minute = Math.floor((currentMilliTime - savedMilliTime) / minuteMilli)
        let hour = Math.floor((currentMilliTime - savedMilliTime) / hourMilli)
        let day = Math.floor((currentMilliTime - savedMilliTime) / dayMilli)
        let week = Math.floor((currentMilliTime - savedMilliTime) / weekMilli)
        let month = Math.floor((currentMilliTime - savedMilliTime) / monthMilli)
        let years = Math.floor((currentMilliTime - savedMilliTime) / yearMilli)
       console.log(seconds,minute,hour,day,week,month,years)

        if(seconds > 0 && seconds < 60){
         return`${seconds} second${seconds === 1 ? '':'s'}`
        }
        if(minute > 0 && minute < 60){
            return`${minute} minute${minute === 1 ? '':'s'}`
        }
        if(hour > 0 && hour <  24){
         return`${hour} hour${hour === 1 ? '':'s'}`
        }
        if(day > 0 && day <  7){
         return`${day} day${day === 1 ? '':'s'}`
        }
        if(week> 0 && week <  4){
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
    const timeout = setTimeout(() => {
      if(snackbarMessage.message){
        setSnackbarMessage({error:false,message:''})
      }   
        
    },6000) 

        return () => {
            clearTimeout(timeout)
        };
    }, [snackbarMessage])
    
    
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
    const docRef = doc(db, `users/${auth.currentUser?.uid}/comments`,id);
    const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const { rating, text } = docSnap.data();
            reviewRef.current.value ??= text;
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
    }, 0) / comments?.length), [comments])

    console.log(averageReview)
    
    const price = `${price_1?.slice(0, price_1?.length - 2)}.${price_1?.slice(price_1?.length - 2, price_1?.length)}`;
    return (
        <div className='w-[90vw] mx-auto py-10 pt-[7rem]'>
            <Link className='p-3 mb-5 bg-white rounded-lg shadow-3xl' to='/'>Go Back</Link>
            <div className="grid justify-between grid-cols-4 gap-10 my-10 xl_1:grid-cols-3 lg_12:grid-cols-1">
                <div className='max-w-[32rem] h-[32rem] sm:h-[22rem] col-span-2 bg-yellow-200 p-5 rounded-xl lg_12:col-span-1 lg_12:justify-self-center'>
                    <img src={images?.[0]} alt={name} className='w-full h-full img' />
                </div>


            <div className='xl_1:col-start-1 xl_1:row-start-2 xl_1:col-span-3 xl_1:max-w-[80%] xl_1:justify-self-center lg_12:col-span-1 lg_12:row-start-3'>
            <h2 className='p-5 border-b-2 border-yellow-800 border-solid'>{name}</h2>
            <div className='flex items-center justify-center gap-1 p-4 border-b-2 border-yellow-800 border-solid'><StarRating size={15} star_R={averageReview || 0} /> <span className='ml-4'>{comments?.length} reviews</span></div>
                    <div className='p-4 font-semibold border-b-2 border-yellow-800 border-solid'>
                        <span className='mr-5'>Price:</span>{`$${price}`}
                    </div>
                    <p className="mt-4">Description: {description}</p>
                </div>

                <div className="shadow-3xl min-w-[220px] lg_12:justify-self-center">
                    <div className="flex justify-between p-5 border-b-2 border-yellow-800 border-solid">
                        <span>Price:</span>
                        <p className="font-bold">${price}</p>
                    </div>
                    <div className="flex justify-between p-5 border-b-2 border-yellow-800 border-solid">
                        <span>Status</span>
                        <p className="font-bold">in Stock</p>
                    </div>
                    <div className="flex justify-between p-5 border-b-2 border-yellow-800 border-solid">
                        <span>Qty:</span>
                        <input type="number" className='w-2/4 border-b-2 border-black outline-none focus:border-blue-500' onChange={(e) =>console.log('changeAmount')} />
                    </div>
                    <div className="p-5">
                        <Link className="flex items-center justify-center gap-3 px-10 py-2 text-lg font-bold text-orange-800 uppercase bg-orange-400 rounded-md shadow-xl cursor-pointer" to='/carts' onClick={() =>console.log('addToCart')}>
                            <FaCartPlus /> add to cart
                        </Link>
                    </div>
                </div>
            </div>
            <h3 className='mb-6 text-2xl font-bold uppercase'>Reviews</h3>
            
            {
                comments ? 
                comments.map(({imgUrl,savedTimestamp, currentTimestamp,text,name,rating},i) => {
                  const nameInitialsArr = name?.split(' ')
                   console.log(savedTimestamp,currentTimestamp)
                    
                return(<div className='grid gap-2 pb-8'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='w-[45px] h-[45px] bg-orange-500 grid place-items-center rounded-full mr-2'>
                <div className={imgUrl != 'null' && imgUrl  ? 'hidden':'text-xl font-bold uppercase'} id='image_profileName'>{nameInitialsArr.length > 1 ? nameInitialsArr?.[0]?.charAt(0).concat(nameInitialsArr?.[1]?.charAt(0)) : nameInitialsArr?.[0]?.slice(0, 2)}{!nameInitialsArr?.[0] && <FaUserAlt />}
                    </div>
                <img src={imgUrl} alt='userImg' className={imgUrl != 'null' && imgUrl  ? 'w-full h-full rounded-full img userImage': 'hidden'} />
                </div>
                
                </div>
                <p>{text}</p>
                </div>
            )}
            )
            : <Loader h='h-[5rem] xs:h-[3.5rem]' w='w-[5rem] xs:w-[3.5rem] mx-auto' color='red' />
        }
            <h3 className='mb-6 text-2xl font-bold uppercase'>WRITE A CUSTOMER REVIEW</h3>
            <div className='flex items-center gap-3 p-5 font-semibold text-white rounded-md bg-amber-400'><AiOutlineWarning size={23}/>Please sign in to write a review</div>
            <form onSubmit={(e)=>handleSubmitReview(e,id,rating,reviewRef.current.value,setSnackbarMessage,userCommentExists)} className='flex  flex-col justify-center items-center gap-6 min-w-[500px] md:min-w-full text-md text-yellow-950 flex-wrap'>
                <textarea style={{ width: '90vw', height: '15rem' }} className='p-3 bg-yellow-200 resize-none' placeholder="what's your pick on the product?" ref={reviewRef} />
                <div className="flex items-center justify-center gap-2">Rate :  <StarRating rating={rating} setRating={setRating} /></div>
                <button type='submit' className='px-6 py-3 mx-auto font-semibold capitalize bg-orange-500 text-md'>{userCommentExists ? 'Edit':'submit'} review</button>
            </form>
            {
             snackbarMessage.error ? <ErrorSnackbar errorText={snackbarMessage.message}/>: <SuccessSnackbar successText={snackbarMessage.message}/>  
            }
        </div>
    )
}

export default SingleProduct