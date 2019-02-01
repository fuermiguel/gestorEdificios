/************* Clase Edificio *********/
import { Propietario } from './propietario.js'

class Edificio {
    constructor(nombre = 'sin nombre', calle = 'sin calle', numero = 0, cp = '000000', plantas = new Array()) {
        this._nombre = nombre;
        this._calle = calle;
        this._numero = numero;
        this._cp = cp;
        this._plantas = plantas;
        //Dentro de cada planta tendremos un número de puerta donde 
        //almacenaremos el propietario, representado una instancia de propietario.
    }

    /**
     * 
     * Método que recibe el número de plantas y puertas por planta que queremos crear para el edificio.
     * Las plantas se añadiran a las ya creadas en el edificio. Todas las puertas se inicializan a null.
     */
    agregaPlantasYPuertas(plantas) {
        if (plantas.length <= 0) return;
        //if (nPuertas <= 0) return;
        if (plantas.length > 4) nPuertas = 4;

        for (let i = plantas.length - 1; i >= 0; i--) {
            // console.log(plantas, plantas[i]);
            this._plantas.push(new Array(plantas[i]));
            //relleno con null el último que he metido
            for (let j = 0; j < this._plantas[this._plantas.length - 1].length; j++) {
                this._plantas[this._plantas.length - 1][j] = null;
            }
        }
    }

    /**
     * 
     * Modifica el número del edificio
     */
    modificaNumero(numero) {
            this._numero = numero;
        }
        /**
         * 
         * Modifica el nombre de la calle
         */
    modificaCalle(calle) {
            this_calle = calle;
        }
        /**
         * 
         * Actualiza el código postal 
         */
    modificaCP(cp) {
        this._cp
    }

    /**
     * Actualiza en nombre de la calle
     */
    getCalle() {
            return this._calle;
        }
        /**
         * Obtiene el número del edificio
         */
    getNumero() {
            return this._numero;
        }
        /**
         * Obtiene el código postal
         */
    getCP() {
            return this._cp;
        }
        /**
         * Asigna el propietario al piso identificado por planta y puerta
         */
    agregaPropietario(propietario, planta, puerta) {
            let inquilino = new Propietario(propietario.nombre, propietario.genero, propietario.miembros);

            this._plantas[planta - 1][puerta - 1] = inquilino;
            //tener encuenta que planta1,piso1 estará en la posición(0,0) y etc..

        }
        /**
         * Devuelve el número de plantas del edificio
         */
    getNumeroPlantas() {
            return this._plantas.length;
        }
        /**
         * Devuelve el número de puertas de la planta
         */
    getNumeroPuertas(planta) {
            if (planta <= 0) return false; //Lo controlo por debajo y por arriba habrá que controlarlo antes de la llamada e
            return this._plantas[planta - 1].length;
        }
        /**
         * 
         * Devuelve el propietario identificado por planta y puerta
         */
    getPropietario(planta, puerta) {
        if (planta <= 0 || puerta <= 0) return false; //Compruebo por debajo , pero por arriba tendrá que hacerse antes de llamar al método
        return this._plantas[planta - 1][puerta - 1]; //Lo del menos uno es porque la matriz está rellena desde el (0,0)
    }

    getPlantas() {
        return this._plantas;
    }



};

export { Edificio };