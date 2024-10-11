import express from 'express';
import cors from 'cors';
import login from './api/auth/login.js';
import products from './api/products/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());

// Log das requisições
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url} | Method: ${req.method}`);
  next();
});

// Rotas
app.use('/api/auth/', login);
app.use('/api/products/', products);

// Iniciando o servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Definindo um tempo limite para o servidor
server.setTimeout(5000);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro detectado:', err.message);
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor' });
});
