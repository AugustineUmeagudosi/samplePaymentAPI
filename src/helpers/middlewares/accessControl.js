const responseMessage = require('../responseMessages'),
{ Admin } = require('../../admins/model');

module.exports = {    
    isAdmin: async (req, res, next) => {
        const admin = await Admin.findById(req.user._id);
        if (!admin) return responseMessage.forbidden('Access denied', res);
        next();
    },
    
    isSuperAdmin: async (req, res, next) => {
        const superAdmin = await Admin.find({id: req.user._id, role: 'Super Admin', isDeleted: false});
        if (!superAdmin) return responseMessage.forbidden('Access denied', res);
        next();
    }
};