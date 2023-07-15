const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota para obter todos os funcionários
router.get('/', funcionarioController.getFuncionarios);

// Rota para criar um novo funcionário
router.post('/', funcionarioController.createFuncionario);

// Rota para obter um funcionário pelo ID
router.get('/:id', funcionarioController.getFuncionarioById);

// Rota para atualizar um funcionário pelo ID
router.put('/:id', funcionarioController.updateFuncionario);

// Rota para remover um funcionário pelo ID
router.delete('/:id', funcionarioController.deleteFuncionario);

module.exports = router;
