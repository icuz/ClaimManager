const db = require('../config/dataCon');

class Bill {

    // Fetch all bills from the database
    static fetchAll() {
        return db.execute('SELECT * FROM bills');
    }

    // Fetch a bill by its ID
    static findById(id) {
        return db.execute('SELECT * FROM bills WHERE id = ?', [id]);
    }

    // Create a new bill
    static create(bill) {
        const { user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url } = bill;
        if (!user_id || !claim_type || !claim_title || !date_of_spent || !amount_spent || !claim_details || !file_url) {
            throw new Error('All fields are required');
        }

        return db.execute('INSERT INTO bills (user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url])
            .catch(err => {
                throw new Error(err);
            });
    }

    // Update a bill by its ID
    static update(id, bill) {
        const { user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url } = bill;

        if (!user_id || !claim_type || !claim_title || !date_of_spent || !amount_spent || !claim_details || !file_url) {
            throw new Error('All fields are required');
        }

        return db.execute('UPDATE bills SET user_id = ?, claim_type = ?, claim_title = ?, date_of_spent = ?, amount_spent = ?, claim_details = ?, file_url = ? WHERE id = ?', 
            [user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url, id]);
    }

    // Delete a bill by its ID
    static delete(id) {
        return db.execute('DELETE FROM bills WHERE id = ?', [id]);
    }
}

module.exports = Bill;