const Funcionario = require('../models/funcionariosModels');
const Chamado = require('../models/chamadoModels');
const Cliente = require('../models/clienteModels');
const mongoose = require('mongoose');

exports.createChamado = async (req, res) => {
  try {
    const novoChamado = new Chamado(req.body);
    novoChamado.status = 'aberto'; // Define o status como 'aberto'
    await novoChamado.save();

    // Cria um novo cliente com base no nome do chamado
    const novoCliente = new Cliente({ nome: novoChamado.nome });
    await novoCliente.save();

    res.status(201).json(novoChamado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

  

  // Verifica o status de um chamado pelo ID
exports.verificarStatusChamado = async (req, res) => {
    try {
      const chamado = await Chamado.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado' });
      }
      res.status(200).json({ status: chamado.status });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  // Obtém todos os chamados
  exports.getChamados = async (req, res) => {
    try {
      const chamados = await Chamado.find();
      res.status(200).json(chamados);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Obtém um chamado pelo ID
  exports.getChamadoById = async (req, res) => {
    try {
      const chamado = await Chamado.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado' });
      }
      res.status(200).json(chamado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.designarFuncionario = async (req, res) => {
    try {
      const { idFuncionario, idChamado } = req.body;
  
      if (!idFuncionario) {
        return res.status(400).json({ message: 'O ID do funcionário não foi fornecido' });
      }
  
      if (!idChamado) {
        return res.status(400).json({ message: 'O ID do chamado não foi fornecido' });
      }
  
      // Verifica se o ID do funcionário é um ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(idFuncionario)) {
        return res.status(400).json({ message: 'ID do funcionário inválido' });
      }
  
      // Verifica se o ID do chamado é um ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(idChamado)) {
        return res.status(400).json({ message: 'ID do chamado inválido' });
      }
  
      // Verifica se o funcionário e o chamado existem
      const funcionario = await Funcionario.findById(idFuncionario);
      const chamado = await Chamado.findById(idChamado);
  
      if (!funcionario) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }
  
      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado' });
      }
  
      // Verifica se o chamado já está em andamento
      if (chamado.status === 'em andamento') {
        return res.status(400).json({ message: 'O chamado já está em andamento' });
      }
  
      // Verifica se o funcionário já está designado a outro chamado
      const chamadoFuncionario = await Chamado.findOne({ funcionario: idFuncionario });
      if (chamadoFuncionario && chamadoFuncionario.id !== idChamado) {
        return res.status(400).json({ message: 'O funcionário já está designado a outro chamado' });
      }
  
      // Define o status do chamado como 'em andamento'
      chamado.status = 'em andamento';
  
      // Adiciona o ID do funcionário no campo 'funcionario' do documento do chamado
      chamado.funcionario = idFuncionario;
  
      // Adiciona o ID do funcionário no array 'funcionarios' do documento do chamado
      if (!chamado.funcionarios) {
        chamado.funcionarios = [idFuncionario];
      } else {
        chamado.funcionarios.push(idFuncionario);
      }
  
      await chamado.save();
  
      res.status(200).json(chamado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  

  
  exports.updateChamado = async (req, res) => {
    try {
      const chamado = await Chamado.findById(req.params.id);
      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado' });
      }
  
      chamado.status = req.body.status; // Atualiza o status
  
      if (chamado.status === 'concluído') {
        chamado.dataConclusao = new Date(); // Gera a data e hora de conclusão
      }
  
      await chamado.save();
  
      res.status(200).json(chamado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  