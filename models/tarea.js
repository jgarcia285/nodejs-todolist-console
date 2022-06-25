const { v4 } = require('uuid'); // Genera ids unicos

class Tarea {

    id = '';
    descripcion = '';
    fechaCompletado = null;

    constructor(descripcion) {
        this.id = v4();
        this.descripcion = descripcion;
    }

}

module.exports = Tarea;