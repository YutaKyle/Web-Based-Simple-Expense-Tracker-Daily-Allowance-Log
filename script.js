var budget = 0;
var expenses = [];

function setBudget() {
  var inputVal = parseFloat(document.getElementById("budgetInput").value);

  if (isNaN(inputVal) || inputVal <= 0) {
    alert("Pakilagay naman ng tamang budget amount!");
    return;
  }

  budget = inputVal;
  updateSummary();
  document.getElementById("budgetInput").value = "";
}

function addExpense() {
  var name = document.getElementById("itemName").value;
  var amount = parseFloat(document.getElementById("itemAmount").value);
  var category = document.getElementById("itemCategory").value;

  if (name == "" || isNaN(amount) || amount <= 0) {
    alert("Pakilagay ng kumpletong details sa item at amount!");
    return;
  }

  var item = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  };

  expenses.push(item);

  document.getElementById("itemName").value = "";
  document.getElementById("itemAmount").value = "";

  renderExpenses();
  updateSummary();
}

function deleteExpense(id) {
  var updatedList = [];
  for (var i = 0; i < expenses.length; i++) {
    if (expenses[i].id != id) {
      updatedList.push(expenses[i]);
    }
  }
  expenses = updatedList;
  renderExpenses();
  updateSummary();
}

function updateSummary() {
  var totalSpent = 0;
  for (var i = 0; i < expenses.length; i++) {
    totalSpent += expenses[i].amount;
  }

  var remaining = budget - totalSpent;

  document.getElementById("budgetVal").innerText = budget.toFixed(2);
  document.getElementById("spentVal").innerText = totalSpent.toFixed(2);
  document.getElementById("remainVal").innerText = remaining.toFixed(2);

  var remainElement = document.getElementById("remainVal");
  if (remaining < 0) {
    remainElement.style.color = "red";
  } else {
    remainElement.style.color = "green";
  }
}

function renderExpenses() {
  var list = document.getElementById("expenseList");
  list.innerHTML = "";

  for (var i = 0; i < expenses.length; i++) {
    var exp = expenses[i];
    var li = document.createElement("li");

    li.innerHTML = `
      <div class="item-details">
        <strong>${exp.name} - ₱${exp.amount.toFixed(2)}</strong>
        <span class="category-tag">${exp.category}</span>
      </div>
      <button class="del-btn" onclick="deleteExpense(${exp.id})">Delete</button>
    `;

    list.appendChild(li);
  }
}
