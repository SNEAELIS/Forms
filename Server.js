const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Configuração do banco de dados MongoDB
mongoose.connect('mongodb+srv://pedrodiasdesenvolvedor123:Sneaelis2025@cluster1.mh3fl.mongodb.net/Ficha_Vistoria', {

})
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error));

// Esquema para os dados de vistoria
const VistoriaSchema = new mongoose.Schema({
    instituicao: String,
    cnpj: String,
    presidente: String,
    termoFomento: String,
    endereco: String,
    objeto: String,
    valorPactuado: String,
    processoSEI: String,
    vigencia: String,
    inicioAtividades: Date,
    totalNucleos: Number,
    totalBeneficiados: Number,
    nomeNucleo: String,
    enderecoNucleo: String,
    recursosHumanos: String,
    acompanhamentoAtividades: String,
    acompanhamentoFrequencia: String,
    nomeResponsavel: String,
    funcaoResponsavel: String,
    localData: String,
    comoSoubeProjeto: String,
    comoOcorrendoInscricao: String,
    recebeuUniforme: String,
    tempoParticipa: String,
    quantasVezes: String,
    comoChega: String,
    respondeListaChamada: String,
    professor: String,
    imagens: [String] // URLs das imagens de vistoria
});

const Vistoria = mongoose.model('Vistoria', VistoriaSchema);

// Configuração do Multer para armazenamento de imagens
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Rota para salvar os dados da vistoria e imagens
app.post('/api/salvarVistoria', upload.array('imagensVistoria', 10), async (req, res) => {
    try {
        // Salva os dados do formulário
        const imagensUrls = req.files.map(file => file.path);
        const vistoria = new Vistoria({ ...req.body, imagens: imagensUrls });
        await vistoria.save();
        res.status(200).json({ message: 'Dados da vistoria salvos com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar os dados', error });
    }
});

// Rota para gerar PDF de uma vistoria
app.get('/api/gerarPDF/:id', async (req, res) => {
    try {
        const vistoria = await Vistoria.findById(req.params.id);
        if (!vistoria) return res.status(404).json({ message: 'Vistoria não encontrada' });

        // Cria o PDF
        const doc = new PDFDocument();
        const pdfPath = `./pdfs/vistoria_${vistoria._id}.pdf`;
        doc.pipe(fs.createWriteStream(pdfPath));

        // Título e Informações da Vistoria
        doc.fontSize(16).text('Relatório de Vistoria', { align: 'center' }).moveDown();
        doc.fontSize(12).text(`Instituição: ${vistoria.instituicao}`);
        doc.text(`CNPJ: ${vistoria.cnpj}`);
        doc.text(`Presidente: ${vistoria.presidente}`);
        // Inclua mais dados conforme necessário

        // Adiciona Imagens
        vistoria.imagens.forEach((imagePath, index) => {
            doc.addPage().image(imagePath, { fit: [500, 400], align: 'center', valign: 'center' });
        });

        doc.end();

        res.status(200).json({ message: 'PDF gerado com sucesso!', pdfPath });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao gerar o PDF', error });
    }
});


// Rota para exibir os dados
app.get('/api/consultarVistorias', async (req, res) => {
    const vistorias = await Vistoria.find();
    res.status(200).json(vistorias);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});