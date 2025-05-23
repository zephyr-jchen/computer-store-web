import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../css/payment.css'
import {getNameList} from 'country-list';

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
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const canadianProvinces = [
        { code: 'AB', name: 'Alberta' },
        { code: 'BC', name: 'British Columbia' },
        { code: 'MB', name: 'Manitoba' },
        { code: 'NB', name: 'New Brunswick' },
        { code: 'NL', name: 'Newfoundland and Labrador' },
        { code: 'NS', name: 'Nova Scotia' },
        { code: 'ON', name: 'Ontario' },
        { code: 'PE', name: 'Prince Edward Island' },
        { code: 'QC', name: 'Quebec' },
        { code: 'SK', name: 'Saskatchewan' }
    ];

    const navigate = useNavigate();

    //get the list of countries from country-list
    useEffect(() => {
        const countryNames = getNameList(); // This returns an object
        const formattedCountries = Object.keys(countryNames).map(code => ({ code, name: countryNames[code] }));
        console.log(formattedCountries);
        setCountries(formattedCountries);
    }, []);

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
                        <label>Payment Method</label>
                        <select 
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                            className="payment-method-select"
                            required
                        >
                            <option value="creditCard">Credit Card</option>
                            <option value="debitCard">Debit Card</option>
                        </select>
                    </div>
                    <div>
                        <label>Card Holder Name</label>
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={e => setCardHolderName(e.target.value)}
                            placeholder="Card Holder's Name"
                            required
                        />
                    </div>
                    <div>
                        <label>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value)}
                            placeholder="Card Number"
                            pattern="\d{16}"
                            title="Card Number must be 16 digits"
                            required
                        />
                    </div>
                    <div>
                        <label>Expire Date</label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={e => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            pattern="\d{2}/\d{2}"
                            title="Expire date must be in MM/YY format"
                            required
                        />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={e => setCVV(e.target.value)}
                            placeholder="CVV"
                            pattern="\d{3,4}"
                            title="CVV must be 3 or 4 digits"
                            required
                        />
                    </div>
                    <br/>
                    <h1>Billing Address</h1>
                    <div>
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Address Line 1</label>
                        <input type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} required />
                    </div>
                    <div>
                        <label>Address Line 2 (Optional)</label>
                        <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
                    </div>
                    <div>
                        <label>Country</label>
                        <select
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>{country.code.toUpperCase()}</option>
                        ))}
                    </select>
                    </div>
                    {country === 'canada' ? (
                        <div>
                            <label>Province</label>
                            <select
                                value={state}
                                onChange={e => setState(e.target.value)}
                                required
                            >
                                <option value="">Select a province</option>
                                {canadianProvinces.map((province) => (
                                    <option key={province.code} value={province.code}>{province.name}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label>State</label>
                            <input
                                type="text"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                required={country !== 'CA'}
                            />
                        </div>
                    )}
                    <div>
                        <label>City</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
                    </div>
                    <div>
                        <label>Zip Code</label>
                        <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} required />
                    </div>
                    <div className="action-btn">
            <button type="button" onClick={() => navigate("/checkout")}>Cancel</button>
            <button type="submit">Submit</button>
            </div>
                    
                </form>
            </div>
            
            
            
        </div>
    );
};

export default Payment;
