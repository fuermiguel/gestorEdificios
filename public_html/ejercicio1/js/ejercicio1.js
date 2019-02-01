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
                generarVistaPropietario(divPropietario, propietario, planta, puerta);
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
function generarVistaPropietario(nodoPadre, propietario, planta, puerta) {

    let { nombre, genero, tamFamilia } = propietario;
    //creamos parrafo
    let parrafoNombre = document.createElement('p');
    let txtNombre = document.createTextNode(nombre);
    parrafoNombre.appendChild(txtNombre);

    //creamos imagen
    let imagen = document.createElement('img');
    //Añadimos el atributo en función del genero del propietario

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

    //Creamos div botones
    let divBotones = document.createElement('div');
    divBotones.classList.add('botones');
    //Creamos boton modificar
    let btnModificar = document.createElement('button');
    btnModificar.classList.add('modificar');
    let txtModificar = document.createTextNode('Modificar');
    btnModificar.appendChild(txtModificar);
    //Creamos boton borrar
    let btnBorrar = document.createElement('button');
    btnBorrar.classList.add('borrar');
    btnBorrar.setAttribute('planta', planta);
    btnBorrar.setAttribute('puerta', puerta);


    let txtBorrar = document.createTextNode('Borrar');
    btnBorrar.appendChild(txtBorrar);
    //Añadimos los botones a div botones
    divBotones.appendChild(btnModificar);
    divBotones.appendChild(btnBorrar);


    //Añadimos todo lo creado al elemento padre pasado coo parámetro
    nodoPadre.appendChild(parrafoNombre);
    nodoPadre.appendChild(imagen);
    nodoPadre.appendChild(divBotones);

    //generamos los eventos
    btnModificar.addEventListener('click', function() {
        //
    })

    btnBorrar.addEventListener('click', function(event) {
        //Tenemos la posibilidad de obtener la planta y el piso por si nos hiciera falta.
        // console.log(event.target.getAttribute('planta'), event.target.getAttribute('puerta'));

        //Capturamos el elemento padre 
        let divPropietario = event.target.parentElement.parentElement;

        //Borramos todos sus hijos
        while (divPropietario.hasChildNodes()) {
            divPropietario.removeChild(divPropietario.firstChild);
        }

        //Generamos una nueva vista, es este caso de piso vacío
        generarVistaPisoVacio(divPropietario);


    })

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

    //Creamos div botones
    let divBotones = document.createElement('div');
    divBotones.classList.add('botones');

    //Creamos boton Aniadir
    let btnAniadir = document.createElement('button');
    btnAniadir.classList.add('aniadir');
    let txtAniadir = document.createTextNode('Añadir');
    btnAniadir.appendChild(txtAniadir);

    //Añadimos el boton a div botobes
    divBotones.appendChild(btnAniadir);

    //Añadimos al elemento padre
    nodoPadre.appendChild(parrafoNombre);
    nodoPadre.appendChild(imagen);
    nodoPadre.appendChild(divBotones);

    //Aádimos los eventos
    btnAniadir.addEventListener('click', function() {
        let formulario = document.getElementById('formulario');
        let btnModificar = document.getElementById('formulario-modificar');
        let btnCerrar = document.getElementById('formulario-borrar');

        formulario.style.display = 'block';
        btnModificar.hidden = true;

        btnCerrar.addEventListener('click', function() {
            formulario.style.display = 'none';
        })

    })

}