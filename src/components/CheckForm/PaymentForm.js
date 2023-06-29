import React from 'react'
import { Typography, Divider, Box } from '@material-ui/core';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import CardCheckout from './CardCheckout';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY );
const PaymentForm = ({ checkoutToken, onCaptureCheckout, backStep, nextStep, timeout, addressData }) => {
    

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(elements, stripe);
    // if (elements || stripe) return
    // const cardElement = elements.getElement(CardElement)
    // // console.log(cardElement)
    // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    // console.log(error, paymentMethod);
    // if (error) {
    //   console.log(error)
    // } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: { firstname: addressData.firstName, lastname: addressData.lastName, email: addressData.email },
        shipping: {
          name: 'Primary',
          street: addressData.address,
          town_city: addressData.city,
          county_state: addressData.shippingSubdivision,
          postal_zip_code: addressData.zip,
          country:addressData.shippingCountry
        },
       fulfillment: { shipping_method: addressData.shippingOption },
          billing: {
           name: 'Primary',
          street: addressData.address,
          town_city: addressData.city,
          county_state: addressData.shippingSubdivision,
          postal_zip_code: addressData.zip,
          country:addressData.shippingCountry
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242424242424242',
            expiry_month: '02',
            expiry_year: '24',
            cvc: '123',
            postal_zip_code: addressData.zip,
          },
        },
        pay_what_you_want:(parseFloat(checkoutToken.pay_what_you_want.minimum.formatted) + 250).toString()
    }
    // console.log((parseFloat(checkoutToken.pay_what_you_want.minimum.formatted) + 110).toString()))
      onCaptureCheckout(checkoutToken.id, orderData);
      // timeout();
      nextStep();
    // }

   }


  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
      <Box>
        <CardCheckout backStep={backStep} checkoutToken={checkoutToken} handleSubmit={handleSubmit} />
      </Box>
    </>
  )
}

export default PaymentForm