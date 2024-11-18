const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

// Configuração do pool de conexões do PostgreSQL
const pool = new Pool({
    user: 'postgres',  // Insira seu nome de usuário
    host: 'localhost',
    database: 'postgres',  // Insira o nome do banco de dados
    password: '1234',  // Insira a sua senha
    port: 5432,
});

// Verificar se a pasta de uploads existe, senão cria-la
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuração do Multer para armazenamento de arquivos de imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Pasta onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`); // Nome único para cada imagem
    }
});

const upload = multer({ storage: storage });

// Middleware para servir arquivos estáticos e parsing
app.use(express.static(path.join(__dirname, 'Views')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rota para enviar o formulário com imagens
app.post('/submit', upload.array('imagensVistoria[]', 1000), async (req, res) => {
    const { instituicao, cnpj, presidente, termoFomento, endereco, objeto, valorPactuado, processoSEI, vigencia, inicioAtividades, totalNucleos, totalBeneficiados } = req.body;
    
    // Cria um array com os caminhos das imagens carregadas
    const imagens = req.files.map(file => `/uploads/${file.filename}`); 

    try {
        const client = await pool.connect();

        // Inserindo os dados do formulário na tabela "visitas"
        const result = await client.query(
            `INSERT INTO visitas (instituicao, cnpj, presidente, termo_fomento, endereco, objeto, valor_pactuado, processo_sei, vigencia, inicio_atividades, total_nucleos, total_beneficiados, imagem_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
            [instituicao, cnpj, presidente, termoFomento, endereco, objeto, valorPactuado, processoSEI, vigencia, inicioAtividades, totalNucleos, totalBeneficiados, imagens.join(', ')]
        );

        const visitaId = result.rows[0].id;

        client.release();
        console.log("Formulário e imagens salvos com sucesso");

        res.redirect('/confirmacao'); // Redirecionar para uma página de confirmação (você pode personalizar)
    } catch (error) {
        console.error("Erro ao salvar os dados no banco:", error);
        res.status(500).send('Erro ao salvar os dados no banco');
    }
});

// Função para buscar uma proposta específica
app.get('/buscar/:proposalNumber', async (req, res) => {
    const proposalNumber = req.params.proposalNumber;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM visitas WHERE id = $1', [proposalNumber]);

        if (result.rows.length > 0) {
            res.json({ success: true, data: result.rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Proposta não encontrada' });
        }

        client.release();
    } catch (error) {
        console.error("Erro ao buscar a proposta:", error);
        res.status(500).json({ success: false, message: "Erro ao buscar a proposta" });
    }
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
