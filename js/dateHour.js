// Función para actualizar la fecha y hora
function updateDateTime() {
    // Obtener la fecha y hora actual
    let now = new Date();
    // Convertir la fecha y hora en una cadena de texto
    //let actualTime = now.toLocaleTimeString(); //hora con segundos
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let actualTime = hours + ':' + minutes;
    let actualDate = now.toLocaleDateString();

    // Mostrar la fecha y hora en un elemento HTML con el ID "datetime"
    document.getElementById("hour").innerHTML = actualTime;
    document.getElementById("date").innerHTML = actualDate
}

// Actualizar la fecha y hora cada 10 segundos (10000 milisegundos)
updateDateTime();
setInterval(updateDateTime, 10000);