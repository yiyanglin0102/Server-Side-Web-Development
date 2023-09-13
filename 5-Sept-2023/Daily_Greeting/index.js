// Function to get the current time in EST (Eastern Standard Time)
function getCurrentTimeInEST() {
  const now = new Date();
  const utcOffset = -5; // EST UTC offset
  const estTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
  return estTime;
}

// Function to determine the appropriate greeting based on the time
function getGreeting() {
  const currentTime = getCurrentTimeInEST();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

// Get the greeting and display it
const greeting = getGreeting();
console.log(greeting);
