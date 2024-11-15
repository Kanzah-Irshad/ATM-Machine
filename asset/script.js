let userPin = ''; // Store the user's PIN
let currentOption = ''; // Track the selected option
let balance = 0; // Track the balance after deposits and withdrawals

// Function to toggle PIN visibility
function toggleVisibility(pinId) {
  const pinInput = document.getElementById(pinId);
  pinInput.type = pinInput.type === 'password' ? 'text' : 'password';
}

// Show screens one by one
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Step 1: Set PIN
function setPin() {
  const pinInput = document.getElementById('setPin').value;
  if (pinInput.length === 4 && /^\d{4}$/.test(pinInput)) {
    userPin = pinInput;
    alert("PIN set successfully!");
    showScreen('cardInsertScreen');
  } else {
    alert("Please enter a valid 4-digit PIN.");
  }
}

// Step 2: Insert Card
function insertCard() {
  alert("Card inserted successfully. Please enter your PIN.");
  showScreen('pinVerifyScreen');
}

// Step 3: Verify PIN
function verifyPin() {
  const enteredPin = document.getElementById('verifyPin').value;
  if (enteredPin === userPin) {
    alert("PIN verified successfully!");
    showScreen('optionsScreen');
  } else {
    alert("Incorrect PIN. Please try again.");
  }
}

// Reset PIN if forgotten
function resetPin() {
  showScreen('welcomeScreen');
  alert("Please set a new PIN.");
}

// Step 4: Select Transaction Option
function selectOption(option) {
  currentOption = option;
  const transactionTitle = document.getElementById('transactionTitle');
  const amountInput = document.getElementById('amount');
  const accountNumberInput = document.getElementById('accountNumber');

  // Reset and hide inputs initially
  amountInput.value = ''; // Clear the amount field
  amountInput.placeholder = 'Enter Amount'; // Add placeholder text
  amountInput.style.display = 'none';
  accountNumberInput.value = ''; // Clear account number for transfer
  accountNumberInput.style.display = 'none';

  // Display appropriate input fields based on selected option
  switch (option) {
    case 'deposit':
      transactionTitle.innerText = 'Deposit';
      amountInput.style.display = 'block';
      break;
    case 'withdraw':
      transactionTitle.innerText = 'Withdraw';
      amountInput.style.display = 'block';
      break;
    case 'transfer':
      transactionTitle.innerText = 'Transfer Money';
      amountInput.style.display = 'block';
      accountNumberInput.style.display = 'block';
      accountNumberInput.placeholder = 'Enter Account Number';
      break;
    case 'checkBalance':
      transactionTitle.innerText = 'Check Balance';
      alert(`Your remaining balance is: ${balance}`);
      showScreen('thankYouScreen');
      return;
  }

  showScreen('transactionScreen');
}

// Step 5: Complete Transaction
function completeTransaction() {
  const amount = parseFloat(document.getElementById('amount').value);
  const accountNumber = document.getElementById('accountNumber').value;

  switch (currentOption) {
    case 'deposit':
      if (amount > 0) {
        balance += amount;
        alert(`Deposited: ${amount}. New Balance: ${balance}`);
        showScreen('optionsScreen');
      } else {
        alert("Please enter a valid amount.");
      }
      break;

    case 'withdraw':
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        alert(`Withdrew: ${amount}. Remaining Balance: ${balance}`);
        showScreen('optionsScreen');
      } else {
        alert("Insufficient funds or invalid amount.");
      }
      break;

    case 'transfer':
      if (amount > 0 && accountNumber) {
        alert(`Transferred ${amount} to account: ${accountNumber}`);
        showScreen('thankYouScreen');
      } else {
        alert("Please enter a valid amount and account number.");
      }
      break;
  }
}
