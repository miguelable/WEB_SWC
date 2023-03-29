const closeButton = document.querySelector(".closeButton");
const openAppButton = document.querySelector("#barLauncher");

// Obtener el array almacenado en el almacenamiento de sesión, si existe
const visitedPages = JSON.parse(sessionStorage.getItem('visitedPages')) || [];

// Función para volver a la página anterior y guardar el array de pageflow en el almacenamiento de sesión.
function goback() {
    visitedPages.pop();
    if (window.location.pathname == '/html/textEditor.html') {
        sessionStorage.setItem("isText", "false");
        sessionStorage.removeItem("text");
    }
    if (window.location.pathname == '/html/imageEditor.html') {
        sessionStorage.setItem("isImage", "false");
        sessionStorage.removeItem("colors");
    }
    if (visitedPages.length > 0) {
        window.location.href = ".." + visitedPages.slice(-1)[0];
    } else {
        window.location.href = "../index.html";
    }
    sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));
}

// Función para guardar la página visitada en el array de pageflow y redirigirnos a la página que queremos.
function recordVisitedPage(url) {
    let found = false;
    for (let i = 0; i < visitedPages.length; i++) {
        if (visitedPages[i] == url) {
            visitedPages.splice(i, 1);
            visitedPages.push(url);
            found = true;
            break;
        }
    }
    if (!found) {
        visitedPages.push(url);
    }
    sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    window.location.href = ".." + url;
}

// Comprobamos el boton que se ha pulsado para dirigirnos a la página que queremos depues de guardar
// la direccion en el array de pageflow.
openAppButton.addEventListener('click', function(event) {
    let objectPressed = event.target.id;
    if (objectPressed == 'searchButton' || objectPressed == 'searchImage') {
        recordVisitedPage('/html/searchFiles.html')
    } else if (objectPressed == 'trashButton' || objectPressed == 'trashImage') {
        recordVisitedPage('/html/trash.html')
    } else if (objectPressed == 'textEditorButton' || objectPressed == 'textImage') {
        recordVisitedPage('/html/textEditor.html')
    } else if (objectPressed == 'imageEditorButton' || objectPressed == 'editImage') {
        recordVisitedPage('/html/imageEditor.html')
    }
})

//comprobamos si estamos en la página de inicio y damos estilo a los botones de navegador.
if (closeButton != null) {
    closeButton.addEventListener('click', goback);
    if (visitedPages.length > 0) {
        for (let i = 0; i < visitedPages.length; i++) {
            if (visitedPages[i] == '/html/searchFiles.html') {
                document.getElementById('searchButton').classList.add("borderAppOpen");
                if (window.location.pathname == '/html/searchFiles.html') {
                    document.getElementById('searchButton').classList.add("backgroundApp");
                }
            } else if (visitedPages[i] == '/html/trash.html') {
                document.getElementById('trashButton').classList.add("borderAppOpen");
                if (window.location.pathname == '/html/trash.html') {
                    document.getElementById('trashButton').classList.add("backgroundApp");
                }
            } else if (visitedPages[i] == '/html/textEditor.html') {
                document.getElementById('textEditorButton').classList.add("borderAppOpen");
                if (window.location.pathname == '/html/textEditor.html') {
                    document.getElementById('textEditorButton').classList.add("backgroundApp");
                }
            } else if (visitedPages[i] == '/html/imageEditor.html') {
                document.getElementById('imageEditorButton').classList.add("borderAppOpen");
                if (window.location.pathname == '/html/imageEditor.html') {
                    document.getElementById('imageEditorButton').classList.add("backgroundApp");
                }
            }
        }
    }
}

// Función para actualizar la fecha y hora
function updateDateTime() {
    // Obtener la fecha y hora actual
    let now = new Date();
    // Convertir la fecha y hora en una cadena de texto
    let actualTime = now.toLocaleTimeString();
    let actualDate = now.toLocaleDateString();

    // Mostrar la fecha y hora en un elemento HTML con el ID "datetime"
    document.getElementById("hour").innerHTML = actualTime;
    document.getElementById("date").innerHTML = actualDate
}

// Actualizar la fecha y hora cada segundo (1000 milisegundos)
setInterval(updateDateTime, 1000);