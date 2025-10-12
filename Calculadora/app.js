// variables
const calculadora = document.getElementById('calculadora')
const resultado = document.getElementById('resultado')
const historialContenedor = document.getElementById('historial-textarea');

const menuBtn = document.getElementById('menu-btn');
const menu = document.querySelector('.menu');

const botonModo = document.getElementById('modo-oscuro');
const botonHistorial = document.getElementById('ver-historial');

// eventos
calculadora.addEventListener('click', añadirNumeros)

// Operaciones
let operaciones = []

// Array para historial (cargar desde localStorage si existe)
let historial = JSON.parse(localStorage.getItem('historialCalculadora')) || [];

// Función para guardar en LocalStorage
function guardarHistorial() {
    localStorage.setItem('historialCalculadora', JSON.stringify(historial));
}

// Función mostrarHistorial
function mostrarHistorial() {
  if (historial.length === 0) {
    historialContenedor.value = 'No hay operaciones';
  } else {
    historialContenedor.value = historial.map(item =>
      `[${item.fecha}] ${item.operacion} = ${item.resultado}`
    ).join("\n");
  }
}

// ----- Menú -----
menuBtn.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Cerrar el menú al hacer clic fuera
window.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target)) {
    menu.style.display = 'none';
  }
});


// Modo oscuro
// --- Al cargar la página ---
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('modoOscuro') === 'dark') {
    document.body.classList.add('dark-mode');
    botonModo.textContent = 'Modo claro';
  } else {
    botonModo.textContent = 'Modo oscuro';
  }
});

// --- Botón modo oscuro ---
botonModo.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

    // Cambiar texto según el estado
  if (document.body.classList.contains('dark-mode')) {
    botonModo.textContent = 'Modo claro';
  } else {
    botonModo.textContent = 'Modo oscuro';
  }

// Guardar estado en localStorage
  localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Historial: mostrar en textarea
botonHistorial.addEventListener('click', () => {
  if (historialContenedor.style.display === 'block') {
    // Ocultar historial
    historialContenedor.style.display = 'none';
    botonHistorial.textContent = 'Ver historial';
  } else {
    // Mostrar historial
    mostrarHistorial();
    historialContenedor.style.display = 'block';
    botonHistorial.textContent = 'Ocultar historial';
  }
});
//borrar historial
document.getElementById('borrar-historial').addEventListener('click', () => {
  historial = [];
  guardarHistorial();
  historialContenedor.style.display = 'none';
  alert('Historial borrado');
});
   

// Al presionar "=" en tu calculadora
document.getElementById('igual').addEventListener('click', () => {
    try {
        if (resultado.value.trim() === '') return;
        const res = eval(resultado.value); 
        const registro = {
            operacion: resultado.value,
            resultado: res,
            fecha: new Date().toLocaleString()
        };
        historial.push(registro);
        guardarHistorial();
        resultado.value = res;

        // refrescar SOLO si el textarea está visible
        if (historialContenedor.style.display === 'block') {
          mostrarHistorial();
        }

    } catch (e) {
        resultado.value = 'Error';
    }
});


// añadirNumeros
function añadirNumeros(e){
	if(e.target.getAttribute('type') === 'button'){
        const id = e.target.id;

        // Números
        if(!e.target.classList.contains('operacion') && id !== 'igual' && id !== 'clear'){
            resultado.value += e.target.innerText;
        }

        // Operadores
        if(id === 'sumar')       resultado.value += '+';
        if(id === 'restar')      resultado.value += '-';
        if(id === 'multiplicar') resultado.value += '*';
        if(id === 'dividir')     resultado.value += '/';

        // Limpiar
        if(id === 'clear') resultado.value = '';
    }
}


