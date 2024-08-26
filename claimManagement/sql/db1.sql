CREATE DATABASE claims;
USE claims;

CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    claim_type VARCHAR(255) NOT NULL,
    claim_title VARCHAR(255) NOT NULL,
    date_of_spent DATE NOT NULL,
    amount_spent DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    claim_details TEXT,
    file_url VARCHAR(255)
);

INSERT INTO bills (id, user_id, claim_type, claim_title, date_of_spent, amount_spent, claim_details, file_url)
VALUES 
(1, 101, 'medical', 'Hospital Bill', '2023-11-24', 199.99, 'Emergency room visit', 'http://example.com/file1.pdf'),
(2, 102, 'travel', 'Flight Ticket', '2023-11-25', 150.00, 'Business trip to HYD', 'http://example.com/file2.pdf'),
(3, 103, 'grocery', 'Restaurant Bill', '2023-11-26', 250.50, 'Team dinner', 'http://example.com/file3.pdf'),
(4, 104, 'travel', 'Hotel Stay', '2023-11-27', 175.75, 'Conference accommodation', 'http://example.com/file4.pdf'),
(5, 105, 'medical', 'Pharmacy Bill', '2023-11-28', 300.00, 'Prescription medication', 'http://example.com/file5.pdf'),
(6, 106, 'travel', 'Train Ticket', '2023-11-29', 220.00, 'Client meeting in HYD', 'http://example.com/file6.pdf'),
(7, 107, 'grocery', 'monthly grocery Bill', '2023-11-30', 180.00, 'Office pantry supplies', 'http://example.com/file7.pdf'),
(8, 108, 'travel', 'Hotel Stay', '2023-12-01', 210.00, 'Project work in delhi', 'http://example.com/file8.pdf'),
(9, 109, 'medical', 'Clinical Bill', '2023-12-02', 190.00, 'Routine check-up', 'http://example.com/file9.pdf'),
(10, 110, 'travel', 'Bus Ticket', '2023-12-03', 160.00, 'Commute to office', 'http://example.com/file10.pdf');

SELECT * FROM bills;
-- TRUNCATE TABLE bills;
