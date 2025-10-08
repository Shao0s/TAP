const addForm = document.querySelector('.add');
const list = document.querySelector('.to-dos');

// --- FUNCIONES DE LOCALSTORAGE ---
const getToDos = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
};

const saveToDos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// --- GENERAR HTML ---
const generateTemplate = (toDo) => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${toDo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html;
};

// --- CARGAR TO-DOs AL INICIO ---
const loadToDos = () => {
    const todos = getToDos();
    todos.forEach(todo => generateTemplate(todo));
};

// --- AGREGAR NUEVO TO-DO ---
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const newToDo = addForm.add.value.trim();

    if (newToDo.length) {
        generateTemplate(newToDo);

        // Guardar en localStorage
        const todos = getToDos();
        todos.push(newToDo);
        saveToDos(todos);

        addForm.reset();
    }
});

// --- BORRAR TO-DO ---
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const item = e.target.parentElement;
        const todos = getToDos().filter(todo => todo !== item.querySelector('span').textContent);
        saveToDos(todos);
        item.remove();
    }
});

// --- INICIALIZAR ---
loadToDos();
