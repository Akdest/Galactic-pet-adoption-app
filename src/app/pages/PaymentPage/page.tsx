import Footer from '@/app/component/Footer'
import NavbarOther from '@/app/component/NavbarOther'
import PaymentPage from '@/app/component/PaymentPage'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavbarOther/>
      <PaymentPage/>
      <Footer/>
    </div>
  )
}

export default page
