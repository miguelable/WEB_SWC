//comprobamos si había algun fichero de texto ya abierto
//si había, lo cargamos en el texta



if (savedTextFile.name != "") {
    //sumamos el nombre a al texto introducido.
    let fullSize;
    if (savedTextFile.name) fileName.innerText = savedTextFile.name + ".txt";
    // En caso de haber escrito algo antes
    if (savedTextFile.contentNotSaved) {
        fullSize = savedTextFile.contentNotSaved.length + savedTextFile.name.length;
        textArea.value = savedTextFile.contentNotSaved;
    } else if (savedTextFile.name) {
        //si no había nada escrito entonces  solo mostramos el tamaño del nombre
        fullSize = savedTextFile.name.length;
        textArea.value = " ";
    }
    if (fullSize) {
        fileSize.innerText = fullSize + ' bytes';
    }
}

textArea.addEventListener('input', countChars);

function countChars() {
    savedTextFile.contentNotSaved = textArea.value;
    let fullSize = textArea.value.length + savedTextFile.name.length;
    fileSize.innerText = fullSize + ' bytes';
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
}

closeButton.addEventListener('click', leaveApp);

function leaveApp() {
    //comprobamos si el usuario ha guardado el archivo
    if (checkTextFileSaved()) {
        previousPage();
    }

}