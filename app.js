
const list = document.getElementById("list");
const input = document.getElementById("text");
const form = document.getElementById("form");
const message = document.getElementById("message");

let tasks = [];

// Load saved tasks from localStorage
try {
    const saved = JSON.parse(
        localStorage.getItem("practice-tasks") || "[]"
    );

    if (Array.isArray(saved)) {
        tasks = saved.filter(
            task => typeof task === "string"
        );
    }
} catch (error) {
    tasks = [];
}

// Save tasks to localStorage
function save() {
    localStorage.setItem(
        "practice-tasks",
        JSON.stringify(tasks)
    );
}

// Display tasks
function render() {
    list.replaceChildren();

    tasks.forEach((text, index) => {

        const row = document.createElement("li");

        row.textContent = text;

        // Create Delete button
        const button = document.createElement("button");

        button.textContent = "Delete";

        button.onclick = () => {

            // Remove selected task
            tasks.splice(index, 1);

            // Save updated tasks
            save();

            // Display updated list
            render();

            message.textContent = "Task deleted!";
        };

        row.append(button);
        list.append(row);
    });
}

// Add new task
form.onsubmit = (e) => {

    e.preventDefault();

    const text = input.value.trim();

    // Reject empty tasks
    if (text === "") {
        message.textContent = "Please enter a task!";
        input.focus();
        return;
    }

    // Add task
    tasks.push(text);

    // Save tasks
    save();

    // Display tasks
    render();

    // Clear input
    input.value = "";

    message.textContent = "Task added successfully!";
};

// Display previously saved tasks
render();
