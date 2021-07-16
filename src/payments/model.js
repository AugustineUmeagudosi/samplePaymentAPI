const mongoose = require('mongoose'),
    { Schema } = mongoose,

PaymentSchema = new Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
            required: true
        },
        amount: {type: Number, required: true},
        currency: String,
        payment_mode: String,
        paid_at: Date,
        status: { type: String, required: true },
        authorization_url: {type: String, required: true},
        access_code: {type: String, required: true, index: true,},
        reference: {type: String, required: true, index: true,}
    }, 
    { timestamps: true }
);

const Payment = mongoose.model('Payment', PaymentSchema);
exports.Payment = Payment;
