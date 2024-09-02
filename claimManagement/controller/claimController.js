const Bill = require('../models/bill');

const validateBillDetails = (bill) => {
    const { user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url } = bill;
    if (!user_id || !claim_type || !claim_title || !date_of_spent || !amount_spent || !claim_details || !file_url) {
        return 'All fields are required';
    }
    if (isNaN(amount_spent) || amount_spent <= 0) {
        return 'Amount spent must be a positive number';
    }
    return null;
};

exports.getAllBills = async (req, res) => {
    try {
        const [bills] = await Bill.fetchAll();
        res.status(200).json(bills);
    } catch (err) {
        console.error('Error fetching bills:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

exports.getBillById = async (req, res) => {
    try {
        const [bill] = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }
        res.status(200).json(bill);
    } catch (err) {
        console.error('Error fetching bill:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

exports.createBill = async (req, res) => {
    const validationError = validateBillDetails(req.body);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const { user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url } = req.body;
        await Bill.create({
            user_id,
            claim_type,
            claim_title,
            date_of_spent,
            amount_spent,
            claim_details,
            file_url
        });
        res.status(201).json({ message: 'Bill created successfully' });
    } catch (err) {
        console.error('Error creating bill:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// Functions to update bill details in the database
exports.updateBill = async (req, res) => {
    try {
        const billDetails = req.body;
        const validationError = validateBillDetails(billDetails);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        await Bill.update(req.params.id, billDetails);
        res.status(200).json({ message: 'Bill updated' });
    } catch (err) {
        console.error('Error updating bill:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// Functions to delete bill details from the database
exports.deleteBill = async (req, res) => {
    try {
        await Bill.delete(req.params.id);
        res.status(200).json({ message: 'Bill deleted' });
    } catch (err) {
        console.error('Error deleting bill:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};