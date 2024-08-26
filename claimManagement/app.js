const express = require('express');
const bodyParser = require('body-parser');
const billRoutes = require('./routers/claimRouter'); 
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const sharp = require('sharp');

const app = express();
const PORT = 8000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// File filter to accept only specific file formats
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.png', '.docx', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .docx, and .pdf files are allowed'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: fileFilter
});

// Endpoint for file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ fileUrl: fileUrl });
});

// Serve files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Welcome to the billing API');
});

app.use('/api/bills', billRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});