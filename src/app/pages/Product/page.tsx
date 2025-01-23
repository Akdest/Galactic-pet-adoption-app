import Footer from '@/app/component/Footer'
import HeroPage from '@/app/component/HeroPage'
import NavbarOther from '@/app/component/NavbarOther'
import Product from '@/app/component/Product'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavbarOther/>
      <HeroPage title="Adopt Your Favorite Alien Pet Today!" subtitle="Explore the galaxy and bring home a companion from another world!" backgroundImage="/hten.jpg" />
      <Product/>
      <Footer/>
    </div>
  )
}

export default page
