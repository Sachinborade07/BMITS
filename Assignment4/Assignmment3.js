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

const upperCaseNames = products.map(product => product.name.toUpperCase());

console.log("Uppercase Product Names:", upperCaseNames);
