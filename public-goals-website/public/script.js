document.addEventListener('DOMContentLoaded', () => {
    const goalForm = document.getElementById('goalForm');
    const goalList = document.getElementById('goalList');

    // Load goals from localStorage
    const loadGoals = () => {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const goalItem = document.createElement('div');
            goalItem.className = 'goal-item';
            goalItem.innerHTML = `
                <p><strong>Goal:</strong> ${goal.goal}</p>
                <p><strong>Description:</strong> ${goal.description}</p>
                <p><strong>Deadline:</strong> ${goal.deadline}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            goalList.appendChild(goalItem);
        });
    };

    // Save goals to localStorage
    const saveGoal = (goal) => {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(goal);
        localStorage.setItem('goals', JSON.stringify(goals));
        loadGoals();
    };

    // Delete a goal from localStorage
    const deleteGoal = (index) => {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.splice(index, 1);
        localStorage.setItem('goals', JSON.stringify(goals));
        loadGoals();
    };

    // Handle form submission
    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const goal = {
            goal: goalForm.goal.value,
            description: goalForm.description.value,
            deadline: goalForm.deadline.value || 'No deadline'
        };
        saveGoal(goal);
        goalForm.reset();
    });

    // Handle goal deletion
    goalList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteGoal(index);
        }
    });

    // Initial load of goals
    loadGoals();
});
