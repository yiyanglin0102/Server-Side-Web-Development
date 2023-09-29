const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

// Initialize a variable to store the previous set of numbers
let previousNumbers = new Set();

function generateRandomNumbers() {
  // Generate 5 random numbers between 1 and 69 (inclusive)
  const mainNumbers = new Set();
  while (mainNumbers.size < 5) {
    const randomNumber = Math.floor(Math.random() * 69) + 1;
    mainNumbers.add(randomNumber);
  }

  // Generate a random Powerball number between 1 and 26 (inclusive)
  const powerballNumber = Math.floor(Math.random() * 26) + 1;

  return { mainNumbers: [...mainNumbers], powerballNumber };
}

app.get('/get_powerball_numbers', (req, res) => {
  let { mainNumbers, powerballNumber } = generateRandomNumbers();

  // Ensure the generated set of numbers is unique
  while (previousNumbers.has(mainNumbers.join(','))) {
    ({ mainNumbers, powerballNumber } = generateRandomNumbers());
  }

  // Add the current set of numbers to the previous numbers set
  previousNumbers.add(mainNumbers.join(','));

  // If the history size exceeds a certain limit, clear it
  if (previousNumbers.size > 1000) {
    previousNumbers.clear();
  }

  const numbersStr = mainNumbers.join(', ');
  const powerballNumberStr = powerballNumber;

  // Send the numbers as JSON response
  return res.json({ numbers: numbersStr, powerBall: powerballNumberStr });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
