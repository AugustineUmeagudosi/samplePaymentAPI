const mongoose = require('mongoose'),
    { Schema } = mongoose,

UserSchema = new Schema(
    {
        email: {
            type: String, trim: true, index: {
                unique: true,
                lowercase: true,
                partialFilterExpression: { email: { $type: "string" } }
            }
        },
        phone: {
            type: String, trim: true, index: {
                unique: true,
                partialFilterExpression: { phone: { $type: "string" } }
            }
        },
        name: String,
        password: String,
        role: { type: String, default: 'User', enum: ['User'] }
    }, 
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
exports.User = User;
