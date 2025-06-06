import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import ProdutosHomeContext from "./ProdutosHomeContext";
import { Modal, Button, Form, Col, FloatingLabel } from 'react-bootstrap';

function FormAvaliacao() {
    const { avaliacao, alerta, cadastrarAvaliacao, handleChange, exibirFormAvaliacao, setExibirFormAvaliacao } = useContext(ProdutosHomeContext);

    return (
        <Modal show={exibirFormAvaliacao} onHide={() => setExibirFormAvaliacao(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Nova Avaliação</Modal.Title>
            </Modal.Header>
            <form id="formulario" onSubmit={cadastrarAvaliacao}>
                <Modal.Body>
                    <Alerta alerta={alerta} />
                    <Col xs={12} md={12}>
                        <FloatingLabel controlId="txtAutor" label="Autor" className="mb-3">
                            <Form.Control type="text" required name="autor"
                                value={avaliacao.autor}
                                onChange={handleChange} placeholder="Informe o seu nome" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12}>
                        <FloatingLabel controlId="txtEmail" label="Email" className="mb-3">
                            <Form.Control type="email" required name="email"
                                value={avaliacao.email}
                                onChange={handleChange} placeholder="Informe o seu email" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12}>
                        <FloatingLabel controlId="txtTexto" label="Avaliação" className="mb-3">
                            <Form.Control as="textarea" rows={3} required name="texto"
                                value={avaliacao.texto}
                                onChange={handleChange} placeholder="Digite sua avaliação" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={12} md={12}>
                        <FloatingLabel controlId="selectNota" label="Nota">
                            <Form.Select required name="nota" onChange={handleChange} value={avaliacao.nota}>
                                <option value="">Selecione a nota</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirFormAvaliacao(false)}>
                        Fechar
                    </Button>
                    <Button variant="success" type="submit">
                        Salvar <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default FormAvaliacao;