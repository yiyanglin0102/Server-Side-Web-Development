// public/app.js
document.addEventListener('DOMContentLoaded', () => {
  const checkButton = document.getElementById('checkButton');
  const resultDiv = document.getElementById('result');
  
  // Example usage

  checkButton.addEventListener('click', () => {

    fetch('http://localhost:3000/random-baby')
      .then((response) => response.json())
      .then((data) => {
        const randomBaby = data.data;
        console.log(`${randomBaby}`);
     // Set the innerHTML of the resultText element to display the randomBaby
     resultText.textContent = `Random Baby: ${randomBaby}`;

     // Remove the 'hidden' class to show the result element
     resultDiv.classList.remove('hidden');

      })
      .catch((error) => console.error(error));
  });
});
