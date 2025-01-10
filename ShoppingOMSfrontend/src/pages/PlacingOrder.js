// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import PlaceOrder from '../comonents/PlaceOrder';

// function PlacingOrder() {
//     const location = useLocation();
//     const { product } = location.state || {};  // Extract product from state

//     return (
//         <>
//             <PlaceOrder items={product} />
//             {/* {product ? <PlaceOrder items={product} /> : <div>No product found</div>} */}
//         </>
//     );
// }

// export default PlacingOrder;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceOrder from '../comonents/PlaceOrder'

function PlacingOrder() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    console.log('In Placing order to placeorder: Product = ', product)
    if (!product) {
        console.warn('No product found in state. Redirecting...');
        // navigate('/');
        return null;
    }


    // return <div> Name: {product.itemName} </div>;
    return <PlaceOrder items={[product]} />;
}

export default PlacingOrder;

