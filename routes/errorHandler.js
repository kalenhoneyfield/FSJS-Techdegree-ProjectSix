const express = require('express');

const router = express.Router();

//generalized error handler for 404 errors
router.use((req, res, next) =>{
    const error = new Error('File Not Found')
    error.statusCode = 404
    return next(error)
})

module.exports = router;