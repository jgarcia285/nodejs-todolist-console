const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoTar() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    cargarTareas(tareas = []) {

        tareas.forEach(tarea => this._listado[tarea.id] = tarea);

    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    listadoCompleto() {
        console.log();
        this.listadoTar.forEach((tarea, index) => {

            const idx = `${index + 1}.`.green;
            const { descripcion, fechaCompletado } = tarea;
            const estado = (fechaCompletado) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${descripcion}: ${estado}`);
        })
    }

    listarCompletadas(completadas = true) {

        console.log();
        let indice = 0;
        this.listadoTar.forEach((tarea) => {

            const { descripcion, fechaCompletado } = tarea;

            if (completadas === true) {
                if (fechaCompletado) {
                    indice += 1;
                    console.log(`${(indice + '.').green} ${descripcion}: ${'Completada'.green}`);
                }
            } else {
                if (!fechaCompletado) {
                    indice += 1;
                    console.log(`${(indice + '.').green} ${descripcion}: ${'Pendiente'.red}`);
                }
            }
        });
    }

    marcarCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.fechaCompletado){
                tarea.fechaCompletado = new Date().toISOString();
            }
        })
    }

}

module.exports = Tareas;