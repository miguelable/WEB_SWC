// Escturctura del objeto que tendrán los fichero de texto o imagen
class fileTextImage {
    constructor(extension) {
        this.name = "";
        this.content = "";
        this.date = "";
        this.extension = extension;
    }
}

// extraemos los elementos del DOM que usaremos para las alertas
// nombre que aparece junto al editor de texto/imagen (parte inferior izquierda)
const fileName = document.querySelector("#fileName");
// tamaño del archivo que aparece junto al editor de texto/imagen (parte inferior derecha)
const fileSize = document.querySelector("#fileSize");

//boton de guardar documento.
const saveFile = document.getElementById('saveFile');
//Area donde se introduce el texto.
const textArea = document.getElementById('textArea');
//Area donde se introduce la imagen.
const imageArea = document.getElementById('imageArea');
// cajas que podrán ser pintadas
let boxes = [];
if (imageArea) boxes = Array.from(imageArea.children);

// alerta que aparece cuando no se ha introducido un nombre
const defineNameAlert = document.querySelector('#defineNameAlert');
// texto que se introduce al poner el nombre
const inputName = document.querySelector('#nameFile');
// boton para guardar el nombre y cerrar la alerta.
const nameChosen = document.querySelector('#nameChosen');
// texto que aparece en rojo cuando el nombre se repite
const textAlert = document.querySelector('.textAlert');

// alerta cuando se quiere guardar un fichero que ocupa más de lo que está disponible
const bigFileAlert = document.getElementById('bigFileAlert');
// boton para volver al fichero despúes de mostrar la alerta de fichero grande
const returnToText = document.getElementById('returnToText');

// alerta cuando se quiere cerrar el fichero y no se ha guardado
const noneSaveAlert = document.getElementById('noneSaveAlert');
// boton para confirmar que se quiere guardar
const confirmYes = document.getElementById('confirmYes');
// boton para confirmar que no se quiere guardar
const confirmNo = document.getElementById('confirmNo');

// alerta cuando se quiere borrar un fichero
const deleteFileAlert = document.getElementById('deleteFileAlert');
// boton para confirmar que se quiere borrar
const eraseYes = document.getElementById('eraseYes');
// boton para confirmar que no se quiere borrar
const eraseNo = document.getElementById('eraseNo');

// alerta cuando se quiere borrar el fichero definitivamente
// en esta alerta se usan los botones de eraseYes y eraseNo
const lastdeleteFileAlert = document.getElementById('lastdeleteFileAlert');
// alerta de querer restaurar un fichero que ya existe
const sameNameAlert = document.getElementById('sameNameAlert');
// boton que permite reemplazar el fichero con el mismo nombre
const replaceYes = document.getElementById('replaceYes');
// boton que permite cambiar el nombre del fichero que se va a restaurar
const replaceNo = document.getElementById('replaceNo');
// alerta que permite cambiar de nombre al fichero que se va a restaurar
const defineNewNameAlert = document.getElementById('defineNewNameAlert');
// alerta que permite restaurar un fichero borrado (nombre no existe en los fichero ya existentes)
const restoreAlert = document.getElementById('restoreAlert');

// valor de la memoria utilizada
let memmoryStatus = sessionStorage.getItem('memmoryStatus');
if (!memmoryStatus) memmoryStatus = 0;

// objetos de los ficheros que se están editando y no guardados en memoria.
//objeto de texto guardado en memoria.
let savedTextFile = JSON.parse(sessionStorage.getItem("savedTextFile"));
//objeto de imagen guardado en memoria.
let savedImageFile = JSON.parse(sessionStorage.getItem("savedImageFile"));

// arrray con los objetos de texto guardado en memoria
let savedTextFilesMemory = JSON.parse(sessionStorage.getItem("savedTextFilesMemory"));
// arrray con los objetos de imagen guardado en memoria
let savedImageFilesMemory = JSON.parse(sessionStorage.getItem("savedImageFilesMemory"));

// array de objetos de ficheros de text que se han borrado de la memoria.
let deletedTextFilesMemory = JSON.parse(sessionStorage.getItem("deletedTextFilesMemory"));
// array de objetos de fichero de imagen que se han borrado de la memoria.
let deletedImageFilesMemory = JSON.parse(sessionStorage.getItem("deletedImageFilesMemory"));

// Si estamos en la pagina de editor de texto
if (paginaActual === "Text Editor") {
    // si no hay fichero de texto guardado en memoria, se crea un objeto vacio
    if (!savedTextFile || !savedTextFile.name) {
        savedTextFile = {};
        defineNameAlert.classList.remove("hiddenObject");
        // validación de que el nombre está permitido (no es nulo ni se repite)
        inputName.addEventListener('input', validateTextInputName);
        // se guarda el nombre del fichero y se cierra la alerta
        nameChosen.addEventListener('click', saveCurrentTextFile);
    }
    // si no hay array de ficheros de texto guardados en memoria, se crea un array vacio
    if (!savedTextFilesMemory) savedTextFilesMemory = [];
    // llamamos a la función de guardar texto si se pulsa en el icono de guardar
    saveFile.addEventListener('click', saveTextFileMemory);
}

// Si estamos en la pagina de editor de imagen
if (paginaActual === "Image Editor") {
    // si no hay fichero de imagen guardado en memoria, se crea un objeto vacío
    if (!savedImageFile || !savedImageFile.name) {
        savedImageFile = {};
        defineNameAlert.classList.remove("hiddenObject");
        // validación de que el nombre está permitido (no es nulo ni se repite)
        inputName.addEventListener('input', validateImageInputName);
        // se guarda el nombre del fichero y se cierra la alerta
        nameChosen.addEventListener('click', saveCurrentImageFile);
    }
    // si no hay array de ficheros de imagen guardados en memoria, se crea un array vacio
    if (!savedImageFilesMemory) savedImageFilesMemory = [];
    // llamamos a la función de guardar imagen si se pulsa en el icono de guardar
    saveFile.addEventListener('click', saveImageFileMemory);
}

// valida si el nombre del fichero de texto no esta repetido o es nulo
function validateTextInputName() {
    // si el nombre no es nulo se comprueba que no se repita
    if (inputName.value.length > 0) {
        inputName.style.border = '2px solid rgba(255, 0, 0, 0)';
        if (savedTextFilesMemory.length === 0) {
            nameChosen.classList.remove("hiddenObject");
        } else {
            for (let i = 0; i < savedTextFilesMemory.length; i++) {
                if (inputName.value === savedTextFilesMemory[i].name) {
                    // mostramos la alerta de nombre repetido
                    textAlert.classList.remove('hiddenObject');
                    nameChosen.classList.add("hiddenObject");
                    break;
                } else {
                    // quitamos la alerta de nombre repetido
                    textAlert.classList.add('hiddenObject');
                    nameChosen.classList.remove("hiddenObject");
                }
            }
        }
        //mostramos el nombre y lo que ocupa en bytes
        if (fileName) fileName.innerText = inputName.value + ".txt";
        if (fileSize) fileSize.innerText = inputName.value.length + " bytes";
    } else {
        //en el caso de que sea nulo entonces cambiamos el color de input a rojo
        inputName.style.border = '2px solid rgba(255, 0, 0, 255)';
        nameChosen.classList.add("hiddenObject");

        // Cuando no hay nombre no se mostrará nada detras de la alerta
        if (fileName) fileName.innerText = " ";
        if (fileSize) fileSize.innerText = " ";

    }
}

// valida si el nombre del fichero de imagen no esta repetido o es nulo
function validateImageInputName() {
    // si el nombre no es nulo se comprueba que no se repita
    if (inputName.value.length > 0) {
        inputName.style.border = '2px solid rgba(255, 0, 0, 0)';
        if (savedImageFilesMemory.length === 0) {
            nameChosen.classList.remove("hiddenObject");
        } else {
            for (let i = 0; i < savedImageFilesMemory.length; i++) {
                if (inputName.value === savedImageFilesMemory[i].name) {
                    // mostramos la alerta de nombre repetido
                    textAlert.classList.remove('hiddenObject');
                    nameChosen.classList.add("hiddenObject");
                    break;
                } else {
                    // quitamos la alerta de nombre repetido
                    textAlert.classList.add('hiddenObject');
                    nameChosen.classList.remove("hiddenObject");
                }
            }
        }
        //mostramos el nombre y lo que ocupa en bytes
        if (fileName) fileName.innerText = inputName.value + ".png";
        if (fileSize) fileSize.innerText = inputName.value.length + " bytes";
    } else {
        inputName.style.border = '2px solid rgba(255, 0, 0, 255)';
        nameChosen.classList.add("hiddenObject");

        // Cuando no hay nombre no se mostrará nada detras de la alerta
        if (fileName) fileName.innerText = " ";
        if (fileSize) fileSize.innerText = " ";

    }
}

// guarda el fichero de texto nada mas poner el nombre (sin contenido)
// memoria temporal
function saveCurrentTextFile() {
    // guardamos el nombre del archivo en el objeto
    savedTextFile.name = inputName.value;
    savedTextFile.date = new Date();
    // guardamos el objeto en el array de objetos
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
    // quitamos la alerta de definir nombre
    defineNameAlert.classList.add("hiddenObject");
}

// guarda el fichero de imagen nada mas poner el nombre (sin contenido)
// memoria temporal
function saveCurrentImageFile() {
    // guardamos el nombre del archivo en el objeto
    savedImageFile.name = inputName.value;
    savedImageFile.date = new Date();
    // guardamos el objeto en el array de objetos
    sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
    // quitamos la alerta de definir nombre
    defineNameAlert.classList.add("hiddenObject");
}

// guarda el fichero de texto en memoria al pulsar el boton de guardar
function saveTextFileMemory() {
    // si no hay fichero de texto guardado en memoria, se crea un objeto vacío
    if (!savedTextFile.contentNotSaved) savedTextFile.contentNotSaved = "";
    // tenenmos que comprobar que el alrchivo entra en memoria antes de guardar
    if (savedTextFile.contentNotSaved.length + savedTextFile.name.length + parseInt(memmoryStatus) <= 1000) {
        // guardamos el contenido del fichero en el objeto
        savedTextFile.content = savedTextFile.contentNotSaved;
        savedTextFile.date = new Date();
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        //comprobamos que no exista otro texto con el mismo nombre
        let exist = false;
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            // si existe un fichero de texto con el mismo nombre calculamos el aumento o disminución de memoria y
            // sustituimos el contenido del fichero de texto
            if (savedTextFilesMemory[i].name == savedTextFile.name) {
                memmoryStatus = savedTextFile.content.length - savedTextFilesMemory[i].content.length + parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', memmoryStatus);
                savedTextFilesMemory[i] = savedTextFile;
                exist = true;
                break;
            }
        }
        // si no existe un fichero de texto con el mismo nombre calculamos el aumento de memoria
        if (!exist) {
            savedTextFilesMemory.push(savedTextFile);
            memmoryStatus = savedTextFile.name.length + savedTextFile.content.length + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', memmoryStatus);
        }
        // guardamos el array de objetos de texto en memoria
        sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
        // si existe el icono de guardar le cambiamos el color a balanco para indicar que se a guardado
        if (saveFile) saveFile.setAttribute("style", "filter: invert(100%);");
        // devolvemos true porque se ha podido guardar
        return true;
    } else {
        // si el fichero no entra en memoria mostramos la alerta
        bigFileAlert.classList.remove('hiddenObject');
        // si pulsa el boton de cerrar alerta ocultamos la alerta de fichero grande.
        returnToText.addEventListener('click', () => {
            bigFileAlert.classList.add('hiddenObject');
        });
        // devolvemos false porque no se ha podido guardar
        return false;
    }
}

// guarda el fichero de imagen en memoria al pulsar el boton de guardar
function saveImageFileMemory() {
    // calculamos el tamaño de la imagen del editor
    let sizeImage = 0;
    for (let i = 0; i < 64; i++) {
        // si existe contenido no guardado y el cuadrado esta pintado aumentamos el valor de memoria de la imagen
        if (savedImageFile.contentNotSaved &&
            savedImageFile.contentNotSaved[i] != "" &&
            savedImageFile.contentNotSaved.length != 0) sizeImage++;
    }
    // si no hay fichero de imagen guardado en memoria, se crea un objeto vacío
    if (!savedImageFile.contentNotSaved) savedImageFile.contentNotSaved = [];
    // tenenmos que comprobar que el alrchivo entra en memoria antes de guardar
    if (savedImageFile.name.length + sizeImage + parseInt(memmoryStatus) <= 1000) {
        // guardamos el contenido del fichero en el objeto
        savedImageFile.content = savedImageFile.contentNotSaved;
        savedImageFile.date = new Date();
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        //comprobamos que no exista otro texto con el mismo nombre
        let exist = false;
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            if (savedImageFilesMemory[i].name == savedImageFile.name) {
                // calculamos la memoria que ocupaba antes
                let contentSize = 0;
                if (savedImageFilesMemory[i].content.length != 0) {
                    savedImageFilesMemory[i].content.forEach((color) => {
                        if (color != "") contentSize++;
                    });
                }
                memmoryStatus = sizeImage - contentSize + parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', memmoryStatus);
                //si existe lo sustituimos
                savedImageFilesMemory[i] = savedImageFile;
                exist = true;
                break;
            }
        }
        if (!exist) {
            savedImageFilesMemory.push(savedImageFile);
            // incrementamos el valor de la memoria
            memmoryStatus = savedImageFile.name.length + sizeImage + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', memmoryStatus);
        }
        // guardamos el array de objetos de texto en memoria
        sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
        // si existe el icono de guardar le cambiamos el color a balanco para indicar que se a guardado
        if (saveFile) saveFile.setAttribute("style", "filter: invert(100%);");
        // devolvemos true porque se ha podido guardar
        return true;
    } else {
        // si el fichero no entra en memoria mostramos la alerta
        bigFileAlert.classList.remove('hiddenObject');
        // si pulsa el boton de cerrar alerta ocultamos la alerta de fichero grande.
        returnToText.addEventListener('click', () => {
            bigFileAlert.classList.add('hiddenObject');
        });
        // devolvemos false porque no se ha podido guardar
        return false;
    }
}

// comprueba si se ha guardado el fichero de texto o no antes de cerrar
function checkTextFileSaved() {
    //comparamos los dos contenidos de savedTextFile
    if (savedTextFile.content != savedTextFile.contentNotSaved || !savedTextFile.content) {
        //si son diferentes mostramos el alert
        noneSaveAlert.classList.remove('hiddenObject');
        confirmYes.addEventListener('click', () => {
            if (saveTextFileMemory()) {
                eraseTextFile();
            } else noneSaveAlert.classList.add('hiddenObject');
        });
        confirmNo.addEventListener('click', eraseTextFile);
        return false;
    } else {
        //si son iguales no mostramos el alert
        saveTextFileMemory();
        // eliminamos el objeto temporal de session storage
        savedTextFile = {};
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        return true;
    }
}

// comprueba si se ha guardado el fichero de imagen o no antes de cerrar
function checkImageFileSaved() {
    //comparamos los dos contenidos de savedTextFile
    if (!checkEqualImages() || !savedImageFile.content) {
        //si son diferentes mostramos el alert
        noneSaveAlert.classList.remove('hiddenObject');
        confirmYes.addEventListener('click', () => {
            if (saveImageFileMemory()) {
                eraseImageFile();
            } else noneSaveAlert.classList.add('hiddenObject');
        });
        confirmNo.addEventListener('click', eraseImageFile);
        return false;
    } else {
        //si son iguales no mostramos el alert
        saveImageFileMemory();
        // eliminamos el objeto temporal de session storage
        savedImageFile = {};
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        return true;
    }
}

// compara si las imagenes son iguales
function checkEqualImages() {
    let equal = true;
    if (savedImageFile.contentNotSaved) {
        for (let i = 0; i < savedImageFile.contentNotSaved.length; i++) {
            if (!savedImageFile.content || savedImageFile.content[i] != savedImageFile.contentNotSaved[i]) {
                equal = false;
                break;
            }
        }
    }
    return equal;
}

// elimina el fichero de texto temporal de la memoria
function eraseTextFile() {
    savedTextFile = {};
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
    previousPage();
}

// elimina el fichero de imagen temporal de la memoria
function eraseImageFile() {
    savedImageFile = {};
    sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
    previousPage();
}

// borra todos los recuadros de color
function eraseImage() {
    // mostramos la alerta de borrar
    deleteFileAlert.classList.remove('hiddenObject');
    // si pulsa el boton de borrar entonces borramos todos los recuadros
    eraseYes.addEventListener('click', () => {
        boxes.forEach((box) => {
            box.style.backgroundColor = "";
        });

        // guardamos el contenido del fichero en el objeto de imagen temporal
        savedImageFile.contentNotSaved = boxes.map((colorBox) => {
            return colorBox.style.backgroundColor;
        });
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));

        //cambiamos el tamaño que se muestra junto a la imagen
        fullSize = savedImageFile.name.length;
        fileSize.innerText = fullSize + ' bytes';

        // eliminamos la alerta de borrar
        deleteFileAlert.classList.add('hiddenObject');
    });
    // si pulsa el boton de no borrar entonces escondemos la alerta sin borrar nada
    eraseNo.addEventListener('click', () => {
        deleteFileAlert.classList.add('hiddenObject');
    });
}

// borra el fichero de texto (lo añadimos al array de fichero de texto borrados)
function daletTextFile(fileToDelate) {
    // mostramos la alerta de borrar
    deleteFileAlert.classList.remove('hiddenObject');
    eraseYes.addEventListener('click', () => {
        // extraemos el nombre del fichero a borrar
        let nameFileSelected = fileToDelate.childNodes[2].innerText.slice(0, -4);
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            if (savedTextFilesMemory[i].name == nameFileSelected) {
                // extraemos el elemento del array de elementos guardados
                let delatedFile = savedTextFilesMemory.splice(i, 1);
                sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
                // añadimos el elemento eliminado al array de elementos eliminados
                // y lo guardamos en memoria
                if (!deletedTextFilesMemory) deletedTextFilesMemory = [];
                deletedTextFilesMemory.push(delatedFile[0]);
                sessionStorage.setItem("deletedTextFilesMemory", JSON.stringify(deletedTextFilesMemory));

                // eliminamos el elemento del DOM
                fileToDelate.nextSibling.remove();
                fileToDelate.remove();
                break;
            }
        }
        // eliminamos la alerta de borrar
        deleteFileAlert.classList.add('hiddenObject');
    });
    // si pulsa el boton de no borrar entonces escondemos la alerta sin borrar nada
    eraseNo.addEventListener('click', () => {
        deleteFileAlert.classList.add('hiddenObject');
    });
}

// borra el fichero de imagen (lo añadimos al array de fichero de imagen borrados)
function daletImageFile(fileToDelate) {
    // mostramos la alerta de borrar
    deleteFileAlert.classList.remove('hiddenObject');
    eraseYes.addEventListener('click', () => {
        // extraemos el nombre del fichero a borrar
        let nameFileSelected = fileToDelate.childNodes[2].innerText.slice(0, -4);
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            if (savedImageFilesMemory[i].name == nameFileSelected) {
                // extraemos el elemento del array de elementos guardados
                let delatedFile = savedImageFilesMemory.splice(i, 1);
                sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));

                //añadimos el elemento eliminado al array de elementos eliminados
                if (!deletedImageFilesMemory) deletedImageFilesMemory = [];
                deletedImageFilesMemory.push(delatedFile[0]);
                sessionStorage.setItem("deletedImageFilesMemory", JSON.stringify(deletedImageFilesMemory));

                // eliminamos el elemento del DOM
                fileToDelate.nextSibling.remove();
                fileToDelate.remove();
                break;
            }
        }
        // eliminamos la alerta de borrar
        deleteFileAlert.classList.add('hiddenObject');
    });
    // si pulsa el boton de no borrar entonces escondemos la alerta sin borrar nada
    eraseNo.addEventListener('click', () => {
        deleteFileAlert.classList.add('hiddenObject');
    });
}

// guarda el fichero que estaba editandose y se abre el editor con uno nuevo
function saveTextAndMove(file) {
    // comprobamos que se puede guardar y guardamos
    if (saveTextFileMemory()) {
        // guardamos en la memoria temporal el fichero que queremos editar
        savedTextFile.name = file.name;
        savedTextFile.content = file.content;
        savedTextFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        // escondemos la alerta de fichero no guardado al intentar abrir el editor
        noneSaveAlert.classList.add('hiddenObject');
        // nos dirigimos a la pagina de editar ficheros de texto
        window.location.href = 'textEditor.html';
    } else {
        // quitamos la alerta de fihcero no guardado al intentar abrir el editor
        // para mostrar la alerta de que no se puede guardar el fichero porque es grande
        noneSaveAlert.classList.add('hiddenObject');
    }
}

// guarda el fichero que estaba editandose y se abre el editor con uno nuevo
function saveImageAndMove(file) {
    // comprobamos que se puede guardar y guardamos
    if (saveImageFileMemory()) {
        // guardamos en la memoria temporal el fichero que queremos editar
        savedImageFile.name = file.name;
        savedImageFile.content = file.content;
        savedImageFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        // escondemos la alerta de fichero no guardado al intentar abrir el editor
        noneSaveAlert.classList.add('hiddenObject');
        // nos dirigimos a la pagina de editar ficheros
        window.location.href = 'imageEditor.html';
    } else {
        // quitamos la alerta de fihcero no guardado al intentar abrir el editor
        noneSaveAlert.classList.add('hiddenObject');
    }
}

// alerta de intentar abrir el editor de texto cuando ya hay un archivo editándose
function textFileNotSaved(file) {
    // mostramos la alerta de fichero no guardado al intentar abrir el editor
    noneSaveAlert.classList.remove('hiddenObject');
    // boton de confirmar que queremos guardar y editar otro fichero
    confirmYes.addEventListener('click', () => {
        saveTextAndMove(file);
    });
    // boton de confirmar que no queremos guardar para editar otro fichero
    confirmNo.addEventListener('click', () => {
        // guardamos en la memoria temporal el fichero que queremos editar
        savedTextFile.name = file.name;
        savedTextFile.content = file.content;
        savedTextFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        // nos dirigimos a la pagina de editar ficheros de texto
        window.location.href = 'textEditor.html';
    });
}

// alerta de intentar abrir el editor de imagen cuando ya hay un archivo editándose
function imageFileNotSaved(file) {
    // mostramos la alerta de fichero no guardado al intentar abrir el editor
    noneSaveAlert.classList.remove('hiddenObject');
    // boton de confirmar que queremos guardar y editar otro fichero
    confirmYes.addEventListener('click', () => {
        saveImageAndMove(file);
    });
    // boton de confirmar que no queremos guardar para editar otro fichero
    confirmNo.addEventListener('click', () => {
        // guardamos en la memoria temporal el fichero que queremos editar
        savedImageFile.name = file.name;
        savedImageFile.content = file.content;
        savedImageFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        // nos dirigimos a la pagina de editar ficheros
        window.location.href = 'imageEditor.html';
    });
}

// funcion para borrar un fichero de texto definitivamente
function finallyDaletTextFile(fileToDelate) {
    // mostramos la alerta de borrar definitivamente el fichero de texto
    lastdeleteFileAlert.classList.remove('hiddenObject');
    // si pulsa el boton de borrar entonces eliminamos el fichero
    eraseYes.addEventListener('click', () => {
        // extraemos el nombre del fichero a borrar
        let nameFileSelected = fileToDelate.childNodes[2].innerText.slice(0, -4);
        for (let i = 0; i < deletedTextFilesMemory.length; i++) {
            if (deletedTextFilesMemory[i].name == nameFileSelected) {
                // extraemos el elemento del array de elementos eliminados
                let delatedFile = deletedTextFilesMemory.splice(i, 1);
                sessionStorage.setItem("deletedTextFilesMemory", JSON.stringify(deletedTextFilesMemory));
                // decrementamos el valor de la memoria
                memmoryStatus = parseInt(memmoryStatus) - delatedFile[0].name.length - delatedFile[0].content.length;
                sessionStorage.setItem('memmoryStatus', memmoryStatus);
                // eliminamos el elemento del DOM
                fileToDelate.nextSibling.remove();
                fileToDelate.remove();
                break;
            }
        }
        // escondemos la alerta de borrar definitivamente el fichero de texto
        lastdeleteFileAlert.classList.add('hiddenObject');
        // recargamos la pagina para que se actualice la memoria
        location.reload();
    });
    // si pulsa el boton de cancelar entonces no eliminamos el fichero
    eraseNo.addEventListener('click', () => {
        // escondemos la alerta de borrar definitivamente el fichero de texto
        lastdeleteFileAlert.classList.add('hiddenObject');
    });
}

// function para borrar el fichero de imagen definitivamente
function finallyDaletImageFile(fileToDelate) {
    // mostramos la alerta de borrar definitivamente el fichero de imagen
    lastdeleteFileAlert.classList.remove('hiddenObject');
    // si pulsa el boton de borrar entonces eliminamos el fichero
    eraseYes.addEventListener('click', () => {
        // extraemos el nombre del fichero a borrar
        let nameFileSelected = fileToDelate.childNodes[2].innerText.slice(0, -4);
        for (let i = 0; i < deletedImageFilesMemory.length; i++) {
            if (deletedImageFilesMemory[i].name == nameFileSelected) {
                // extraemos el elemento del array de elementos eliminados
                let delatedFile = deletedImageFilesMemory.splice(i, 1);
                sessionStorage.setItem("deletedImageFilesMemory", JSON.stringify(deletedImageFilesMemory));
                // decrementamos el valor de la memoria
                let contentSize = 0;
                delatedFile[0].content.forEach((color) => {
                    if (color != "") {
                        contentSize++;
                    }
                });
                memmoryStatus = parseInt(memmoryStatus) - delatedFile[0].name.length - contentSize;
                sessionStorage.setItem('memmoryStatus', memmoryStatus);
                // eliminamos el elemento del DOM
                fileToDelate.nextSibling.remove();
                fileToDelate.remove();
                break;
            }
        }
        // escondemos la alerta de borrar definitivamente el fichero de imagen
        lastdeleteFileAlert.classList.add('hiddenObject');
        // recargamos la pagina para que se actualice la memoria
        location.reload();
    });
    // si pulsa el boton de cancelar entonces no eliminamos el fichero
    eraseNo.addEventListener('click', () => {
        // escondemos la alerta de borrar definitivamente el fichero de imagen
        lastdeleteFileAlert.classList.add('hiddenObject');
    });
}

// funcion para restaurar un fichero de texto
function restoreTextFile(fileToRestore) {
    // comprobamos que el nombre del texto no coincida con los guardados en memoria
    let exist = false;
    // extraemos el nombre del fichero
    let nameFileSelected = fileToRestore.childNodes[2].innerText.slice(0, -4);
    for (let i = 0; i < savedTextFilesMemory.length; i++) {
        if (savedTextFilesMemory[i].name == nameFileSelected) {
            exist = true;
            // si coincide mostramos alerta de reemplazar o cambiar nombre
            sameNameAlert.classList.remove('hiddenObject');
            // si pulsa el boton de no reemplazar entonces mostramos la alerta de cambiar nombre
            replaceNo.addEventListener('click', () => {
                sameNameAlert.classList.add('hiddenObject');
                defineNewNameAlert.classList.remove('hiddenObject');
                // damos lógica al imput
                inputName.addEventListener('input', validateTextInputName);
                // si pulsa el boton de cambiar nombre entonces cambiamos el nombre del fichero
                nameChosen.addEventListener('click', () => {
                    // extraemos el nuevo nombre del fichero
                    let newName = inputName.value;
                    // extraemos el fichero de la lista de ficheros de texto eliminados
                    let restoredFile = deletedTextFilesMemory.splice(i, 1);
                    sessionStorage.setItem("deletedTextFilesMemory", JSON.stringify(deletedTextFilesMemory));

                    //añadimos el elemento eliminado al array de elementos creados
                    if (!savedTextFilesMemory) savedTextFilesMemory = [];

                    // le cambiamos el nombre al fichero restaurado y lo guardamos en la memoria 
                    restoredFile[0].name = newName;
                    savedTextFilesMemory.push(restoredFile[0]);
                    sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));

                    // eliminamos el elemento del DOM
                    fileToRestore.nextSibling.remove();
                    fileToRestore.remove();
                    // escondemos la alerta de cambiar nombre
                    defineNewNameAlert.classList.add('hiddenObject');
                });
            });
            // si pulsa el boton de reemplazar entonces reemplazamos el fichero
            replaceYes.addEventListener('click', () => {
                // extraemos el fichero que vamos a restaurar
                let restoredFile = deletedTextFilesMemory.splice(i, 1);
                sessionStorage.setItem("deletedTextFilesMemory", JSON.stringify(deletedTextFilesMemory));

                if (!savedTextFilesMemory) savedTextFilesMemory = [];
                // buscamos el fichero a reemplazar
                for (let i = 0; i < savedTextFilesMemory.length; i++) {
                    if (savedTextFilesMemory[i].name == nameFileSelected) {
                        // reducimos la memoria
                        let replacedFile = savedTextFilesMemory.splice(i, 1);
                        memmoryStatus = parseInt(memmoryStatus) -
                            replacedFile[i].content.length -
                            replacedFile[i].name.length;
                        sessionStorage.setItem('memmoryStatus', memmoryStatus);
                        break;
                    }
                }
                // añadimos el elemento eliminado al array de elementos creados
                savedTextFilesMemory.push(restoredFile[0]);
                sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
                // eliminamos el elemento del DOM
                fileToRestore.nextSibling.remove();
                fileToRestore.remove();
                // escondemos la alerta de reemplazar
                sameNameAlert.classList.add('hiddenObject');
                // recargamos la pagina para que se actualice la memoria
                location.reload();
            });
        }
    }
    if (!exist) {
        // mostramos la alerta de restaurar fichero
        restoreAlert.classList.remove('hiddenObject');
        // si pulsa restaurar se resaturará el fichero
        confirmYes.addEventListener('click', () => {
            //buscamos el fichero en la lista de objetos eliminados
            for (let i = 0; i < deletedTextFilesMemory.length; i++) {
                if (deletedTextFilesMemory[i].name == nameFileSelected) {
                    // extraemos el fichero de la lista de ficheros de texto eliminados
                    let restoredFile = deletedTextFilesMemory.splice(i, 1);
                    sessionStorage.setItem("deletedTextFilesMemory", JSON.stringify(deletedTextFilesMemory));
                    //añadimos el elemento eliminado al array de elementos creados
                    if (!savedTextFilesMemory) savedTextFilesMemory = [];
                    savedTextFilesMemory.push(restoredFile[0]);
                    sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
                    // eliminamos el elemento del DOM
                    fileToRestore.nextSibling.remove();
                    fileToRestore.remove();
                    break;
                }
            }
            // escondemos la alerta de restaurar fichero
            restoreAlert.classList.add('hiddenObject');
        });
        // si pulsa cancelar no se restaurará el fichero
        confirmNo.addEventListener('click', () => {
            // escondemos la alerta de restaurar fichero
            restoreAlert.classList.add('hiddenObject');
        });
    }
}

// funcion para restaurar un fichero de imagen
function restoreImageFile(fileToRestore) {
    // comprobamos que el nombre del texto no coincida con los guardados en memoria
    let exist = false;
    // extraemos el nombre del fichero
    let nameFileSelected = fileToRestore.childNodes[2].innerText.slice(0, -4);
    for (let i = 0; i < savedImageFilesMemory.length; i++) {
        if (savedImageFilesMemory[i].name == nameFileSelected) {
            exist = true;
            // mostramos la alerta de fichero con el mismo nombr
            sameNameAlert.classList.remove('hiddenObject');
            // si pulsa el boton de no reemplazar entonces mostramos la alerta de cambiar nombre
            replaceNo.addEventListener('click', () => {
                sameNameAlert.classList.add('hiddenObject');
                defineNewNameAlert.classList.remove('hiddenObject');
                // damos lógica al imput
                inputName.addEventListener('input', validateImageInputName);
                // si pulsa el boton de cambiar nombre entonces cambiamos el nombre del fichero
                // y lo guardamos en el memoria
                nameChosen.addEventListener('click', () => {
                    // extraemos el nuevo nombre del fichero
                    let newName = inputName.value;
                    // extraemos el fichero de la lista de ficheros de imagen eliminados
                    let restoredFile = deletedImageFilesMemory.splice(i, 1);
                    sessionStorage.setItem("deletedImageFilesMemory", JSON.stringify(deletedImageFilesMemory));
                    //añadimos el elemento eliminado al array de elementos creados
                    if (!savedImageFilesMemory) savedImageFilesMemory = [];
                    restoredFile[0].name = newName;
                    savedImageFilesMemory.push(restoredFile[0]);
                    sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
                    // eliminamos el elemento del DOM
                    fileToRestore.nextSibling.remove();
                    fileToRestore.remove();
                    // escondemos la alerta de cambiar nombre
                    defineNewNameAlert.classList.add('hiddenObject');
                });
            });
            // si pulsa el boton de reemplazar entonces reemplazamos el fichero
            replaceYes.addEventListener('click', () => {
                let restoredFile = deletedImageFilesMemory.splice(i, 1);
                sessionStorage.setItem("deletedImageFilesMemory", JSON.stringify(deletedImageFilesMemory));
                //reemplazamos el elemento eliminado al array de elementos creados  
                if (!savedImageFilesMemory) savedImageFilesMemory = [];
                // buscamos el fichero a reemplazar
                for (let i = 0; i < savedImageFilesMemory.length; i++) {
                    if (savedImageFilesMemory[i].name == nameFileSelected) {
                        let replacedFile = savedImageFilesMemory.splice(i, 1);
                        // restamos el tamaño del fichero a la memoria
                        let contentSize = 0;
                        replacedFile[0].content.forEach((color) => {
                            if (color != "") contentSize++;
                        });
                        memmoryStatus = parseInt(memmoryStatus) -
                            replacedFile[0].name.length -
                            contentSize;
                        sessionStorage.setItem('memmoryStatus', memmoryStatus);
                        break;
                    }
                }
                // añadimos el elemento eliminado al array de elementos creados
                savedImageFilesMemory.push(restoredFile[0]);
                sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
                // eliminamos el elemento del DOM
                fileToRestore.nextSibling.remove();
                fileToRestore.remove();
                // escondemos la alerta de reemplazar
                sameNameAlert.classList.add('hiddenObject');
                // recargamos la pagina para que se actualice la memoria
                location.reload();
            });
        }
    }
    if (!exist) {
        // mostramos la alerta de restaurar fichero
        restoreAlert.classList.remove('hiddenObject');
        // añadimos el evento de restaurar fichero
        confirmYes.addEventListener('click', () => {
            //buscamos el fichero en la lista de objetos eliminados
            for (let i = 0; i < deletedImageFilesMemory.length; i++) {
                if (deletedImageFilesMemory[i].name == nameFileSelected) {
                    // extraemos el fichero de la lista de ficheros de imagen eliminados
                    let restoredFile = deletedImageFilesMemory.splice(i, 1);
                    sessionStorage.setItem("deletedImageFilesMemory", JSON.stringify(deletedImageFilesMemory));
                    //añadimos el elemento eliminado al array de elementos creados
                    if (!savedImageFilesMemory) savedImageFilesMemory = [];
                    savedImageFilesMemory.push(restoredFile[0]);
                    sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
                    // eliminamos el elemento del DOM
                    fileToRestore.nextSibling.remove();
                    fileToRestore.remove();
                    break;
                }
            }
            // escondemos la alerta de restaurar fichero
            restoreAlert.classList.add('hiddenObject');
        });
        // si pulsa cancelar no se restaurará el fichero
        confirmNo.addEventListener('click', () => {
            // escondemos la alerta de restaurar fichero
            restoreAlert.classList.add('hiddenObject');
        });
    }

}