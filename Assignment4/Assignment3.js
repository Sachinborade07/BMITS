// Task 1: Use map() to transform data
// Create an array of product objects with properties name, price, and category.
// Use map() to create a new array with product names in uppercase.

// Task 2: Use filter() to extract specific data
// Use filter() to create an array of products that belong to the 'Electronics' category.

// Task 3: Use reduce() to calculate a total
// Use reduce() to calculate the total price of all products in the array.

// Task 4: Combine map(), filter(), and reduce()
// Create a function that calculates the total price of products from a specific category using map(), filter(), and reduce()

const products = [
    { name: "Mobile", price: 200, category: "Electronics" },
    { name: "Shirt", price: 300, category: "Fashion" },
    { name: "Laptop", price: 400, category: "Electronics" },
    { name: "Shoes", price: 100, category: "Fashion" }
];

// Task1
const upperCaseNames = products.map(product => product.name.toUpperCase());
console.log("Uppercase Product Names:", upperCaseNames);

// Task2
const fashion = products.filter(product => product.category === "Fashion");
console.log(fashion);

// Task3
const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
console.log("The total price of all products is :-", totalPrice);

// Task4
function totalPriceByCategory(products, category) {
    const a = products.filter(product => product.category === category)
        .map(product => product.price)
        .reduce((sum, price) => sum + price, 0);
    return a;
}

console.log(totalPriceByCategory(products, "Fashion"));
console.log(totalPriceByCategory(products, "Electronics"));


/*
    OutPut:-
Task:1--- Uppercase Product Names: [ 'MOBILE', 'SHIRT', 'LAPTOP', 'SHOES' ]

Task:2---[
  { name: 'Shirt', price: 300, category: 'Fashion' },
  { name: 'Shoes', price: 100, category: 'Fashion' }
]

Task:3---The total price of all products is :- 1000

Task:4---400
600
*/