const inquirer = require('inquirer');

require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        pageSize: 10,
        message: 'Seleccione una opcion',
        choices: [{
            value: '1',
            name: `${'1.'.green} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Completar tarea`
        },
        {
            value: '3',
            name: `${'3.'.green} Borrar tarea`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas`
        },
        {
            value: '5',
            name: `${'5.'.green} Listar tareas completas`
        },
        {
            value: '6',
            name: `${'6.'.green} Listar tareas pendientes`
        },
        {
            value: '7',
            name: `${'7.'.green} Salir\n`
        }]
    }
]



const inquirerMenu = async () => {

    console.log('================'.green)
    console.log('Lista de tareas'.white)
    console.log('================'.green)

    const { opcion } = await inquirer.prompt(menuOpts);

    return opcion;

}

const pausa = async () => {

    const pausaOpts = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'enter'.red} para continuar`
    }]

    console.log('\n')

    await inquirer.prompt(pausaOpts);

}

const leerInput = async (message) => {
    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor"
                } else {
                    return true;
                }
            }
        }
    ];

    const { descripcion } = await inquirer.prompt(pregunta);
    return descripcion;
}

const listadoTareasABorrar = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            pageSize: `${choices.length}`,
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(pregunta);

    return id;
}

const confirmarEliminacion = async (message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

    const filtro = tareas.filter( (tarea) => tarea.fechaCompletado === null);
    const choices = filtro.map((tarea, i) => {

        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`,
            checked: false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            pageSize: `${choices.length}`,
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasABorrar,
    confirmarEliminacion,
    mostrarListadoCheckList
}