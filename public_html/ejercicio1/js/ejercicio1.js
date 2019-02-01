/* Instanciamos un objeto de tipo inmobiliaria y cargamos los datos a importar.
 * Definición de manejadores de eventos y funciones de acceso al DOM.
 */

import { Inmobiliaria } from './inmobiliaria.js'
let inmobiliaria = new Inmobiliaria();


inmobiliaria.cargaDatos();

let edificio1 = inmobiliaria.getEdificio("General Yagüe", 2);


generarVista(edificio1);


function generarVista(edificio) {

    console.table(edificio);

    let divEdificio = document.createElement('div');
    divEdificio.className = 'edificio';
    let cabecera = document.createElement('h1');
    let textoEdificio = document.createTextNode(
        `C\ ${edificio.getCalle()} nº ${edificio.getNumero()} . ${edificio.getCP()}`);

    cabecera.appendChild(textoEdificio);
    divEdificio.appendChild(cabecera);
    document.body.appendChild(divEdificio);

    //Creamos bloque de pisos
    let divPisos = document.createElement('div');
    divPisos.className = 'pisos';
    divEdificio.appendChild(divPisos);

    //Generamos las plantas y puertas por planta
    for (let planta = 0; planta < edificio.getNumeroPlantas(); planta++) {
        let divPlanta = document.createElement('div');
        divPlanta.className = 'planta';
        //Por cada planta un número de puertas
        let puertas = edificio.getNumeroPuertas(planta + 1);
        //Según el número de puertas una clase
        let clase = '';
        switch (puertas) {
            case 1:
                clase = 'col-4';
                break;
            case 2:
                clase = 'col-2';
                break;
            case 4:
                clase = 'col-1';
                break;
        }
        for (let puerta = 0; puerta < puertas; puerta++) {
            let divPropietario = document.createElement('div');
            divPropietario.classList.add('propietario');
            divPropietario.classList.add(clase);
            let textoPropietario = document.createTextNode('Propietario');
            divPropietario.appendChild(textoPropietario);
            divPlanta.appendChild(divPropietario);

        }
        //Añado a div pisos un div planta
        divPisos.appendChild(divPlanta);

    }

}


/**
 * Genera los elementos para la vista de los propietarios.
 * @param {Element} nodoPadre 
 */
function generarVistaPropietario(nodoPadre, genero) {
    //creamos parrafo
    let parrafoNombre = document.createElement('p');
    let txtNombre = document.createTextNode('nombre');
    parrafoNombre.appendChild(txtNombre);

    //creamos imagen
    let imagen = document.createElement('img');
    //Añadimos el atributo en función del genero del propietario
    switch (genero) {
        case 'hombre':
            imagen.src = '../img/hombre.jpg';
            break;
        case 'mujer':
            imagen.src = '../img/mujer.jpg';
            break;

        default:
            break;
    }


    //Añadimos al elemento padre
    nodoPadre.appendChild(parrafoNombre);
    nodoPadre.appendChild(imagen);

}