const mongoose = require('mongoose'),
    { Schema } = mongoose,

PaymentSchema = new Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            index: true,
            required: false
        },
        amount: String,
        currency: String,
        status: { type: String, enum: ['Successful', 'Failed'] },
        authorization_url: String,
        access_code: String,
        reference: String
    }, 
    { timestamps: true }
);

const Payment = mongoose.model('Payment', PaymentSchema);
exports.Payment = Payment;
