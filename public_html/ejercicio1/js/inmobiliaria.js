/******************** Clase Inmobiliaria  ****************************/



import { Edificio } from './edificio.js'
import { edificiosImportar, inquilinosImportar } from './importar.js'

class Inmobiliaria {
    constructor() {
            // this._edificios = edificios;
            this._edificios = [];
        }
        /**
         * Inserta un edificio en el array
         */
    addEdificio(edificio) {

        }
        /**
         * Devuelve el edificio con la calle y número proporcionados, 
         * o null si no existe.
         */
    getEdificio(calle, numero) {

            for (const edificio of this._edificios) {
                if (edificio.getCalle() == calle && edificio.getNumero() == numero) return edificio;
            }
            return null;
        }
        /**
         * Carga los datos del fichero importar.js en el array
         */
    cargaDatos() {
        for (let i = 0; i < edificiosImportar.length; i++) {
            let edificioImportar = edificiosImportar[i];

            let edificio = new Edificio('',
                edificioImportar.calle,
                edificioImportar.numero,
                edificioImportar.cp);



            //Agrego planta y puerta
            edificio.agregaPlantasYPuertas(edificioImportar.plantas);


            //Agregamos los propietarios
            //Recoremos el array propietarios
            //Comparamos calle y número 
            //Si coincide llamamos al método agregar
            for (const propietario of inquilinosImportar) {

                if (propietario['calle'] == edificio.getCalle() && propietario['numero'] == edificio.getNumero()) {

                    edificio.agregaPropietario(propietario, propietario['piso'], propietario['puerta']);
                }
            }


            this._edificios.push(edificio);


        }

        // console.table(this._edificios);
    }

};

export { Inmobiliaria };