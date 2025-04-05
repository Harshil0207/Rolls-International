// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// // function for add product
// const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       sizes,
//       bestseller,
//       userId, // Ensure userId is extracted from the request body
//     } = req.body;
//     if (!userId) {
//       return res.json({ success: false, message: "Missing userId" });
//     }

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });
//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: JSON.parse(sizes),
//       image: imagesUrl,
//       date: Date.now(),
//     };

//     console.log(productData);

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Function to update a product
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       sizes,
//       bestseller,
//     } = req.body;
//     if (!id || !name || !description || !price || !category || !sizes) {
//       return res.json({ success: false, message: "Missing required fields" });
//     }
//     // Fetch existing product
//     const existingProduct = await productModel.findById(id);

//     if (!existingProduct) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }

//     // Handling new image uploads
//     const image1 = req.files?.image1?.[0];
//     const image2 = req.files?.image2?.[0];
//     const image3 = req.files?.image3?.[0];
//     const image4 = req.files?.image4?.[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );

//     let imagesUrl = existingProduct.image; // Keep existing images by default

//     if (images.length > 0) {
//       imagesUrl = await Promise.all(
//         images.map(async (item) => {
//           let result = await cloudinary.uploader.upload(item.path, {
//             resource_type: "image",
//           });
//           return result.secure_url;
//         })
//       );
//     }

//     // Updated product data
//     const updatedData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestseller: bestseller === "true",
//       sizes: JSON.parse(sizes),
//       image: imagesUrl,
//       date: Date.now(),
//     };

//     // Update product in the database
//     await productModel.findByIdAndUpdate(id, updatedData, { new: true });

//     res.json({ success: true, message: "Product Updated" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // function for list product
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // function for removing product
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       return res.json({ success: false, message: "Missing product id" });
//     }
//     await productModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Product Removed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // function for single product info
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     if (!productId) {
//       return res.json({ success: false, message: "Missing product ID" });
//     }
//     const product = await productModel.findById(productId);
//     res.json({ success: true, product });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export {
//   listProducts,
//   addProduct,
//   removeProduct,
//   singleProduct,
//   updateProduct,
// };












///////////////////









import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Function to update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Fetch existing product
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Handling new image uploads
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        let imagesUrl = existingProduct.image; // Keep existing images by default

        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        // Updated product data
        const updatedData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        // Update product in the database
        await productModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.json({ success: true, message: "Product Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// function for list product
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct ,updateProduct}