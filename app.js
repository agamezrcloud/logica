// Lista de almacenamiento de nombres de los amigos
let listaDeNombre = [];

// Función para actualizar el contenido de un elemento HTML con un nuevo texto
function asignarTextoNombre(id, texto) {
    let elementoHTML = document.getElementById(id);  // Obtiene el elemento por ID
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;  // Asigna el texto
    }
}

// Función que se ejecuta al hacer clic en "Añadir"
function addfriend() {
    let nombreIngresado = document.getElementById('amigo');  // Obtiene el valor del campo de texto
    let nombre = nombreIngresado.value.trim();  // Elimina espacios extra al principio y final del texto

    // Verifica que el nombre sea solo letras, incluyendo espacios entre palabras
    if (nombre && /^[A-Za-zÑñ\s]+$/.test(nombre)) {  // Si el nombre no está vacío y solo tiene letras 
        nombre = nombre.toUpperCase();  // Convierte el nombre a mayúsculas
        
        // Verifica si el nombre ya existe en la lista
        if (listaDeNombre.includes(nombre)) {
            alert("Este nombre ya ha sido agregado.");
            limpiarCampoTexto();
            return;
        }
        
        listaDeNombre.push(nombre);  // Añade el nombre a la lista
        actualizarLista();  // Actualiza la lista en pantalla
        limpiarCampoTexto(); //limpia el campo de texto

        // Limpia el mensaje de resultado si se agrega un nuevo nombre
        asignarTextoNombre('resultado', '');
    } else {
        alert("Por favor, ingresa un nombre válido (solo letras y espacios). ");  // Muestra un mensaje si el nombre no es válido
        limpiarCampoTexto(); //limpia el campo de texto
    }
}

//Funcion para limpiar el campo de texto
function limpiarCampoTexto() {
    let nombreIngresado = document.getElementById('amigo');  // Obtiene el campo de texto
    nombreIngresado.value = '';  // Limpia el valor del campo de texto
    nombreIngresado.focus();  // focus en el campo de texto de entrada
}

// Función para actualizar la lista de amigos en el HTML
function actualizarLista() {
    const listaHTML = document.getElementById('listaAmigos');  // Obtiene el elemento de la lista
    listaHTML.innerHTML = '';  // Limpia la lista antes de volver a actualizarla

    listaDeNombre.forEach((nombre, indice) => {  // Recorre todos los nombres en la lista
        const li = document.createElement('li');  // Crea un nuevo elemento <li>
        li.textContent = `${indice + 1}. ${nombre}`;  // Establece el número indice y luego el texto del nombre
        listaHTML.appendChild(li);  // Añade el texto del <li> al final de la lista
    });
}

// Función para sortear un nombre aleatorio
function sortearAmigo() {
    if (listaDeNombre.length > 0) {  // Si la lista tiene al menos un nombre
        const indiceAleatorio = Math.floor(Math.random() * listaDeNombre.length);  // Genera un índice aleatorio
        const nombreSorteado = listaDeNombre[indiceAleatorio];  // Obtiene el nombre en ese índice
        listaDeNombre.splice(indiceAleatorio, 1);  // Elimina el nombre sorteado de la lista

        // Muestra el nombre sorteado
        asignarTextoNombre('resultado', `El amigo secreto es: ${nombreSorteado}`);


        // Si ya no hay más amigos en la lista, muestra un mensaje
        if (listaDeNombre.length === 0) {
            const ul = document.createElement('ul');  // Crea un nuevo elemento <ul>
            const textoNombre = document.getElementById('resultado');
            ul.textContent = `>>> YA NO QUEDAN MÁS AMIGOS EN LA LISTA <<<` //establece el texto que irá en el nuevo <ul>
            
            asignarTextoNombre('resultado', `El último amigo secreto es: [${nombreSorteado}]`);
            textoNombre.appendChild(ul); //añade un nuevo <ul> seguido del <ul> que contiene el nombre del amigo secreto              
        }
        
        actualizarLista();  // Actualiza la lista en pantalla
    } else {
        alert("La lista está vacía, agrega nombres primero.");  // Muestra un mensaje si la lista está vacía
    }
    limpiarCampoTexto(); // limpia la caja de texto
}

document.getElementById('amigo').addEventListener('keypress', function(event) { 
    if (event.key === 'Enter') {  //permite ir a la funcion para agregar nombre a la lista al presionar enter
        addfriend();  // agrega un nuevo amigo a la lista
    }
})

window.onload = function() { 
    document.getElementById('amigo').focus(); //permite mantener focus inicial en campo de texto
}


