import { useEffect, useState } from 'react';
import { getProdutosAPI } from '../../../servicos/ProdutoServico';
import { getAvaliacoesProdutoAPI, cadastraAvaliacaoAPI } from '../../../servicos/AvaliacaoServico';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import ProdutosHomeContext from './ProdutosHomeContext';
import ProdutosLista from './ProdutosLista';
import ProdutoDetalhe from './ProdutoDetalhe';

function ProdutosHome() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [produto, setProduto] = useState(null);
    const [exibeDetalhe, setExibeDetalhe] = useState(false);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [exibirFormAvaliacao, setExibirFormAvaliacao] = useState(false);
    const [avaliacao, setAvaliacao] = useState({ codigo: 0, autor: "", email: "", texto: "", nota: "", data: "", produto: "" });

    const recuperaProdutos = async () => {
        setCarregando(true);
        const produtosAPI = await getProdutosAPI();
        // Simulando a propriedade categoria_nome que não vem da API de produtos
        const produtosComCategoria = produtosAPI.map(p => ({...p, categoria_nome: `Categoria ${p.categoria}`}));
        setProdutos(produtosComCategoria);
        setCarregando(false);
    }

    const exibirDetalhesProduto = (produto) => {
        setProduto(produto);
        setExibeDetalhe(true);
    }

    const recuperaAvaliacoes = async (codigoproduto) => {
        setAvaliacoes(await getAvaliacoesProdutoAPI(codigoproduto));
    }

    useEffect(() => {
        recuperaProdutos();
    }, []);

    useEffect(() => {
        if (produto != null) {
            recuperaAvaliacoes(produto.codigo);
        }
    }, [produto]);

    const novaAvaliacao = () => {
        setAlerta({ status: "", message: "" });
        setAvaliacao({
            codigo: 0,
            autor: "",
            email: "",
            texto: "",
            nota: "",
            data: new Date().toISOString().slice(0, 10),
            produto: produto.codigo
        });
        setExibirFormAvaliacao(true);
    }

    const cadastrarAvaliacao = async e => {
        e.preventDefault();
        try {
            let retornoAPI = await cadastraAvaliacaoAPI(avaliacao);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
            console.error(err.message);
        }
        setExibirFormAvaliacao(false);
        recuperaAvaliacoes(produto.codigo);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAvaliacao({ ...avaliacao, [name]: value });
    }

    return (
        <ProdutosHomeContext.Provider value={
            {
                produtos,
                exibirDetalhesProduto,
                setExibeDetalhe,
                produto,
                avaliacoes,
                avaliacao,
                novaAvaliacao,
                cadastrarAvaliacao,
                alerta,
                handleChange,
                exibirFormAvaliacao,
                setExibirFormAvaliacao
            }
        }>
            <div style={{ padding: '20px' }}>
                <Alerta alerta={alerta} />
                <Carregando carregando={carregando}>
                    {!exibeDetalhe ? <ProdutosLista /> : <ProdutoDetalhe />}
                </Carregando>
            </div>
        </ProdutosHomeContext.Provider>
    )
}

export default ProdutosHome;