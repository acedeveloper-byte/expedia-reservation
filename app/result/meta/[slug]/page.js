'use client'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react'

const page = async ({ params}) => {
    const pas = await params
       

  return (
    <>
     <Header />


     <Footer/>

     </>
  )
}

export default page
