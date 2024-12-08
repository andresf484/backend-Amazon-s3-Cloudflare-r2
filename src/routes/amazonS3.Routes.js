import { Router} from 'express';
const router = Router();

//https://dev.to/ericchapman/nodejs-express-part-5-routes-and-controllers-55d3

//Controller
import {
    listarArchivos,
    subirArchivo,
    infoArchivo,
    obtenerArchivoDirectamente,
    descargarArchivo,
    eliminarArchivo
} from '../controllers/amazonS3Controller.js';


router.get('/files', listarArchivos);
router.post('/files', subirArchivo);
router.post('/files/file-info', infoArchivo);
router.get('/media/:fileName', obtenerArchivoDirectamente);
router.post('/files/download-file', descargarArchivo);
router.delete('/files', eliminarArchivo);

export default router;