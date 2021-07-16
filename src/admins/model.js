const mongoose = require('mongoose'),
    { Schema } = mongoose,

AdminSchema = new Schema(
    {
        email: {
            type: String, trim: true, index: {
                unique: true,
                lowercase: true,
                partialFilterExpression: { email: { $type: "string" } }
            }
        },
        phone: String,
        name: String,
        password: String,
        role: { type: String, default: 'Admin', enum: ['Admin', 'Super Admin'] }
    }, 
    { timestamps: true }
);

const Admin = mongoose.model('Admin', AdminSchema);
exports.Admin = Admin;
