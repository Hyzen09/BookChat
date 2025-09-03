import { Router } from 'express';
import { test } from '../controllers/test.controller.js';
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route('/').post(upload.single('file'),test);

export default router