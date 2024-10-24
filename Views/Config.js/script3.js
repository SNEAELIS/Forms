// Função para capturar dados do formulário
function capturarDadosFormulario() {
    return {
        nome: document.getElementById('dirigente').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        orgaoEmissor: document.getElementById('orgao').value,
        cargoDirigente: document.getElementById('cargoDirigente').value,
        entidade: document.getElementById('entidade').value,
        cnpj: document.getElementById('cnpj').value,
        endereco: document.getElementById('endereco').value,
        municipio: document.getElementById('municipio').value,
        uf: document.getElementById('uf').value,
        proposta: document.getElementById('proposta').value,
        objeto: document.getElementById('objeto').value
    };
}

// Substituir os placeholders nas declarações
function substituirPlaceholders(texto, dados) {
    return texto
        .replace(/\[NOME\]/g, dados.nome)
        .replace(/\[CPF\]/g, dados.cpf)
        .replace(/\[RG\]/g, dados.rg)
        .replace(/\[ORGAO_EMISSOR\]/g, dados.orgaoEmissor)
        .replace(/\[CARGO_DIRIGENTE\]/g, dados.cargoDirigente)
        .replace(/\[ENTIDADE\]/g, dados.entidade)
        .replace(/\[CNPJ\]/g, dados.cnpj)
        .replace(/\[ENDERECO\]/g, dados.endereco)
        .replace(/\[MUNICIPIO\]/g, dados.municipio)
        .replace(/\[UF\]/g, dados.uf)
        .replace(/\[PROPOSTA\]/g, dados.proposta)
        .replace(/\[OBJETO\]/g, dados.objeto);
}

// Declarações comuns a todas as opções com títulos e quebras de linha
const declaracoesComuns = `
    TÍTULO: DECLARAÇÃO DE NÃO UTILIZAÇÃO DE RECURSOS
    Eu, [NOME], representante legal da entidade [ENTIDADE], com CPF [CPF] e CNPJ [CNPJ], declaro que os recursos do presente convênio não serão usados para fins alheios ao objeto da parceria.

    \n\n

    TÍTULO: DECLARAÇÃO DE CONTRAPARTIDA
    A entidade [ENTIDADE] compromete-se a oferecer contrapartida de acordo com o objeto: [OBJETO], conforme estabelecido na proposta nº [PROPOSTA].

    \n\n

    TÍTULO: DECLARAÇÃO DE ADIMPLÊNCIA
    Declaramos que a entidade não está inadimplente com a União ou qualquer órgão público, e que cumpre as obrigações legais, fiscais e trabalhistas.
`;

// Declarações específicas por opção
const declaracoesEspecificas = {
    '20JP_20JQ_ate_50k': `
        TÍTULO: DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Até 50 mil habitantes)
        Esta declaração é aplicável para 20JP e 20JQ - Discricionário - Até 50 mil habitantes.
     { text: '', pageBreak: 'after' },
        `,
    '00SL_emendas': `
        TÍTULO: DECLARAÇÃO ESPECÍFICA - 00SL (Emendas Individual e Bancada)
        Esta declaração é para 00SL - Emendas Individual e Bancada.
    `,
    '20JP_20JQ_emenda': `
        TÍTULO: DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Emenda Individual e Bancada)
        Esta declaração se refere a 20JP e 20JQ - Emenda Individual e de Bancada.
    `,
    '20JP_20JQ_comissao_mais_50k': `
        TÍTULO: DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Mais de 50 mil habitantes)
        Esta declaração é aplicável a 20JP e 20JQ - Comissão - Mais de 50 mil habitantes.
    `,
    '00SL_comissao_mais_50k': `
        TÍTULO: DECLARAÇÃO ESPECÍFICA - 00SL (Mais de 50 mil habitantes)
        Esta declaração é para 00SL - Comissão - Mais de 50 mil habitantes.
    `,
    '00SL_comissao_ate_50k': `
        TÍTULO: DECLARAÇÃO ESPECÍFICA - 00SL (Até 50 mil habitantes)
        Esta declaração é aplicável a 00SL - Comissão - Até 50 mil habitantes.
    `
};

// Função para gerar o PDF
function gerarPDF() {
    const dados = capturarDadosFormulario();
    const opcao = document.getElementById('opcaoSelecao').value;

    if (!opcao || !declaracoesEspecificas[opcao]) {
        alert('Selecione uma opção válida antes de gerar o PDF.');
        return;
    }

    // Substituir placeholders nas declarações comuns e específicas
    const textoComum = substituirPlaceholders(declaracoesComuns, dados);
    const textoEspecifico = substituirPlaceholders(declaracoesEspecificas[opcao], dados);

    // Definição do documento PDF
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            { text: textoComum, alignment: 'justify', margin: [0, 0, 0, 20] },
            { text: textoEspecifico, alignment: 'justify', margin: [0, 0, 0, 20] },
            { text: `${dados.municipio}/${dados.uf}, na data da assinatura digital.`, alignment: 'left', margin: [0, 0, 0, 40] },
            { text: `${dados.cargoDirigente}`, alignment: 'center', margin: [0, 0, 0, 20] }
        ],
        styles: {
            header: { fontSize: 18, bold: true },
            normal: { fontSize: 12, lineHeight: 1.5 }
        }
    };

    // Gera e baixa o PDF
    pdfMake.createPdf(docDefinition).download(`${opcao}.pdf`);
}

// Evento do botão para gerar PDF
document.getElementById('gerarPDF').addEventListener('click', gerarPDF);
