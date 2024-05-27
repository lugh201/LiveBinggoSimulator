const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/bingo', { useNewUrlParser: true, useUnifiedTopology: true });

const cardSchema = new mongoose.Schema({
  imagePath: String,
  numbers: [[mongoose.Schema.Types.Mixed]], // Use Mixed type to allow "FREE" and numbers
  marks: [[Boolean]],
});
const Card = mongoose.model('Card', cardSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post('/upload-card', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  // Mock numbers data (replace with actual OCR processing if available)
  const numbers = [
    [15, 27, 42, 55, 72],
    [10, 29, 41, 56, 73],
    [7, 26, "FREE", 52, 64],
    [13, 21, 36, 59, 61],
    [8, 23, 32, 58, 74]
  ];

  const card = new Card({
    imagePath: filePath,
    numbers,
    marks: numbers.map(row => row.map(() => false)),
  });

  try {
    const savedCard = await card.save();
    res.send(savedCard);
  } catch (error) {
    console.error('Error saving card:', error);
    res.status(500).send('Error saving card');
  }
});

app.post('/draw-number', async (req, res) => {
  const { number } = req.body;
  const cards = await Card.find();

  cards.forEach(card => {
    for (let i = 0; i < card.numbers.length; i++) {
      for (let j = 0; j < card.numbers[i].length; j++) {
        if (card.numbers[i][j] == number) {
          card.marks[i][j] = true;
        }
      }
    }
  });

  await Card.bulkSave(cards);
  res.send(cards); // Ensure sending complete card objects
});

app.post('/clear-marks', async (req, res) => {
  const cards = await Card.find();

  cards.forEach(card => {
    card.marks = card.marks.map(row => row.map(() => false));
  });

  await Card.bulkSave(cards);
  res.send(cards); // Ensure sending complete card objects
});

app.delete('/clear-cards', async (req, res) => {
  await Card.deleteMany({});
  res.send({ message: 'All cards cleared' });
});

app.get('/cards', async (req, res) => {
  const cards = await Card.find();
  res.send(cards);
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
