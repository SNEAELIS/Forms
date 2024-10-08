 // Função para gerar os campos de acordo com o número de dirigentes
 function gerarCampos() {
    const numDirigentes = document.getElementById('numDirigentes').value;
    const container = document.getElementById('camposDirigentes');
    container.innerHTML = ''; // Limpa os campos anteriores

    // Gera os campos para cada dirigente
    for (let i = 0; i < numDirigentes; i++) {
        container.innerHTML += `
            <h3>Dirigente ${i + 1}</h3>
            <div class="form-row">
                <div class="half-width">
                    <label for="nome${i}">Nome Completo:</label>
                    <input type="text" id="nome${i}" name="nome${i}">
                </div>
                <div class="half-width">
                    <label for="cargo${i}">Cargo:</label>
                    <input type="text" id="cargo${i}" name="cargo${i}">
                </div>
            </div>
            <div class="form-row">
                <div class="half-width">
                    <label for="rg${i}">RG:</label>
                    <input type="text" id="rg${i}" name="rg${i}">
                </div>
                <div class="half-width">
                    <label for="orgao${i}">Órgão Expedidor:</label>
                    <input type="text" id="orgao${i}" name="orgao${i}">
                </div>
            </div>
            <div class="form-row">
                <div class="half-width">
                    <label for="cpf${i}">CPF:</label>
                    <input type="text" id="cpf${i}" name="cpf${i}" maxlength="14">
                </div>
                <div class="half-width">
                    <label for="endereco${i}">Endereço:</label>
                    <input type="text" id="endereco${i}" name="endereco${i}">
                </div>
            </div>
            <div class="form-row">
                <div class="half-width">
                    <label for="telefone${i}">Telefone:</label>
                    <input type="text" id="telefone${i}" name="telefone${i}">
                </div>
                <div class="half-width">
                    <label for="email${i}">E-mail:</label>
                    <input type="text" id="email${i}" name="email${i}">
                </div>
            </div>
            <hr>
        `;
    }
}


// Função para gerar o PDF com os dados dos dirigentes e o texto da declaração
function gerarPDF() {
    const numDirigentes = document.getElementById('numDirigentes').value;
    const camposDirigentes = [];

    // Coleta os dados inseridos nos campos para cada dirigente
    for (let i = 0; i < numDirigentes; i++) {
        camposDirigentes.push([
            document.getElementById('nome' + i).value,
            document.getElementById('cargo' + i).value,
            document.getElementById('rg' + i).value,
            document.getElementById('orgao' + i).value,
            document.getElementById('cpf' + i).value,
            document.getElementById('endereco' + i).value,
            document.getElementById('telefone' + i).value,
            document.getElementById('email' + i).value
        ]);
    }

    // Definição do conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60], // Margens da página
        content: [
            { text: 'DECLARAÇÃO DOS ARTS. 26 E 27 DO DECRETO Nº 8.726 DE 2016 E DO ART. 39 DA LEI Nº 13.019 DE 2014', style: 'header', margin: [0, 0, 0, 20] },
            { text: 'Declaro para os devidos fins em nome da [identificação da organização da sociedade civil – OSC] que os seus dirigentes abaixo relacionados a saber:', margin: [0, 0, 0, 10], alignment: 'justify' },
            { text: 'RELAÇÃO NOMINAL ATUALIZADA DOS DIRIGENTES DA ENTIDADE', style: 'subheader', margin: [0, 20, 0, 10], alignment: 'justify' },

            // Tabela dos dirigentes
            {
                table: {
                    headerRows: 1,
                    widths: ['15%', '15%', '10%', '10%', '10%', '20%', '10%', '10%'], // Ajuste de largura das colunas
                    body: [
                        [
                            { text: 'Nome', bold: true, alignment: 'center' },
                            { text: 'Cargo', bold: true, alignment: 'center' },
                            { text: 'RG', bold: true, alignment: 'center' },
                            { text: 'Órgão Expedidor', bold: true, alignment: 'center' },
                            { text: 'CPF', bold: true, alignment: 'center' },
                            { text: 'Endereço', bold: true, alignment: 'center' },
                            { text: 'Telefone', bold: true, alignment: 'center' },
                            { text: 'E-mail', bold: true, alignment: 'center' }
                        ],
                        // Adicionar os dados dos dirigentes
                        ...camposDirigentes.map(dir => [
                            { text: dir[0], alignment: 'left', noWrap: false },
                            { text: dir[1], alignment: 'left', noWrap: false },
                            { text: dir[2], alignment: 'left', noWrap: false },
                            { text: dir[3], alignment: 'left', noWrap: false },
                            { text: dir[4], alignment: 'left', noWrap: false },
                            { text: dir[5], alignment: 'left', noWrap: false },
                            { text: dir[6], alignment: 'left', noWrap: false },
                            { text: dir[7], alignment: 'left', noWrap: false }
                        ])
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) { return (i === 0 || i === node.table.body.length) ? 2 : 1; },
                    vLineWidth: function (i, node) { return 1; },  // Mantendo as linhas verticais
                    hLineColor: function (i, node) { return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'; },
                    paddingLeft: function (i, node) { return 5; },
                    paddingRight: function (i, node) { return 5; },
                    paddingTop: function (i, node) { return 3; },
                    paddingBottom: function (i, node) { return 3; }
                }
            },
            // Texto completo da declaração, com alinhamento justificado
            { text: 'I - não são membros de Poder ou do Ministério Público ou dirigente de órgão ou entidade da Administração Pública Federal;', margin: [0, 10], alignment: 'justify' },
            { text: 'II – não são cônjuges ou companheiros, bem como parentes em linha reta, colateral ou por afinidade, até o segundo grau de quaisquer membros de Poder ou do Ministério Público ou de dirigente de órgão ou entidade da Administração Pública Federal;', margin: [0, 10], alignment: 'justify' },
            { text: 'III - Não contratará com recursos da parceria, para prestação de serviços, servidor ou empregado público, inclusive aquele que exerça cargo em comissão ou função de confiança de órgão ou entidade da administração pública federal celebrante, ou seu cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade até o segundo grau, ressalvadas as hipóteses previstas em lei específica e na lei de diretrizes orçamentárias;', margin: [0, 10], alignment: 'justify' },
            { text: 'IV - Não serão remunerados, a qualquer título, com os recursos repassados:', margin: [0, 10], alignment: 'justify' },
            { text: '• membro de Poder ou do Ministério Público, ou dirigente de órgão ou entidade da administração pública federal;', margin: [10, 5], alignment: 'justify' },
            { text: '• servidor ou empregado público, inclusive aquele que exerça cargo em comissão ou função de confiança de órgão ou entidade da administração pública federal celebrante, ou seu cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade até o segundo grau, ressalvadas as hipóteses previstas em lei específica e na lei de diretrizes orçamentárias;', margin: [10, 5], alignment: 'justify' },
            { text: '• pessoas naturais condenadas pela prática de crimes contra a administração pública ou contra o patrimônio público, de crimes eleitorais para os quais a lei comine pena privativa de liberdade, e de crimes de lavagem ou ocultação de bens, direitos e valores.', margin: [10, 5], alignment: 'justify' },
            { text: 'V – não tiveram as contas rejeitadas pela Administração Pública nos últimos cinco anos;', margin: [0, 10], alignment: 'justify' },
            { text: 'VI – não foram punidos com as seguintes sanções:', margin: [0, 10], alignment: 'justify' },
            { text: '• suspensão de participação em licitação e impedimento de contratar com a administração;', margin: [10, 5], alignment: 'justify' },
            { text: '• declaração de inidoneidade para licitar ou contratar com a administração pública;', margin: [10, 5], alignment: 'justify' },
            { text: '• suspensão temporária da participação em chamamento público e impedimento de celebrar parceria ou contrato com órgãos e entidades da esfera de governo da administração pública sancionadora, por prazo não superior a dois anos, conforme art. 73 inciso II da Lei nº 13.019 de 2014;', margin: [10, 5], alignment: 'justify' },
            { text: 'VII – não são pessoas que durante os últimos 08 (oito) anos:', margin: [0, 10], alignment: 'justify' },
            { text: 'a) tiveram suas contas relativas a parcerias julgadas irregulares ou rejeitadas por Tribunal ou Conselho de Contas de qualquer esfera da Federação, em decisão irrecorrível nos últimos 8 (oito) anos;', margin: [10, 5], alignment: 'justify' },
            { text: 'b) foram julgados responsáveis por falta grave e inabilitada para o exercício de cargo em comissão ou função de confiança, enquanto durar a inabilitação;', margin: [10, 5], alignment: 'justify' },
            { text: 'c) foram considerados responsáveis por ato de improbidade;', margin: [10, 5], alignment: 'justify' },
            { text: 'Local-UF ____ de ______________ de 20___.', margin: [0, 20], alignment: 'justify' },
            { text: '...........................................................................................', margin: [0, 40], alignment: 'justify' },
            { text: 'Na data da assinatura'},
            { text: '(Nome e Cargo do Representante Legal da OSC)', margin: [0, 10], alignment: 'justify' }
        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true
            },
            subheader: {
                fontSize: 14,
                bold: true
            }
        }
    };

    // Gera o PDF e faz o download
    pdfMake.createPdf(docDefinition).download('declaracao-dirigentes.pdf');
}