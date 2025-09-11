import React from 'react'
import Carousal from '../../components/carasoul/Carousal'
import Catagory from '../../components/category/Category'
import Product from '../../components/Product/Product'

const Landing = () => {
  return (
    <>
      <Carousal />
      <Catagory/>
      <Product />
    </>
  )
}

export default Landing