import Footer from '@/app/component/Footer'
import LoginSignup from '@/app/component/LoginSignup'
import Navbar from '@/app/component/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <LoginSignup />
      <Footer/>
    </div>
  )
}

export default page
