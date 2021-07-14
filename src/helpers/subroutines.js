require('dotenv').config();

module.exports = {
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