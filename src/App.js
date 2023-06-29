import React, { useState,useEffect, useCallback } from 'react'
import { Navbar } from './components';
import Home from './pages/Home';
import { Routes,Route} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
import Footer from './components/Footer';
import Products from './pages/Products';
import Carts from './pages/Carts';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SingleProduct from './pages/SingleProduct';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';




const App = () => {
  const [products, setProducts] = useState();
  const [productsPanelData, setProductsPanelData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  // const [username, setUsername] = useState(null);
  // const [userImg, setUserImg] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [nameInitialsArr, setNameInitialsArr] = useState(localStorage.getItem('username')?.split(' '));


   const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  
  console.log('App')
    // const [stripe, setStripe] = useState(stripePromise);
  
    // const location

  useEffect(() => {
    (async function () {
          
      //  const paymentIntent = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY).paymentIntents.create({
      //      amount: 1440,
      //      currency: "usd",
      //      payment_method_types: ['card'],
      //      receipt_email: 'ovuobachidera18@gmail.com',
      //      description: '3% of your purchase goes toward our ocean cleanup effort!',
             
      //     });
      //  setClientSecret(paymentIntent.client_secret)
      //  setPaymentIntentId(paymentIntent.id);
      //  console.log(paymentIntentId)

      //   const prices = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY).prices.list({
      //     active: true,
      //     limit:20,
      //     expand:['data.product']
      //  });
       
    //   const products = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY).products.list({
    //     limit: 20,
    //   });
    //   //  console.log(prices,products)
        
    //   const productsData = products.data.reduce((total, item) => {
    //     return [...total, { image: item.images[0], text: Object.keys(item.metadata).find((item) => item !== 'front'), name: item.name, price_id: item.default_price, desc: item.description, metadata: item.metadata, id: item.id }]
    //   }, [])
    //   setProductsPanelData(productsData.filter((item) => item.metadata.front === 'yes'))
    //   setProductsData(productsData)
    })()
    return () => {
      // const paymentIntent = await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY).paymentIntents.cancel(paymentIntentId)
    }

  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, user=> {
      if (user) {
        console.log(user)
        setNameInitialsArr(user?.displayName?.split(' '))
        localStorage.setItem('username',user.displayName)
        localStorage.setItem('userImg',user.photoURL)
      } else {
        setNameInitialsArr([]);
         localStorage.setItem('username','')
        localStorage.setItem('userImg','')
      }
     })
  }, [])

  
  
  const getProducts =useCallback( async () => {
    console.log(Boolean(productsData) ,Boolean(productsPanelData),productsData == [],productsPanelData == [])
    // if (productsData === [] && productsPanelData == []) {
      console.log('getProducts')
      await Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY).products.list({
        limit: 20,
      }).then((products) => {
          const productsData = products.data.reduce((total, item) => {
            return [...total, { image: item.images[0], text: Object.keys(item.metadata).find((item) => item !== 'front'), name: item.name, price_id: item.default_price, desc: item.description, metadata: item.metadata, id: item.id }]
          }, [])
          setProductsPanelData(productsData.filter((item) => item.metadata.front === 'yes'))
          setProductsData(productsData)
      }).catch((err) => {
        console.log(err)
      });;
    // }
  },
  []
  )
  useEffect(() => {
    getProducts()
    return () => {
    };
  }, [getProducts])

        const appearance = {
        theme: 'flat',
        };
         const options = {
           clientSecret,
           appearance,
         };
  




  
    
    // const fetchProducts = async () => {
    //     const { data } = await commerce.products.list({
    //         limit:113
    //     });
    //     setProducts(data);
    //     console.log(data);
    // }
    // const fetchCart = async () => setCart(await commerce.cart.retrieve());
    // useEffect(() => {
    //     fetchProducts();
    //     fetchCart();
    //     console.log(cart);
    // }, [])
    // const handleAddCart = async (productId,quantity) => {
    //     const item = await commerce.cart.add(productId, quantity)
    //     setCart(item);
    // }
    

    // const handleUpdateQty = async (productId,quantity) => {
    //     const cart = await commerce.cart.update(productId, { quantity })
    //     setCart(cart);
       
    // }
    // const removeItem = async (productId) => {
    //     const cart = await commerce.cart.remove(productId);
    //     setCart(cart);
    // }

    
    // // const refreshCart = async () => {
    // //     const newCart = await commerce.cart.refresh();
    // //     setCart(newCart);
    // // }
    
    // const clearCart = async () => {
    //     const cart = await commerce.cart.empty();
    //     setCart(cart);
    // }
    // const handleCaptureCheckOut = async (checkoutTokenId,newOrder) => {
    //      try {
    //          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    //          console.log(incomingOrder)
    //          setOrder(incomingOrder)
    //          clearCart()
    //      } catch (error) {
    //          setErrorMessage(error.data.error.message);
    //          console.log(error)
    //      }
    //  }
 
    
  return (
    <div>
      <Navbar nameInitialsArr={nameInitialsArr} setNameInitialsArr={setNameInitialsArr} />
      <div className='bg-yellow-300'>
      <Routes>
            <Route exact path='/' element={<Home productsPanelData={productsPanelData} products={productsData} />} />
            <Route path='/products' element={<Products products={productsData} />}></Route>
          <Route  path='/signin' element={<SignIn setNameInitialsArr={setNameInitialsArr}/>}></Route>
            <Route path='/signup' element={<SignUp  setNameInitialsArr={setNameInitialsArr} />}></Route>
          <Route  path='/singleproduct/:id' element={<SingleProduct />}></Route>
          <Route  path='/carts' element={<Carts />}></Route>
          </Routes>    
          </div>
          <Footer/>
      </div>
      )
}

export default App
// <Checkout cart={cart}
//    order={order}
//       onCaptureCheckout={handleCaptureCheckOut}
//           error={errorMessage}
//           setOrder={setOrder}
//       />
        //   <Navbar total={cart.total_items} />
        //       <Route exact path='/' element={<Products products={products} handleAddCart={handleAddCart} />}/>
        //       <Route path='/cart' element={<Cart cart={cart}
        //           handleUpdateQty={handleUpdateQty}
        //           removeItem={removeItem}
        //           clearCart={clearCart}
              
        //       />} />  
      //   <Route
      //   path='/checkout'
      //   element={
      //        clientSecret && (
      //     <Elements options={options} stripe={stripePromise}> 
      //     <CheckoutForm clientSecret={clientSecret} paymentIntentId={paymentIntentId} />        
      //     </Elements>)
      // } />