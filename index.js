const express = require('express');
const path = require('path');
const axios = require('axios');
const csv = require('csvtojson');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Gerador de IDs únicos

const app = express();
const PORT = 8080;

// Configuração do Body-Parser para formulários e JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Diretório de Views para arquivos estáticos
app.use(express.static(path.join(__dirname, 'Views')));

// Caminhos do arquivo JSON para armazenamento dos dados
const caminhoArquivo = path.join(__dirname, 'dados-formularios.json');

// Função para garantir que o arquivo JSON exista
const verificarOuCriarArquivoJSON = () => {
    if (!fs.existsSync(caminhoArquivo)) {
        fs.writeFileSync(caminhoArquivo, '[]', 'utf-8');
    }
};
verificarOuCriarArquivoJSON();

// Carrega os dados do arquivo JSON
let dadosFormularios = JSON.parse(fs.readFileSync(caminhoArquivo, 'utf-8'));

// **Rotas**

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

// Rota para o formulário Relma
app.get('/formulario_relma', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'Formulário_Relma.html'));
});

// Rota para processar o formulário e redirecionar para a página de confirmação
app.post('/submit', (req, res) => {
    const novoFormulario = { id: uuidv4(), ...req.body };

    // Adiciona o formulário ao array e salva no arquivo JSON
    dadosFormularios.push(novoFormulario);

    try {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(dadosFormularios, null, 2));
        console.log("Formulário salvo:", novoFormulario);
    } catch (err) {
        console.error("Erro ao salvar os dados:", err);
    }

    // Redireciona para a nova página de confirmação
    res.redirect('/confirmacao');
});

// Nova rota para exibir a página de confirmação
app.get('/confirmacao', (req, res) => {
    const confirmacaoPath = path.join(__dirname, 'Views', 'confirmacao.html');

    fs.readFile(confirmacaoPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Erro ao carregar a página:", err);
            return res.status(500).send('Erro ao carregar a página de confirmação.');
        }

        // Gera o histórico de formulários recebidos
        const historicoHTML = dadosFormularios.map(f => `
            <li>
                <strong>Processo SEI:</strong> ${f.processo_sei || 'N/A'} |
                <strong>Termo de Fomento:</strong> ${f.termo_fomento || 'N/A'} |
                <a href="/pdf/${f.id}">Baixar PDF</a> |
                <a href="/visualizar/${f.id}">Visualizar</a>
            </li>
        `).join('');

        const paginaAtualizada = data.replace('<!-- HistoricoFormulario -->', `<ul>${historicoHTML}</ul>`);
        res.send(paginaAtualizada);
    });
});

// Rota para visualizar os dados completos de um formulário
app.get('/visualizar/:id', (req, res) => {
    const formulario = dadosFormularios.find(f => f.id === req.params.id);
    if (!formulario) return res.status(404).send('Formulário não encontrado.');
    res.json(formulario);
});

// Rota para gerar PDF do formulário
app.get('/pdf/:id', (req, res) => {
    const formulario = dadosFormularios.find(f => f.id === req.params.id);
    if (!formulario) return res.status(404).send('Formulário não encontrado.');

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();

    res.setHeader('Content-Disposition', `attachment; filename=formulario-${formulario.id}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text(`Formulário - ${formulario.tipo}`, { align: 'center' }).moveDown();
    Object.entries(formulario).forEach(([key, value]) => {
        doc.fontSize(14).text(`${key}: ${value}`);
    });

    doc.end();
});

// Rota para buscar propostas específicas no Google Sheets
app.get('/api/get-proposal-data', async (req, res) => {
    const propostaBuscada = req.query.proposta;
    if (!propostaBuscada) return res.status(400).send('Proposta não fornecida');

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

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
