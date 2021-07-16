//users
const userDetails = [
    "id", "name", "email", "phone", "role"
],

adminDetails = [
    "id", "name", "email", "role"
],

paymentDetails = [
    'id', 'userId', 'amount', 'status', 'authorization_url', 'access_code', 'reference'
];

module.exports = {
    userDetails, adminDetails, paymentDetails
};