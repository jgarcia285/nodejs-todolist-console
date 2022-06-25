require('colors');

const { guardarInfo, leerInfo } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasABorrar, confirmarEliminacion, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasInfo = leerInfo();

    if (tareasInfo) {
        tareas.cargarTareas(tareasInfo);
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                const ids = await mostrarListadoCheckList(tareas.listadoTar);
                tareas.marcarCompletadas(ids);
                break;
            case '3':
                const id = await listadoTareasABorrar(tareas.listadoTar);
                if (id !== '0') {
                    const confirmar = await confirmarEliminacion('¿Eliminar tarea?');
                    if (confirmar) {
                        tareas.borrarTarea(id);
                    }
                }
                break;
            case '4':
                tareas.listadoCompleto();
                break;
            case '5':
                tareas.listarCompletadas(true);
                break;
            case '6':
                tareas.listarCompletadas(false);
                break;

            default:
                break;
        }
        guardarInfo(tareas.listadoTar);

        await pausa();

    } while (opt !== '7');

}

main();