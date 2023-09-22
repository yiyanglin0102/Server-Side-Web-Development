import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const names = [
  "Emily", "James", "Sophia", "William", "Olivia", "Benjamin", "Mia", "Daniel", "Ava", "Michael",
  "Charlotte", "Elijah", "Amelia", "Alexander", "Harper", "Henry", "Evelyn", "Samuel", "Abigail", "Matthew",
  "Elizabeth", "Joseph", "Sofia", "David", "Scarlett", "Christopher", "Grace", "Andrew", "Lily", "Jack",
  "Victoria", "Noah", "Madison", "Olivia", "Liam", "Chloe", "Aiden", "Penelope", "Daniel", "Riley", "Carter",
  "Layla", "William", "Zoey", "Owen", "Nora", "Ethan", "Lily", "Alexander", "Eleanor", "Sebastian", "Hazel",
  "James", "Aria", "Benjamin", "Audrey", "Samuel", "Leah", "Joseph", "Grace", "Matthew", "Sophie", "John", "Zoe",
  "David", "Mila", "Jackson", "Aubrey", "Luke", "Stella", "Christopher", "Hannah", "Daniel", "Maya", "Anthony",
  "Savannah", "Gabriel", "Addison", "Nathan", "Ellie", "Dylan", "Claire", "Oliver", "Natalie", // Continue with more names...
];

// Function to get a random name from the array
function getRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

const likedNames = [];

app.post('/liked-baby', (req, res) => {
  const randomBaby = getRandomName();
  res.json({ data: randomBaby });
});

app.post('/random-baby', (req, res) => {
  const randomBaby = getRandomName();
  res.json({ data: randomBaby });
});


// POST route to return 5 new and different baby names in an array
app.post('/generate-baby-names', (req, res) => {
  const newNames = [];
  while (newNames.length < 5) {
    const randomName = getRandomName();
    if (!newNames.includes(randomName) && !likedNames.includes(randomName)) {
      newNames.push(randomName);
    }
  }
  res.json({ data: newNames });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});