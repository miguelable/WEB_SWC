// parrafo de información del tamaño utilizado de la memoria
const memoryInfo = document.getElementById('memoryInfo');

// estructura de canvas
const canvas = document.getElementById("memoryBar");
const ctx = canvas.getContext("2d");
const min = 0;
const max = 1000;
const borderRadius = 10;

// Función para actualizar la barra de memoria
function updateMemoryBar(memmoryStatus) {
    // Calcular el porcentaje de la barra que se debe rellenar
    let percentage = (memmoryStatus - min) / (max - min);

    // Definir el color de la barra
    ctx.fillStyle = "#969696";

    // Dibujar la barra
    ctx.fillRect(0, 0, canvas.width * percentage, canvas.height);

    // Dibujar la barra con bordes redondeados
    ctx.beginPath();
    ctx.fill();

}

// Llamada a la función con el valor inicial de la memoria
updateMemoryBar(memmoryStatus);

// actualizar el parrafo de memoryinfo
if (memmoryStatus == null || memmoryStatus < 0) {
    memoryInfo.innerHTML = "0 / 1000 Bytes";
    memmoryStatus = 0;
    sessionStorage.setItem('memmoryStatus', memmoryStatus);
} else memoryInfo.innerHTML = memmoryStatus + " / 1000 Bytes";