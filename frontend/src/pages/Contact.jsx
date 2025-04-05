import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets.js'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className=' text-gray-500'>149, Gayatri Society <br /> Rachna Circle, Kapodara, Surat, India</p>
          <p className=' text-gray-500'><a href="tel:+917069914279">Contect Us : +91 7069914279 </a> <br /> <a href="mailto:rollsintbusiness@gmail.com">Email: rollsintbusiness01@gmail.com</a></p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Rolls International</p>
          <p className=' text-gray-500'>Join Rolls International, a dynamic lifestyle and fashion brand, where creativity meets innovation. <br></br>We’re passionate about empowering individuals to express their unique style while <br></br> shaping the future of fashion. Be part of a team that values growth, collaboration, and timeless impact.
          </p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
