const express = require('express');
const path = require('path');
const axios = require('axios');
const csv = require('csvtojson');

const app = express();

// Definir o diretório 'Views' como pasta para arquivos estáticos (CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'Views')));

// URL da planilha em formato CSV
const planilhaURL = 'https://docs.google.com/spreadsheets/d/18oQWjrz0C0ajwBkwnOa1RagGqP_uv9ucCK4jRM8lvKQ/export?format=csv';

// Função para buscar e filtrar os dados da planilha online
const lerPropostas = async (propostaBuscada) => {
  try {
    const response = await axios.get(planilhaURL); // Faz a requisição para obter o CSV
    const csvData = response.data;

    // Converte o CSV para JSON
    const propostas = await csv().fromString(csvData);

    // Filtrar os dados com base na proposta buscada
    const propostasFiltradas = propostas.filter(row => {
      return row['NºProposta'] && String(row['NºProposta']).trim() === propostaBuscada.trim();
    });

    return propostasFiltradas;
  } catch (error) {
    console.error("Erro ao processar a planilha:", error.message);
    throw error;
  }
};

// Rota para buscar as propostas filtradas
app.get('/api/get-proposal-data', async (req, res) => {
  const propostaBuscada = req.query.proposta;
  console.log("Proposta recebida:", propostaBuscada); // Verifica o número da proposta enviada

  if (!propostaBuscada || propostaBuscada.trim() === '') {
    return res.status(400).send('Proposta não fornecida');
  }

  try {
    const propostas = await lerPropostas(propostaBuscada); // Filtra a proposta específica
    if (propostas.length > 0) {
      res.json(propostas); // Envia as propostas filtradas como JSON
    } else {
      res.status(404).send('Proposta não encontrada');
    }
  } catch (error) {
    console.error("Erro na leitura da proposta:", error.message);
    res.status(500).send('Erro ao processar a planilha.');
  }
});

// Rota para servir a página HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

// Inicializando o servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
