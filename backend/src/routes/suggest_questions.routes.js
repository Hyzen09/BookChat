import { Router } from 'express';
import { suggest_question } from '../controllers/suggest_questions.controller.js'; 
const router = Router();

router.route('/').post(suggest_question);

export default router