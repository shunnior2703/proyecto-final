const productosLista = document.getElementById('productos-lista');
const carritoTabla = document.getElementById('carrito-tabla');
const totalCompra = document.getElementById('total-compra');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productosCargados = 0;
const productosPorCargar = 6; // Número de productos a cargar por cada evento de scroll

// Función para cargar productos
function cargarProductos() {
    // Si hemos llegado al final de la lista, empezar desde el inicio
    if (productosCargados >= motos.length) {
        productosCargados = 0;
    }
    
    // Cargar un fragmento de productos desde la lista
    const productosAMostrar = motos.slice(productosCargados, productosCargados + productosPorCargar);

    productosAMostrar.forEach((moto, index) => {
        productosLista.innerHTML += `
            <div class="card">
                <img src="${moto.imagen}" alt="${moto.nombre}">
                <h3>${moto.nombre}</h3>
                <p>Precio: $${moto.precio}</p>
                <p>Cilindraje: ${moto.cilindraje}cc</p>
                <p>cantidadDisponible: ${moto.cantidadDisponible}cc</p>
                <button onclick="agregarAlCarrito(${productosCargados + index})">Agregar al Carrito</button>
            </div>
        `;
    });

    productosCargados += productosAMostrar.length;
}

// Función para detectar el scroll
function detectarScroll() {
    const scrollFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    
    // Si el usuario llega al final de la página, cargar más productos (o empezar desde el inicio si ya se han cargado todos)
    if (scrollFinal) {
        cargarProductos();
    }
}

// Agregar evento de scroll
window.addEventListener('scroll', detectarScroll);

// Agregar al carrito
function agregarAlCarrito(index) {
    const moto = motos[index];
    const cantidad = parseInt(prompt('Cantidad a agregar (solo números positivos):'));
    
    if (isNaN(cantidad) || cantidad <= 0) return alert('Por favor ingresa una cantidad válida.');

    // Verificar si ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === moto.nombre);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ ...moto, cantidad });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Actualizar tabla del carrito
function actualizarCarrito() {
    carritoTabla.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        carritoTabla.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal}</td>
                <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
    });
    totalCompra.textContent = `$${total}`;
}

// Eliminar producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Inicializar
cargarProductos();
actualizarCarrito();
