const colorInput = document.getElementById('paletteInput');
const svgImg = document.getElementById('paletteBox');
const paint = document.getElementById('paintBox');
const bucket = document.getElementById('bucketBox');
const erase = document.getElementById('eraseBox');

let colorChosen;
let isPaint = false;
let isBucket = false;

let fullSize = 0;

if (savedImageFile.name != "") {
    //sumamos el nombre a al texto introducido.

    if (savedImageFile.name) {
        fileName.innerText = savedImageFile.name + ".img";
        fullSize += savedImageFile.name.length;
    }
    if (savedImageFile.contentNotSaved) {
        console.log("pintando la página.");
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

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        console.log(`Recuadro ${index + 1} ha sido pulsado`);
        if (isPaint) {
            box.style.backgroundColor = colorChosen;
        } else if (isBucket) {
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
        let contentSize = 0;
        savedImageFile.contentNotSaved.forEach((color) => {
            if (color != "") {
                contentSize++;
            }
        });
        fullSize = contentSize + savedImageFile.name.length;
        fileSize.innerText = fullSize + ' bytes';
        console.log(savedImageFile.contentNotSaved);
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
    });
});

colorInput.addEventListener('change', () => {
    console.log(`Color seleccionado: ${colorInput.value}`);
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

closeButton.addEventListener('click', leaveApp);

function leaveApp() {
    //comprobamos si el usuario ha guardado el archivo
    if (checkImageFileSaved()) {
        previousPage();
    }

}