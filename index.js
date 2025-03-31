class Expense {
  constructor(name, amount, category) {
    this.id = Date.now(); // Unique ID
    this.name = name;
    this.amount = amount;
    this.category = category;
  }
  formatExpense() {
    return `${this.name}: $${this.amount.toFixed(2)} [${this.category}]`;
  }
}
let expenses = [];
const total_header = document.getElementById("total");
let total = 0;
function addExpense(category, description, amount) {
  const expense = new Expense(description, Number(amount), category);

  // Add to expenses array
  expenses.push(expense);
  //update ui
  updateExpenseList(expenses);
}
function deleteExpense(index) {
  expenses.splice(index, 1); // Remove the item at that index
  updateExpenseList(expenses); // Re-render the list
}
const categorySelect = document.getElementById("category");

categorySelect.addEventListener("change", () => {
  let selectedCategory = categorySelect.value;
  let all = false;

  let filteredExpenses = expenses.filter((expense) =>
    selectedCategory === "All"
      ? (all = true)
      : expense.category === selectedCategory
  );

  updateExpenseList(all ? expenses : filteredExpenses);
});
function updateExpenseList(expensed) {
  const ul = document.querySelector(".allexpenses");

  // Use .map() to generate HTML strings for each expense
  ul.innerHTML = expensed
    .map(
      (expense, index) => `
          <li>
            <span class="category">${expense.category}</span>
            <span class="description">${expense.name}</span>
            <span class="amount">$${expense.amount}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
          </li>
        `
    )
    .join(""); // Convert array into a single string
  total = 0;
  expenses.forEach((expense) => {
    total += expense.amount;
  });
  total_header.textContent = `$${total}`;
}
function display() {
  const amount = document.getElementById("amount").value;
  const despricption = document.getElementById("description").value;
  const category = document.querySelector(
    'input[name="category"]:checked'
  ).value;

  //   console.log(amount);
  //   console.log(category);
  //   console.log(despricption);
  addExpense(category, despricption, amount);
}
