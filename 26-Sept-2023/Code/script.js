document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const showSavedButton = document.getElementById('showSavedButton');
    const generatedNumbersDiv = document.getElementById('generatedNumbers');
    const savedNumbersDiv = document.getElementById('savedNumbers');
    const saveThisSetButton = document.getElementById('saveThisSetButton');

    // Add an event listener to the "Save This Set" button
    saveThisSetButton.addEventListener('click', () => {
        // Get the currently displayed numbers
        const displayedNumbers = generatedNumbersDiv.textContent;

        // Call the saveNumbers function to save the displayed numbers
        saveNumbers(displayedNumbers);
        
        // Optionally, you can provide some feedback to the user (e.g., an alert)
        alert('This set of numbers has been saved!');
    });
    // Function to generate new lottery numbers
    function generateNewNumbers() {
        // Make a request to your server's API here to get new lottery numbers
        // Replace the URL with the actual API endpoint
        fetch('http://127.0.0.1:3000/get_powerball_numbers')
            .then(response => response.json())
            .then(data => {
                const numbers = data.numbers;
                const powerBall = data.powerBall;
               
                const numbersArray = Array.from(numbers);

                // Display the generated numbers
                generatedNumbersDiv.innerHTML = numbers + ", Powerball:" + powerBall;

                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        // Save the generated numbers in local storage
        // saveNumbers(numbers + ", Powerball:" + powerBall);
    }

    // Function to save numbers in local storage
    function saveNumbers(numbers) {
        const savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
        savedNumbers.push(numbers);
        localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
    }

    // Function to display saved numbers
    function showSavedNumbers() {
        const savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
        const savedNumbersList = document.createElement('ul');

        savedNumbers.forEach((numbers, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = numbers;

            // Add a delete button for each saved set of numbers
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteSavedNumbers(index);
            });

            listItem.appendChild(deleteButton);
            savedNumbersList.appendChild(listItem);
        });

        savedNumbersDiv.innerHTML = '';
        savedNumbersDiv.appendChild(savedNumbersList);
    }

    // Function to delete saved numbers
    function deleteSavedNumbers(index) {
        const savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
        savedNumbers.splice(index, 1);
        localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers));
        showSavedNumbers();
    }

    // Event listeners
    generateButton.addEventListener('click', generateNewNumbers);
    showSavedButton.addEventListener('click', showSavedNumbers);
});
