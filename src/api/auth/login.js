import express from 'express';
import { login } from '../controllers/authController.js';; // Importando a função login do authController

const router = express.Router();

// Rota de login
router.post('/login', login); // Chama a função login quando /login é acessado
console.log('Login route accessed');

export default router;