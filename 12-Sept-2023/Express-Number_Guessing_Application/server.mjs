// server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Generate a random number between 1 and 100
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/random-number', (req, res) => {
  const randomNumber = getRandomNumber(1, 100);
  res.json({ number: randomNumber });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
