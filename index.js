const Amount = document.getElementById("amount");
const Despricption = document.getElementById("description");
const Categories = document.querySelectorAll('input[name="category"]');
const add_button = document.getElementById("add-button");
const save_button = document.getElementById("save-button");
let i = 0;
class Expense {
  constructor(name, amount, category) {
    this.name = name;
    this.amount = amount;
    this.category = category;
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
function editExpense(index) {
  Amount.value = expenses[index].amount;
  Despricption.value = expenses[index].name;
  Categories.forEach((item) => {
    if (item.value === expenses[index].category) {
      item.checked = true;
    }
  });
  i = index;
  add_button.style.display = "none";
  save_button.style.display = "inline";
}
function saveExpense() {
  expenses[i] = new Expense(
    Despricption.value,
    Number(Amount.value),
    document.querySelector('input[name="category"]:checked').value
  );
  save_button.style.display = "none";
  add_button.style.display = "inline";
  updateExpenseList(expenses);
  document.getElementById("amount").value = "1";
  document.getElementById("description").value = "";
  document.querySelector('input[name="category"]:checked').checked = false;
}
function deleteExpense(index) {
  let result = confirm("are you sure ?");
  if (result) {
    expenses.splice(index, 1); // Remove the item at that index
    updateExpenseList(expenses); // Re-render the list
  }
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
            <button onclick="editExpense(${index})">edit</button>
          </li>
        `
    )
    .join(""); // Convert array into a single string
  total = 0;
  expensed.forEach((expense) => {
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

  addExpense(category, despricption, amount);
  document.getElementById("amount").value = "1";
  document.getElementById("description").value = "";
  document.querySelector('input[name="category"]:checked').checked = false;
}
