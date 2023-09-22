import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON request bodies

// Sample array of names
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
let likedNames = ["Gabriel"];


// Function to get a random name from the array
function getRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

app.get('/random-baby', (req, res) => {
  const randomBaby = getRandomName();
  res.json({ data: randomBaby });
});


app.get('/liked-baby', (req, res) => {
  const randomBaby = getRandomName();
  res.json({ data: likedNames[0] });
});


app.post('/like', (req, res) => {
  const { name } = req.body; // Get the name from the request body
  likedNames.push(name); // Add the name to the likedNames array
  console.log(likedNames);
  res.json({ data: likedNames }); // Respond with the updated likedNames array
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
