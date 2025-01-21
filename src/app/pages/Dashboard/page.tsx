import Footer from '@/app/component/Footer'
import ProfileDashboard from '@/app/component/Dashboard'
import React from 'react'
import NavbarOther from '@/app/component/NavbarOther'

const page = () => {
  return (
    <div>
      <NavbarOther/>
      <ProfileDashboard/>
      <Footer/>
    </div>
  )
}

export default page
