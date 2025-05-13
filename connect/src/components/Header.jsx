import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useContext } from "react";
import { NameContext } from "../context/ArrContext";

const Header = () => {

  const {setSearch,setIsSearch} = useContext(NameContext);

  const title = useRef();
  const location = useRef();

  const handleSearch = ()=>{
    setSearch({
      title:title.current.value,
      location:location.current.value
    });
    setIsSearch(true);
    console.log({title:title.current.value,
      location:location.current.value});
  }
  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
        <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
            <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Carrer Move Starts Right Here - Explore the Jobs</p>
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
            <div className='flex items-center'>
            <img src={assets.search_icon} alt='' className='h-5 sm:h-5'/>
            <input type='text'
            placeholder='Search for jobs'
            className='max-sm:text-xs p-2 rounded outline-none w-full'
            ref={title}/>
            </div>
        <div className='flex items-center'>
            <img src={assets.location_icon} alt='' className='h-5 sm:h-5'/>
            <input type='text'
            placeholder='location'
            className='max-sm:text-xs p-2 rounded outline-none w-full'
            ref={location}/>
        </div>
        <button onClick={handleSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>Search</button>
        </div>
        </div>

        <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
          <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
            <p className='font-medium'>Trusted by</p>
            <img className="h-6" src={assets.microsoft_logo} alt="" />
            <img className="h-6" src={assets.walmart_logo} alt="" />
            <img className="h-6" src={assets.accenture_logo} alt="" />
            <img className="h-6" src={assets.samsung_logo} alt="" />
            <img className="h-6" src={assets.amazon_logo} alt="" />
            <img className="h-6" src={assets.adobe_logo} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Header