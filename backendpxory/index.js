const express = require('express');
const bodyParser = require('body-parser');
const Request = require('request');
const config = require('./config');
const app = express();
const port = config.port_app;


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

/**
 * Configuracion de cabeceras para el servicio
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.origin_client);
    res.header('Access-Control-Allow-Headers', config.allow_headers);
    res.header('Access-Control-Allow-Methods', config.allow_method);
    res.header('Allow', config.allow_method);
    next();
});

/**
 * 
 */
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express API Comunication Blotter Swap Kondor' })
})

/**
 * Consumo de servicio blotter por metodo GET vinculando cabeceras que llegan desde angular
 * y datos desde request.
 * 
 * si el mensaje de respuesta es "User unauthorized or token has expired"
 * este Servicio envia un estado 401 a Angular, permitiendo asi
 * la salida de la aplicación.
 * 
 * en caso contrario envia un estado 200 OK con la informacion de swap
 */
app.get('/blotter', (req, res) => {

    logview("Ejecutando el GET BLOTTER")

    Request.post({
        "headers": {
            'Content-Type': req.headers["content-type"],
            'Authorization': req.headers.authorization
        },
        "url": config.url_swap + '?State=' + req.query.State
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }
        var respuesta = JSON.parse(body);
        if (respuesta.Message === config.msg401) {
            logview("Enviando Usuario No Autorizado: Status 401");
            res.status(401).send(body);
        } else {
            logview("Enviando datos swap : status 200 OK")
            res.status(200).send(body);
        }
    });
});

/**
 * Consumo de servicio blotter por metodo GET vinculando cabeceras que llegan desde angular
 * y datos desde request.
 * 
 * si el mensaje de respuesta es "User unauthorized or token has expired"
 * este Servicio envia un estado 401 a Angular, permitiendo asi
 * la salida de la aplicación.
 * 
 * en caso contrario envia un estado 200 OK con la informacion de swap
 */
app.post('/blotter', (req, res) => {
    logview("Ejecutando el POST BLOTTER")
    Request.post({
        "headers": {
            'Content-Type': req.headers["content-type"],
            'Authorization': req.headers.authorization
        },
        "url": config.url_swap + '?State=' + req.query.State
    }, (error, response, body) => {
        if (error) {
            return console.log(error);
        }
        var respuesta = JSON.parse(body);
        if (respuesta.Message === config.msg401) {
            logview("Enviando Usuario No Autorizado : status 401");
            res.status(401).send(body);
        } else {
            logview("Enviando datos swap : status 200 OK");
            res.status(200).send(body);
        }
    });
});

/**
 * Consumo de servicio reprocess por metodo POST vinculando cabeceras que llegan desde angular
 * y datos desde request.
 * 
 * si el mensaje de respuesta es "User unauthorized or token has expired"
 * este Servicio envia un estado 401 a Angular, permitiendo asi
 * la salida de la aplicación.
 * 
 * En caso contrario envia un estado 200 OK con la informacion de swap
 */
app.post('/reprocess', (req, res) => {

    logview("Ejecutando el Reprocess")

    var data = req.body;
    Request.post({
        "headers": {
            'Content-Type': req.headers["content-type"],
            'Authorization': req.headers.authorization
        },
        "url": config.url_reprocess,
        form: { 'SetFx_Id': data.SetFx_Id, 'Action': data.Action, 'Status': data.Status }
    }, (error, response, body) => {

        if (error) {
            return console.log(error);
        }
        var respuesta = JSON.parse(body);
        if (respuesta.Message === config.msg401) {
            logview("Enviando Usuario No Autorizado : Status 401");
            res.status(401).send(body);
        } else {
            logview("Enviando Data de Reproceso : status 200 OK");
            res.status(200).send(body);
        }
    });
});

/**
 * Inicio de la aplicacion con puerto de escucha
 */
app.listen(port, () => {
    logview(`App running on port ${port}.`);
});

/**
 * Función para imprimier log a consola.
 * @param {*} msg 
 */
function logview(msg) {
    var date = new Date();
    console.log("------------------------------------------------------------");
    console.log("Hora Ejecución : " + date.getFullYear() + "/" +
        date.getMonth() + "/" + date.getDay() + " " + date.getHours()
        + ":" + date.getMinutes() + ":" + date.getSeconds() + "-" +
        date.getMilliseconds())
    console.log(msg);
    console.log("------------------------------------------------------------");
}