// Get references to HTML elements
const itemList = document.getElementById("item-list");
const likedList = document.getElementById("liked-list");

const addItemButton = document.getElementById("addItemButton");

const buttonNames = [];

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

          const name = newItemValue; // Get the name from the input field

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

          alert(`Added Baby Name: ${newItemValue}`);
          buttonNames.push(newItemValue);
          console.log(buttonNames)
          fetch('http://localhost:3000/liked-baby')
            .then((res) => res.json())
            .then((data) => {
              const likedNames = data.likedNames;
              // Clear the existing list
              likedList.innerHTML = '';

              // Create list items for each liked name and append them to the <ul>
              likedNames.forEach((name) => {
                const listItem = document.createElement('li');
                listItem.textContent = name;
                likedList.appendChild(listItem);
              });
            })
            .catch((error) => console.error(error));
        });
      })
      .catch((error) => console.error(error));
  }

});
