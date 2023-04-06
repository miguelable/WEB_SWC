//comprobamos si había algun fichero de texto ya abierto
//si había, lo cargamos en el texta



if (savedTextFile.name != "") {
    //sumamos el nombre a al texto introducido.
    let fullSize = 0;
    if (savedTextFile.name) {
        fileName.innerText = savedTextFile.name + ".txt";
        fullSize += savedTextFile.name.length;
        textArea.value = " ";
    }
    // En caso de haber escrito algo antes
    if (savedTextFile.contentNotSaved) {
        fullSize += savedTextFile.contentNotSaved.length;
        textArea.value = savedTextFile.contentNotSaved;
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
    saveFile.removeAttribute("style", "filter: invert(100%);");
}

closeButton.addEventListener('click', leaveApp);

function leaveApp() {
    //comprobamos si el usuario ha guardado el archivo
    if (checkTextFileSaved()) {
        previousPage();
    }

}