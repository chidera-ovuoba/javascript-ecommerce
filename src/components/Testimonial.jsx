import React, { useRef } from 'react';
import Armin  from '../assests/testimonial/𝑨𝒓𝒎𝒊𝒏_𝑨𝒓𝒍𝒆𝒓𝒕-removebg-preview.png';
import Jean  from '../assests/testimonial/jean_kirstein___at_niccolos_restaurant__part_1__set_-removebg-preview.png';
import Annie  from '../assests/testimonial/Annie_Leonhart___1_-removebg-preview.png';
import Connie  from '../assests/testimonial/connie-removebg-preview.png';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const testimonialData = [
  {
    name: 'Armin Arlet',
    img: Armin,
    desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime eos earum dolore necessitatibus ad inventore fugit magnam enim atque iure!"
  },
  {
    name: 'Jean Kirstein',
    img: Jean,
    desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime eos earum dolore necessitatibus ad inventore fugit magnam enim atque iure!"
  },
  {
    name: 'Annie Leonhart',
    img: Annie,
    desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime eos earum dolore necessitatibus ad inventore fugit magnam enim atque iure!"
  },
  {
    name: 'Connie Springer',
    img: Connie,
    desc:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime eos earum dolore necessitatibus ad inventore fugit magnam enim atque iure!"
  },

]


const Testimonial = () => {
  const testimonialsGroupRef = useRef(null);
  const testimonialRef = useRef(null);
  const moveLeft = () => {
    // document.querySelector('a').clientWidth
   testimonialsGroupRef.current.scrollLeft -= testimonialRef.current.clientWidth
  }
  const moveRight = () => {
    testimonialsGroupRef.current.scrollLeft += testimonialRef.current.clientWidth
     
   }


  return (
    <div className='testimonial_section_wrapper w-[90vw] relative py-10 my-10 text-center'>
      <div className='absolute top-[50%] md:top-[60%] p-4 md_1:p-3 md_1:text-lg cursor-pointer rounded-full text-orange-900 text-xl bg-orange-500 z-10 left-[15vw] lg_1:left-[0%]' onClick={moveLeft}><BsArrowLeft/>
    </div>
    <div className='absolute top-[50%] md:top-[60%] p-4 md_1:p-3 md_1:text-lg cursor-pointer rounded-full text-orange-900 text-xl bg-orange-500 z-10 right-[15vw] lg_1:right-[0%]' onClick={moveRight}><BsArrowRight/>
      </div>
      <h1 className='text-3xl sm:text-2xl capitalize text-orange-900 font-bold'>Customer Testimonials</h1>
      <div className='scroll-container gap-4' ref={testimonialsGroupRef}>
        {
          testimonialData.map(({ img, name, desc }) => (
            <div key={name} className='grid place-items-center py-8' ref={testimonialRef}>
              <div className='w-[15rem] h-[15rem] bg-yellow-300 flex justify-center rounded-full overflow-hidden'>
              <img src={img} alt={name} className='w-[auto] h-[auto] object-contain'/>
              </div>
              <div className="text-center text-orange-900">
                <h2 className='text-xl  capitalize  font-semibold my-2'>{name}</h2>
                <p className="text-md font-medium max-w-[50ch]">{desc}</p>
              </div>
            </div>
          ))
        }
      </div>
      </div>
  )
}

export default Testimonial