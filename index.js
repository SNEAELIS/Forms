const express = require('express');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// Caminho do arquivo JSON para armazenamento de dados
const caminhoArquivo = path.join(__dirname, 'dados-formularios.json');

// Middleware para servir arquivos estáticos e parsing
app.use(express.static(path.join(__dirname, 'Views')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Função para garantir que o arquivo JSON exista
const verificarOuCriarArquivoJSON = () => {
    if (!fs.existsSync(caminhoArquivo)) {
        fs.writeFileSync(caminhoArquivo, '[]', 'utf-8');
    }
};
verificarOuCriarArquivoJSON();

// Função para carregar dados atualizados do arquivo JSON
const carregarDadosAtualizados = () => {
    return JSON.parse(fs.readFileSync(caminhoArquivo, 'utf-8'));
};

// Rota para enviar um formulário (simula o "salvar" e redireciona)
app.post('/submit', (req, res) => {
    const dadosFormularios = carregarDadosAtualizados();
    const novoFormulario = { id: uuidv4(), status: 'Enviado para análise', ...req.body };
    dadosFormularios.push(novoFormulario);

    try {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(dadosFormularios, null, 2));
        console.log("Formulário salvo:", novoFormulario);
    } catch (err) {
        console.error("Erro ao salvar os dados:", err);
    }

    res.redirect('/confirmacao');
});
app.use(express.json());

// Função para buscar uma proposta específica
app.get('/buscar/:proposalNumber', (req, res) => {
    const dadosFormularios = carregarDadosAtualizados(); // Carrega sempre os dados atualizados
    const proposalNumber = req.params.proposalNumber;
    const proposta = dadosFormularios.find(formulario => formulario.id === proposalNumber);

    if (proposta) {
        res.json({ success: true, data: proposta });
    } else {
        res.status(404).json({ success: false, message: "Proposta não encontrada" });
    }
});

// Função para gerar o PDF com dados da proposta
app.post('/generate-pdf', async (req, res) => {
    const dados = req.body;  // Dados recebidos do frontend

    try {
        const pdfPath = path.join(__dirname, 'public/Projeto-Técnico-Projeto-Social.pdf');
        const existingPdfBytes = fs.readFileSync(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        // Assumindo que os campos têm os mesmos nomes que as chaves do objeto "dados"
        Object.keys(dados).forEach(campo => {
            try {
                const field = form.getTextField(campo);
                field.setText(dados[campo].toString() || "");
            } catch (error) {
                console.warn(`Campo ${campo} não encontrado no PDF.`);
            }
        });

        const pdfBytes = await pdfDoc.save();
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Proposta_Gerada.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error("Erro ao tentar gerar o PDF:", error);
        res.status(500).send('Erro ao gerar o PDF');
    }
});


// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
