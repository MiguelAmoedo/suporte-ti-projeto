const Cliente = require('../models/clienteModels');

// Cria um novo cliente
exports.createCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtém todos os clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtém um cliente pelo ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualiza um cliente pelo ID
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove um cliente pelo ID
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
