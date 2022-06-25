const fs = require('fs');

const archivo = './info/data.json';

const guardarInfo = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));

}

const leerInfo = () => {

    //Validamos que el archivo exista
    if (!fs.existsSync(archivo)) {
        return null;
    } else {
        const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
        const data = JSON.parse(info)

        return data;
    }
}

module.exports = {
    guardarInfo,
    leerInfo
}