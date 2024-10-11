import { DataTypes } from 'sequelize';
import sequelize from '../../dbConnection.js';

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// Funções de manipulação
const productModel = {
    getAll: async () => {
        return await Product.findAll();
    },
    create: async (productData) => {
        return await Product.create(productData);
    },
    update: async (id, productData) => {
        const [updated] = await Product.update(productData, {
            where: { id }
        });
        return updated;
    },
    delete: async (id) => {
        const deleted = await Product.destroy({
            where: { id }
        });
        return deleted;
    }
};

export default productModel;
