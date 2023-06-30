import React from 'react'

const SuccessSnackbar = ({ successText }) => {
  return (
    <article className={`fixed w-[12rem] text-center h-auto bg-white left-[50%] border-b-4 px-3 py-1 text-sm font-medium border-b-green-500 -translate-x-1/2 top-[4rem] slide_up_down`}>{successText}</article>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  )
}

export default SuccessSnackbar