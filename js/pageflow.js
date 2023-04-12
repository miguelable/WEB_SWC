// boton de cerrar aplicación
const closeButton = document.querySelector(".closeButton");
//botones de las aplicaciones
const botones = document.querySelectorAll(".appButton");
// array con las páginas visitadas
let paginasVistas = JSON.parse(sessionStorage.getItem("visitedPages"));

let paginaActual = "";

// añadimos estilos a los botones cuando nos encontramos en alguna aplicación
if (closeButton != null) {
    //sacamos el valor de la pagina actual en la que nos encontramos
    paginaActual = document.querySelector('.appType').innerText;
    // añadimos el estilo de la pagina actual
    if (!paginasVistas) paginasVistas = [];
    else {
        for (let i = 0; i < paginasVistas.length; i++) {
            if (paginasVistas[i] == paginaActual) paginasVistas.splice(i, 1);
            printBackgound(paginasVistas[i]);
        }
    }
    // añadimos la página actual al array de páginas vistas
    paginasVistas.push(paginaActual);
    for (let i = 0; i < paginasVistas.length; i++) {
        printBackgound(paginasVistas[i]);
    }
    //actualizamos el array de ventanas abiertas
    sessionStorage.setItem("visitedPages", JSON.stringify(paginasVistas));
}

// añadimos el estilo a los botones de la pagina actual
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

// añadimos los eventos a los botones 
botones.forEach(function(buton) {
    buton.addEventListener("click", function(event) {
        let buttonPressed = event.target.id;
        // eventos cuando nos encontramos en la pestaña de inicio
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
            // eventos cuando nos encontramos en alguna aplicación
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