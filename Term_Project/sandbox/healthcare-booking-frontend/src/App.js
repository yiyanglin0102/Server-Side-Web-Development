import React from 'react';
import './App.css';
import EventScheduler from './components/EventScheduler';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Event Scheduler</h1>
      </header>
      <main>
        <EventScheduler />
      </main>
    </div>
  );
}

export default App;
