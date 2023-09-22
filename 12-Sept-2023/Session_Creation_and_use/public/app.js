// Get references to HTML elements
const itemList = document.getElementById("item-list");
const addItemButton = document.getElementById("addItemButton");
const buttonNames = []; // Array to store button names

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
        });
      })
      .catch((error) => console.error(error));
  }
  console.log(buttonNames)
});
