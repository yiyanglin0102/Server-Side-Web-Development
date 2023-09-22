import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON request bodies

// Sample array of names
const names = [
  "Melina", "Ayala", "Tanner", "Fleming", "Fatima", "Russell", "Weston", "Barry", "Waverly", "Nolan",
  "Maximo", "Lawson", "Phoebe", "Ramirez", "David", "Wheeler", "Sydney", "Solis", "Ronin", "Hale",
  "Brinley", "Moses", "Niklaus", "Hensley", "Malaya", "Merritt", "Colten", "Whitehead", "Sylvie", "Franco",
  "Gage", "Vance", "Maxine", "Craig", "Odin", "Hunter", "Khloe", "Castillo", "Kai", "Anthony",
  "Macy", "Franco", "Gage", "Beasley", "Jaylah", "Daugherty", "Turner", "Xiong", "Amayah", "Lester",
  "Lee", "Shaffer", "Alanna", "Benitez", "Justice", "Donaldson", "Natasha", "Norman", "Aziel", "Peters",
  "Leila", "Hobbs", "Brendan", "Montgomery", "Evangeline", "Floyd", "Pierce", "Mata", "Lillie", "Proctor",
  "Vance", "Durham", "Tiffany", "Bradford", "Ander", "Serrano", "Allie", "Liu", "Pedro", "Wallace",
  "Arianna", "Parra", "Davion", "Harper", "Ana", "Campos", "Gideon", "Reynolds", "Isabelle", "Melton",
  "Lennon", "Duke", "Melani", "O'Neal", "Eddie", "Sanchez", "Aria", "Cantrell", "Harris", "Middleton",
  "Madalyn", "Steele", "Elian", "Walls", "Lilianna", "Hess", "Lawrence", "Patterson", "Kaylee", "Becker",
  "Lawson", "Conner", "Alondra", "Poole", "Quincy", "Mercado", "Mckinley", "Morrison", "Maximus", "Cervantes",
  "Aylin", "Parra", "Davion", "Ingram", "Katie", "Duncan", "Avery", "Pennington", "Yareli", "Robertson",
  "Emiliano", "Stanton", "Jaycee", "Bowers", "Dorian", "Rosales", "Kinley", "Tyler", "Emmitt", "Thornton",
  "Haisley", "Wise", "Frederick", "Meyer", "Sara", "Powell", "Bennett", "Boyd", "Georgia", "Guerrero",
  "Bryce", "Underwood", "Ensley", "Parsons", "Lewis", "Khan", "Mabel", "Gutierrez", "Luca", "Thompson",
  "Madison", "Huber", "Mac", "Caldwell", "Evelynn", "Frederick", "Kase", "Nolan", "Itzayana", "Sims",
  "Brian", "Moore", "Emily", "Deleon", "Nasir", "Nunez", "Mya", "Archer", "Ephraim", "Merritt", "Kaisley", "Lewis",
  "Wyatt", "Hurley", "Rylan", "Yates", "Braylon", "Phelps", "Laney", "Russo", "Jamie", "Vaughn", "Reign", "Rowe",
  "Kamden", "Chan", "Hattie", "Frye", "Franco", "Frederick", "Sariyah", "McFarland", "Dane", "Hobbs", "Lacey", "Lugo",
  "Santos", "Briggs", "Alia", "Bartlett", "Kace", "Bullock", "Winnie", "Villa", "Clay", "Brooks", "Autumn", "McIntyre",
  "Eliseo", "Velazquez", "Jaliyah", "French", "Corey", "Donovan", "Azariah", "Pearson", "Gunner", "English", "Kelly", "Jimenez",
  "Silas", "Townsend", "Azalea", "Mayo", "Jericho", "Barnett", "Harlow", "Wong", "Walter", "Hanson", "Mariana", "Joseph",
  "Kyle", "Church", "Ayleen", "Wilcox", "Jerry", "McKee", "Kori", "Kline", "Ramon", "Melton", "Kamiyah", "Burke", "Jax", "Savage",
  "Louise", "Cunningham", "Alejandro", "Duncan", "Elise", "Palacios", "Thaddeus", "Frank", "Dior", "Rivas", "Damon", "George",
  "Adelyn", "Clay", "Yosef", "Duran", "Willa", "Mata", "Ray", "Robles", "Felicity", "Cantu", "Anakin", "Walker", "Hazel", "Cannon",
  "Archie", "Lane", "Amy", "Ward", "Jameson", "Bernal", "Emmeline", "Cline", "Cullen", "Baker", "Isla", "Tran", "Braxton", "Guerrero",
  "Margot", "Moses", "Niklaus", "Gordon", "Taylor", "Russo", "Jamie", "Mata", "Lillie", "Enriquez", "Elisha", "McKenzie", "Briar", "Huff",
  "Finnley", "Smith", "Olivia", "McGuire", "Casey", "Kelly", "Ruby", "Morales", "Aaron", "Cameron", "Julie", "Person", "Moses", "Davis",
  "Mia", "Donaldson", "Canaan", "Nichols", "Aliyah", "Pacheco", "Erik", "Horn", "Avah", "Clark", "John", "Dennis", "Maisie", "Robles",
  "Otto", "Schmitt", "Queen", "Kennedy", "Maxwell", "Schmidt", "Kimberly", "Mora", "Arturo", "Mitchell", "Willow", "Flores", "Lincoln", "Rhodes",
  "Tatum", "Randall", "Trenton", "Harper", "Ana", "Rhodes", "Titus", "Strong", "Margo", "Fowler", "Kameron", "Arellano", "Faye", "Carey",
  "Watson", "Logan", "Kora", "Wagner", "Enzo", "Copeland", "Dayana", "Villanueva", "Huxley", "Hail", "Lainey", "Logan", "Rocco", "Hess",
  "Kaliyah", "Fitzpatrick", "Blaze", "Serrano", "Allie", "Hoffman", "Steven", "Keith", "Elyse", "Reed", "Easton", "Medina", "Elliana", "Calderon",
  "Oakley", "Rollins", "Araceli", "Sharp", "Royce", "Jefferson", "Julieta", "Cox", "Connor", "Levy", "Flora", "Mosley", "Rayden", "Lewis",
  "Ellie", "Osborne", "Augustus", "Byrd", "Giselle", "Coffey", "Kody", "Waller", "Whitley", "Gordon", "Karter", "Bernal", "Emmeline", "Page",
  "Pablo", "Simmons", "Reagan", "Lyons", "Cyrus", "Payne", "London", "Adkins", "Kylo", "Murphy", "Bella", "Morgan", "Hunter", "Cherry",
  "Nyomi", "Wilcox", "Jerry", "Edwards", "Ivy", "Powell", "Bennett", "Ochoa", "Luciana", "Luna", "Erick", "Bernal", "Emmeline", "Quintero",
  "Thatcher", "Michael", "Aubriella", "Allen", "Carter", "Avery", "Meghan", "Lamb", "Kaysen", "Dominguez", "Raegan", "Hart", "Joel", "Massey",
  "Clementine", "Andersen", "Alistair", "Kelley", "Rosalie", "Jennings", "Corbin", "Brandt", "Loretta", "Brewer", "Cruz", "Richmond",
  "Whitney", "Berg", "Cayson", "Gonzalez", "Abigail", "Weaver", "Tucker", "Esquivel", "Jaylee", "Moran", "Tate", "Hammond", "Holly", "Fitzpatrick",
  "Blaze", "Wells", "Cecilia", "Meyers", "Julien", "Chen", "Valeria", "Zamora", "Quentin", "Brewer", "Thea", "Porter", "Rhett", "Goodwin",
  "Shiloh", "Ibarra", "Asa", "Buck", "Livia", "Taylor", "Jackson", "Page", "Cataleya", "Moyer", "Ahmir", "Oliver", "Camille", "Rojas",
  "Colin", "Jenkins", "Rylee", "Gomez", "Isaiah", "Ryan", "Morgan", "Conley", "Marvin", "Watson", "Hailey", "Bentley", "Randy", "Clarke",
  "Kaitlyn", "Clark", "John", "Cordova", "Florence", "Hebert", "Guillermo", "Landry", "Brynleigh", "Underwood", "Reece", "Russo",
  "Tinsley", "Arnold", "Abraham", "Dillon", "Laurel", "Schroeder", "Izaiah", "Huffman", "Hayley", "Potts", "Alfred", "Vang", "Madisyn", "Hurst",
  "Neil", "Bell", "Melody", "Peters", "Patrick", "Farley", "Wrenley", "Lamb", "Kaysen", "Contreras", "Daniela", "Wyatt", "Sam", "Hopkins",
  "Gabriela", "Lee", "Jack", "Rojas", "Adaline", "Peters", "Patrick", "Kramer", "Hanna", "Perry", "Waylon", "Trevino", "Priscilla", "Barron",
  "Dustin", "Bauer", "Haley", "English", "Junior", "Travis", "Mazikee", "Bryant", "Jonah", "Stevenson", "Regina", "Hunter", "Archer", "Burch",
  "Freyja", "Cruz", "Ryan", "Harrington", "Legacy", "Parker", "Caleb", "Mathews", "Sloan"
]

let likedNames = [];

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
  res.json({ likedNames: likedNames }); // Respond with the entire likedNames array
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
