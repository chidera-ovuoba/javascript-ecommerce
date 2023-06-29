import React from 'react'
import { BiSupport } from 'react-icons/bi';
import { GiReceiveMoney, GiTruck } from 'react-icons/gi';
import {FaYoutube,FaFacebookF, FaInstagram } from 'react-icons/fa';
import { RiSecurePaymentFill } from 'react-icons/ri';
import logo from '../assests/logo (1).png';


const servicesData = [
    {
        title: 'Fast & Free Delivery',
        desc: 'Free delivery on all orders',
        src:[<GiTruck/>]
    },
    {
        title: 'Secure Payment',
        desc: 'Secure payment on all orders',
        src:[<RiSecurePaymentFill/>]
    },
    {
        title: 'Money Back Guarantee',
        desc: 'Money back guarantee on all orders',
        src:[<GiReceiveMoney/>]
    },
    {
        title: 'Online Support',
        desc: 'Online support on all orders',
        src:[<BiSupport/>]
    },
] 

const footerData = [
    {
        title: 'LET US HELP YOU',
        data:['Help Center','Contact Us','Delivery options','bulk purchases','Report a Product']
    },
    {
        title: 'ABOUT',
        data:['About us','Terms and Conditions','Privacy Notice','Cookie Notice','Flash Sales']
    },
    {
        title: 'Resources',
        data:['Guides','Research','Experts','Agencies']
    },
    {
        title: 'Quick Links',
        data:['Track Your Order','FAQ','Carrier']
    },
]


const Footer = () => {
  return (
   <div className='bg-yellow-300'>
   <div className="grid place-items-center py-16  mx-auto  w-[90vw]">
   <div className="grid grid-cols-4 gap-8 lg:grid-cols-footer2 w-full md_1:grid-cols-1 ">
    {
        servicesData.map(({src,desc,title})=>(
        <div className="service_container flex justify-center gap-8 flex-1 md_1:flex-col" key={title}>
        <div className="w-[230px] lg:w-full text-yellow-800">
        <span className='grid place-items-center text-[4rem] mb-4'>{src[0]}</span>
        <div className="text-center">
        <h5 className='text-xl capitalize font-bold my-2 text-yellow-900'>{title}</h5>
        <p className="text-md font-medium">{desc}</p>
        </div>
        </div>
        </div>
            
        ))
    }
    
    </div>
          </div> 
          <div className='testimonial_section_wrapper'>
          <div className='grid place-items-center w-[90vw] mx-auto'>
          <div className='flex justify-between items-center w-full py-12 gap-6 flex-wrap lg_2:flex-col lg_2:items-start lg_2:gap-9'>
                  <div className='text-yellow-700 flex-[0.5] min-w-[280px] lg_2:min-w-[250px]'>
                  <h2 className='text-xl capitalize font-bold my-2 text-yellow-900'>Subscribe Newsletter</h2>
                  <h3 className='text-md font-medium'>Subscribe newsletter to get update on special sales.</h3>
                  </div>
                  <div className='flex items-center gap-2 min-w-[500px] md:min-w-full flex-1 lg_2:order-3 text-md text-yellow-950 flex-wrap'>
                      <input type="text" className='ring-2 ring-yellow-800 outline-0 p-3 min-w-[250px] w-[70%] ml-auto lg_2:-ml-0' />
                      <button className='px-6 py-3 bg-orange-500 font-semibold text-md capitalize mr-auto lg_2:mr-0'>subscribe</button>
                  </div>
                  <div className='flex items-center justify-between gap-2 flex-[0.2] lg_2:gap-5'>
                  <span className='text-yellow-900 font-semibold text-2xl cursor-pointer'><FaFacebookF/></span>
                  <span className='text-yellow-900 font-semibold text-2xl cursor-pointer'><FaInstagram/></span>
                  <span className='text-yellow-900 font-semibold text-2xl cursor-pointer'><FaYoutube/></span>
                  </div>
                  </div>
              <div className='w-[90vw] flex items-center justify-between lg:flex-col lg:gap-8 py-12 border-y-2 border-y-yellow-900'>
              <div className='flex-[0.2]'>
              <div className='font-bold text-[1.7rem] lg:text-3xl text-yellow-300 flex items-center'><img src={logo} alt='logo-pic' className='w-8 h-10 mr-2 sm:w-6 sm:h-8 sm:mr-1' />Freedom<span className='text-orange-600'>MR</span></div>
              </div>
              <div className='grid grid-cols-footer4 lg_1:grid-cols-footer_4_2 lg_1:gap-8 xs:grid-cols-1 justify-between flex-[0.7] w-full'>
              {
                footerData.map(({title,data})=>(
                    <div className='text-center' key={title} >
                    <h4 className='text-xl capitalize font-bold my-2 text-yellow-900'>{title}</h4>
                    {
                        data.map((item)=>(
                            <p key={item} className='mt-3 text-lg font-medium text-yellow-700'>{item}</p>
                        ))
                    }
                    </div>
                ))
              }
              </div>
              </div>
              
              <div className='py-8 text-center text-xl capitalize font-bold my-2 text-yellow-900'>Copyright ©2023 All rights reserved </div>
              </div>
          </div>
    </div>
  )
}

export default Footer