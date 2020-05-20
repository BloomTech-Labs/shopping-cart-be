const router = require('express').Router();
const Seller = require('../models/seller');

// Route - api/seller

// testing
router.get('/', (req, res) => {
  res.status(200).send('seller route is connected');
});

// post reqest to backend
router.post('/store', async (req, res) => {
  console.log(req, res);
});
module.exports = router;
