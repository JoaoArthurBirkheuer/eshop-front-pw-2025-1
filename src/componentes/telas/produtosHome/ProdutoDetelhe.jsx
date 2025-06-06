import { useContext } from "react";
import { Row, Col, Card, Button, Accordion } from "react-bootstrap";
import ProdutosHomeContext from "./ProdutosHomeContext";
import { formatoMoeda } from '../../comuns/Uteis';
import Estrelas from "../../comuns/Estrelas";
import FormAvaliacao from "./FormAvaliacao";

function ProdutoDetalhe() {
    const { produto, setExibeDetalhe, avaliacoes, novaAvaliacao } = useContext(ProdutosHomeContext);

    return (
        <Row className="justify-content-center">
            <Col sm={12} md={8} lg={6}>
                <Card className="mb-3 text-center">
                    <Card.Header>{produto.nome}</Card.Header>
                    <Card.Body>
                        <Card.Title>{produto.nome}</Card.Title>
                        <Card.Text>{produto.descricao}</Card.Text>
                        <Card.Text>
                            <small className="text-muted">Preço: {formatoMoeda(produto.valor)}</small>
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted">Categoria: {produto.categoria_nome}</small>
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted">Estoque: {produto.quantidade_estoque}</small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button variant="secondary" onClick={() => setExibeDetalhe(false)}>Voltar</Button>
                        <Button variant="primary" className="ms-2" onClick={() => novaAvaliacao()}>Avaliar</Button>
                    </Card.Footer>
                </Card>
                {avaliacoes.length > 0 && (
                    <>
                        <h5 className="mt-4 mb-3 text-center">Avaliações</h5>
                        <Accordion >
                            {avaliacoes.map((avaliacao, index) => (
                                <Accordion.Item eventKey={index.toString()} key={avaliacao.codigo}>
                                    <Accordion.Header><Estrelas nota={avaliacao.nota} /> <b className="ms-2">{avaliacao.autor}</b></Accordion.Header>
                                    <Accordion.Body>
                                        <p>{avaliacao.texto}</p>
                                        <p><small className="text-muted">Email: {avaliacao.email} | Data: {new Date(avaliacao.data).toLocaleDateString()}</small></p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </>
                )}
            </Col>
            <FormAvaliacao/>
        </Row>
    );
}

export default ProdutoDetalhe;