const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Uploads folder ko public banana
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 1. Upload API
app.post('/api/files/upload', upload.single('file'), (req, res) => {
  res.send({ message: 'Uploaded!' });
});

// 2. List API
app.get('/api/files', (req, res) => {
  const dir = path.join(__dirname, 'uploads');
  fs.readdir(dir, (err, files) => {
    if (err) return res.json([]);
    res.json(files.map(f => ({ name: f })));
  });
});

// 3. Delete API
app.delete('/api/files/:name', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.name);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Nahi hua delete");
    res.send("Deleted!");
  });
});

app.listen(5000, () => console.log("Server on 5000"));