function iniciarCompra() {
    const nombre = document.getElementById('nombre').value.trim();
    const presupuesto = parseInt(document.getElementById('presupuesto').value.trim());
    const cantidad = parseInt(document.getElementById('cantidad').value.trim());
    const direccion = document.getElementById('direccion').value.trim();
    const tipoEntrega = document.querySelector('input[name="entrega"]:checked').value;
    const mensajeError = document.getElementById('mensaje-error');

    // Validaciones
    if (nombre === '' || presupuesto <= 0 || isNaN(presupuesto) || cantidad <= 0 || cantidad > 20 || direccion === '') {
        mensajeError.textContent = "Por favor, llene todos los campos correctamente.";
        return;
    }

    // Guardar en localStorage
    localStorage.setItem('nombreComprador', nombre);
    localStorage.setItem('presupuestoMaximo', presupuesto);
    localStorage.setItem('cantidadMaxima', cantidad);
    localStorage.setItem('direccionEntrega', direccion);
    localStorage.setItem('tipoEntrega', tipoEntrega);

    window.location.href = 'productos.html';
}

function limpiarCampos() {
    document.getElementById('requerimientos-form').reset();
    document.getElementById('mensaje-error').textContent = '';
}
