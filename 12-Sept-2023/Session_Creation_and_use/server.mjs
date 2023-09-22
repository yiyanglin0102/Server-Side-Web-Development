import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Sample array of names
const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'];

// Function to get a random name from the array
function getRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

app.get('/random-baby', (req, res) => {
  const randomBaby = getRandomName();
  res.json({ data: randomBaby });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
