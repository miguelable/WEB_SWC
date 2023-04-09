const textInfo = document.querySelector('#textShadow');
const imageInfo = document.querySelector('#imageShadow');
const textContainer = document.getElementById('textContainer');
const imageContainer = document.getElementById('imageContainer');


if (savedTextFilesMemory) {
    for (let i = 0; i < savedTextFilesMemory.length; i++) {
        addTextFileToContainer(savedTextFilesMemory[i]);
    }
}

if (savedImageFilesMemory) {
    for (let i = 0; i < savedImageFilesMemory.length; i++) {
        addImageFileToContainer(savedImageFilesMemory[i]);
    }
}



// Función para crear elementos y agregarlos al contenedor principal
function addTextFileToContainer(file) {
    // Crear contenedor de archivo
    const fileDiv = document.createElement("div");
    fileDiv.className = "fileItem fileText";

    // Crear div de contenido de texto
    const textDiv = document.createElement("div");
    textDiv.className = "textContentDiv overflowStyle";

    // Crear párrafo de texto y establecer el contenido
    const text = document.createElement("p");
    text.className = "textFormat";
    text.textContent = file.content;

    // Agregar párrafo al div de contenido de texto
    textDiv.appendChild(text);

    // Agregar el div de contenido de texto al contenedor de archivo
    fileDiv.appendChild(textDiv);

    // Crear imagen de información
    const infoImg = document.createElement("img");
    infoImg.className = "iconFormat imgIcon";
    infoImg.src = "../img/Info.png";
    infoImg.alt = "Info.png";

    // Agregar imagen de información al contenedor de archivo
    fileDiv.appendChild(infoImg);

    // Crear título de archivo y establecer el contenido
    const title = document.createElement("h5");
    title.className = "textTitle";
    title.textContent = file.name + ".txt";

    // Agregar título al contenedor de archivo
    fileDiv.appendChild(title);

    // Crear imagen de eliminación
    const trashImg = document.createElement("img");
    trashImg.className = "iconFormat trashIcon";
    trashImg.src = "../img/Trash.svg";
    trashImg.alt = "Trash.png";

    // Agregar imagen de eliminación al contenedor de archivo
    fileDiv.appendChild(trashImg);

    // Agregar contenedor de archivo al contenedor principal
    textContainer.appendChild(fileDiv);


    //----------------------- Crear contenedor de información detallada del archivo -----------------------------//
    var fileInfoDiv = document.createElement('div');
    fileInfoDiv.className = "fileItem fileTextInfo hiddenInfo"

    // Crear el contenedor de la información del archivo
    var infoContentDiv = document.createElement('div');
    infoContentDiv.className = "InfoContentDiv"

    // Crear los elementos de texto con la información del archivo
    var fileNameP = document.createElement('p');
    fileNameP.className = "dataContent";
    fileNameP.innerHTML = '<strong>Name:</strong> ' + file.name;

    var fileExtensionP = document.createElement('p');
    fileExtensionP.className = "dataContent"
    fileExtensionP.innerHTML = '<strong>Extension:</strong> ' + "txt";


    let fileSize = file.content.length + file.name.length;
    var fileSizeP = document.createElement('p');
    fileSizeP.className = "dataContent";
    fileSizeP.innerHTML = '<strong>Size:</strong> ' + fileSize;

    const dateObj = new Date(file.date);
    var fileDateP = document.createElement('p');
    fileDateP.className = "dataContent";
    fileDateP.innerHTML = '<strong>Date:</strong> ' + dateObj.toLocaleTimeString() + " " + dateObj.toLocaleDateString();

    // Añadir los elementos de texto al contenedor de información del archivo
    infoContentDiv.appendChild(fileNameP);
    infoContentDiv.appendChild(fileExtensionP);
    infoContentDiv.appendChild(fileSizeP);
    infoContentDiv.appendChild(fileDateP);

    // Crear el botón de cerrar
    var exitInfoImg = document.createElement('img');
    exitInfoImg.setAttribute('src', '../img/Close.png');
    exitInfoImg.setAttribute('alt', 'close.png');
    exitInfoImg.className = "iconFormat closeIcon";

    // Crear el título del archivo
    var fileTitleH5 = document.createElement('h5');
    fileTitleH5.className = "textTitle";
    fileTitleH5.innerText = file.name + ".txt";

    // Crear espacio sin contenido para que el texto mantenga un sentido
    var whiteSpace = document.createElement('span');
    whiteSpace.className = "iconFormat"

    // Añadir todos los elementos al contenedor principal de la información detallada del archivo
    fileInfoDiv.appendChild(infoContentDiv);
    fileInfoDiv.appendChild(exitInfoImg);
    fileInfoDiv.appendChild(fileTitleH5);
    fileInfoDiv.appendChild(whiteSpace);

    // Agregar contenedor de archivo al contenedor principal
    textContainer.appendChild(fileInfoDiv);
}

// Función para crear elementos de imagen y agregarlos al contenedor principal
function addImageFileToContainer(file) {
    // Crear contenedor de archivo
    const fileDiv = document.createElement("div");
    fileDiv.className = "fileItem fileImage";

    // Crear imagen de archivo y establecer el contenido
    const contentDiv = document.createElement("div");
    contentDiv.className = "imageContentDiv centerImage";

    // Creamos el array de cuadrados con sus colores
    const imageDiv = document.createElement("div");
    imageDiv.className = "boxLayout";
    imageDiv.id = "imageArea";

    // Creamos el array de cuadrados con sus colores
    for (let i = 0; i < 64; i++) {
        const square = document.createElement("div");
        square.className = "box";
        square.style.backgroundColor = file.content[i];
        imageDiv.appendChild(square);
    }

    // Agregar imagen al contenedor de archivo
    contentDiv.appendChild(imageDiv);

    // Agregar el div de contenido de imagen al contenedor de archivo
    fileDiv.appendChild(contentDiv);

    // Crear imagen de información
    const infoImg = document.createElement("img");
    infoImg.className = "iconFormat imgIcon";
    infoImg.src = "../img/Info.png";
    infoImg.alt = "Info.png";

    // Agregar imagen de información al contenedor de archivo
    fileDiv.appendChild(infoImg);

    // Crear título de archivo y establecer el contenido
    const title = document.createElement("h5");
    title.className = "textTitle";
    title.textContent = file.name + ".png";

    // Agregar título al contenedor de archivo
    fileDiv.appendChild(title);

    // Crear imagen de eliminación
    const trashImg = document.createElement("img");
    trashImg.className = "iconFormat trashIcon";
    trashImg.src = "../img/Trash.svg";
    trashImg.alt = "Trash.png";

    // Agregar imagen de eliminación al contenedor de archivo
    fileDiv.appendChild(trashImg);

    // Agregar contenedor de archivo al contenedor principal
    imageContainer.appendChild(fileDiv);

    //----------------------- Crear contenedor de información detallada del archivo -----------------------------//
    var fileInfoDiv = document.createElement('div');
    fileInfoDiv.className = "fileItem fileTextInfo hiddenInfo"

    // Crear el contenedor de la información del archivo
    var infoContentDiv = document.createElement('div');
    infoContentDiv.className = "InfoContentDiv"

    // Crear los elementos de texto con la información del archivo
    var fileNameP = document.createElement('p');
    fileNameP.className = "dataContent";
    fileNameP.innerHTML = '<strong>Name:</strong> ' + file.name;

    var fileExtensionP = document.createElement('p');
    fileExtensionP.className = "dataContent"
    fileExtensionP.innerHTML = '<strong>Extension:</strong> ' + "txt";


    let fileSize = file.content.length + file.name.length;
    var fileSizeP = document.createElement('p');
    fileSizeP.className = "dataContent";
    fileSizeP.innerHTML = '<strong>Size:</strong> ' + fileSize;

    const dateObj = new Date(file.date);
    var fileDateP = document.createElement('p');
    fileDateP.className = "dataContent";
    fileDateP.innerHTML = '<strong>Date:</strong> ' + dateObj.toLocaleTimeString() + " " + dateObj.toLocaleDateString();

    // Añadir los elementos de texto al contenedor de información del archivo
    infoContentDiv.appendChild(fileNameP);
    infoContentDiv.appendChild(fileExtensionP);
    infoContentDiv.appendChild(fileSizeP);
    infoContentDiv.appendChild(fileDateP);

    // Crear el botón de cerrar
    var exitInfoImg = document.createElement('img');
    exitInfoImg.setAttribute('src', '../img/Close.png');
    exitInfoImg.setAttribute('alt', 'close.png');
    exitInfoImg.className = "iconFormat closeIcon";

    // Crear el título del archivo
    var fileTitleH5 = document.createElement('h5');
    fileTitleH5.className = "textTitle";
    fileTitleH5.innerText = file.name + ".txt";

    // Crear espacio sin contenido para que el texto mantenga un sentido
    var whiteSpace = document.createElement('span');
    whiteSpace.className = "iconFormat"

    // Añadir todos los elementos al contenedor principal de la información detallada del archivo
    fileInfoDiv.appendChild(infoContentDiv);
    fileInfoDiv.appendChild(exitInfoImg);
    fileInfoDiv.appendChild(fileTitleH5);
    fileInfoDiv.appendChild(whiteSpace);

    // Agregar contenedor de archivo al contenedor principal
    textContainer.appendChild(fileInfoDiv);

}

// cuando pulsamos el boton de textFiles mostramos los ficheros de texto
textInfo.addEventListener('click', () => {
    textContainer.classList.remove('hiddenInfo');
    imageContainer.classList.add('hiddenInfo');
    textInfo.classList.add('shadowColor');
    imageInfo.classList.remove('shadowColor');
});

// cuando pulsamos el boton de imageFiles mostramos los ficheros de imagen
imageInfo.addEventListener('click', () => {
    textContainer.classList.add('hiddenInfo');
    imageContainer.classList.remove('hiddenInfo');
    textInfo.classList.remove('shadowColor');
    imageInfo.classList.add('shadowColor');
});


const infoImg = document.querySelectorAll('.imgIcon');
const exitInfoImg = document.querySelectorAll('.closeIcon');
const delateImg = document.querySelectorAll('.trashIcon');
// cuando pulsamos el boton de info mostramos la informacion del fichero
for (let i = 0; i < infoImg.length; i++) {
    infoImg[i].addEventListener('click', () => {
        infoImg[i].parentNode.classList.add('hiddenInfo');
        infoImg[i].parentNode.nextSibling.classList.remove('hiddenInfo');
    });
    exitInfoImg[i].addEventListener('click', () => {
        infoImg[i].parentNode.classList.remove('hiddenInfo');
        infoImg[i].parentNode.nextSibling.classList.add('hiddenInfo');
    });
    delateImg[i].addEventListener('click', () => {
        daletFile(delateImg[i].parentNode);
    });

}

const fileText = document.querySelectorAll('.fileText');
const fileTextInfo = document.querySelectorAll('.fileTextInfo');
console.log(fileText);

//asignamos a cada objeto un eventlistener de doble click tanto a la cara principal como a la de info
for (let i = 0; i < fileText.length; i++) {
    fileText[i].addEventListener('dblclick', () => {
        if (savedTextFile.name) {
            // alerta de fichero abierto
            textFileNotSaved(savedTextFilesMemory[i]);
            console.log("one file open");
        } else {
            openFile(savedTextFilesMemory[i]);
            console.log("no file open");
        }
    });
}
for (let i = 0; i < fileText.length; i++) {
    fileTextInfo[i].addEventListener('dblclick', () => {
        if (savedTextFile.name) {
            // alerta de fichero abierto
            textFileNotSaved(savedTextFilesMemory[i]);
            console.log("one file open");
        } else {
            openFile(savedTextFilesMemory[i]);
            console.log("no file open");
        }
    });
}

function openFile(file) {
    //abrimos el fichero
    savedTextFile.name = file.name;
    savedTextFile.content = file.content;
    savedTextFile.contentNotSaved = file.content;
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
    // nos dirigimos a la pagina de editar ficheros
    window.location.href = 'textEditor.html';
}

closeButton.addEventListener('click', previousPage);