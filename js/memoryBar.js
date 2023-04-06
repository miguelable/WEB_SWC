var canvas = document.getElementById("memoryBar");
var ctx = canvas.getContext("2d");
var min = 0;
var max = 1000;
var borderRadius = 10;

// Función para actualizar la barra de memoria
function updateMemoryBar(memmoryStatus) {
    // Calcular el porcentaje de la barra que se debe rellenar
    var percentage = (memmoryStatus - min) / (max - min);

    // Definir el color de la barra
    ctx.fillStyle = "#474747";

    // Dibujar la barra
    ctx.fillRect(0, 0, canvas.width * percentage, canvas.height);

    // Dibujar la barra con bordes redondeados
    ctx.beginPath();
    ctx.fill();
}

// Llamada a la función con el valor inicial de la memoria
updateMemoryBar(memmoryStatus);