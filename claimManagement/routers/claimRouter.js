const express = require('express');
const billController = require('../controller/claimController.js');

const router = express.Router();

// To fetch all the bills
router.get('/', billController.getAllBills);

// To fetch by ID
router.get('/:id', billController.getBillById);

// To create 
router.post('/', billController.createBill);

// To update 
router.put('/:id', billController.updateBill);

// To delete 
router.delete('/:id', billController.deleteBill);

module.exports = router;