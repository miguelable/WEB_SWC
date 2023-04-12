// Seleccionar los elementos del DOM que se van a utilizar
const textInfo = document.querySelector('#textShadow');
const imageInfo = document.querySelector('#imageShadow');
const textContainer = document.getElementById('textContainer');
const imageContainer = document.getElementById('imageContainer');

// Obtener el estado de la ventana de texto o imagen guardado en sessionStorage
let isImageOpen = sessionStorage.getItem('isImageOpen');

// Si hay archivos de texto eliminados, agregarlos al contenedor
if (deletedTextFilesMemory) {
    for (let i = 0; i < deletedTextFilesMemory.length; i++) {
        addTextFileToContainer(deletedTextFilesMemory[i]);
    }
}

// Si hay archivos de imagen eliminados, agregarlos al contenedor
if (deletedImageFilesMemory) {
    for (let i = 0; i < deletedImageFilesMemory.length; i++) {
        addImageFileToContainer(deletedImageFilesMemory[i]);
    }
}

// Si la ventana de imagen estaba abierta antes de la última sesión, 
// mostrar la vista de imagen y ocultamos la de texto
if (isImageOpen == "true") {
    textContainer.classList.add('hiddenInfo');
    imageContainer.classList.remove('hiddenInfo');
    textInfo.classList.remove('shadowColor');
    imageInfo.classList.add('shadowColor');
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
    trashImg.className = "iconFormat trashTxtIcon";
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

    // Crear elemento de información de nombre
    var fileNameP = document.createElement('p');
    fileNameP.className = "dataContent";
    fileNameP.innerHTML = '<strong>Name:</strong> ' + file.name;

    // Crear elemento de información de extensión
    var fileExtensionP = document.createElement('p');
    fileExtensionP.className = "dataContent"
    fileExtensionP.innerHTML = '<strong>Extension:</strong> ' + "txt";

    // Calcular tamaño del archivo
    let fileSize = file.content.length + file.name.length;

    // Crea elemento de información de tamaño
    var fileSizeP = document.createElement('p');
    fileSizeP.className = "dataContent";
    fileSizeP.innerHTML = '<strong>Size:</strong> ' + fileSize + " bytes";

    // Crear elemento de información de fecha
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

    // Crear el botón de recuperar fichero
    var restoreText = document.createElement('img');
    restoreText.setAttribute('src', '../img/Restore.png');
    restoreText.setAttribute('alt', 'Restore.png');
    restoreText.className = "iconFormat restoreTextIcon";

    // Añadir todos los elementos al contenedor principal de la información detallada del archivo
    fileInfoDiv.appendChild(infoContentDiv);
    fileInfoDiv.appendChild(exitInfoImg);
    fileInfoDiv.appendChild(fileTitleH5);
    fileInfoDiv.appendChild(restoreText);

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
        if (file.content[i]) square.style.backgroundColor = file.content[i];
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
    title.textContent = file.name + ".img";

    // Agregar título al contenedor de archivo
    fileDiv.appendChild(title);

    // Crear imagen de eliminación
    const trashImg = document.createElement("img");
    trashImg.className = "iconFormat trashImgIcon";
    trashImg.src = "../img/Trash.svg";
    trashImg.alt = "Trash.png";

    // Agregar imagen de eliminación al contenedor de archivo
    fileDiv.appendChild(trashImg);

    // Agregar contenedor de archivo al contenedor principal
    imageContainer.appendChild(fileDiv);

    //----------------------- Crear contenedor de información detallada del archivo -----------------------------//
    var fileInfoDiv = document.createElement('div');
    fileInfoDiv.className = "fileItem fileImgInfo hiddenInfo"

    // Crear el contenedor de la información del archivo
    var infoContentDiv = document.createElement('div');
    infoContentDiv.className = "InfoContentDiv"

    // Crear elemento de información de nombre
    var fileNameP = document.createElement('p');
    fileNameP.className = "dataContent";
    fileNameP.innerHTML = '<strong>Name:</strong> ' + file.name;

    // Crear elemento de información de extensión
    var fileExtensionP = document.createElement('p');
    fileExtensionP.className = "dataContent"
    fileExtensionP.innerHTML = '<strong>Extension:</strong> ' + "img";

    // Calcular tamaño del archivo
    let fileSize = file.content.length + file.name.length;
    var fileSizeP = document.createElement('p');
    fileSizeP.className = "dataContent";
    fileSizeP.innerHTML = '<strong>Size:</strong> ' + fileSize + " bytes";

    // Crear elemento de información de fecha
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
    fileTitleH5.innerText = file.name + ".img";

    // Crear el botón de recuperar fichero
    var restoreImage = document.createElement('img');
    restoreImage.setAttribute('src', '../img/Restore.png');
    restoreImage.setAttribute('alt', 'Restore.png');
    restoreImage.className = "iconFormat restoreImageIcon";

    // Añadir todos los elementos al contenedor principal de la información detallada del archivo
    fileInfoDiv.appendChild(infoContentDiv);
    fileInfoDiv.appendChild(exitInfoImg);
    fileInfoDiv.appendChild(fileTitleH5);
    fileInfoDiv.appendChild(restoreImage);

    // Agregar contenedor de archivo al contenedor principal
    imageContainer.appendChild(fileInfoDiv);

}

// cuando pulsamos el boton de textFiles mostramos los ficheros de texto y 
// ocultamos los ficheros de imagen
textInfo.addEventListener('click', () => {
    textContainer.classList.remove('hiddenInfo');
    imageContainer.classList.add('hiddenInfo');
    textInfo.classList.add('shadowColor');
    imageInfo.classList.remove('shadowColor');
    isImageOpen = false;
    sessionStorage.setItem('isImageOpen', isImageOpen);
});

// cuando pulsamos el boton de imageFiles mostramos los ficheros de imagen
// y ocultamos los ficheros de texto
imageInfo.addEventListener('click', () => {
    textContainer.classList.add('hiddenInfo');
    imageContainer.classList.remove('hiddenInfo');
    textInfo.classList.remove('shadowColor');
    imageInfo.classList.add('shadowColor');
    isImageOpen = true;
    sessionStorage.setItem('isImageOpen', isImageOpen);
});

// Seleccionar todos los elementos del DOM creados que se van a utilizar
const infoImg = document.querySelectorAll('.imgIcon');
const exitInfoImg = document.querySelectorAll('.closeIcon');
// Boton de eliminar texto o imagen
const delateText = document.querySelectorAll('.trashTxtIcon');
const delateImg = document.querySelectorAll('.trashImgIcon');
// Boton de restaurar texto o imagen
const restoreText = document.querySelectorAll('.restoreTextIcon');
const restoreImg = document.querySelectorAll('.restoreImageIcon');

// Contenedores de texto e imagen
const fileText = document.querySelectorAll('.fileText');
const fileTextInfo = document.querySelectorAll('.fileTextInfo');
const fileImg = document.querySelectorAll('.fileImage');
const fileImgInfo = document.querySelectorAll('.fileImgInfo');

// Asignamos los eventos a los elementos extraidos del DOM
for (let i = 0; i < infoImg.length; i++) {
    // cuando pulsamos el boton de info mostramos la informacion del fichero
    infoImg[i].addEventListener('click', () => {
        infoImg[i].parentNode.classList.add('hiddenInfo');
        infoImg[i].parentNode.nextSibling.classList.remove('hiddenInfo');
    });
    // cuando pulsamos el boton de cerrar ocultamos la informacion del fichero
    exitInfoImg[i].addEventListener('click', () => {
        infoImg[i].parentNode.classList.remove('hiddenInfo');
        infoImg[i].parentNode.nextSibling.classList.add('hiddenInfo');
    });
    // cuando pulsamos el boton de eliminar texto llamamos a la función de eliminar definitivamente
    // mostrando previamente la alerta
    if (delateText[i]) {
        delateText[i].addEventListener('click', () => {
            finallyDaletTextFile(delateText[i].parentNode);
        });
    }
    // cuando pulsamos el boton de eliminar imagen llamamos a la función de eliminar definitivamente
    // mostrando previamente la alerta
    if (delateImg[i]) {
        delateImg[i].addEventListener('click', () => {
            finallyDaletImageFile(delateImg[i].parentNode);
        });
    }
    // cuando pulsamos el boton de restaurar texto o imagen llamamos a la función de restaurar fichero 
    // de texto o imagen
    if (restoreText[i]) {
        restoreText[i].addEventListener('click', () => {
            restoreTextFile(fileText[i]);
        });
    }
    if (restoreImg[i]) {
        restoreImg[i].addEventListener('click', () => {
            restoreImageFile(fileImg[i]);
        });
    }
}

// asignamos a cada objeto de text o imagen  un eventlistener de doble click tanto a la cara principal como a 
// la de info que permitirá restaurar el fichero
for (let i = 0; i < fileText.length; i++) {
    fileText[i].addEventListener('dblclick', () => {
        restoreTextFile(fileText[i]);
    });
    fileTextInfo[i].addEventListener('dblclick', () => {
        restoreTextFile(fileText[i]);
    });
}
for (let i = 0; i < fileImg.length; i++) {
    fileImg[i].addEventListener('dblclick', () => {
        restoreImageFile(fileImg[i]);
    });
    fileImgInfo[i].addEventListener('dblclick', () => {
        restoreImageFile(fileImg[i]);
    });
}

// Al puslar el boton volvemos a la pagina previamente abierta.
closeButton.addEventListener('click', previousPage);