import React, { useEffect, useRef, useState } from 'react'
import Product from '../components/Product';
import { useGlobalContext } from '../lib/context';
import logo from '../assests/logo (1).png';
import { FaSearch } from 'react-icons/fa';
import Pagination from '../components/Pagination';


const Products = ({products,productsPanelData}) => {
  // const {searchTerm } nb= useGlobalContext();
    const [currentPage, setCurrentPage] = useState(1); 
    const postsPerPage = 10;
    const indexofLastPage = currentPage * postsPerPage;
    const indexofFirstPage = indexofLastPage - postsPerPage;
    const currentPosts = products?.slice(indexofFirstPage, indexofLastPage);
    const totalPages = products?.length;
    let index = 0;
  const [currentProductDisplay, setCurrentProductDisplay] = useState({});
  
  useEffect(() => {
    
    let interval;
    let timeout_1;
    function intervalFunction() {
      clearTimeout(timeout_1);
        if (index >= productsPanelData?.length) {
          index = 0;
        }
        setCurrentProductDisplay(productsPanelData?.[index])
        index++;
       timeout_1= setTimeout(() => {
          setCurrentProductDisplay(null)
        },8000)    
    }
      interval = setInterval(() => {
        intervalFunction()
      }, 9000)
    
    let timeout;
    function changeSlide(id) {
      clearTimeout(timeout)
      clearInterval(interval);
      setCurrentProductDisplay(null)
      timeout = setTimeout(() => {
        index = id;
        intervalFunction()
        interval = setInterval(() =>intervalFunction(),9000)
      }, 1000)
    }
    document.querySelectorAll('.slider_button').forEach((slider) => {
      slider.addEventListener('click', () => {
        changeSlide(slider.id)
             
      })
    });
    document.getElementById('swipe_able').addEventListener("touchstart", startTouch);
    document.getElementById('swipe_able').addEventListener("touchend", moveTouch);
 
// Swipe Up / Down / Left / Right
let initialX = null;
let initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  // let currentX = e.touches[0].clientX;
  // let currentY = e.touches[0].clientY;
  // console.log('X : '+initialX +' - ' +currentX)
  // console.log('Y : '+initialY +' - ' +currentY)
 
  // let diffX = initialX - currentX;
  // let diffY = initialY - currentY;
  // console.log(diffX)
 
  // if (Math.abs(diffX) > Math.abs(diffY)) {
  //   // sliding horizontally
  //   if (diffX > 25) {
  //     // swiped left
  //     console.log("swiped left");
  //   }
  //   if (diffX < -25) {
  //     // swiped right
  //     console.log("swiped right");
  //   }  
  // } else {
  //   // sliding vertically
  //   if (diffY > 0) {
  //     // swiped up
  //     console.log("swiped up");
  //   } else {
  //     // swiped down
  //     console.log("swiped down");
  //   }  
  // }
 
  // initialX = null;
  // initialY = null;
   
  // e.preventDefault();
};
    
    return () => {
      clearInterval(interval)
      document.querySelectorAll('.slider_button').forEach((slider) => {
        slider.removeEventListener('click',()=>changeSlide(slider.id))
      })
    };
  }, [productsPanelData])
  
  return (
    <div className='w-[95vw] mx-auto pt-[8rem]'>
      <div className="flex items-center justify-center w-full mb-8">
      <input type="text" placeholder='Search...' className="bg-transparent border-b-4 border-b-yellow-800 [&::placeholder]:text-yellow-800 [&::placeholder]:font-bold p-3 h-[3rem] focus:w-3/4 focus:border-b-orange-500 text-yellow-800 text-xl font-semibold outline-none w-[40%]"
      style={{transition:'all 0.5s ease'}}
      />
      <span className='text-xl text-yellow-800'>
      <FaSearch/>
      </span>
      </div>
    <div className="w-full px-10 xs:px-4 pb-8 bg-yellow-400 pt-14" id='swipe_able'>
    <div className="flex justify-center gap-[3rem] flex-wrap">
    <div className="flex flex-col gap-8 justify-between md:items-center flex-[1.5] min-w-[15rem] overflow-hidden">
    <h2 className={`text-2xl font-extrabold tracking-wide text-yellow-800 capitalize align-top ${currentProductDisplay?.name ?'animate-fadeIn':'transform translate-x-[-100%]'}  md:text-center mt-4`}>get up to 50% off on {currentProductDisplay?.name}</h2>
   <button className="bg-yellow-200 cursor-pointer hover:text-white hover:bg-yellow-500 rounded-lg py-2 px-10 w-[max-content] text-yellow-700 text-md font-bold capitalize">buy now</button>
    </div>
    <div className="w-[10rem] h-[11rem] min-w-[11rem] rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex justify-start overflow-hidden p-5">
      {
      productsPanelData?.map(({image},i) => (
      <img src={image} alt="headphone" key={i} className={`w-full h-full img ${currentProductDisplay?.image === image ? 'animate-fadeIn_bounce' :'hidden'} images_banner`} />
      ))
      }
    </div>
    </div>
    <div className="flex items-center justify-center gap-2 mt-8">
    {
      productsPanelData?.map(({id},i) => (
        <span className={`slider_button w-4 h-4 rounded-full ${id ===currentProductDisplay?.id ?'bg-orange-500':'bg-amber-500'} md_1:w-3 md_1:h-3`} key={id} id={i}></span>
      ))
    }
    </div>
    </div>
    <div className="flex items-center hidden gap-3 mt-8">
     <div className="px-8 py-2 text-center bg-yellow-400 rounded-3xl ">price</div>
     <div className="px-8 py-2 text-center bg-yellow-400 rounded-3xl ">price</div>
     <div className="px-8 py-2 text-center bg-yellow-400 rounded-3xl ">price</div>
    </div>
    <div className='flex gap-[1rem] mb-10 pt-10 flex-wrap items-center justify-center'>
      {currentPosts?.map((item) => {
        return <Product {...item} key={item.id} />
      })}
     
      </div>
      {products && <Pagination currentPage={currentPage} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>}
      </div>
  )
}
//  filter((item)=> searchTerm ? item.fields.name.includes(searchTerm):item)
export default Products