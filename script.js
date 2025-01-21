// Obtener elementos del DOM
const form = document.getElementById('productForm');
const cardsContainer = document.getElementById('cardsContainer');

// Array para almacenar los productos
let productos = [];

// Cargar productos del localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
  const productosGuardados = localStorage.getItem('productos');
  if (productosGuardados) {
    productos = JSON.parse(productosGuardados);
    mostrarProductos();
  } else {
    mostrarVacio();
  }
});

// Manejar el envío del formulario
form.addEventListener('submit', e => {
  e.preventDefault();

  // Obtener valores del formulario
  const producto = {
    id: Date.now(), // ID único basado en timestamp
    nombre: document.getElementById('name').value,
    precio: document.getElementById('price').value,
    imagen: document.getElementById('image').value,
  };

  // Agregar el producto al array
  productos.push(producto);

  // Guardar en localStorage
  guardarEnLocalStorage();

  // Mostrar los productos
  mostrarProductos();

  // Limpiar el formulario
  form.reset();
});

// Función para guardar en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para mostrar los productos
function mostrarProductos() {
  cardsContainer.innerHTML = ''; // Limpiar el contenedor

  productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
              <img src="${producto.imagen}" alt="${producto.nombre}" />
              <h4>${producto.nombre}</h4>
              <div>
                <span>$ ${producto.precio}</span>
                <i onclick="eliminarProducto(${producto.id})" class="delete fa-solid fa-trash-can"></i>
              </div>
            `;
    cardsContainer.appendChild(card);
  });
}

// Función para eliminar un producto
function eliminarProducto(id) {
  productos = productos.filter(producto => producto.id !== id);
  guardarEnLocalStorage();
  mostrarProductos();
}

// Función para mostrar imagen de productos vacios
function mostrarVacio() {
  cardsContainer.innerHTML = `
  <div class="empty-card">
            <h4>Parece que aun no has agregado nada...</h4>
            <img class="not-found" src="images/notFound.png" alt="" />
          </div>
  `; // Limpiar el contenedor
}
