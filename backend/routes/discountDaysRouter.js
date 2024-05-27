const express = require('express');
const router = express.Router();
const discountDaysController = require('../controllers/discountDaysController'); // Düzgün içe aktarma

router.get('/all', discountDaysController.getAllDiscountDays); // '/all' rotasını ekleyin

module.exports = router;
