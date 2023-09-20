// public/app.js
document.addEventListener('DOMContentLoaded', () => {
  const userGuessInput = document.getElementById('userGuess');
  const checkButton = document.getElementById('checkButton');
  const resultDiv = document.getElementById('result');
  const resultImage = document.getElementById('resultImage');
  const resultText = document.getElementById('resultText');

  checkButton.addEventListener('click', () => {
    const userGuess = userGuessInput.value;
    console.log(userGuess);
    fetch('http://localhost:3000/random-number')
      .then((response) => response.json())
      .then((data) => {
        const randomNumber = data.number;
        
        if (parseInt(userGuess) === randomNumber) {
          resultImage.src = 'thumbs-up.png';
          resultText.textContent = 'Correct!';
        } else {
          resultImage.src = 'thumbs-down.png';
          resultText.textContent = 'Wrong answer. Try again.';
        }

        resultDiv.classList.remove('hidden');
      })
      .catch((error) => console.error(error));
  });
});
