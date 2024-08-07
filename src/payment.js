import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const navigate=useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { cardNumber, expiryDate, cvv, cardholderName };
    console.log(data);
    alert('Payment Successful');
    navigate('/');
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Card Number"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required='true'
        />
        <br/><br/>
        <TextField
          label="Expiry Date"
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required='true'
        />
        <br/><br/>
        <TextField
          label="CVV"
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required='true'
        />
        <br/><br/>
        <TextField
          label="Cardholder Name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required='true'
        />
        <br/><br/>
        <Button type="submit" variant="contained" color="primary">
          Pay Now
        </Button>   

      </form>
    </div>
  );
}
