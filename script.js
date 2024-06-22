document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Gestionnaire d'événement pour l'ajout de tâche
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const name = document.getElementById('task-name').value;
        const desc = document.getElementById('task-desc').value;
        const deadline = document.getElementById('task-deadline').value;

        const newTask = {
            title: name,
            completed: false,
            userId: 1,
            description: desc,
            deadline: deadline
        };

        // Envoi de la nouvelle tâche à l'API JSONPlaceholder
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const task = await response.json();
        addTaskToDOM(task); // Ajout de la tâche au DOM
        form.reset(); // Réinitialisation du formulaire

        // Affichage du message de confirmation
        showConfirmationMessage();
    });

    // Fonction pour récupérer les tâches existantes de l'API
    const fetchTasks = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const tasks = await response.json();
        tasks.forEach(task => addTaskToDOM(task)); // Ajout des tâches récupérées au DOM
    };

    // Fonction pour ajouter une tâche au DOM
    const addTaskToDOM = (task) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || 'No description'}</p>
            <p>Deadline: ${task.deadline || 'No deadline'}</p>
            <button data-id="${task.id}">Supprimer</button>
        `;
        taskList.insertBefore(taskCard, taskList.firstChild); // Insérer la nouvelle tâche au début de la liste

        // Gestionnaire d'événement pour la suppression de tâche
        taskCard.querySelector('button').addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });
            taskCard.remove(); // Suppression de la tâche du DOM
        });
    };

    // Fonction pour afficher le message de confirmation
    const showConfirmationMessage = () => {

        
        confirmationMessage.classList.remove('hidden'); // Affiche le message de confirmation

        confirmationMessage.classList.add('show'); // Affiche le message de confirmation
        setTimeout(() => {
            confirmationMessage.classList.remove('show'); // Cache le message après 3 secondes
        }, 3000);
    };

    fetchTasks(); // Récupération initiale des tâches lors du chargement de la page
});
