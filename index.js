const express = require('express');
const path = require('path');
const axios = require('axios');
const csv = require('csvtojson');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// Definir o diretório 'Views' como pasta para arquivos estáticos (CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'Views')));

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

app.get('/confirmacao', (req, res) => {
    res.render('confirmacao'); // Certifique-se de que o mecanismo de visualização está configurado corretamente
  });

document.addEventListener('DOMContentLoaded', function() {
    // Evento para gerar PDFs
    const botaoGerarPDF = document.getElementById('botaoGerarPDF');
    if (botaoGerarPDF) {
        botaoGerarPDF.addEventListener('click', function (e) {
            e.preventDefault();
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = 'block';
            }
            generateAllInOnePDF().then(() => {
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            }).catch((error) => {
                alert("Ocorreu um erro ao gerar os PDFs.");
                console.error(error);
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            });
        });
    }

    // Evento para gerar o Atestado em PDF
    const botaoGerarAtestadoPDF = document.getElementById('botaoGerarAtestadoPDF');
    if (botaoGerarAtestadoPDF) {
        botaoGerarAtestadoPDF.addEventListener('click', function (e) {
            e.preventDefault();
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = 'block';
            }

            try {
                generateAtestadoPDF();
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            } catch (error) {
                alert("Ocorreu um erro ao gerar os PDFs.");
                console.error(error);
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            }
        });
    }

    // Evento para gerar o Termo de Compromisso do Coordenador
    const botaoGerarTermoCompromisso = document.getElementById('generateTermoCompromissoCoordenadorPDF');
    if (botaoGerarTermoCompromisso) {
        botaoGerarTermoCompromisso.addEventListener('click', function (e) {
            e.preventDefault();
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = 'block';
            }

            try {
                generateTermoCompromissoCoordenadorPDF();
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            } catch (error) {
                alert("Ocorreu um erro ao gerar os PDFs.");
                console.error(error);
                if (loadingMessage) {
                    loadingMessage.style.display = 'none';
                }
            }
        });
    }
});

// Configurações de body-parser para lidar com formulários
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// URL da planilha em formato CSV
const planilhaURL = 'https://docs.google.com/spreadsheets/d/18oQWjrz0C0ajwBkwnOa1RagGqP_uv9ucCK4jRM8lvKQ/export?format=csv';

// Função para remover zeros à esquerda da parte numérica antes da barra "/"
const normalizarNumeroProposta = (num) => {
    const [numero, ano] = num.split('/');
    const numeroSemZeros = numero.replace(/^0+/, '');
    return `${numeroSemZeros}/${ano}`;
};

// Função para buscar e filtrar os dados da planilha online
const lerPropostas = async (propostaBuscada) => {
    try {
        const response = await axios.get(planilhaURL); // Faz a requisição para obter o CSV
        const csvData = response.data;
        const propostas = await csv().fromString(csvData); // Converte o CSV para JSON

        const propostaNormalizada = normalizarNumeroProposta(propostaBuscada.trim());

        // Filtrar as propostas com base na busca e remover zeros à esquerda
        const propostasFiltradas = propostas.filter(row => {
            const numeroPropostaOriginal = row['NºProposta'].trim();
            const numeroPropostaNormalizado = normalizarNumeroProposta(numeroPropostaOriginal);
            return numeroPropostaOriginal === propostaBuscada.trim() || numeroPropostaNormalizado === propostaNormalizada;
        });

        return propostasFiltradas;
    } catch (error) {
        console.error("Erro ao processar a planilha:", error.message);
        throw error;
    }
};

// Caminho para o arquivo JSON onde os dados dos formulários serão armazenados
const caminhoArquivo = path.join(__dirname, 'dados-formularios.json');

// Verifica e cria o arquivo JSON se ele não existir
const verificarOuCriarArquivoJSON = () => {
    if (!fs.existsSync(caminhoArquivo)) {
        console.log("Arquivo JSON não encontrado. Criando um novo...");
        fs.writeFileSync(caminhoArquivo, '[]', 'utf-8'); // Cria o arquivo vazio como array
        console.log("Arquivo JSON criado.");
    }
};

// Carrega dados existentes dos formulários ou cria um arquivo novo
let dadosFormularios = [];

try {
    verificarOuCriarArquivoJSON();
    const data = fs.readFileSync(caminhoArquivo, 'utf-8');
    dadosFormularios = JSON.parse(data);
    console.log("Dados carregados do arquivo JSON.");
} catch (err) {
    console.error("Erro ao carregar o arquivo JSON:", err);
}

// Rota para processar o envio do formulário e armazenar os dados
app.post('/submit', (req, res) => {
    const novoFormulario = req.body;

    // Verifica se os dados do formulário foram recebidos
    if (!novoFormulario || Object.keys(novoFormulario).length === 0) {
        console.log("Nenhum dado foi enviado.");
        return res.status(400).send('Nenhum dado foi enviado.');
    }

    // Adiciona os dados do formulário ao array
    dadosFormularios.push(novoFormulario);

    console.log("Dados recebidos do formulário:", novoFormulario);

    try {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(dadosFormularios, null, 2));
        console.log("Dados salvos com sucesso!");
    } catch (err) {
        console.error("Erro ao salvar os dados no arquivo JSON:", err);
    }

    // Redireciona para a página de confirmação
    res.redirect('/confirmacao');
});

// Rota para servir a página de confirmação e exibir o histórico de formulários
app.get('/confirmacao', (req, res) => {
    fs.readFile(path.join(__dirname, 'Views', 'confirmacao.html'), 'utf-8', (err, data) => {
        if (err) {
            console.error("Erro ao carregar a página de confirmação:", err);
            res.status(500).send('Erro ao carregar a página de confirmação.');
            return;
        }

        // Gera o histórico de formulários enviados
        const historicoHTML = dadosFormularios.map(formulario => `
            <li>Processo SEI: ${formulario.processo_sei}, Termo de Fomento: ${formulario.termo_fomento}, Entidade Parceira: ${formulario.entidade_parceira}</li>
        `).join('');

        // Substituir o marcador de histórico no HTML
        const paginaAtualizada = data.replace('<!-- HistoricoFormulario -->', `<ul>${historicoHTML}</ul>`);
        res.send(paginaAtualizada);
    });
});

// Rota para baixar o arquivo JSON gerado
app.get('/gerar-documento', (req, res) => {
    if (fs.existsSync(caminhoArquivo)) {
        res.download(caminhoArquivo);
    } else {
        res.status(404).send('Arquivo não encontrado.');
    }
});

// Rota para buscar dados filtrados da proposta
app.get('/api/get-proposal-data', async (req, res) => {
    const propostaBuscada = req.query.proposta;

    if (!propostaBuscada || propostaBuscada.trim() === '') {
        return res.status(400).send('Proposta não fornecida');
    }

    try {
        const propostas = await lerPropostas(propostaBuscada);
        if (propostas.length > 0) {
            res.json(propostas);
        } else {
            res.status(404).send('Proposta não encontrada');
        }
    } catch (error) {
        res.status(500).send('Erro ao processar a planilha.');
    }
});

// Inicializando o servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
