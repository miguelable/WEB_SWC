// extraemos los elementos del DOM que usaremos para las alertas
// input de color que selecciona el usuario.
const colorInput = document.getElementById('paletteInput');
// icono de paleta de colores
const svgImg = document.getElementById('paletteBox');
// icono de pincel
const paint = document.getElementById('paintBox');
// icono de cubo
const bucket = document.getElementById('bucketBox');
// icono de borrar
const erase = document.getElementById('eraseBox');

// Extraemos los elementos del DOM que usaremos para guardar la imagen (por defecto negro)
let colorChosen = 'black';
// indicador si estamos usando el cubo o el pincel
let isPaint = false;
let isBucket = false;

// mostramos el nombre y tamaño del fichero si se estaba editando ya uno.
let fullSize = 0;
if (savedImageFile.name) {
    //sumamos el nombre a al texto introducido.
    if (savedImageFile.name) {
        fileName.innerText = savedImageFile.name + ".img";
        fullSize += savedImageFile.name.length;
    }
    if (savedImageFile.contentNotSaved && savedImageFile.contentNotSaved.length != 0) {
        for (let i = 0; i < imageArea.children.length; i++) {
            imageArea.children[i].style.backgroundColor = savedImageFile.contentNotSaved[i];
            //contador de tamaño del fichero de imagen
            if (savedImageFile.contentNotSaved[i] != "") {
                fullSize++;
            }
        }
    }
    if (fullSize) {
        fileSize.innerText = fullSize + ' bytes';
    }
}

// para cada cuadrado le asignamos un evento de click
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        // en función de si está seleccionado el pincel o el cubo se hace una cosa u otra
        if (isPaint) box.style.backgroundColor = colorChosen;
        else if (isBucket) {
            // Calculamos la posicion del grid como si fuera una matriz, así podemos identificar mejor los bordes.
            const row = Math.floor(index / 8);
            const col = index % 8;
            // llamamos a la funcion printArea que es una función recursiva.
            pintarArea(row, col, colorChosen);
        }
        //Extraer todo los colores del lienzo para guardarlos en la session
        savedImageFile.contentNotSaved = boxes.map((colorBox) => {
            return colorBox.style.backgroundColor;
        });
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        //contador de tamaño del fichero de imagen
        let contentSize = 0;
        savedImageFile.contentNotSaved.forEach((color) => {
            if (color != "") contentSize++;
        });
        fullSize = contentSize + savedImageFile.name.length;
        fileSize.innerText = fullSize + ' bytes';
        // si se pinta algun cuadrado se deselecciona el boton de guardar
        saveFile.removeAttribute("style", "filter: invert(100%);");
    });
});

// evento de color cambiado
colorInput.addEventListener('change', () => {
    // cambiamos el color de la paleta de colores
    svgImg.style.fill = colorInput.value;
    colorChosen = colorInput.value;
});

//cambiar el cursor a un pincel
paint.addEventListener('click', function() {
    document.body.style.cursor = 'url("../img/Paint.cur"), auto';
    isPaint = true;
    isBucket = false;
});
//camiar el cursor a un cubo
bucket.addEventListener('click', function() {
    document.body.style.cursor = 'url("../img/Bucket.cur"), auto';
    isBucket = true;
    isPaint = false;
});
// llamar a la alerta de borrar imagen.
erase.addEventListener('click', function() {
    document.body.style.cursor = 'auto';
    isPaint = false;
    isBucket = false;
    eraseImage();
});

// funcion que hace la lógica de pintar un area (recursiva)
function pintarArea(x, y, nuevoColor) {
    let colorOriginal = boxes[(x * 8) + y].style.backgroundColor;
    boxes[(x * 8) + y].style.backgroundColor = nuevoColor;
    // Recorrer las baldosas adyacentes del mismo color
    if (x > 0 && boxes[((x - 1) * 8) + y].style.backgroundColor === colorOriginal) {
        pintarArea(x - 1, y, nuevoColor);
    }
    if (x < 7 && boxes[((x + 1) * 8) + y].style.backgroundColor === colorOriginal) {
        pintarArea(x + 1, y, nuevoColor);
    }
    if (y > 0 && boxes[(x * 8) + (y - 1)].style.backgroundColor === colorOriginal) {
        pintarArea(x, y - 1, nuevoColor);
    }
    if (y < 7 && boxes[(x * 8) + (y + 1)].style.backgroundColor === colorOriginal) {
        pintarArea(x, y + 1, nuevoColor);
    }
}

// funcion que comprueba si el usuario ha guardado el archivo y sale de la aplicacion
closeButton.addEventListener('click', leaveApp);

function leaveApp() {
    //comprobamos si el usuario ha guardado el archivo
    if (checkImageFileSaved()) {
        previousPage();
    }

}

// crear nuevo fichero de imagen
newFile.addEventListener('click', newImageFile);