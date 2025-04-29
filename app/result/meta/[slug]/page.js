'use client'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const page = async ({ params}) => {
    const pas = await params
    console.log(pas)
       

  return (
    <>
     <Header />


     <Footer/>

     </>
  )
}

export default page
