// 1. Inicializar el carrito (leer de localStorage o empezar vacío)
let carrito = JSON.parse(localStorage.getItem('cart-meteora')) || [];

/**
 * Función para agregar productos al carrito
 */
const agregarAlCarrito = (id) => {
    const existe = carrito.find(prod => prod.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        // 'productos' viene de data.js
        const producto = productos.find(prod => prod.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContador();
    alert("¡Fragmento añadido con éxito a tu colección!");
};

/**
 * Guarda el estado actual en LocalStorage
 */
const guardarCarrito = () => {
    localStorage.setItem('cart-meteora', JSON.stringify(carrito));
};

/**
 * Actualiza el contador visual en el Navbar
 */
const actualizarContador = () => {
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        contador.innerText = totalItems;
    }
};

/**
 * Renderiza la tabla en carrito.html con formato de moneda USD
 */
const renderizarTablaCarrito = () => {
    const tabla = document.getElementById('items-carrito');
    const totalElemento = document.getElementById('precio-total');
    
    if (!tabla) return; // Seguridad si no estamos en la página del carrito

    tabla.innerHTML = "";
    let totalAcumulado = 0;

    // Formateador profesional para Dólares (USD)
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    carrito.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad;
        totalAcumulado += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${prod.imagen}" width="50" class="me-3 rounded border border-secondary" alt="${prod.nombre}">
                    <span class="fw-bold">${prod.nombre}</span>
                </div>
            </td>
            <td>${USDollar.format(prod.precio)}</td>
            <td>${prod.cantidad}</td>
            <td>${USDollar.format(subtotal)}</td>
            <td>
                <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito(${prod.id})">
                    Eliminar
                </button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    // Actualizar el total con formato moneda
    if (totalElemento) {
        totalElemento.innerText = USDollar.format(totalAcumulado);
    }
};

/**
 * Elimina un producto por ID
 */
const eliminarDelCarrito = (id) => {
    carrito = carrito.filter(prod => prod.id !== id);
    guardarCarrito();
    actualizarContador();
    renderizarTablaCarrito();
};

/**
 * Vacía el carrito completo
 */
const vaciarCarrito = () => {
    if(confirm("¿Deseas eliminar todos los artículos de tu carrito?")) {
        carrito = [];
        guardarCarrito();
        actualizarContador();
        renderizarTablaCarrito();
    }
};

/**
 * Simula la finalización de compra
 */
const finalizarCompra = () => {
    alert("Procesando pago en USD... ¡Gracias por adquirir un tesoro espacial en METEORA!");
    carrito = [];
    guardarCarrito();
    window.location.href = "index.html";
};

// Ejecutar actualización de contador al cargar cualquier página
document.addEventListener('DOMContentLoaded', actualizarContador);