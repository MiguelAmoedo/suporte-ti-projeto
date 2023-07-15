const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');

// Rota para criar um novo chamado
router.post('/', chamadoController.createChamado);

// Rota para verificar o status de um chamado pelo ID
router.get('/status/:id', chamadoController.verificarStatusChamado);

// Rota para obter todos os chamados
router.get('/', chamadoController.getChamados);

// Rota para obter um chamado pelo ID
router.get('/:id', chamadoController.getChamadoById);

// Rota para designar um funcionário a um chamado existente
router.post('/designarFuncionario', chamadoController.designarFuncionario);

// Rota para atualizar um chamado pelo ID
router.put('/:id', chamadoController.updateChamado);

module.exports = router;
