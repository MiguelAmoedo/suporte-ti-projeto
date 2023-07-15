import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import './dashboard.css';

function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [idChamado, setIdChamado] = useState('');
  const [statusChamado, setStatusChamado] = useState('');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [funcionariosDisponiveis, setFuncionariosDisponiveis] = useState([]);
  const [alerta, setAlerta] = useState(null);

  const fetchChamados = async () => {
    try {
      const response = await fetch('http://localhost:5000/chamado');
      if (response.ok) {
        const data = await response.json();
        setChamados(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/funcionario');
      if (response.ok) {
        const data = await response.json();
        setFuncionariosDisponiveis(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChamados();
    fetchFuncionarios();
  }, []);

  const verificarStatusChamado = async (chamadoId) => {
    try {
      const response = await fetch(`http://localhost:5000/chamado/status/${chamadoId}`);
      if (response.ok) {
        const data = await response.json();
        const status = data.status;
        setStatusChamado(status);
        alert(`O status do chamado é: ${status}`);
      } else {
        setAlerta('Chamado não encontrado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const designarFuncionario = async () => {
    try {
      const response = await fetch('http://localhost:5000/chamado/designarFuncionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idchamado: idChamado,
          funcionarioId: funcionarioId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAlerta(`Funcionário designado para o chamado ${data._id}`);
        fetchChamados();
      } else {
        setAlerta('Chamado ou funcionário não encontrado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const atualizarStatusChamado = async (chamadoId, novoStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/chamado/${chamadoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: novoStatus,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAlerta(`Status do chamado ${data._id} atualizado para "${data.status}"`);
        fetchChamados();
      } else {
        setAlerta('Erro ao atualizar o status do chamado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verProblemaChamado = async (chamadoId) => {
    try {
      const response = await fetch(`http://localhost:5000/chamado/${chamadoId}`);
      if (response.ok) {
        const data = await response.json();
        const problema = data.descricao;
        alert(`Problema do chamado:\n${problema}`);
      } else {
        setAlerta('Chamado não encontrado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="dashboard-container">
      <h1 className="dashboard-title">Dashboard de Chamados</h1>
      {alerta && <p className="dashboard-alert">{alerta}</p>}

      <div>
        <h2 className="dashboard-subtitle">Lista de Chamados</h2>
        <Table striped bordered hover className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do usuário</th>
              <th>Assunto</th>
              <th>Setor</th>
              <th>Funcionário</th>
              <th>Status</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((chamado) => (
              <tr key={chamado._id}>
                <td>{chamado._id}</td>
                <td>{chamado.nome}</td>
                <td>{chamado.assunto}</td>
                <td>{chamado.setor}</td>
                <td>{chamado.funcionario?.nome || 'Não designado'}</td>
                <td>{chamado.status}</td>
                <td className="dashboard-button-container">
                  <button onClick={() => verificarStatusChamado(chamado._id)}>Verificar Status</button>
                  <button onClick={() => atualizarStatusChamado(chamado._id, 'concluído')}>Concluir</button>
                  <button onClick={() => verProblemaChamado(chamado._id)}>Ver Problema</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div>
        <h2 className="dashboard-subtitle">Designar Funcionário a um Chamado</h2>
        <input
          type="text"
          placeholder="ID do Chamado"
          value={idChamado}
          onChange={(e) => setIdChamado(e.target.value)}
        />
        <select
          value={funcionarioId}
          onChange={(e) => setFuncionarioId(e.target.value)}
          className="dashboard-select"
        >
          <option value="">Selecione um funcionário</option>
          {funcionariosDisponiveis.map((funcionario) => (
            <option key={funcionario._id} value={funcionario._id}>
              {funcionario.nome}
            </option>
          ))}
        </select>
        <button onClick={designarFuncionario} className="dashboard-btn-designar">
          Designar
        </button>
      </div>
    </Container>
  );
}

export default Dashboard;