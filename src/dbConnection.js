import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('projetoestoque', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
});


try {
    await sequelize.authenticate();
    console.log('Conexão com o MySQL estabelecida com sucesso.');
} catch (error) {
    console.error('Não foi possível conectar ao MySQL:', error);
}

export default sequelize;
