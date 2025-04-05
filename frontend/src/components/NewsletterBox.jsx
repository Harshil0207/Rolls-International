// import React from 'react'

// const NewsletterBox = () => {

//     const onSubmitHandler = (event) => {
//         event.preventDefault();
//     }

//   return (
//     <div className=' text-center'>
//       <p className='text-2xl font-medium text-gray-800'>Subscribe now</p>
//       <p className='text-gray-400 mt-3'>
//       Join Rolls International, a dynamic lifestyle and fashion brand, where creativity meets innovation. We’re passionate about empowering individuals to express their unique style while shaping the future of fashion. Be part of a team that values growth, collaboration, and timeless impact.
//       </p>
//       <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
//         <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
//         <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
//       </form>
//     </div>
//   )
// }

// export default NewsletterBox

import React, { useState } from 'react';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                alert('Subscribed successfully!');
                setEmail('');
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now</p>
            <p className='text-gray-400 mt-3'>
                Join Rolls International, a dynamic lifestyle and fashion brand, where creativity meets innovation. We’re passionate about empowering individuals to express their unique style while shaping the future of fashion. Be part of a team that values growth, collaboration, and timeless impact.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input
                    className='w-full sm:flex-1 outline-none'
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
            </form>
        </div>
    );
};

export default NewsletterBox;