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

// Função para gerar o PDF com os dados dos dirigentes
function gerarPDF() {
    const numDirigentes = document.getElementById('numDirigentes').value;
    const camposDirigentes = [];

    // Coleta os dados inseridos nos campos para cada dirigente
    for (let i = 0; i < numDirigentes; i++) {
        camposDirigentes.push([
            { text: `Dirigente ${i + 1}`, bold: true },
            `Nome: ${document.getElementById('nome' + i).value}`,
            `Cargo: ${document.getElementById('cargo' + i).value}`,
            `RG: ${document.getElementById('rg' + i).value}`,
            `Órgão Expedidor: ${document.getElementById('orgao' + i).value}`,
            `CPF: ${document.getElementById('cpf' + i).value}`,
            `Endereço: ${document.getElementById('endereco' + i).value}`,
            `Telefone: ${document.getElementById('telefone' + i).value}`,
            `E-mail: ${document.getElementById('email' + i).value}`
        ]);
    }

    // Definição do conteúdo do PDF
    var docDefinition = {
        content: [
            { text: 'Declaração dos Arts. 26, 27 do Decreto 8.726 e Art. 39 da Lei 13.019', style: 'header' },
            { text: 'Relação Nominal dos Dirigentes da Entidade', style: 'subheader' },
            {
                table: {
                    body: [
                        ['Nome do Dirigente', 'Cargo', 'RG', 'Órgão Expedidor', 'CPF', 'Endereço', 'Telefone', 'E-mail'],
                        ...camposDirigentes.map(dir => [dir[1], dir[2], dir[3], dir[4], dir[5], dir[6], dir[7], dir[8]])
                    ]
                }
            }
        ]
    };

    // Gera o PDF e faz o download
    pdfMake.createPdf(docDefinition).download('declaracao-dirigentes.pdf');
}