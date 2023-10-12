# Socket Chatroom

A simple chatroom application built with React for the frontend and Express with Socket.io for the backend. Each message sent is tagged with a unique connection ID.

[![DEMO](https://img.youtube.com/vi/o3Z5OzvDBYI/0.jpg)](https://youtu.be/o3Z5OzvDBYI)

## Features

- Real-time messaging
- Displays connection ID for each message
- Multiple users supported – tested using incognito mode

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Navigate to the backend directory:

   `cd backend`

2. Install the backend dependencies:

   `npm install`

3. Run the server:

   `npm start`

The server will start on `http://localhost:4000`


4. Navigate to the frontend directory:

   `cd frontend`

5. Install the frontend dependencies:

   `npm install`

6. Run the react:

   `npm start`

The server will start on `http://localhost:3000`


### Usage

Open multiple browser tabs or windows (incognito mode works great for testing multiple users) and navigate to `http://localhost:3000`. Type a message and send. You'll see the message, along with the connection ID, in real-time on all tabs:

   `npm run start`

   This will start the backend server.

2. Open several web browser tabs and go to `http://127.0.0.1:4000` to access the frontend UI.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
