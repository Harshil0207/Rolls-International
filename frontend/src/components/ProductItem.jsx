import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'


const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={() => scrollTo(0, 0)} className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
    <div className="overflow-hidden aspect-w-1 aspect-h-1">
      <img
        className="hover:scale-110 transition-transform ease-in-out w-full h-full object-cover aspect-square rounded-lg"
        src={image[0]}
        alt={name}
      />
    </div>
    <p className="pt-3 pb-1 text-sm">{name}</p>
    <p className="text-sm font-medium">
      {currency}
      {price}
    </p>
  </Link>
  
  )
}

export default ProductItem
