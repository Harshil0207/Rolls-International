// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom';

// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const navigate = useNavigate();

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list');
//       if (response.data.success) {
//         setList(response.data.products.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>
//         {/* List Table Title */}
//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* Product List */}
//         {list.map((item, index) => (
//           <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//             <img className='w-12' src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
//             <p onClick={() => navigate('/add')} className="cursor-pointer">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
//                 <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
//                 <path d="m15 5 4 4" />
//               </svg>
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
            <p
              onClick={() => {
                setSelectedProduct(item);
                setIsModalOpen(true);
              }}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full animate-scale-up">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Edit Product</h2>
            <form className="space-y-4">
              {/* Upload Image */}
              <div>
                <label className="block font-medium text-gray-700">Upload Images:</label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="border p-2 rounded-lg w-20 h-20 flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition">
                      <input type="file" className="hidden" id={`upload-${index}`} />
                      <label htmlFor={`upload-${index}`} className="cursor-pointer text-gray-600">📷</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block font-medium text-gray-700">Product Name:</label>
                <input
                  type="text"
                  value={selectedProduct?.name || ""}
                  className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block font-medium text-gray-700">Product Description:</label>
                <textarea
                  value={selectedProduct?.description || ""}
                  className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                  rows="3"
                ></textarea>
              </div>

              {/* Product Category & Subcategory */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700">Product Category:</label>
                  <select className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400">
                    <option>Men</option>
                    <option>Women</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Sub Category:</label>
                  <select className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400">
                    <option>Topwear</option>
                    <option>Bottomwear</option>
                  </select>
                </div>
              </div>

              {/* Product Price */}
              <div>
                <label className="block font-medium text-gray-700">Product Price:</label>
                <input
                  type="number"
                  value={selectedProduct?.price || ""}
                  className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Product Sizes */}
              <div>
                <label className="block font-medium text-gray-700">Product Sizes:</label>
                <div className="flex gap-2 mt-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      className="border px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bestseller Checkbox */}
              <div className="flex items-center">
                <input type="checkbox" id="bestseller" className="mr-2 w-5 h-5 text-blue-500" />
                <label htmlFor="bestseller" className="text-gray-700">Add to Bestseller</label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default List;

