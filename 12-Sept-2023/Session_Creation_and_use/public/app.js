// Get references to HTML elements
const itemList = document.getElementById("item-list");
const likedList = document.getElementById("liked-list");

const addItemButton = document.getElementById("addItemButton");
const getLikedButton = document.getElementById("getLiked");

const testButton = document.getElementById("test");

const buttonNames = [];

testButton.addEventListener('click', () => {
  const name = "test123"; // Get the name from the input field

  // Create a JSON object with the name to send in the request body
  const requestBody = {
    name: name,
  };

  fetch('http://localhost:3000/like', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody), // Convert the object to JSON
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
    })
    .catch((error) => console.error(error));
});

getLikedButton.addEventListener('click', () => {
  fetch('http://localhost:3000/liked-baby')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.error(error));
});

// Add a click event listener to the "Add Item" button
addItemButton.addEventListener("click", () => {
  // Clear the existing buttons
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Get the text from the input field
  for (let i = 0; i < 5; i++) {
    fetch('http://localhost:3000/random-baby')
      .then((response) => response.json())
      .then((data) => {
        const randomBaby = data.data;
        const newItemValue = randomBaby;
        const newButton = document.createElement("button");
        newButton.textContent = newItemValue;
        itemList.appendChild(newButton);

        // Add a click event listener to the new button
        newButton.addEventListener("click", () => {
          alert(`Added Baby Name: ${newItemValue}`);
          buttonNames.push(newItemValue);
          console.log(buttonNames)
        });
      })
      .catch((error) => console.error(error));
  }

});
