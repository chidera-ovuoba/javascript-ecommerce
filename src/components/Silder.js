import React, { useEffect, useRef } from 'react'
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { useGlobalContext } from '../lib/context';
import sliderData from '../assests/slider';
const Silder = ({sliderIndex }) => {
  const { sliderInput, moveRight, moveLeft } = useGlobalContext();
  // const imageHeroRef=useRef(null) 
  // useEffect(() => {
  //   // console.log()
  //   // if(imageHeroRef.current.complete){
      
  //   // }
  //   // imageHeroRef.current.classList.toggle('fadeIn_1',!imageHeroRef.current.classList.contains('fadeIn_1'));
  //   // imageHeroRef.current.classList.toggle('fadeIn',!imageHeroRef.current.classList.contains('fadeIn'));
  //   return () => {
  //   }
  // }, [sliderIndex])
  
  return (
         <>
         <div className='relative'>
         <div className='absolute top-2/4 p-4 md_1:p-3 md_1:text-lg cursor-pointer rounded-full text-orange-900 text-xl bg-orange-500 z-10 left-[5vw] lg_1:left-[3%]' onClick={moveLeft}><MdNavigateBefore/>
         </div>
      <div className='absolute top-2/4 p-4 md_1:p-3 md_1:text-lg cursor-pointer rounded-full text-orange-900 text-xl bg-orange-500 z-10 right-[5vw] lg_1:right-[3%]' onClick={moveRight}><MdOutlineNavigateNext/>
      </div>
        <div className='grid grid-cols-1 place-items-center'>
        {
          sliderData.map((item,i)=>(
       <img src={item} alt="hero_img_slider" key={i} className={`w-[60vw] h-[30rem] lg_1:w-[85vw] md_1:h-[25rem] xs:h-[20rem] col-start-1 row-start-1 object-cover rounded-3xl select-none ${sliderIndex === i ? 'block fadeIn' :'hidden'}`}/>
          ))
        }
        </div>
      <div className='absolute bottom-4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex gap-2'>
        {sliderData.map((item, i) => {
          return <div key={i} className={`w-3 h-3 sm:w-2 sm:h-2 cursor-pointer rounded-full ${sliderIndex === i ? 'bg-yellow-700' : 'bg-yellow-400'}`
        } onClick={()=>sliderInput(i)} ></div>
      })}
      </div>
      </div>
      </>
    
  )
}

export default Silder