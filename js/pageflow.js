const closeButton = document.querySelector(".closeButton");
const botones = document.querySelectorAll(".appButton");
let paginasVistas = sessionStorage.getItem("visitedPages");

let paginaActual = "";
//funciones a ejecutar cuando estemos en alguna de las aplicaciones
if (closeButton != null) {
    //sacamos el valor de la pagina actual en la que nos encontramos
    paginaActual = document.querySelector('.appType').innerText;
    //Añadimos lógica al boton de cerrar pestaña
    //Dar estilos a los botones al abrir la página y cambiar posicion de página si ya estaba abierta
    if (!paginasVistas) {
        paginasVistas = [];
    } else {
        paginasVistas = JSON.parse(paginasVistas);
        for (let i = 0; i < paginasVistas.length; i++) {
            if (paginasVistas[i] == paginaActual) {
                paginasVistas.splice(i, 1);
            }
            printBackgound(paginasVistas[i]);
        }
    }
    paginasVistas.push(paginaActual);
    for (let i = 0; i < paginasVistas.length; i++) {
        printBackgound(paginasVistas[i]);
    }
    sessionStorage.setItem("visitedPages", JSON.stringify(paginasVistas));
    // console.log(paginasVistas);
}

function printBackgound(element) {
    if (element === "Image Editor") {
        document.getElementById('imageEditorButton').classList.add("borderAppOpen");
        if (element == paginaActual) {
            document.getElementById('imageEditorButton').classList.add("backgroundApp");
        }
    } else if (element === "Search Files") {
        document.getElementById('searchButton').classList.add("borderAppOpen");
        if (element == paginaActual) {
            document.getElementById('searchButton').classList.add("backgroundApp");
        }
    } else if (element === "Trash") {
        document.getElementById('trashButton').classList.add("borderAppOpen");
        if (element == paginaActual) {
            document.getElementById('trashButton').classList.add("backgroundApp");
        }
    } else if (element === "Text Editor") {
        document.getElementById('textEditorButton').classList.add("borderAppOpen");
        if (element == paginaActual) {
            document.getElementById('textEditorButton').classList.add("backgroundApp");
        }
    }
}

botones.forEach(function(buton) {
    buton.addEventListener("click", function(event) {
        let buttonPressed = event.target.id;
        if (closeButton == null) {
            if (buttonPressed == 'searchButton' || buttonPressed == 'searchImage') {
                window.location.href = 'html/searchFiles.html';
            } else if (buttonPressed == 'trashButton' || buttonPressed == 'trashImage') {
                window.location.href = 'html/trash.html';
            } else if (buttonPressed == 'textEditorButton' || buttonPressed == 'textImage') {
                window.location.href = 'html/textEditor.html';
            } else if (buttonPressed == 'imageEditorButton' || buttonPressed == 'editImage') {
                window.location.href = 'html/imageEditor.html';
            }
        } else {
            if (buttonPressed == 'searchButton' || buttonPressed == 'searchImage') {
                window.location.href = 'searchFiles.html';
            } else if (buttonPressed == 'trashButton' || buttonPressed == 'trashImage') {
                window.location.href = 'trash.html';
            } else if (buttonPressed == 'textEditorButton' || buttonPressed == 'textImage') {
                window.location.href = 'textEditor.html';
            } else if (buttonPressed == 'imageEditorButton' || buttonPressed == 'editImage') {
                window.location.href = 'imageEditor.html';
            }
        }

    })
});

function previousPage() {
    //extraemos el ultimo valor del array de ventanas abiertas
    cerrarApp = paginasVistas.pop();
    //Si la ventana que hemos cerrado era la últimas abierta volvemos a inicio
    if (paginasVistas.length === 0) {
        window.location.href = "../index.html";
    } else { //en el caso de que no sea la ultimo nos dirigiremos a la abierta anteriormente
        pageToGo = paginasVistas.slice(-1)[0];
        if (pageToGo === "Search Files") {
            window.location.href = 'searchFiles.html';
        } else if (pageToGo === "Trash") {
            window.location.href = 'trash.html';
        } else if (pageToGo === "Text Editor") {
            window.location.href = 'textEditor.html';
        } else if (pageToGo === "Image Editor") {
            window.location.href = 'imageEditor.html';
        }
    }
    //actualizamos el array de ventanas abiertas
    sessionStorage.setItem("visitedPages", JSON.stringify(paginasVistas));
}