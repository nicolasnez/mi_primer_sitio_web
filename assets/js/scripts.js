function mostrarFechaActualizable() {
    let fecha = new Date();
    document.getElementById('fecha_actualizable').innerHTML= 'Hola, hoy es ' + fecha;
    let tiempo = setTimeout(function() {
        mostrarFechaActualizable()
    },1000);
}