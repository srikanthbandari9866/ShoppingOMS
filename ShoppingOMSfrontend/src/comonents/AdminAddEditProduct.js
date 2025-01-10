// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormHelperText, FormControl } from '@mui/material';
// import SuccessModal from './SuccessModal'; // Import your Success Modal component
// import ErrorModal from './ErrorModal'; // Import your Error Modal component

// const AdminAddEditProduct = ({ open, onClose, product, addProduct, updateProduct, categories = [] }) => {
//     const [itemName, setItemName] = useState('');
//     const [categoryId, setCategoryId] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [discount, setDiscount] = useState('');
//     const [isActive, setIsActive] = useState(1); // Default to 1 (Active)
//     const [image, setImage] = useState(null); // New state for image
//     const [imagePreview, setImagePreview] = useState(''); // State for image preview

//     // Error state for validations
//     const [errors, setErrors] = useState({});
//     const [successOpen, setSuccessOpen] = useState(false);
//     const [errorOpen, setErrorOpen] = useState(false);

//     // Reset fields if the dialog is for adding a new product
//     useEffect(() => {
//         if (product) {
//             setItemName(product.itemName);
//             setCategoryId(product.categoryId);
//             setPrice(product.price);
//             setQuantity(product.quantity);
//             setDiscount(product.discount);
//             setIsActive(product.isActive);
//             setImagePreview(product.imagePath || ''); // Set the image preview from product data
//         } else {
//             // Reset to initial state for adding new product
//             setItemName('');
//             setCategoryId('');
//             setPrice('');
//             setQuantity('');
//             setDiscount('');
//             setIsActive(1);
//             setImage(null);
//             setImagePreview('');
//             setErrors({});
//         }
//     }, [product]); // Runs whenever `product` prop changes

//     // const handleImageChange = (e) => {
//     //     const file = e.target.files[0];
//     //     if (file) {
//     //         const formData = new FormData();
//     //         formData.append('file', file);
//     //         setImage(formData);  // Store the file object
//     //         const previewUrl = URL.createObjectURL(file);  // Preview the image
//     //         setImagePreview(previewUrl);  // Set the preview image
//     //     }
//     // };
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImage(file); // Store the file object
//             const previewUrl = URL.createObjectURL(file);  // Preview the image
//             setImagePreview(previewUrl);  // Set the preview image
//         }
//     };


//     // Validation function
//     const validateForm = () => {
//         const newErrors = {};

//         if (!itemName.trim()) newErrors.itemName = "Product name is required";
//         if (!categoryId) newErrors.categoryId = "Category is required";
//         if (!price || price <= 0) newErrors.price = "Price must be greater than 0";
//         if (!quantity || quantity < 0) newErrors.quantity = "Quantity must be 0 or greater";
//         if (!discount || (discount < 0 || discount > 100)) newErrors.discount = "Discount must be between 0 and 100";

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return false;
//         }
//         setErrors({}); // Clear previous errors
//         return true;
//     };

//     // const handleSave = async () => {
//     //     if (!validateForm()) return; // If validation fails, prevent form submission
//     //     console.log('image: ', image.fileName)
//     //     const productData = { itemName, categoryId, price, quantity, discount, isActive, file: image };
//     //     let isSuccess = false;

//     //     if (product) {
//     //         // Attempt to update the product
//     //         isSuccess = await updateProduct(product.itemId, productData);
//     //     } else {
//     //         // Attempt to add a new product
//     //         isSuccess = await addProduct(productData);
//     //     }

//     //     if (isSuccess) {
//     //         setSuccessOpen(true); // Show success modal if product was added or updated successfully
//     //     } else {
//     //         setErrorOpen(true); // Show error modal if something went wrong
//     //     }

//     //     onClose(); // Close the dialog after saving
//     // };
//     const handleSave = async () => {
//         if (!validateForm()) return; // If validation fails, prevent form submission

//         const formData = new FormData();
//         formData.append('itemName', itemName);
//         formData.append('categoryId', categoryId);
//         // formData.append('price', price);
//         // formData.append('quantity', quantity);
//         // formData.append('discount', discount);
//         formData.append('price', parseFloat(price));
//         formData.append('quantity', parseInt(quantity, 10));
//         formData.append('discount', parseFloat(discount));
//         formData.append('isActive', isActive);

//         // Append the image file if it exists
//         if (image) {
//             formData.append('file', image); // 'image' is the file input
//         }

//         let isSuccess = false;

//         if (product) {
//             // If a product exists, we are updating it
//             isSuccess = await updateProduct(product.itemId, formData);
//         } else {
//             // If no product exists, we are adding a new one
//             isSuccess = await addProduct(formData);
//         }

//         if (isSuccess) {
//             setSuccessOpen(true); // Show success modal
//         } else {
//             setErrorOpen(true); // Show error modal
//         }

//         onClose(); // Close the dialog after saving
//     };


//     return (
//         <div>
//             <Dialog open={open} onClose={onClose}>
//                 <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Product Name"
//                         value={itemName}
//                         onChange={(e) => setItemName(e.target.value)}
//                         fullWidth
//                         required
//                         error={Boolean(errors.itemName)}
//                         helperText={errors.itemName}
//                         sx={{ mb: 2, mt: 2 }} // Adds space between fields
//                     />
//                     <FormControl fullWidth required error={Boolean(errors.categoryId)} sx={{ mb: 2 }}>
//                         <Select
//                             value={categoryId}
//                             onChange={(e) => setCategoryId(e.target.value)}
//                         >
//                             {categories && categories.length > 0 ? (
//                                 categories.map((category) => (
//                                     <MenuItem key={category.categoryId} value={category.categoryId}>
//                                         {category.categoryName}
//                                     </MenuItem>
//                                 ))
//                             ) : (
//                                 <MenuItem disabled>No categories available</MenuItem>
//                             )}
//                         </Select>
//                         <FormHelperText>{errors.categoryId}</FormHelperText>
//                     </FormControl>

//                     <TextField
//                         label="Price"
//                         type="number"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         fullWidth
//                         required
//                         error={Boolean(errors.price)}
//                         helperText={errors.price}
//                         sx={{ mb: 2 }} // Adds space between fields
//                     />
//                     <TextField
//                         label="Quantity"
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                         fullWidth
//                         required
//                         error={Boolean(errors.quantity)}
//                         helperText={errors.quantity}
//                         sx={{ mb: 2 }} // Adds space between fields
//                     />
//                     <TextField
//                         label="Discount"
//                         type="number"
//                         value={discount}
//                         onChange={(e) => setDiscount(e.target.value)}
//                         fullWidth
//                         error={Boolean(errors.discount)}
//                         helperText={errors.discount}
//                         sx={{ mb: 2 }} // Adds space between fields
//                     />

//                     {/* IsActive as a Select dropdown */}
//                     <Select
//                         value={isActive}
//                         onChange={(e) => setIsActive(e.target.value)}
//                         fullWidth
//                         required
//                         sx={{ mb: 2 }} // Adds space between fields
//                     >
//                         <MenuItem value={1}>Active</MenuItem>
//                         <MenuItem value={0}>Inactive</MenuItem>
//                     </Select>

//                     {/* Image Upload */}
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         style={{ marginBottom: '16px' }}
//                     />

//                     {/* Show the image preview */}
//                     {imagePreview && (
//                         <div style={{ marginTop: '16px' }}>
//                             <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
//                         </div>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose} color="secondary">Cancel</Button>
//                     <Button onClick={handleSave} color="primary">Save</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Success and Error Modals */}
//             <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
//             <ErrorModal open={errorOpen} onClose={() => setErrorOpen(false)} />
//         </div>
//     );
// };

// export default AdminAddEditProduct;

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, FormHelperText, FormControl } from '@mui/material';
import SuccessModal from './SuccessModal'; // Import your Success Modal component
import ErrorModal from './ErrorModal'; // Import your Error Modal component

const AdminAddEditProduct = ({ open, onClose, product, addProduct, updateProduct, categories = [] }) => {
    const [itemName, setItemName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [isActive, setIsActive] = useState(1); // Default to 1 (Active)
    const [image, setImage] = useState(null); // New state for image
    const [imagePreview, setImagePreview] = useState(''); // State for image preview
    const [imageError, setImageError] = useState(''); // State to store image validation error message

    // Error state for validations
    const [errors, setErrors] = useState({});
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    // Reset fields if the dialog is for adding a new product
    useEffect(() => {
        if (product) {
            setItemName(product.itemName);
            setCategoryId(product.categoryId);
            setPrice(product.price);
            setQuantity(product.quantity);
            setDiscount(product.discount);
            setIsActive(product.isActive);
            setImagePreview(product.imagePath || ''); // Set the image preview from product data
        } else {
            // Reset to initial state for adding new product
            setItemName('');
            setCategoryId('');
            setPrice('');
            setQuantity('');
            setDiscount(0);
            setIsActive(1);
            setImage(null);
            setImagePreview('');
            setErrors({});
            setImageError(''); // Clear the image error message when adding a new product
        }
    }, [product]); // Runs whenever `product` prop changes

    // Handle image change with validation
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg'];
            const maxSize = 5 * 1024 * 1024; // 5MB limit

            // Validate file type
            if (!allowedTypes.includes(file.type)) {
                setImageError('Invalid file type. Only JPG, PNG, SVG and JPEG are allowed.');
                setImage(null);
                setImagePreview('');
                return;
            }

            // Validate file size
            if (file.size > maxSize) {
                setImageError('File size exceeds 2MB.');
                setImage(null);
                setImagePreview('');
                return;
            }

            // If validation passes, store the image and set the preview
            setImageError(''); // Clear any previous image validation errors
            setImage(file); // Store the file object
            const previewUrl = URL.createObjectURL(file);  // Preview the image
            setImagePreview(previewUrl);  // Set the preview image
        }
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!itemName.trim()) newErrors.itemName = "Product name is required";
        if (!categoryId) newErrors.categoryId = "Category is required";
        if (!price || price <= 0) newErrors.price = "Price must be greater than 0";
        if (!quantity || quantity < 0) newErrors.quantity = "Quantity must be 0 or greater";
        console.log('discount: ', discount)
        if (discount != 0 && (discount < 0 || discount > 100)) newErrors.discount = "Discount must be between 0 and 100";
        // if (!image) newErrors.image = "Image is required"; // Check if image is missing

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        setErrors({}); // Clear previous errors
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return; // If validation fails, prevent form submission

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('categoryId', categoryId);
        formData.append('price', parseFloat(price));
        formData.append('quantity', parseInt(quantity, 10));
        formData.append('discount', parseFloat(discount));
        formData.append('isActive', isActive);

        // Append the image file if it exists
        if (image) {
            formData.append('file', image); // 'image' is the file input
        }

        let isSuccess = false;

        if (product) {
            // If a product exists, we are updating it
            isSuccess = await updateProduct(product.itemId, formData);
        } else {
            // If no product exists, we are adding a new one
            isSuccess = await addProduct(formData);
        }

        if (isSuccess) {
            setSuccessOpen(true); // Show success modal
        } else {
            setErrorOpen(true); // Show error modal
        }

        onClose(); // Close the dialog after saving
        setItemName('');
        setCategoryId('');
        setPrice('');
        setQuantity('');
        setDiscount(0)
        setIsActive(1);
        setImage(null);
        setImagePreview('');
        setErrors({});
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Product Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        fullWidth
                        required
                        error={Boolean(errors.itemName)}
                        helperText={errors.itemName}
                        sx={{ mb: 2, mt: 2 }} // Adds space between fields
                    />
                    <FormControl fullWidth required error={Boolean(errors.categoryId)} sx={{ mb: 2 }}>
                        <Select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <MenuItem key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No categories available</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.categoryId}</FormHelperText>
                    </FormControl>

                    <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        required
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        required
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Discount"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        fullWidth
                        error={Boolean(errors.discount)}
                        helperText={errors.discount}
                        sx={{ mb: 2 }}
                    />

                    {/* IsActive as a Select dropdown */}
                    <Select
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                    </Select>

                    {/* Image Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginBottom: '16px' }}
                    />

                    {/* Image Validation Error */}
                    {/* {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>} */}

                    {/* Show the image preview */}
                    {imagePreview && (
                        <div style={{ marginTop: '16px' }}>
                            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Success and Error Modals */}
            <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
            <ErrorModal open={errorOpen} onClose={() => setErrorOpen(false)} />
        </div>
    );
};

export default AdminAddEditProduct;

