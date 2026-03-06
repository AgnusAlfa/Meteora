/**
 * Función que recorre el array de productos y crea las Cards de Bootstrap
 */
const mostrarProductos = (listaProductos) => {
    // 1. Capturamos el contenedor por su ID (el que acabamos de encontrar)
    const contenedor = document.getElementById('productos-container');

    // 2. Recorremos el array usando forEach
    listaProductos.forEach(producto => {
        // 3. Creamos un elemento 'div' para la columna
        const col = document.createElement('div');
        
        // REQUISITO: col-12 (móvil), col-md-6 (tablet), col-lg-4 (3 productos en desktop)
        col.className = 'col-12 col-md-6 col-lg-4';

        // 4. Inyectamos el contenido de la Card de Bootstrap
        col.innerHTML = `
            <div class="card h-100 bg-black border-secondary text-white shadow-sm">
                <img src="${producto.imagen}" class="card-img-top p-3" alt="${producto.nombre}" style="height: 250px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-info font-orbitron">${producto.nombre}</h5>
                    <p class="card-text small text-secondary">${producto.origen}</p>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fs-5 fw-bold text-light">$${producto.precio}</span>
                        <a href="detalle.html?id=${producto.id}" class="btn btn-outline-info btn-sm">Ver más</a>
                    </div>
                    <button class="btn btn-primary mt-3 w-100" onclick="agregarAlCarrito(${producto.id})">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;

        // 5. Agregamos la columna al contenedor principal
        contenedor.appendChild(col);
    });
};

// 6. Ejecutamos la función cuando el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
});


const buscador = document.getElementById('buscador');

buscador.addEventListener('keyup', (e) => {
    const texto = e.target.value.toLowerCase();
    
    // Filtramos el array original de data.js
    const productosFiltrados = productos.filter(prod => {
        return prod.nombre.toLowerCase().includes(texto) || 
               prod.origen.toLowerCase().includes(texto);
    });

    // Limpiamos el contenedor y volvemos a renderizar solo los filtrados
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = "";
    mostrarProductos(productosFiltrados);
});