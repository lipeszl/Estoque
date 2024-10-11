import Product from '../models/productModel.js';

const productController = {
    listProducts: async (req, res) => {
        try {
            const results = await Product.getAll();
            if (!results.length) {
                return res.status(404).json({ message: 'Nenhum produto encontrado.' });
            }
            res.json(results);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    },
    
    createProduct: async (req, res) => {
        const productData = req.body;
        try {
            const result = await Product.create(productData);
            res.status(201).json({ id: result.insertId, ...productData });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ error: 'Erro ao criar produto.' });
        }
    },

    updateProduct: async (req, res) => {
        const id = req.params.id;
        const productData = req.body;
        try {
            await Product.update(id, productData);
            res.json({ message: 'Produto atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(404).json({ error: 'Produto não encontrado ou erro ao atualizar.' });
        }
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;
        try {
            await Product.delete(id);
            res.json({ message: 'Produto excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(404).json({ error: 'Produto não encontrado ou erro ao deletar.' });
        }
    }
};

export default productController;
