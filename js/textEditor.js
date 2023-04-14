//comprobamos si había algun fichero de texto ya abierto
//si había, lo cargamos en el textArea
if (savedTextFile.name != "") {
    // calculamos el tamaño del fichero y mostramos contenido y tamaño
    let fullSize = 0;
    if (savedTextFile.name) {
        fileName.innerText = savedTextFile.name + ".txt";
        fullSize += savedTextFile.name.length;
        textArea.value = " ";
    } else {
        textArea.value = " ";
    }
    if (savedTextFile.contentNotSaved) {
        fullSize += savedTextFile.contentNotSaved.length;
        textArea.value = savedTextFile.contentNotSaved;
    }
    if (fullSize) {
        fileSize.innerText = fullSize + ' bytes';
    }
}

textArea.addEventListener('input', countChars);

// contar los carácteres que tiene el texto escrito y lo suma al tamaño del nombre para mostralo
// en la parte inferior derecha
function countChars() {
    savedTextFile.contentNotSaved = textArea.value;
    let fullSize = textArea.value.length + savedTextFile.name.length;
    fileSize.innerText = fullSize + ' bytes';
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
    // si se introduce algo de texto se deselecciona el boton de guardar
    saveFile.removeAttribute("style", "filter: invert(100%);");
}

//funcion para guardar el archivo y cerrar la ventana
closeButton.addEventListener('click', leaveApp);

function leaveApp() {
    //comprobamos si el usuario ha guardado el archivo
    if (checkTextFileSaved()) {
        previousPage();
    }

}

newFile.addEventListener('click', newTextFile);