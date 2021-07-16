const https = require('https');
const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    initiatePayment: async (email, amount, currency) => {
        const url = 'https://api.paystack.co/transaction/initialize';
        const paystackResponse = await fetch(url, { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }, 
            body: JSON.stringify({
                email: email,
                amount: amount,
                currency: currency
            }) 
        }).then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => (err) => { 
            console.log(err);
            return err; 
        });

        return paystackResponse;
    },

    verifyPayment: async (verificationCode) => {
        const url = `https://api.paystack.co/transaction/verify/${verificationCode}`;

        const paystackResponse = await fetch(url, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => (err) => { 
            console.log(err);
            return err; 
        });

        return paystackResponse;
    }
};