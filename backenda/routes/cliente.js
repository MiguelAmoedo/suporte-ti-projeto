const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControler');

// Rota para obter todos os clientes
router.get('/', clienteController.getClientes);

// Rota para criar um novo cliente
router.post('/', clienteController.createCliente);

// Rota para obter um cliente pelo ID
router.get('/:id', clienteController.getClienteById);

// Rota para atualizar um cliente pelo ID
router.put('/:id', clienteController.updateCliente);

// Rota para remover um cliente pelo ID
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
