var expenseForm = document.getElementById("expense-form");
var expenseList = document.getElementById("expense-list");
var amountInput = document.getElementById("amount");
var descriptionInput = document.getElementById("description");
var categoryInput = document.getElementById("category");
var dateInput = document.getElementById("date");
var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
// Function to display expenses
function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(function (expense, index) {
        var row = document.createElement("tr");
        row.innerHTML = "\n            <td>".concat(expense.amount, "</td>\n            <td>").concat(expense.description, "</td>\n            <td>").concat(expense.category, "</td>\n            <td>").concat(expense.date, "</td>\n            <td><button onclick=\"deleteExpense(").concat(index, ")\">\u274C</button></td>\n        ");
        expenseList.appendChild(row);
    });
}
// Function to add expense
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var newExpense = {
        amount: Number(amountInput.value),
        description: descriptionInput.value,
        category: categoryInput.value,
        date: dateInput.value,
    };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    amountInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    displayExpenses();
});
// Function to delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}
// Display stored expenses on load
displayExpenses();
