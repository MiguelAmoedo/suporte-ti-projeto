import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import inssLogo from '../imgs/inss.png';

function Home() {
  const [nome, setNome] = useState('');
  const [andar, setAndar] = useState('');
  const [assunto, setAssunto] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [texto, setTexto] = useState('');
  const [alerta, setAlerta] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/chamado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          andar,
          assunto,
          setor,
          descricao,
          texto,
        }),
      });

      if (response.ok) {
        // Chamado criado com sucesso
        setAlerta('Chamado criado com sucesso');
        setNome('');
        setAndar('');
        setAssunto('');
        setSetor('');
        setDescricao('');
        setTexto('');
      } else {
        // Erro ao criar chamado
        setAlerta('Erro ao criar chamado');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    if (senha.toLowerCase() === 'sdti') {
      setShowModal(false);
      window.location.href = '/dashboard';
    } else {
      setAlerta('Senha incorreta. Tente novamente.');
      setShowModal(false);
      window.location.reload(); // Reload the page if the password is incorrect
    }
  };

  return (
    <Container className="page-container">
      <div className="page-header">
        <div className="header-left">
          <Button className="btn-funcionarios" onClick={() => setShowModal(true)}>
            Funcionários
          </Button>
        </div>
        <img src={inssLogo} alt="INSS Logo" className="logo" />
      </div>

      <div className="page-content">
        <h1 className="sdti">Chamada de Suporte ao SDTI</h1>

        {alerta && <Alert variant={alerta === 'Chamado criado com sucesso' ? 'success' : 'danger'}>{alerta}</Alert>}

        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
              <Form.Label className="label">Seu nome</Form.Label>
              <Form.Control
                className="input"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="andar">
              <Form.Label className="label">Andar</Form.Label>
              <Form.Control
                className="input"
                type="text"
                value={andar}
                onChange={(e) => setAndar(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="assunto">
              <Form.Label className="label">Assunto</Form.Label>
              <Form.Control
                className="input"
                type="text"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="setor">
              <Form.Label className="label">Setor</Form.Label>
              <Form.Control
                className="input"
                type="text"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="descricao">
              <Form.Label className="label">Descrição do problema</Form.Label>
              <Form.Control
                className="textarea"
                as="textarea"
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="texto">
              <Form.Label className="label">Texto</Form.Label>
              <Form.Control
                className="input"
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
            </Form.Group>

            <Button className="button" variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Escreva a senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;
