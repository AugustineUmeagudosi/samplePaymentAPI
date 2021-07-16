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
        comment: String
    }, 
    { timestamps: true }
);

const Payment = mongoose.model('Payment', PaymentSchema);
exports.Payment = Payment;
