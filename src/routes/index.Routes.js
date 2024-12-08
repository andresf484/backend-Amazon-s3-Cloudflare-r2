import { Router} from 'express';
const router = Router();

//https://dev.to/ericchapman/nodejs-express-part-5-routes-and-controllers-55d3

//Controller
import {
    getIndex
} from '../controllers/indexController.js';


//router.get('/', getIndex);

export default router;