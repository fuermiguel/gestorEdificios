/* Instanciamos un objeto de tipo inmobiliaria y cargamos los datos a importar.
 * Definición de manejadores de eventos y funciones de acceso al DOM.
 */

import { Inmobiliaria } from './inmobiliaria.js'
import { Propietario } from './propietario.js';
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

            //Saber si el piso esta ocupado o vacío
            if (edificio.getPropietario(planta, puerta) instanceof Propietario) {
                let propietario = edificio.getPropietario(planta, puerta);
                generarVistaPropietario(divPropietario, propietario);
            } else {
                generarVistaPisoVacio(divPropietario);
            }
            //let textoPropietario = document.createTextNode('Propietario');
            //divPropietario.appendChild(textoPropietario);
            divPlanta.appendChild(divPropietario);

        }
        //Añado a div pisos un div planta
        divPisos.appendChild(divPlanta);

    }

}


/**
 * Genera la vista de los pisos ocupados.
 * @param {Element} nodoPadre 
 */
function generarVistaPropietario(nodoPadre, propietario) {
    console.log('--------------propietario------' + propietario.tamFamilia);
    let { nombre, genero, tamFamilia } = propietario;
    //creamos parrafo
    let parrafoNombre = document.createElement('p');
    let txtNombre = document.createTextNode(nombre);
    parrafoNombre.appendChild(txtNombre);

    //creamos imagen
    let imagen = document.createElement('img');
    //Añadimos el atributo en función del genero del propietario
    console.log('-------genero--', genero, tamFamilia);
    switch (tamFamilia) {
        case 1:
            if (genero == 'hombre') imagen.src = './img/hombre.jpg';
            else imagen.src = './img/mujer.jpg';
            break;
        case 2:
            imagen.src = './img/pareja.jpg';
            break;
        case 3:
            imagen.src = './img/familia-1.jpg';
            break;
        case 4:
            imagen.src = './img/familia-2.jpg';
            break;

        default:
            imagen.src = './img/familia-2.jpg';
            break;
    }


    //Añadimos al elemento padre
    nodoPadre.appendChild(parrafoNombre);
    nodoPadre.appendChild(imagen);

}

/**
 * Genera la vista para los pisos vacios
 * @param {Element} nodoPadre 
 */
function generarVistaPisoVacio(nodoPadre) {
    //creamos parrafo
    let parrafoNombre = document.createElement('p');
    let txtNombre = document.createTextNode('vacio');
    parrafoNombre.appendChild(txtNombre);

    //creamos imagen
    let imagen = document.createElement('img');
    imagen.src = './img/vacio.jpg';
    //Añadimos al elemento padre
    nodoPadre.appendChild(parrafoNombre);
    nodoPadre.appendChild(imagen);

}