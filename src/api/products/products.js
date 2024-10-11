import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Rota para obter todos os produtos
router.get('/', productController.listProducts);

// Rota para criar um novo produto
router.post('/', productController.createProduct);
    
// Rota para atualizar um produto
router.put('/:id', productController.updateProduct);

// Rota para deletar um produto
router.delete('/:id', productController.deleteProduct);

export default router;
