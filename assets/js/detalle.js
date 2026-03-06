document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el ID desde la URL
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get('id'));

    // 2. Buscar el producto en nuestro array de data.js
    const producto = productos.find(p => p.id === idProducto);

    // 3. Si el producto existe, lo dibujamos
    if (producto) {
        const contenedor = document.getElementById('detalle-producto');
        contenedor.innerHTML = `
            <div class="col-md-6 text-center">
                <img src="${producto.imagen}" class="img-fluid rounded shadow-lg border border-secondary p-2" alt="${producto.nombre}" style="max-height: 500px;">
            </div>
            <div class="col-md-6">
                <h1 class="display-4 font-orbitron text-info">${producto.nombre}</h1>
                <p class="text-secondary fs-5">${producto.origen} | ${producto.tipo}</p>
                <hr class="border-secondary">
                <p class="lead">${producto.descripcion}</p>
                <p class="text-muted small italic">Nota científica: ${producto.prompt}</p>
                <h2 class="my-4 text-light fw-bold">$${producto.precio}</h2>
                <button class="btn btn-primary btn-lg w-100" onclick="agregarAlCarrito(${producto.id})">
                    Añadir al Carrito de METEORA
                </button>
                <a href="index.html" class="btn btn-link text-info mt-3">← Volver al catálogo</a>
            </div>
        `;
    } else {
        // Si alguien pone un ID que no existe
        document.getElementById('detalle-producto').innerHTML = "<h2>Producto no encontrado</h2>";
    }
});