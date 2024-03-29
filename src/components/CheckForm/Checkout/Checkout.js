import React,{useState,useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button,CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import { Link} from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';


const steps = ['Shipping Address', 'Payment Details']


const Checkout = ({cart,order,onCaptureCheckout,error,setOrder}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [addressFormData, setAddressFormData] = useState({});
    const [checkoutToken, setCheckoutToken] = useState(null);
   
    useEffect(() => {
        const generateTokens = async () => {
         try {
              const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
               console.log(token)
             setCheckoutToken(token);
            } catch (error) {
          console.log(error)
       }
        } 
        generateTokens();
},[cart])

    const nextStep = () => setActiveStep(prev => prev + 1);
    const backStep = () => setActiveStep(prev => prev - 1);

    const next = (data) => {
        setAddressFormData(data);
        console.log(data);
        nextStep();
    }
    const timeout = () => {
        // setTimeout(() => {
        //     setIsFinished(true)
        // },3000)
    }

    
let Confirmation = ()=> order.customer ? (
    <>
        <div>
            <Typography variant='h6'>Thank you for your purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider} />
            <Typography variant='subtitle2'>Order Ref : {order.customer_reference}</Typography>
        </div>
        <br />
        <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
    </>
) :  (
        <div className={classes.spinner}>
        <CircularProgress/>
        </div>
)

    if (error) {
        <>
            <Typography variant='h5'> Error: {error}</Typography>
            <br />
              <Button variant='outlined' component={Link} to='/' type='button'>Back to Home</Button>
        </>
    }
    
    
    

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm addressData={addressFormData} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout} backStep={backStep} nextStep={nextStep} timeout={timeout} />
    if (!checkoutToken) {
        return <div className={classes.spinner}>
        <CircularProgress/>
        </div>
    }
    return (
      
        <>
            <CssBaseline/>
          <div className={classes.toolbar} />
          <main className={classes.layout}>
              <Paper className={classes.paper}>
                  <Typography variant='h4' align='center'>Checkout</Typography>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                      {
                          steps.map((step) => (
                              <Step key={step}>
                               <StepLabel>{step}</StepLabel>
                                  </Step>
                          ))
                  }
                  </Stepper>
                  {activeStep === steps.length ? <Confirmation/>: checkoutToken && <Form/>}
              </Paper>
          </main>
      </>
  )
}

export default Checkout