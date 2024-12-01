import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../css/payment.css'

// const Payment = () => {
//    const { state } = useLocation();
//    const { carts, subtotal, hst, shippingFee, total } = state || {};
//   const navigate = useNavigate();

//    if (!carts || carts.length === 0) {
//      return (
//        <div className="checkout-container">
//          <h2>No items in the cart!</h2>
//          <button onClick={() => navigate("/")}>Back to Home</button>
//        </div>
//      );
//    }

//   return (
//     <div className="payment-container">
//       <h2 className="payment-header">Payment Info</h2>
//       <div className="order-summary">
//         <h3>Order Details</h3>
//         <ul>
//           {carts.map((item, index) => {
//             <li key={index}>
//               {item.productId} - Quantity: {item.quantity}
//             </li>;
//           })}
//         </ul>
//         <div className="total-summary">
//           <p>Subtotal: ${subtotal.toFixed(2)} CAD </p>
//           <p>HST: ${hst.toFixed(2)} CAD</p>
//           <p>Shipping Fee: ${shippingFee.toFixed(2)} CAD</p>
//           <h3>Total: ${total.toFixed(2)} CAD</h3>
//         </div>
//       </div>

//       <div className="checkout-actions">
//         <button className="cancel-btn" onClick={() => navigate("/")}>
//           Cancel
//         </button>
//         <button className="confirm-btn" onClick={() => alert("Order Placed.")}>
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('You have placed the order successfully!');
    };

    return (
        <div className="info-required">
            <div className="payment-container">
                <h1>Payment Information</h1>
                <form onSubmit={handleSubmit}>
                <div>
                        <label>Payment Method:</label>
                        <select 
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                            className="payment-method-select"
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="debitCard">Debit Card</option>
                        </select>
                    </div>
                    <div>
                        <label>Card Holder Name:</label>
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={e => setCardHolderName(e.target.value)}
                            placeholder="Card Holder's Name"
                            required
                        />
                    </div>
                    <div>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            placeholder="Card Number"
                            required
                        />
                    </div>
                    <div>
                        <label>Expire Date:</label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={e => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div>
                        <label>CVV:</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={e => setCVV(e.target.value)}
                            placeholder="CVV"
                            required
                        />
                    </div>
                    
                </form>
            </div>

            <div className="billing-container">
                <h1>Billing Address</h1>
                <form>
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Address Line 1:</label>
                        <input type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} required />
                    </div>
                    <div>
                        <label>Address Line 2:</label>
                        <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
                    </div>
                    <div>
                        <label>Country:</label>
                        <input type="text" value={country} onChange={e => setCountry(e.target.value)} required />
                    </div>
                    <div>
                        <label>State:</label>
                        <input type="text" value={state} onChange={e => setState(e.target.value)} required />
                    </div>
                    <div>
                        <label>City:</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
                    </div>
                    <div>
                        <label>Zip Code:</label>
                        <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} required />
                    </div>
                </form>
                <div className="action-btn">
            <button onClick={() => navigate("/checkout")}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
            </div>
            </div>
            
            
            
        </div>
    );
};

export default Payment;
