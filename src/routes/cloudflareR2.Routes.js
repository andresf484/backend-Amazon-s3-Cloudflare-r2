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
} from '../controllers/cloudflareR2Controller.js';


router.get('/cloudflare/files', listarArchivos);
router.post('/cloudflare/files', subirArchivo);
router.post('/cloudflare/file-info', infoArchivo);
router.get('/cloudflare/media/:fileName', obtenerArchivoDirectamente);
router.post('/cloudflare/download-file', descargarArchivo);
router.delete('/cloudflare/files', eliminarArchivo);

export default router;