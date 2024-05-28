const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/bingo', { useNewUrlParser: true, useUnifiedTopology: true });

const cardSchema = new mongoose.Schema({
  imageName: String,
  numbers: [[mongoose.Schema.Types.Mixed]],
  marks: [[Boolean]],
});
const Card = mongoose.model('Card', cardSchema);

app.post('/upload-cards', async (req, res) => {
  const cards = req.body;

  try {
    const savedCards = await Card.insertMany(cards);
    res.send(savedCards);
  } catch (error) {
    console.error('Error uploading cards:', error);
    res.status(500).send('Error uploading cards');
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
  res.send(cards);
});

app.post('/clear-marks', async (req, res) => {
  const cards = await Card.find();

  cards.forEach(card => {
    card.marks = card.marks.map(row => row.map(() => false));
  });

  await Card.bulkSave(cards);
  res.send(cards);
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
