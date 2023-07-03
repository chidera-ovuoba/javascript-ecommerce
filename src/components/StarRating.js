import React, { useState } from 'react'
import { BsStarFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa'

const StarRating = React.memo(({size,star_R,rating,setRating,color}) => {
    const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <div className='flex gap-2  items-center justify-center'>
    {[...Array(5)].map((star,i) => {
        const ratingValue = i + 1
      return <label key={i}>
       <input type="radio" name="starRating" id="star" className='hidden' value={ratingValue} onClick={()=>setRating(ratingValue)|| null} />
          {color ? <BsStarFill
          size={size || 30} className={`cursor-pointer ${ratingValue <= (star_R || hoveredValue || rating) ? 'text-yellow-300' : 'text-orange-800'}`}
          style={{transition:'color 200ms'}}
          onMouseEnter={()=>setHoveredValue(ratingValue)}
          onMouseLeave={()=>setHoveredValue(null)}
          />
          :
          <FaStar size={size || 30} className={`cursor-pointer ${ratingValue <= (star_R || hoveredValue || rating) ? 'text-orange-500' : 'text-yellow-800'}`}
         style={{transition:'color 200ms'}}
          onMouseEnter={()=>setHoveredValue(ratingValue)}
          onMouseLeave={()=>setHoveredValue(null)}
        /> 
      }
       </label>
    })}
    </div>
  )
})

export default StarRating