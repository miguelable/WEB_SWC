const fileName = document.querySelector("#fileName"); // nombre que aparece junto al editor de texto/imagen
const fileSize = document.querySelector("#fileSize"); // tamaño del archivo que aparece junto al editor de texto/imagen

const saveFile = document.getElementById('saveFile'); //boton de guardar documento.
const textArea = document.getElementById('textArea'); //Area donde se introduce el texto.
const imageArea = document.getElementById('imageArea'); //Area donde se introduce la imagen.
let boxes = [];
if (imageArea) boxes = Array.from(imageArea.children);

const defineNameAlert = document.querySelector('#defineNameAlert'); // alerta que aparece cuando no se ha introducido un nombre
const inputName = document.querySelector('#nameFile'); // texto que se introduce al poner el nombre
const nameChosen = document.querySelector('#nameChosen'); // boton para guardar el nombre y cerrar la alerta.
const textAlert = document.querySelector('.textAlert');

const bigFileAlert = document.getElementById('bigFileAlert');
const returnToText = document.getElementById('returnToText');

const noneSaveAlert = document.getElementById('noneSaveAlert');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');
const eraseYes = document.getElementById('eraseYes');
const eraseNo = document.getElementById('eraseNo');

const deleteFileAlert = document.getElementById('deleteFileAlert');

let memmoryStatus = sessionStorage.getItem('memmoryStatus');

// objetos de los ficheros que se están editando y no guardados en memoria.
let savedTextFile = JSON.parse(sessionStorage.getItem("savedTextFile")); //objeto de texto guardado en memoria. SIN METODOS
let savedImageFile = JSON.parse(sessionStorage.getItem("savedImageFile")); //objeto de imagen guardado en memoria.

let savedTextFilesMemory = JSON.parse(sessionStorage.getItem("savedTextFilesMemory")); //objeto de texto guardado en memoria sin METODOS
let textFilesMemory = []; //array con objetos y METODOS
let savedImageFilesMemory = JSON.parse(sessionStorage.getItem("savedImageFilesMemory")); //objeto de imagen guardado en memoria sin METODOS
let imageFilesMemory = [];

let deletedTextFilesMemory = JSON.parse(sessionStorage.getItem("deletedTextFilesMemory")); //objeto de texto guardado en memoria sin METODOS
let deletedImageFilesMemory = JSON.parse(sessionStorage.getItem("deletedImageFilesMemory")); //objeto de imagen guardado en memoria sin METODOS

if (paginaActual === "Text Editor") {
    saveFile.addEventListener('click', saveTextFileMemory);
    if (!savedTextFile || !savedTextFile.name) {
        console.log('texto no definido');
        savedTextFile = {};
        defineNameAlert.classList.remove("hiddenObject");
        inputName.addEventListener('input', validateTextInputName);
        nameChosen.addEventListener('click', saveCurrentTextFile);
    }
    if (!savedTextFilesMemory) {
        savedTextFilesMemory = [];
        textFilesMemory = [];
    } else {
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            let file = new fileTextImage('txt');
            file.name = savedTextFilesMemory[i].name;
            file.content = savedTextFilesMemory[i].content;
            file.date = savedTextFilesMemory[i].date;
            textFilesMemory.push(file);
        }
        console.log(textFilesMemory);
    }
}

if (paginaActual === "Image Editor") {
    saveFile.addEventListener('click', saveImageFileMemory);
    if (!savedImageFile || !savedImageFile.name) {
        console.log('imagen no definida');
        savedImageFile = {};
        defineNameAlert.classList.remove("hiddenObject");
        inputName.addEventListener('input', validateImageInputName);
        nameChosen.addEventListener('click', saveCurrentImageFile);
    }
    if (!savedImageFilesMemory) {
        savedImageFilesMemory = [];
        imageFilesMemory = [];
    } else {
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            let file = new fileTextImage('img');
            file.name = savedImageFilesMemory[i].name;
            file.content = savedImageFilesMemory[i].content;
            file.date = savedImageFilesMemory[i].date;
            imageFilesMemory.push(file);
        }
        console.log(imageFilesMemory);
    }
}

function validateTextInputName(event) {
    // console.log(event.target.textLength);
    if (inputName.value.length > 0) {
        inputName.style.border = '2px solid rgba(255, 0, 0, 0)';
        if (textFilesMemory.length === 0) {
            nameChosen.classList.remove("hiddenObject");
            //mostramos el nombre y lo que ocupa en bytes
            fileName.innerText = inputName.value + ".txt";
            fileSize.innerText = inputName.value.length + " bytes";
        } else {
            for (let i = 0; i < textFilesMemory.length; i++) {
                if (inputName.value === textFilesMemory[i].name) {
                    textAlert.classList.remove('hiddenObject');
                    nameChosen.classList.add("hiddenObject");
                    fileName.innerText = " ";
                    fileSize.innerText = " ";
                    break;
                } else {
                    //mostramos el nombre y lo que ocupa en bytes
                    textAlert.classList.add('hiddenObject');
                    nameChosen.classList.remove("hiddenObject");
                }
            }
            fileName.innerText = inputName.value + ".txt";
            fileSize.innerText = inputName.value.length + " bytes";
        }
    } else {
        inputName.style.border = '2px solid rgba(255, 0, 0, 255)';
        nameChosen.classList.add("hiddenObject");
        fileName.innerText = " ";
        fileSize.innerText = " ";
    }
}

function validateImageInputName(event) {
    // console.log(event.target.textLength);
    if (inputName.value.length > 0) {
        inputName.style.border = '2px solid rgba(255, 0, 0, 0)';
        if (imageFilesMemory.length === 0) {
            nameChosen.classList.remove("hiddenObject");
            //mostramos el nombre y lo que ocupa en bytes
            fileName.innerText = inputName.value + ".png";
            fileSize.innerText = inputName.value.length + " bytes";
        } else {
            for (let i = 0; i < imageFilesMemory.length; i++) {
                if (inputName.value === imageFilesMemory[i].name) {
                    textAlert.classList.remove('hiddenObject');
                    nameChosen.classList.add("hiddenObject");
                    fileName.innerText = " ";
                    fileSize.innerText = " ";
                    break;
                } else {
                    //mostramos el nombre y lo que ocupa en bytes
                    textAlert.classList.add('hiddenObject');
                    nameChosen.classList.remove("hiddenObject");
                }
            }
            fileName.innerText = inputName.value + ".png";
            fileSize.innerText = inputName.value.length + " bytes";
        }
    } else {
        inputName.style.border = '2px solid rgba(255, 0, 0, 255)';
        nameChosen.classList.add("hiddenObject");
        fileName.innerText = " ";
        fileSize.innerText = " ";
    }
}


function saveCurrentTextFile() {
    // guardamos el nombre del archivo en el objeto
    savedTextFile.name = inputName.value;
    savedTextFile.date = new Date();
    console.log(savedTextFile);
    // guardamos el objeto en el array de objetos
    defineNameAlert.classList.add("hiddenObject");
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
}

function saveCurrentImageFile() {
    // guardamos el nombre del archivo en el objeto
    savedImageFile.name = inputName.value;
    savedImageFile.date = new Date();
    console.log(savedImageFile);
    // guardamos el objeto en el array de objetos
    defineNameAlert.classList.add("hiddenObject");
    sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
}

function saveTextFileMemory() {
    // tenenmos que comprobar que el alrchivo entra en memoria antes de guardar
    if (!memmoryStatus) memmoryStatus = 0;
    if (savedTextFile.contentNotSaved == undefined) savedTextFile.contentNotSaved = "";
    if (savedTextFile.contentNotSaved.length + savedTextFile.name.length + parseInt(memmoryStatus) <= 1000) {
        savedTextFile.content = savedTextFile.contentNotSaved;
        savedTextFile.date = new Date();
        console.log(savedTextFile);
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        if (saveFile) saveFile.setAttribute("style", "filter: invert(100%);");

        return true;
    } else {
        console.log('no podemos guardar');
        bigFileAlert.classList.remove('hiddenObject');
        returnToText.addEventListener('click', () => {
            bigFileAlert.classList.add('hiddenObject');
        });
        return false;
    }
}

function saveImageFileMemory() {
    // tenenmos que comprobar que el alrchivo entra en memoria antes de guardar
    let sizeImage = 0;
    for (let i = 0; i < 64; i++) {
        let color = savedImageFile.contentNotSaved[i];
        if (color != "") sizeImage++;
    }
    if (!memmoryStatus) memmoryStatus = 0;
    if (savedImageFile.contentNotSaved == undefined) savedImageFile.contentNotSaved = [];
    if (savedImageFile.name.length + sizeImage + parseInt(memmoryStatus) <= 1000) {
        // extraemos la información de color de cada celda.
        savedImageFile.content = savedImageFile.contentNotSaved;
        savedImageFile.date = new Date();
        console.log(savedImageFile);
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        if (saveFile) saveFile.setAttribute("style", "filter: invert(100%);");
        return true;
    } else {
        console.log('no podemos guardar');
        bigFileAlert.classList.remove('hiddenObject');
        returnToText.addEventListener('click', () => {
            bigFileAlert.classList.add('hiddenObject');
        });
        return false;
    }
}

function checkTextFileSaved() {
    //comparamos los dos contenidos de savedTextFile
    if (savedTextFile.content != savedTextFile.contentNotSaved || savedTextFile.content == undefined) {
        //si son diferentes mostramos el alert
        noneSaveAlert.classList.remove('hiddenObject');
        confirmYes.addEventListener('click', keepTextFile);
        confirmNo.addEventListener('click', eraseTextFile);
        return false;
    } else {
        //si son iguales no mostramos el alert
        let textFile = new fileTextImage('txt');
        textFile.name = savedTextFile.name;
        textFile.content = savedTextFile.content;
        textFile.date = new Date();
        let exist = false;
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            if (savedTextFilesMemory[i].name == textFile.name) {
                exist = true;
                // calculamos la diferencia de memoria 
                let allMemory = textFile.content.length -
                    savedTextFilesMemory[i].content.length +
                    parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', allMemory);
                //si existe lo sustituimos
                savedTextFilesMemory[i] = textFile;
                break;
            }
        }
        if (!exist) {
            savedTextFilesMemory.push(textFile);
            allMemory = savedTextFile.name.length + savedTextFile.content.length + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', allMemory);
        }
        sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
        console.log(savedTextFilesMemory);
        // eliminamos el objeto temporal de session storage
        savedTextFile = {};
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        return true;
    }
}

function checkImageFileSaved() {
    //comparamos los dos contenidos de savedTextFile
    if (checkEqualImages() || !savedImageFile.contentNotSaved) {
        //si son iguales no mostramos el alert
        let imageFile = new fileTextImage('img');
        imageFile.name = savedImageFile.name;
        imageFile.content = savedImageFile.content;
        imageFile.date = new Date();
        let exist = false;
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            if (savedImageFilesMemory[i].name == imageFile.name) {
                exist = true;
                // calculamos la diferencia de memoria
                let contentSize = 0;
                imageFile.content.forEach((color) => {
                    if (color != "") {
                        contentSize++;
                    }
                });
                let allMemory = contentSize - savedImageFilesMemory[i].content.length + parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', allMemory);
                //si existe lo sustituimos
                savedImageFilesMemory[i] = imageFile;
                break;
            }
        }
        if (!exist) {
            savedImageFilesMemory.push(imageFile);
            // incrementamos el valor de la memoria
            let contentSize = 0;
            imageFile.content.forEach((color) => {
                if (color != "") {
                    contentSize++;
                }
            });
            allMemory = imageFile.name.length + contentSize + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', allMemory);
        }
        sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
        console.log(savedImageFilesMemory);

        // eliminamos el objeto temporal de session storage
        savedImageFile = {};
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        return true;
    } else {
        //si son iguales no mostramos el alert
        noneSaveAlert.classList.remove('hiddenObject');
        confirmYes.addEventListener('click', keepImageFile);
        confirmNo.addEventListener('click', eraseImageFile);
        return false;
    }
}

function checkEqualImages() {
    let equal = true;
    for (let i = 0; i < savedImageFile.contentNotSaved.length; i++) {
        if (!savedImageFile.content || savedImageFile.content[i] != savedImageFile.contentNotSaved[i]) {
            equal = false;
            break;
        }
    }
    return equal;
}

function keepTextFile() {
    if (saveTextFileMemory()) {
        let textFile = new fileTextImage('txt');
        textFile.name = savedTextFile.name;
        textFile.content = savedTextFile.content;
        textFile.date = new Date();
        //comprobamos que no exista otro texto con el mismo nombre
        let exist = false;
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            if (savedTextFilesMemory[i].name == textFile.name) {
                exist = true;
                //calculamos la diferencia en memoria
                let allMemory = textFile.content.length - savedTextFilesMemory[i].content.length + parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', allMemory);
                //si existe lo sustituimos
                savedTextFilesMemory[i] = textFile;
                break;
            }
        }
        if (!exist) {
            savedTextFilesMemory.push(textFile);
            allMemory = savedTextFile.name.length + savedTextFile.content.length + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', allMemory);

        }
        sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));

        console.log(savedTextFilesMemory);

        savedTextFile = {};
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        previousPage();
    } else {
        noneSaveAlert.classList.add('hiddenObject');
    }
}

function keepImageFile() {
    if (saveImageFileMemory()) {
        let imageFile = new fileTextImage('img');
        imageFile.name = savedImageFile.name;
        imageFile.content = savedImageFile.content;
        imageFile.date = new Date();
        //comprobamos que no exista otro texto con el mismo nombre
        let exist = false;
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            if (savedImageFilesMemory[i].name == imageFile.name) {
                exist = true;
                // calculamos la diferencia de memoria
                let contentSize = 0;
                imageFile.content.forEach((color) => {
                    if (color != "") {
                        contentSize++;
                    }
                });
                let allMemory = contentSize - savedImageFilesMemory[i].content.length + parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', allMemory);
                //si existe lo sustituimos
                savedImageFilesMemory[i] = imageFile;
                break;
            }
        }
        if (!exist) {
            savedImageFilesMemory.push(imageFile);
            // incrementamos el valor de la memoria
            let contentSize = 0;
            imageFile.content.forEach((color) => {
                if (color != "") {
                    contentSize++;
                }
            });
            allMemory = imageFile.name.length + contentSize + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', allMemory);
        }
        sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
        console.log(savedImageFilesMemory);
        // eliminamos el objeto temporal de session storage
        savedImageFile = {};
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        previousPage();
    } else {
        noneSaveAlert.classList.add('hiddenObject');
    }
}

function eraseTextFile() {
    savedTextFile = {};
    sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
    previousPage();
}

function eraseImageFile() {
    savedImageFile = {};
    sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
    previousPage();
}

function eraseImage() {
    deleteFileAlert.classList.remove('hiddenObject');
    eraseYes.addEventListener('click', () => {
        boxes.forEach((box, index) => {
            box.style.backgroundColor = "";
        });

        savedImageFile.contentNotSaved = boxes.map((colorBox) => {
            return colorBox.style.backgroundColor;
        });
        //cambiamos el tamaño que se muestra junto a la imagen

        fullSize = savedImageFile.name.length;
        fileSize.innerText = fullSize + ' bytes';
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        deleteFileAlert.classList.add('hiddenObject');
    });
    eraseNo.addEventListener('click', () => {
        deleteFileAlert.classList.add('hiddenObject');
    });
}

function daletTextFile(fileToDelate) {
    console.log(fileToDelate)
    console.log(fileToDelate.childNodes[2].innerText.slice(0, -4));
    deleteFileAlert.classList.remove('hiddenObject');
    eraseYes.addEventListener('click', () => {
        //buscamos el fichero en la lista de objetos guardados
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            if (savedTextFilesMemory[i].name == fileToDelate.childNodes[2].innerText.slice(0, -4)) {
                let delatedFile = savedTextFilesMemory.splice(i, 1);
                sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
                console.log(delatedFile);
                //añadimos el elemento eliminado al array de elementos eliminados
                if (!deletedTextFilesMemory) deletedTextFilesMemory = [];

                deletedTextFilesMemory.push(delatedFile[0]);
                sessionStorage.setItem("deletedTextFilesMemory", JSON.stringify(deletedTextFilesMemory));

                //No decrementamos el valor de la memoria
                // allMemory = parseInt(memmoryStatus) - delatedFile[0].name.length - delatedFile[0].content.length;
                // sessionStorage.setItem('memmoryStatus', allMemory);
                // console.log(allMemory);
                // eliminamos el elemento del DOM
                fileToDelate.nextSibling.remove();
                fileToDelate.remove();
                break;
            }
        }
        deleteFileAlert.classList.add('hiddenObject');
    });
    eraseNo.addEventListener('click', () => {
        deleteFileAlert.classList.add('hiddenObject');
    });
}

function daletImageFile(fileToDelate) {
    console.log(fileToDelate)
    console.log(fileToDelate.childNodes[2].innerText.slice(0, -4));
    deleteFileAlert.classList.remove('hiddenObject');
    eraseYes.addEventListener('click', () => {
        //buscamos el fichero en la lista de objetos guardados
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            if (savedImageFilesMemory[i].name == fileToDelate.childNodes[2].innerText.slice(0, -4)) {
                let delatedFile = savedImageFilesMemory.splice(i, 1);
                sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
                console.log(delatedFile);
                //añadimos el elemento eliminado al array de elementos eliminados
                if (!deletedImageFilesMemory) deletedImageFilesMemory = [];
                deletedImageFilesMemory.push(delatedFile[0]);
                sessionStorage.setItem("deletedImageFilesMemory", JSON.stringify(deletedImageFilesMemory));

                //No decrementamos el valor de la memoria
                // let contentSize = 0;
                // delatedFile[0].content.forEach((color) => {
                //     if (color != "") {
                //         contentSize++;
                //     }
                // });
                // allMemory = parseInt(memmoryStatus) - delatedFile[0].name.length - contentSize;
                // sessionStorage.setItem('memmoryStatus', allMemory);
                // console.log(allMemory);
                // eliminamos el elemento del DOM
                fileToDelate.nextSibling.remove();
                fileToDelate.remove();
                break;
            }
        }
        deleteFileAlert.classList.add('hiddenObject');
    });
    eraseNo.addEventListener('click', () => {
        deleteFileAlert.classList.add('hiddenObject');
    });
}

function saveTextAndMove(file) {
    if (saveTextFileMemory()) {
        let allMemory = 0;
        let textFile = {};
        textFile.extension = 'txt';
        textFile.name = savedTextFile.name;
        textFile.content = savedTextFile.content;
        textFile.date = new Date();
        let exist = false;
        for (let i = 0; i < savedTextFilesMemory.length; i++) {
            if (savedTextFilesMemory[i].name == textFile.name) {
                exist = true;
                //calculamos la diferencia de memoria
                allMemory = textFile.content.length -
                    savedTextFilesMemory[i].content.length +
                    parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', allMemory);
                //si existe lo sustituimos
                savedTextFilesMemory[i] = textFile;
                break;
            }
        }
        if (!exist) {
            savedTextFilesMemory.push(textFile);
            allMemory = savedTextFile.name.length + savedTextFile.content.length + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', allMemory);

        }
        sessionStorage.setItem("savedTextFilesMemory", JSON.stringify(savedTextFilesMemory));
        console.log(savedTextFilesMemory);
        // incrementamos el valor de la memoria
        console.log(allMemory);


        savedTextFile.name = file.name;
        savedTextFile.content = file.content;
        savedTextFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        noneSaveAlert.classList.add('hiddenObject');
        // nos dirigimos a la pagina de editar ficheros
        window.location.href = 'textEditor.html';
    } else {
        noneSaveAlert.classList.add('hiddenObject');
    }
}

function saveImageAndMove(file) {
    if (saveImageFileMemory()) {
        let allMemory = 0;
        let imageFile = {};
        imageFile.extension = 'img';
        imageFile.name = savedImageFile.name;
        imageFile.content = savedImageFile.content;
        imageFile.date = new Date();
        let exist = false;
        for (let i = 0; i < savedImageFilesMemory.length; i++) {
            if (savedImageFilesMemory[i].name == imageFile.name) {
                exist = true;
                //calculamos la diferencia de memoria
                let contentSize = 0;
                imageFile.content.forEach((color) => {
                    if (color != "") {
                        contentSize++;
                    }
                });
                allMemory = contentSize -
                    savedImageFilesMemory[i].content.length +
                    parseInt(memmoryStatus);
                sessionStorage.setItem('memmoryStatus', allMemory);
                //si existe lo sustituimos
                savedImageFilesMemory[i] = imageFile;
                break;
            }
        }
        if (!exist) {
            savedImageFilesMemory.push(imageFile);
            let contentSize = 0;
            imageFile.content.forEach((color) => {
                if (color != "") {
                    contentSize++;
                }
            });
            allMemory = imageFile.name.length + contentSize + parseInt(memmoryStatus);
            sessionStorage.setItem('memmoryStatus', allMemory);

        }
        sessionStorage.setItem("savedImageFilesMemory", JSON.stringify(savedImageFilesMemory));
        console.log(savedImageFilesMemory);
        // incrementamos el valor de la memoria
        console.log(allMemory);


        savedImageFile.name = file.name;
        savedImageFile.content = file.content;
        savedImageFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        noneSaveAlert.classList.add('hiddenObject');
        // nos dirigimos a la pagina de editar ficheros
        window.location.href = 'imageEditor.html';
    } else {
        noneSaveAlert.classList.add('hiddenObject');
    }
}

function textFileNotSaved(file) {
    confirmYes.addEventListener('click', () => {
        console.log(file);
        saveTextAndMove(file);
    });
    confirmNo.addEventListener('click', () => {
        savedTextFile.name = file.name;
        savedTextFile.content = file.content;
        savedTextFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedTextFile", JSON.stringify(savedTextFile));
        window.location.href = 'textEditor.html';
    });
    noneSaveAlert.classList.remove('hiddenObject');
}

function imageFileNotSaved(file) {
    confirmYes.addEventListener('click', () => {
        console.log(file);
        saveImageAndMove(file);
    });
    confirmNo.addEventListener('click', () => {
        savedImageFile.name = file.name;
        savedImageFile.content = file.content;
        savedImageFile.contentNotSaved = file.content;
        sessionStorage.setItem("savedImageFile", JSON.stringify(savedImageFile));
        window.location.href = 'imageEditor.html';
    });
    noneSaveAlert.classList.remove('hiddenObject');
}