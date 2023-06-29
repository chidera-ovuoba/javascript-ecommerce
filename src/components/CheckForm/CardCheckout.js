import React from 'react'
import { Button } from '@material-ui/core';
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
const CardCheckout = ({ backStep, checkoutToken,handleSubmit }) => {
  //   const stripe = useStripe();
  // const elements = useElements();
  return (
    <div>
     <form onSubmit ={(e)=> handleSubmit(e)}>
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant='outlined' onClick={backStep}>Back</Button>
                  <Button variant="contained" type='submit' color='primary'>
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
      </div>
  )
}

export default CardCheckout