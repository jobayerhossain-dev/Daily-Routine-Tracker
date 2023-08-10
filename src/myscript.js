// Array of day abbreviations
const days = ["S", "S", "M", "T", "W", "T", "F"];

// DOM elements
const habitForm = document.getElementById("habit-form");
const output = document.getElementById("output");
const todayDate = document.getElementById("today-date");
const habitNameInput = document.getElementById("habit-name");

// Set to store unique habit names
const uniqueHabits = new Set();

// Display today's date
function displayDate() {
  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  todayDate.textContent = today.toLocaleDateString("en-US", options);
}

// Generate an array of days starting from the current day
function generateDays() {
  const today = new Date().getDay();
  return [...days.slice(today), ...days.slice(0, today)];
}

// Event listener for form submission
habitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const habitName = habitNameInput.value;

  if (uniqueHabits.has(habitName) || habitName === "") {
    alert(`The habit name cannot be empty or duplicate.`);
    return;
  }

  addHabit(habitName);
  uniqueHabits.add(habitName);
  habitNameInput.value = ""; // Clear the input field
});

// Add a new habit to the display
function addHabit(name) {
  // Create habit container
  const habitContainer = document.createElement("div");
  habitContainer.classList = "habit-box";

  // Create habit label
  const habitLabel = document.createElement("label");
  habitLabel.textContent = name;
  habitLabel.classList = "text-xl";
  habitContainer.appendChild(habitLabel);

  // Create delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.classList = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    habitContainer.remove();
  });
  habitContainer.appendChild(deleteBtn);

  // Create days wrapper
  const daysWrapper = document.createElement("div");
  daysWrapper.classList = "days-wrapper";

  // Generate days for display
  const currentDays = generateDays();

  // Create days rows
  const daysRows = document.createElement("div");
  daysRows.classList = "days-row";
  daysRows.style.display = "flex";

  // Create day labels with click event listeners
  currentDays.forEach((day) => {
    const dayLabel = document.createElement("span");
    dayLabel.innerText = day;
    dayLabel.classList = "day-label";
    dayLabel.addEventListener("click", () => {
      dayLabel.classList.toggle("completed");
    });
    daysRows.appendChild(dayLabel);
  });

  // Append day rows to the wrapper
  daysWrapper.appendChild(daysRows);
  habitContainer.appendChild(daysWrapper);

  // Append habit container to the display
  output.appendChild(habitContainer);
}

// Initialize the date display and other functionality
displayDate();
