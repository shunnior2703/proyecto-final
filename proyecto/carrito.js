let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const tablaCarrito = document.querySelector('#carrito-tabla tbody');
const totalProductos = document.getElementById('total-productos');
const totalPagar = document.getElementById('total-pagar');
const checkboxDomicilio = document.getElementById('domicilio');

// Cargar productos en el carrito
function renderizarCarrito() {
    tablaCarrito.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        cantidadTotal += item.cantidad;

        tablaCarrito.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" alt="${item.nombre}" width="80"></td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td>$${subtotal}</td>
                <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    totalProductos.textContent = cantidadTotal;
    totalPagar.textContent = `$${total + (checkboxDomicilio.checked ? 15000 : 0)}`;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

// Evento para actualizar total con domicilio
checkboxDomicilio.addEventListener('change', renderizarCarrito);

// Validar y confirmar compra
function confirmarCompra() {
    const numeroTarjeta = document.getElementById('numero-tarjeta').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;
    const codigoSeguridad = document.getElementById('codigo-seguridad').value;
    const nombreTitular = document.getElementById('nombre-titular').value;

    if (!numeroTarjeta || !fechaExpiracion || !codigoSeguridad || !nombreTitular) {
        alert('Por favor llena todos los campos.');
        return;
    }

    document.querySelector('button[onclick="confirmarCompra()"]').disabled = true;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            const aleatorio = Math.random();
            if (aleatorio > 0.5) resolve();
            else reject('Error en la validación de pago');
        }, Math.random() * 1000 + 2000);
    })
        .then(() => {
            alert('Pago realizado con éxito');
            localStorage.clear();
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert(error);
            document.querySelector('button[onclick="confirmarCompra()"]').disabled = false;
        });
}

// Limpiar formulario
function limpiarCampos() {
    document.getElementById('form-pago').reset();
}

renderizarCarrito();
