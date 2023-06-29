import React from 'react'
import Slider from '../components/Silder';
import { useGlobalContext } from '../lib/context';
// import Product from '../components/Product';
import Products from './Products';
import ProductsPanel from '../components/ProductsPanel';
import ProductSection from '../components/ProductSection';
import Testimonial from '../components/Testimonial';
// import sliderData from '../assests/slider';
const Home = ({productsPanelData,products}) => {
  // const { loading, ProductsData, sliderIndex } = useGlobalContext();
  console.log('home')
// if (loading) {
//     return  <div className="container_loader">
//         <div className="spinner">
//             <div className="spinner-text">Loading...</div>
//             <div className="spinner-sector spinner-sector-red"></div>
//             <div className="spinner-sector spinner-sector-blue"></div>
//             <div className="spinner-sector spinner-sector-green"></div>
//         </div>
//     </div>
//   }
return (
<div> 
<div className='grid place-items-center pt-32'>
<Products products={products}/>
</div>

</div>
)
}
// <Slider sliderIndex={sliderIndex} />
// <ProductsPanel productsPanelData={productsPanelData} />
// <ProductSection/>
// <Testimonial/>

export default Home