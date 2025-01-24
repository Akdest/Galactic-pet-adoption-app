"use client";
import ContactUs from '@/app/component/Contact'
import Footer from '@/app/component/Footer'
import HeroPage from '@/app/component/HeroPage'
import NavbarOther from '@/app/component/NavbarOther'
import React from 'react'

const page = () => {
  return (
    <div>
      <NavbarOther/>
      <HeroPage title='Contact Us' subtitle='We would love to hear from you' backgroundImage='/hfour.jpg' />
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default page
