import inquirer from 'inquirer';

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'bread',
      message: 'Type of Breads:',
      choices: [
        { name: 'Wheat (+0.50)', value: 0.5 },
        { name: 'White (0.00)', value: 0 },
        { name: 'Pita (+1.00)', value: 1 },
      ],
    },
    {
      type: 'list',
      name: 'meat',
      message: 'Type of Meats:',
      choices: [
        { name: 'Roast Beef (+2.50)', value: 2.5 },
        { name: 'Ham (+1.75)', value: 1.75 },
        { name: 'Turkey (+2.00)', value: 2 },
        { name: 'Tuna (3.00)', value: 3 },
      ],
    },
    {
      type: 'list',
      name: 'cheese',
      message: 'Type of Cheeses:',
      choices: [
        { name: 'Swiss (+1.25)', value: 1.25 },
        { name: 'American (+0.50)', value: 0.5 },
        { name: 'Cheddar (+2.25)', value: 2.25 },
      ],
    },
    {
      type: 'checkbox',
      name: 'toppings',
      message: 'Additional Toppings (each one: +0.25):',
      choices: [
        'Tomato',
        'Pickles',
        'Onions',
        'Mushrooms',
        'Hot Chili\'s',
        'Green Peppers',
        'Olives',
      ],
    }
  ]);

  const { bread, meat, cheese, toppings } = answers;


  // Calculate the total price
  const totalPrice = bread + meat + cheese + (toppings.length * 0.25);

  console.log('\nYour Hoagie Order:');
  console.log(`Bread: $${bread.toFixed(2)}`);
  console.log(`Meat: $${meat.toFixed(2)}`);
  console.log(`Cheese: $${cheese.toFixed(2)}`);
  console.log(`Toppings(${toppings.toString()}): $${(toppings.length * 0.25).toFixed(2)}`);
  console.log(`Total Price: $${totalPrice.toFixed(2)}`);
}

main();
