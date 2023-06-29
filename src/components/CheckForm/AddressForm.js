import React, { useEffect,useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';
const AddressForm = ({checkoutToken,next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions,setShippingSubdivisions] = useState([])
    const [shippingSubdivision,setShippingSubdivision] = useState('')
    const [shippingOptions,setShippingOptions] = useState([])
    const [shippingOption,setShippingOption] = useState('')
    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
     
        setShippingCountries(countries);
    }

    const fetchShippingSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        
        setShippingSubdivisions(subdivisions);
    }
    const fetchShippingOptions = async (checkoutTokenId, country, region) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region }) 
        console.log(options);
          setShippingOptions(options);
   }
    useEffect(() => {
        fetchShippingSubdivisions(shippingCountry);
   },[shippingCountry])
  
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [])
    useEffect(() => {
          fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    },[shippingSubdivision])
    return (
      <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingOption,shippingSubdivision}))}>
                    <Grid container spacing={3}>
                    <FormInput required name='firstName' label='First Name'/>
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address' label='Address'/>
                        <FormInput name='email' label='Email'/>
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='ZIP / Postal code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select variant='filled' value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map((item,i) => (
                                    <MenuItem key={i} value={item[0]}>{item[1]}</MenuItem>
                                ))}
                             
                            </Select>
                        </Grid>
                         <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivision</InputLabel>
                            <Select variant='filled' disabled={shippingCountry ? false:true } value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                              {Object.entries(shippingSubdivisions).map((item,i) => (
                                    <MenuItem key={i} value={item[0]}>{item[1]}</MenuItem>
                                ))}
                            </Select>
                        </Grid>

                            <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select  variant='filled' disabled={shippingSubdivision ? false:true } value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                              {shippingOptions.map((item,i) => (
                                    <MenuItem key={i} value={item.id}>{`${item.description} - ${item.price.formatted_with_symbol}`}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                      <Button type='submit' variant='contained' color='primary'>Next</Button>
                </div>
              
                </form>
              
            </FormProvider>
  </>
            )
}

export default AddressForm