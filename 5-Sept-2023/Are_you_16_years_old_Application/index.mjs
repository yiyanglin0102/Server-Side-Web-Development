import inquirer from 'inquirer';
import { calculateAge } from './calculateAge.js';

const questions = [
  {
    type: 'input',
    name: 'month',
    message: 'Enter your month of birth (1 through 12):',
    validate: function (value) {
      const isValid = /^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 12;
      return isValid || 'Please enter a valid month (1 through 12).';
    },
  },
  {
    type: 'input',
    name: 'date',
    message: 'Enter your date of birth (1 through 31):',
    validate: function (value) {
      const isValid = /^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 31;
      return isValid || 'Please enter a valid date (1 through 31).';
    },
  },
  {
    type: 'input',
    name: 'year',
    message: 'Enter your year of birth (1900 through 2023):',
    validate: function (value) {
      const isValid = /^\d+$/.test(value) && parseInt(value) >= 1900 && parseInt(value) <= 2023;
      return isValid || 'Please enter a valid year (1900 through 2023).';
    },
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    const { month, date, year } = answers;
    // Calculate the age
    const age = calculateAge(month, date, year);

    // Check if the person is 16 years old or not
    if (age === 16) {
      console.log('You are 16 years old.');
    } else if (age < 16) {
      console.log('You are younger than 16 years old.');
    } else {
      console.log('You are older than 16 years old.');
    }

  })
  .catch((error) => {
    console.error('Error:', error);
  });
