import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import ListJob from '../components/ListJob'
import MobileDownload from '../components/MobileDownload'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <ListJob/>
      <MobileDownload/>
      <Footer/>
    </div>
  )
}

export default Home