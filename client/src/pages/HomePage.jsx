import React from 'react'
import Header from '../components/Header'
import Products from '../components/Products'

export default function HomePage() {
  return (
    <>
    {/* Header components */}
    <Header/>
    <section className='px-10'>
    <h2 className='mt-10 font-bold font-poppins tracking-wider text-3xl'>List of All Products</h2>
    </section>
    {/* list of all products */}
    <section className='px-10'>
      <Products/>
    </section>
    </>
  )
}
