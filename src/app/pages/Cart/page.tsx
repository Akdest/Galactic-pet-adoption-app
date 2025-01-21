import CartPage from '@/app/component/CartPage'
import Footer from '@/app/component/Footer'
import NavbarOther from '@/app/component/NavbarOther'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavbarOther/>
      <CartPage/>
      <Footer/>
    </div>
  )
}

export default page
