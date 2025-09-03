import { Router } from 'express';
import { ingest_book } from '../controllers/ingest_book.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
const router = Router();

router.route('/').post(upload.single('file'),ingest_book);

export default router