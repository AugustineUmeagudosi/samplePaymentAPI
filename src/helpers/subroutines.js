require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    generateAuthToken: (user) => {
        const token = jwt.sign( { _id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' } );
        return token;
    },

    //used to validate urls
    isValidUrl: (url) => {
        let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return regEx.test(url);
    },

    stringSanitizer: (parameter) => {
        parameter = parameter.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
        return parameter.trim();
    }
};