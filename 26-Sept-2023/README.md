# The Powerball Lottery Numbers Generator

This is a simple Powerball Lottery Numbers generator and user interface (UI) created using HTML, CSS, and JavaScript. The application generates random Powerball numbers and allows users to save and display the generated numbers.

[![DEMO](https://img.youtube.com/vi/YSZ_lJUNVbs/0.jpg)](https://youtu.be/YSZ_lJUNVbs)

## Features

- Generate new random Powerball numbers.
- Save generated numbers.
- Display a list of saved numbers.
- Delete saved number sets.

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Navigate to the project directory:

   `cd Code`


2. Install project dependencies by running the following command:

   `npm install`

Running the Application

1. Start the server by running the following command in the project directory './Session_Creation_and_use' :

   `npm run start`

   This will start the backend server.

2. Open a web browser and go to `http://127.0.0.1:4000` to access the frontend UI.

### Usage

- Click the "Generate New Numbers" button to generate a new set of Powerball numbers.
- Click the "Save This Set" button to save the currently displayed numbers.
- Click the "Show Saved Numbers" button to display a list of saved number sets.
- For each saved set of numbers, you can click the "Delete" button to remove it from the list.

### Server-Side API

The application uses a Node.js server with Express.js to generate random Powerball numbers. The server exposes an API endpoint at `/get_powerball_numbers` to retrieve random numbers. The server code is available in the `powerball_server.js` file.

### Requirements

1. This project uses frontend ES6 Modules in client-side JavaScript.
2. The backend is implemented using Node.js.
3. CSS is used to create a user-friendly UI that looks good on both mobile phones and standard laptop displays (1440 x 980).

### License

This project is licensed under the MIT License. See the LICENSE file for details.
