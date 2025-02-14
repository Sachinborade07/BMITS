interface Expense {
    amount: number;
    description: string;
    category: Category;
    date: string;
}

enum Category {
    Food = "Food",
    Travel = "Travel",
    Bills = "Bills",
    Shopping = "Shopping",
}

const form = document.getElementById("expense-form") as HTMLFormElement;
const list = document.getElementById("expense-list") as HTMLTableElement;
const amount = document.getElementById("amount") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const category = document.getElementById("category") as HTMLSelectElement;
const date = document.getElementById("date") as HTMLInputElement;

let expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

const showExpenses = () => {
    list.innerHTML = expenses.map((e, i) => `
        <tr>
            <td>${e.amount}</td>
            <td>${e.description}</td>
            <td>${e.category}</td>
            <td>${e.date}</td>
            <td><button onclick="removeExpense(${i})"> ❌ </button></td>
        </tr>
    `).join("");
};

form.onsubmit = (e) => {
    e.preventDefault();
    expenses.push({
        amount: +amount.value,
        description: description.value,
        category: category.value as Category,
        date: date.value
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    form.reset();
    showExpenses();
};

function removeExpense(index: number) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
}

showExpenses();