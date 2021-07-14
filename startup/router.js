const express = require('express');
const userRouter = require('../src/users/router');
const paymentRouter = require('../src/payments/router');

module.exports = function (app) {
    app.use(express.json({ limit:"5mb" }));
    app.use(express.urlencoded({ limit:"5mb", extended: true }));

    app.use('/api/v1/welcome', express.Router().get("/", (req, res) => res.status(200).json({ 
        message: "Welcome" })
    ));

    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/payments', paymentRouter);
};