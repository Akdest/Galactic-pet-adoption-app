import AdoptionList from '@/app/component/AdoptionList'
import Footer from '@/app/component/Footer'
import Navbar from '@/app/component/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <AdoptionList/>
      <Footer/>
    </div>
  )
}

export default page
