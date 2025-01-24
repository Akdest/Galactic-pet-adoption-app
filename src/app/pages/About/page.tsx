import AboutUs from '@/app/component/AboutUs'
import Footer from '@/app/component/Footer'
import HeroPage from '@/app/component/HeroPage'
import NavbarOther from '@/app/component/NavbarOther'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavbarOther/>
        <HeroPage title="About Us" subtitle="We are a team of passionate individuals who love to explore the galaxy and bring home a companion from another world!" backgroundImage="/heleven.jpg" />
      <AboutUs/>
      <Footer/>
    </div>
  )
}

export default page
