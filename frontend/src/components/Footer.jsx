import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Rolls International is a modern lifestyle and fashion brand dedicated to timeless elegance and contemporary trends. We curate styles that embody sophistication, confidence, and individuality, making every moment an expression of Rolls International-lasting style.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><a href="tel:+917069914279">+91-7069914279</a></li>
                <li><a href="mailto:rollsintbusiness01@gmail.com">rollsintbusiness01@gmail.com</a></li>
                <li>GST No. : 24DTTPG4373K1Z5</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright M20 2024-25@rollsintbusiness01gmail.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
