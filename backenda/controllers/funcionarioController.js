const Funcionario = require  ('../models/funcionariosModels')


// Cria um novo funcionário
exports.createFuncionario = async (req, res) => {
  try {
    const novoFuncionario = new Funcionario(req.body);
    await novoFuncionario.save();
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtém todos os funcionários
exports.getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.status(200).json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtém um funcionário pelo ID
exports.getFuncionarioById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualiza um funcionário pelo ID
exports.updateFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!funcionario) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    res.status(200).json(funcionario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove um funcionário pelo ID
exports.deleteFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    res.status(200).json({ message: 'Funcionário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

