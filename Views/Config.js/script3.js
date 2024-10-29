// Função para capturar dados do formulário
function capturarDadosFormulario() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : ''; // Retorna valor vazio se o campo não existir
    };

    return {
        nome: getValue('dirigente'),
        cpf: getValue('cpf'),
        rg: getValue('rg'),
        orgaoEmissor: getValue('orgaoEmissor'),
        cargoDirigente: getValue('cargoDirigente'),
        entidade: getValue('entidade'),
        cnpj: getValue('cnpj'),
        endereco: getValue('endereco'),
        municipio: getValue('municipio'),
        uf: getValue('uf'),
        proposta: getValue('proposta'),
        objeto: getValue('objeto'),
        valorContrapartida: getValue('valorContrapartida'),
        valorContrapartidaExtenso: getValue('valorContrapartidaExtenso'),
        leiOrcamentaria: getValue('leiOrcamentaria'),
        diaLei: getValue('diaLei'),
        mesLei: getValue('mesLei'),
        anoLei: getValue('anoLei'),
        orgao: getValue('orgao'),
        unidade: getValue('unidade'),
        funcao: getValue('funcao'),
        subfuncao: getValue('subfuncao'),
        programa: getValue('programa'),
        atividade: getValue('atividade'),
        naturezaDespesa: getValue('naturezaDespesa')
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
    .replace(/\[OBJETO\]/g, dados.objeto)
    .replace(/\[VALOR_CONTRAPARTIDA\]/g, dados.valorContrapartida)
    .replace(/\[VALOR_CONTRAPARTIDA_EXTENSO\]/g, dados.valorContrapartidaExtenso)
    .replace(/\[LEI_ORCAMENTARIA\]/g, dados.leiOrcamentaria)
    .replace(/\[DIA_LEI\]/g, dados.diaLei)
    .replace(/\[MES_LEI\]/g, dados.mesLei)
    .replace(/\[ANO_LEI\]/g, dados.anoLei)
    .replace(/\[ORGAO\]/g, dados.orgao)
    .replace(/\[UNIDADE\]/g, dados.unidade)
    .replace(/\[FUNCAO\]/g, dados.funcao)
    .replace(/\[SUBFUNCAO\]/g, dados.subfuncao)
    .replace(/\[PROGRAMA\]/g, dados.programa)
    .replace(/\[ATIVIDADE\]/g, dados.atividade)
    .replace(/\[NATUREZA_DESPESA\]/g, dados.naturezaDespesa)
    .replace(/\[DIA_ATUAL\]/g, diaAtual)
    .replace(/\[MES_ATUAL\]/g, mesAtual)
    .replace(/\[ANO_ATUAL\]/g, anoAtual);
}

const declaracoesCompletas = [
    {
        title: "DECLARAÇÃO DE NÃO UTILIZAÇÃO DE RECURSOS",
        content: `    

        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR]/[UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], DECLARO ao Ministério do Esporte - MESP, que a entidade a qual represento não recebe recursos financeiros de outra entidade para a mesma finalidade na execução das ações apresentadas e especificadas na Proposta N° [PROPOSTA], cadastrada no Sistema Eletrônico Transferegov, para [OBJETO], evitando desta forma a sobreposição de recursos.

        ___________________________________________________  
        [NOME]  
        [CARGO_DIRIGENTE]
        `
    },
    {
        title: "DECLARAÇÃO DE DISPONIBILIDADE DE CONTRAPARTIDA",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR]/[UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], DECLARO, em conformidade com a Lei de Diretrizes Orçamentárias vigente, que a presente Entidade dispõe e se compromete com o montante financeiro de R$ [VALOR_CONTRAPARTIDA] ([VALOR_CONTRAPARTIDA_EXTENSO]), para participar da contrapartida no repasse de recursos destinados ao cumprimento do objeto pactuado, disponível no Sistema Eletrônico Transferegov, Proposta sob o n.º [PROPOSTA].

        Os recursos estão disponíveis na Lei Orçamentária Municipal/Estadual nº [LEI_ORCAMENTARIA], de [DIA_LEI] de [MES_LEI] de [ANO_LEI], conforme rubrica orçamentária abaixo especificada, e cópia anexa:

        Órgão: [ORGAO]  
        Unidade: [UNIDADE]  
        Função: [FUNCAO]  
        Subfunção: [SUBFUNCAO]  
        Programa: [PROGRAMA]  
        Atividade: [ATIVIDADE]  
        Natureza da despesa: [NATUREZA_DESPESA]  

        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]

        ___________________________________________________

        [NOME]  
        [CARGO_DIRIGENTE]
        `
    },
    {
        title: "DECLARAÇÃO DE ADIMPLÊNCIA",
        content: `Declaramos que a entidade não está inadimplente com a União ou qualquer órgão público e cumpre as obrigações legais, fiscais e trabalhistas.`
    },
    {
        title: "DECLARAÇÃO DE CIÊNCIA DAS CONDUTAS VEDADAS AOS AGENTES PÚBLICOS FEDERAIS EM ELEIÇÕES",
        content: `Declaro que tenho ciência das condutas vedadas aos agentes públicos federais durante o período eleitoral, conforme legislação vigente.`
    },
    {
        title: "DECLARAÇÃO NEGATIVA DE DUPLICIDADE DE CONVÊNIO",
        content: `Declaro que a proposta foi apresentada apenas a este órgão e não a outros entes públicos.`
    },
    {
        title: "DECLARAÇÃO DE EXISTÊNCIA DE ÁREA GESTORA DOS RECURSOS (Possui)",
        content: `Declaro que o [MUNICIPIO] possui área gestora para a administração dos recursos recebidos por transferência voluntária da União.`
    },
    {
        title: "DECLARAÇÃO DE INEXISTÊNCIA DE ÁREA GESTORA DOS RECURSOS (Não Possui)",
        content: `Declaro que o [MUNICIPIO] não possui área gestora específica, mas delegará a gestão a outro setor competente.`
    },
    {
        title: "DECLARAÇÃO DE INEXISTÊNCIA DE LEGISLAÇÃO DO PROPONENTE",
        content: `Declaro que não há legislação vigente na localidade que estabeleça a cobrança de taxa de administração sobre o objeto pactuado.`
    },
    {
        title: "ATESTADO DE CAPACIDADE TÉCNICA",
        content: `Atesto que a entidade [ENTIDADE] possui capacidade técnica e operacional para executar o objeto da proposta nº [PROPOSTA].`
    },
    {
        title: "DECLARAÇÃO DE DISPONIBILIDADE DE CONTRAPARTIDA",
        content: `A entidade disponibiliza o valor necessário como contrapartida para o objeto pactuado.`
    },
    {
        title: "DECLARAÇÃO DE AUSÊNCIA DE DESTINAÇÃO DE RECURSOS",
        content: `Declaro que os recursos não serão destinados a despesas com pessoal ativo, inativo ou pensionista.`
    },
    {
        title: "DECLARAÇÃO DE NÃO VÍNCULO",
        content: `Declaro que as empresas contratadas não possuem vínculo societário, comercial ou familiar com o proponente.`
    },
    {
        title: "DECLARAÇÃO DE AQUISIÇÃO DE BENS E SERVIÇOS COMUNS",
        content: `Comprometo-me a realizar pregão para aquisição de bens e serviços comuns, conforme legislação vigente.`
    },
    {
        title: "DECLARAÇÃO DE QUE NÃO RECEBE OUTROS RECURSOS",
        content: `Declaro que a entidade não recebe recursos de outra entidade para a mesma finalidade.`
    },
    {
        title: "DECLARAÇÃO DE NÃO CONTRATAÇÃO COM RECURSOS DA PARCERIA",
        content: `Declaro que não serão contratadas empresas do mesmo grupo econômico ou com vínculos com dirigentes, utilizando os recursos da parceria.`
    },
    {
        title: "DECLARAÇÃO DE COMPROMISSO",
        content: `Comprometo-me a dispor dos recursos necessários para acesso ao Transferegov e dar publicidade ao projeto durante toda a execução.`
    },
    {
        title: "DECLARAÇÃO DE CUSTOS",
        content: `Atesto que os custos apresentados estão de acordo com os praticados no mercado.`
    },
    {
        title: "DECLARAÇÃO DE CESSÃO/POSSE DE ESPAÇO FÍSICO",
        content: `Responsabilizo-me pela disponibilização de espaço físico compatível com as necessidades do projeto.`
    }
]

// Declarações específicas por opção
const declaracoesEspecificas = {
    '20JP_20JQ_ate_50k': {
        title: "DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Até 50 mil habitantes)",
        content: `Declaro que o município [MUNICIPIO] ou entidade [ENTIDADE] se enquadra na categoria de até 50 mil habitantes e que os recursos recebidos serão aplicados conforme o objeto especificado.`
    },
    '00SL_emendas': {
        title: "DECLARAÇÃO ESPECÍFICA - 00SL (Emendas Individual e Bancada)",
        content: `Declaro que os recursos são oriundos de emendas individuais e/ou de bancada e serão aplicados integralmente no objeto [OBJETO], conforme proposta nº [PROPOSTA].`
    },
    '20JP_20JQ_emenda': {
        title: "DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Emenda Individual e Bancada)",
        content: `Declaro que o município [MUNICIPIO] se enquadra nas disposições de 20JP ou 20JQ e que os recursos provenientes de emendas individuais e de bancada serão utilizados de forma adequada, respeitando a legislação vigente.`
    },
    '20JP_20JQ_comissao_mais_50k': {
        title: "DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Mais de 50 mil habitantes)",
        content: `Declaro que o município [MUNICIPIO] possui mais de 50 mil habitantes e que os recursos repassados por meio das ações 20JP e 20JQ serão executados por comissão específica para gestão e controle.`
    },
    '00SL_comissao_mais_50k': {
        title: "DECLARAÇÃO ESPECÍFICA - 00SL (Mais de 50 mil habitantes)",
        content: `Declaro que a entidade [ENTIDADE] ou município [MUNICIPIO] possui mais de 50 mil habitantes e os recursos provenientes da ação 00SL serão aplicados conforme planejamento aprovado.`
    },
    '00SL_comissao_ate_50k': {
        title: "DECLARAÇÃO ESPECÍFICA - 00SL (Até 50 mil habitantes)",
        content: `Declaro que a entidade [ENTIDADE] ou município [MUNICIPIO] se enquadra na categoria de até 50 mil habitantes e que os recursos da ação 00SL serão executados conforme o previsto na proposta nº [PROPOSTA].`
    },
    '20JP_20JQ_discriminatorio': {
        title: "DECLARAÇÃO ESPECÍFICA - 20JP e 20JQ (Discricionário)",
        content: `Declaro que os recursos referentes às ações 20JP e 20JQ serão aplicados com discricionariedade administrativa, respeitando as diretrizes do objeto [OBJETO].`
    },
    '00SL_resto': {
        title: "DECLARAÇÃO ESPECÍFICA - 00SL (Resto a Pagar)",
        content: `Declaro que a entidade [ENTIDADE] ou município [MUNICIPIO] utilizará os recursos de "Resto a Pagar" da ação 00SL para finalização de projetos pendentes, conforme o objeto [OBJETO].`
    }
};

// Função para gerar o PDF
function gerarPDF() {
    const dados = capturarDadosFormulario();
    const opcao = document.getElementById('opcaoSelecao').value;

    // Verificar se uma opção válida foi selecionada
    if (!opcao || !declaracoesEspecificas[opcao]) {
        alert('Selecione uma opção válida antes de gerar o PDF.');
        return;
    }

    // Processar as declarações comuns
    const conteudoComum = declaracoesCompletas.map(declaracao => ({
        stack: [
            { text: declaracao.title, style: 'header', margin: [0, 10, 0, 10] },
            { text: substituirPlaceholders(declaracao.content, dados), style: 'normal' }
        ],
        pageBreak: 'after'
    }));

    // Processar a declaração específica
    const declaracaoEspecifica = declaracoesEspecificas[opcao];
    const conteudoEspecifico = {
        stack: [
            { text: declaracaoEspecifica.title, style: 'header', margin: [0, 10, 0, 10] },
            { text: substituirPlaceholders(declaracaoEspecifica.content, dados), style: 'normal' }
        ],
        pageBreak: 'after'
    };

    // Definição do documento PDF com as declarações comuns e específica
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [...conteudoComum, conteudoEspecifico], // Inclui comuns e específica
        styles: {
            header: { fontSize: 16, bold: true, alignment: 'center' },
            normal: { fontSize: 12, lineHeight: 1.5 }
        }
    };


    // Gera e baixa o PDF
    pdfMake.createPdf(docDefinition).download(`${opcao}.pdf`);
}

// Evento do botão para gerar PDF
document.getElementById('gerarPDF').addEventListener('click', gerarPDF);
