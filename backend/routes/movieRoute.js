const express = require('express');
const router = express.Router();

// Örnek bir GET route tanımı
router.get('/', (req, res) => {
    res.send('Movie Route çalışıyor!');
});

module.exports = router;
