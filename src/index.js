//Configurar variables de entorno
import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';

import fileupload from 'express-fileupload';

const app = express();

//Routers
import indexRouter from './routes/index.Routes.js';
import cloudflareR2Router from './routes/cloudflareR2.Routes.js';
import amazonS3Router from './routes/amazonS3.Routes.js';


//TODO - Middlewares

//app.use(bodyParser.json({ limit: '100mb' }));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Para ocultar información sensible del servidor
//app.use(helmet());

// Permitir conexiones desde otros origenes remotos
app.use(cors());

// Para cuando me envien una petición POST desde un formulario, 
// pueda entender los campos que vienen desde allí
app.use(express.urlencoded({ extended: false }));

//Indicar al servidor que procesará datos en formato JSON durante las peticiones http
app.use(express.json());

//Para subir archivos
app.use(fileupload({
    //useTempFiles: true,
    //tempFileDir: './uploads'
}));

//Usar morgan en express para el monitoreo de las peticiones htttp
app.use(morgan('combined'));

//TODO - Settings

//Permitir conexiones de origen cruzado
app.set('PORT', process.env.PORT || 2000);
//app.set('PORT', 2000);

//Routes
app.use(indexRouter);
app.use(cloudflareR2Router);
app.use(amazonS3Router);


// carpeta public HTML  dirname me trae la ruta del proyecto
// path se encarga de contatenar dirname ypublic 
// la ruta por defecto llega a principal
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve('public')));

//Poner a la escucha el servidor
app.listen(app.get('PORT'), () => {
    console.log("Servidor corriendo por el puerto => ", app.get('PORT'))
});
