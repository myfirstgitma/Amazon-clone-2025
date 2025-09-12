import React, { useEffect, useState } from 'react'
import LayOut from '../../components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../components/Product/ProductCard'

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState({})   

  useEffect(() => {
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [productId])  
  return (
    <>
      <ProductCard product={product} />
    </>
  )
}

export default ProductDetail
