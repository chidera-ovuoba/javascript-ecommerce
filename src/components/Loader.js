import React from 'react'

const Loader = ({w,h,color}) => {
  return (
    <div className={`container_loader xs:w-[1rem] xs:h-[1rem] w-[2rem] h-[2rem]`}>
        <div className="spinner">
            <div className={`spinner-sector spinner-sector-${color}`}></div>
        </div>
    </div>
  )
}

export default Loader