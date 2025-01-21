import Footer from '@/app/component/Footer'
import LoginSignup from '@/app/component/LoginSignup'
import NavbarOther from '@/app/component/NavbarOther'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavbarOther/>
      <LoginSignup />
      <Footer/>
    </div>
  )
}

export default page
