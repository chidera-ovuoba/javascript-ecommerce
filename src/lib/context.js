import React,{useContext,useState,useEffect,useReducer, useCallback, useMemo} from "react";
import reducer from './reducer';
import Stripe from "stripe";
import {  updateProfile } from "firebase/auth";


// const stripe = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY) 
const appContext = React.createContext();
const url = 'https://course-api.com/javascript-store-products';
const initialState = {
    ProductsData: [],
    sliderIndex: 0,
    cart:[],
    total: 0,
    id: 0,
    sliderButtonClicked: false,
    searchTerm: '',
    loginNumber: 0,
    // userInfo: [localStorage.getItem(`login1`)],
    // passwordError: false,
}
 const AppProvider = React.memo(({ children })=> {
    const [state, dispatch] = useReducer(reducer, initialState);
        const [loading, setLoading] = useState(true);
        const [passwordError,setPasswordError] = useState(false);
     const [accountError, setAccountError] = useState(false);
     
   
         
    // const [sliderIndex, setSliderIndex] = useState(0);
    const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(url);
    //         let data = await response.json();
    //         data = data.map((item) => {
    //            return {...item,amount:1} 
    //         })
    //         console.log(data);
    //         dispatch({ type: 'DISPLAY_DATA', payload: data });
            
    //         setLoading(false)

    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false);
    //   }
  }
    
    useEffect(() => {
        // fetchData();  
        
    }, []);

    useEffect(() => {
        // // const imageBanner = document.querySelector('.hero_image_banner');
        // if (!loading) {
        //     var interval = setInterval(() => dispatch({ type: 'ANIMATION_SLIDER', payload: { checkNumber, number: 1 } }), 5000);
        // }
        //     return () => {
        //         clearInterval(interval)
        //     }
    },[]);
    
    // useEffect(() => {
    // //   dispatch({type:'GET_TOTAL'})
    // console.log(accountError)    
    //     setTimeout(() => {
    //         if (passwordError) {
    //             setPasswordError(false)
    //         }
    //         if (accountError) {
    //             setAccountError(false)
    //         }
    //     }, 6000)
    // },[passwordError,accountError])
    
    
     const submitInfo =async (data,navigate)=>{
        // const { name, email, password, confirm } = data;
        // const stripe = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY)
        // if (name && email && password && confirm) {
        //     if (password !== confirm) {
        //         // state.passwordError = true;
        //         // console.log(state.passwordError);
        //         setPasswordError(true)
        //         console.log(passwordError)
        //           return
        //     //    return dispatch({ type: "ERROR_SNACKBAR", payload: state.passwordError });
        //     }
        // const customer = await stripe.customers.create({
        //     name,
        //     email,
        //     metadata:{password,confirm}
        // });

            // // if () {
            // JSON.parse(localStorage.getItem('clientData')).map((client) => {
                 
            //  })
            // // }
            // const stripe = require('stripe')('sk_test_51LRDHKLSpBcyIvn4hJddLZouOmNNP7Tbl5rvi6LZ2QU1C3Mp5oJrD7igJdlFq9rcFKKXWjCtuM5JhwBGBM43UufX00d0ZMeRzi');
            // const customerQuery = await stripe.customers.search({
            //     query: `name:${name} AND metadata['password']:${password} AND email:${email}`,
            // });
            // if (customerQuery && false) {
            //     const customer = await stripe.customers.create({
            //         name: name,
            //         email: email,
            //         metadata:{password,confirm}
            //     });
            // }
        //     console.log()
        //     const customerQuery = await stripe.customers.search({
        //      query: `email:'${email}'`,
        //      limit:1
        //     });
        //    console.log(customerQuery)
        // if (customerQuery.data[0]?.email === email) {
        //     setAccountError(true)
        //     console.log('already exists')
        // } else {
        //     const customer = await stripe.customers.create({
        //         name,
        //         email,
        //         metadata:{password,confirm}
        //     });
        //     // console.log(customer)
        //     localStorage.setItem('username',customer.name);
        //     navigate('/');
        //     navigate(0)
        // }   
        // }
        
    }

    function checkNumberSlider(number, number2, type) {
        // if (type === 'increment') {
        // if (number < 0) {
        //     return  7- 1;
        // }
        // if (number >= 6) {
        //     return 0
        // }
        //   return number += number2  
        // }
        // if (type === 'decrement') {
        //     if (number < 1) {
        //         return state.ProductsData.length - 1;
        //     }
        //  if (number >= 6) {
        //     return 7 - 2
        // }
        //   return number -= number2  
        // }
        
    }

 const checkNumber=(number,number2) => {
        //  if (number < 0) {
        //    return 7 - 1;
           
        // }
        // if (number >= 6) {
        //     return 0;
        // }
        // return number += number2 ;
    }
    function addToCart(id) {
        // dispatch({ type: 'ADD_CART', payload: id });
    }
    function changeAmount(id, value,type) {
        // console.log(id, value);
        // dispatch({ type: 'CHANGE_AMOUNT', payload: { id, value,type } });
    }

    function removeItem(id) {
        // dispatch({ type: "REMOVE_ITEM", payload: id });
    }
    
    function moveRight() {
    //   dispatch({ type: 'SLIDER_RIGHT', payload: { checkNumberSlider, number: 1 ,type:'increment'} })
    }
     function moveLeft() {
    //   dispatch({ type: 'SLIDER_LEFT', payload: { checkNumberSlider, number: 1 ,type:'decrement'} })
    }
     function sliderInput(index) {
        //  dispatch({ type: 'SLIDER_INPUT', payload: index });
  }
    
 function search(text) {
    //  dispatch({ type: 'SEARCHING', payload: text });    
}
   
//    const contextValues =useMemo(() => ({}), [loading,addToCart,changeAmount,removeItem,moveRight,moveLeft,sliderInput,search,submitInfo,uploadImage,checkNumber,passwordError,accountError])
    return <appContext.Provider value={{loading,addToCart,changeAmount,removeItem,moveRight,moveLeft,sliderInput,search,submitInfo,checkNumber,passwordError,accountError}}>
    {children}
    </appContext.Provider>
})
export default AppProvider;

export const useGlobalContext = () => {
    return useContext(appContext);
}