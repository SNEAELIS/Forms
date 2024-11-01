// Função para capturar dados do formulário
document.getElementById('imagens').addEventListener('change', function () {
    const descricaoContainer = document.getElementById('descricaoImagens');
    descricaoContainer.innerHTML = ''; // Limpa descrições anteriores

    Array.from(this.files).forEach((file, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="form-row">
                <label for="descricao${index}">Descrição da Imagem ${index + 1}:</label>
                <textarea id="descricao${index}" rows="2" style="width: 100%;"></textarea>
            </div>
        `;
        descricaoContainer.appendChild(div);
    });
});

function capturarDadosFormulario() {

    const getValue = (id) => document.getElementById(id)?.value || '';

    const imagens = Array.from(document.getElementById('imagens').files);
    const descricoes = imagens.map((_, index) => getValue(`descricao${index}`));

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
        naturezaDespesa: getValue('naturezaDespesa'),
        imagens: imagens,
        descricoes: descricoes
        
    };
}


// Substituir os placeholders nas declarações
function substituirPlaceholders(texto, dados) {
    const dataAtual = new Date();
    const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    const mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });
    const anoAtual = dataAtual.getFullYear();

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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gerarPDF').addEventListener('click', gerarPDF);
});

const declaracoesCompletas = [
    {
        title: "ATESTADO DE CAPACIDADE TÉCNICA",
        content: `
            Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR]/[UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], situado(a) no [ENDERECO], CEP [CEP], atesto, para fins de formalização de Convênio com o Ministério do Esporte - MESP, que a presente Entidade apresenta capacidade técnica e operacional para executar o objeto apresentado na Proposta n.º [PROPOSTA], em atendimento ao inciso V, Art. 18, da Portaria Conjunta MGI/MF/CGU nº 33, de 30 de agosto de 2023, considerando as experiências adquiridas na execução de projeto(s)/ação(es) na(s) área(s) esportivo/educacional/social, devidamente especificada(s) no Histórico anexo.
        
            O(s) projeto(s)/ação(es) descrito(s) foi(ram) executado(s) com qualidade, não existindo, até a presente data, fatos que desabonem a conduta e a responsabilidade da entidade com as obrigações assumidas, confirmando assim a capacidade técnica e operacional para a execução do que foi proposto.
        
            Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]
        
            ____________________________________________________
            [NOME]
            [CARGO_DIRIGENTE]
        `
    },
    {
        content: `
        ANEXO
        
            HISTÓRICO 
        
            I. Apresentação:
            • Nome do projeto/ação: [NOME_PROJETO]
            • Entidades Parceiras: [ENTIDADES_PARCEIRAS]
            • Período de Vigência: [PERIODO_VIGENCIA]
            • Número de Beneficiados: [NUMERO_BENEFICIADOS]
            • Ações/Atividades desenvolvidas: [ACOES_DESENVOLVIDAS]
        
            Documentos Comprobatórios a serem encaminhados em anexo:
            a) Fotos
            b) Materiais de divulgação (folders, cartazes, etc.)
            c) Matérias vinculadas na mídia (jornal, revistas, etc.)
            d) Cópia de instrumento específico (contratos, convênios, termos de parceria, etc.)
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
        title: "DECLARAÇÃO DE AUSÊNCIA DE DESTINAÇÃO DE RECURSOS",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR]/[UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], declaro que os recursos do presente Convênio não se destinarão para o pagamento de despesas com pessoal ativo, inativo ou pensionista, dos Estados, do Distrito Federal e Municípios, conforme Art. 167, X, CF/88 e art. 25, § 1º, III, Lei Complementar nº 101/2000. 

        Por ser expressão da verdade, firmo a presente declaração.

        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]

        ______________________________________________________
        [NOME]
        [CARGO_DIRIGENTE]
        `
    },
    {
        title: "DECLARAÇÃO DE NÃO VÍNCULO",
        content: `
        Eu, [NOME], CPF [CPF], RG [RG], expedido pelo [ORGAO_EMISSOR]/[UF], cargo [CARGO_DIRIGENTE], declaro, sob as penas da lei, em especial a do art. 299 do Código Penal Brasileiro, na qualidade de representante legal do Proponente, que as Empresas a serem contratadas no âmbito do Convênio a ser celebrado com o Ministério do Esporte - MESP, sob o número da Proposta nº [PROPOSTA], não possuem em seu quadro societário, cônjuge ou companheiro, bem como, vínculo de parentesco, colateral ou por afinidade, até o terceiro grau, ou de natureza técnica, comercial, econômica, financeira, trabalhista e civil.

        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]

        ______________________________________________________
        [NOME]
        [CARGO_DIRIGENTE]
        `
    },

    {
        title: "DECLARAÇÃO DE AQUISIÇÃO DE BENS E SERVIÇOS COMUNS (incluindo a contratação de serviços de recursos humanos)",
        content: `
        Eu, [ENTIDADE], portador da carteira de identidade nº [RG], expedida pelo [ORGÃO/UF], CPF [XXX.XXX.XXX-XX], na condição de representante legal do(a) [NOME COMPLETO DA ENTIDADE PROPONENTE/RAZÃO SOCIAL], CNPJ nº [XX.XXX.XXX/XXXX-XX], no que respeita à aquisição de bens e serviços comuns, declaro o compromisso de:
    
        1. Realizar Processo Licitatório na modalidade Pregão, em atendimento ao § 2º do Art. 17, da Lei n.º 14.133, de 1º de abril de 2021, Art. 51, da Portaria Conjunta n.º 33, de 30 de agosto de 2023, § 3º do Art. 1º, do Decreto n.º 10.024, de 20 de setembro de 2019 e demais legislações que regem a matéria, inclusive quanto à contratação de recursos humanos, quando for o caso, em conformidade com as orientações contidas no Acórdão n.º 2588/2017 – TCU – Plenário.
    
        2. Dar publicidade ao Processo Licitatório, divulgando no Diário Oficial da União, conforme preconiza o Art. 11 do Decreto nº 3.555, de 08 de agosto de 2000 e Art. 20, do Decreto n.º 10.024, de 20 de setembro de 2019.
    
        3. Consultar e emitir, para posterior inserção no sistema Transferegov, a declaração e certidões citadas no item 3 quando da assinatura do contrato a ser formalizado com as empresas vencedoras do certame ou do registro da nota de empenho quando não ocorrer a celebração do instrumento contratual, a fim de comprovar que no ato de assinatura as empresas estavam idôneas e aptas para contratar com a Administração Pública.
    
        4. Publicar os editais de licitação para consecução do objeto conveniado somente após a assinatura do respectivo instrumento, conforme Art. 53, da Portaria Conjunta n.º 33, de 30 de agosto de 2023.
    
        Por ser expressão da verdade, firmo a presente declaração.
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]
    
        ____________________________________________________
        [NOME DO DIRIGENTE DA ENTIDADE PROPONENTE]
        [CARGO]
        `
    },

    {
        title: "DECLARAÇÃO DE CIÊNCIA DAS CONDUTAS VEDADAS AOS AGENTES PÚBLICOS FEDERAIS EM ELEIÇÕES",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ nº [CNPJ], declaro, para fins de celebração de Convênio com o Ministério do Esporte – MESP, que tenho ciência das condutas vedadas aos agentes públicos federais no ano das eleições, previstas na legislação vigente, em especial no que se refere à transferência voluntária de recursos públicos, disposta no art. 73, inciso VI, alínea “a”, da Lei nº 9.504, de 30 de setembro de 1997.
        
        A referida lei prevê que a União está impedida de realizar transferência voluntária de recursos aos Estados e Municípios, sob pena de nulidade de pleno direito, ressalvados os recursos destinados a cumprir obrigação formal preexistente para execução de obra ou serviço em andamento e com cronograma prefixado, e os destinados a atender situações de emergência e de calamidade pública, nos três meses anteriores à eleição.
        
        Por ser expressão da verdade, firmo a presente declaração.
        
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]
        
        ___________________________________________________
        [NOME]
        [CARGO_DIRIGENTE]
        `
    },

    {
        title: "DECLARAÇÃO NEGATIVA DE DUPLICIDADE DE CONVÊNIO",
        content: `
        Declaro para os devidos fins de celebração de Convênios e na qualidade de representante legal do proponente junto ao Ministério do Esporte - MESP, que a proposta inserida no Sistema Eletrônico Transferegov sob o nº [PROPOSTA] e demais informações foram apresentados para apreciação SOMENTE junto a esse órgão e em nenhum outro ente da administração pública, ficando, portanto, sujeito às sanções civis, administrativas e penais cabíveis no caso de comprovada a falsidade ideológica.
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL]
    
        ____________________________________________________
        [NOME]
        [CARGO_DIRIGENTE]
        `
    },

    {
        title: "DECLARAÇÃO DE EXISTÊNCIA DE ÁREA GESTORA DOS RECURSOS RECEBIDOS POR TRANSFERÊNCIA VOLUNTÁRIA DA UNIÃO",
        content: `
        INCISO VII DO ART. 29 DA PORTARIA CONJUNTA N.º 33/2023
    
        Eu, [NOME], CPF [CPF], RG [RG], [ORGAO_EMISSOR/UF], cargo [CARGO], que essa subscrevo, em cumprimento ao disposto no inciso VII, do Art. 29, da Portaria Conjunta MGI/MF/CGU n.º 33/2023, DECLARO, sob as penas da lei, que o [ENTIDADE], CNPJ: [CNPJ], endereço [ENDERECO], CEP [CEP], [MUNICIPIO/UF], possui área gestora dos recursos recebidos por transferência voluntária da União, com atribuições definidas para gestão, celebração, execução e prestação de contas, com lotação de, no mínimo, um servidor ou empregado público efetivo.
    
        Por ser verdade, firmo a presente no exercício do respectivo cargo.
    
        [MUNICIPIO/UF], [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        _____________________________________________________
        [NOME]
        [CARGO]
        `
    },
    {
        title: "DECLARAÇÃO DE INEXISTÊNCIA DE ÁREA GESTORA DOS RECURSOS RECEBIDOS POR TRANSFERÊNCIA VOLUNTÁRIA DA UNIÃO",
        content: `
        § 17, DO ART. 29 DA PORTARIA CONJUNTA N.º 33/2023
    
        Eu, [NOME], CPF [CPF], RG [RG], [ORGAO_EMISSOR/UF], cargo [CARGO], que este subscreve, em cumprimento ao § 17, do Art. 29, da Portaria Interministerial MGI/MF/CGU n.º 33/2023, DECLARO, sob as penas da lei, que o [ENTIDADE], CNPJ: [CNPJ], endereço [ENDERECO], CEP [CEP], [MUNICIPIO/UF], não possui área gestora dos recursos recebidos por transferência voluntária da União, com atribuições definidas para gestão, celebração, execução e prestação de contas. Assim, atribuirá a competência pela gestão dos recursos recebidos por transferência voluntária da União a outro setor que possua, no mínimo, um servidor ou empregado público efetivo.
    
        Por ser verdade, firmo a presente no exercício do respectivo cargo.
    
        [MUNICIPIO/UF], [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        _____________________________________________________
        [NOME]
        [CARGO]
        `
    },
    {
        title: "DECLARAÇÃO DE INEXISTÊNCIA DE LEGISLAÇÃO DO PROPONENTE, NA LOCALIDADE DE EXECUÇÃO DO OBJETO, QUE ESTABELEÇA A COBRANÇA DE TAXA DE ADMINISTRAÇÃO DE CONTRATO",
        content: `
        INCISO XXXIV, DO ART. 29, DA PORTARIA CONJUNTA N.º 33/2023
    
        Eu, [NOME], CPF [CPF], RG [RG], [ORGAO_EMISSOR/UF], cargo [CARGO], que essa subscrevo, em cumprimento ao disposto no inciso XXXIV, do Art. 29, da Portaria Conjunta MGI/MF/CGU n.º 33/2023, DECLARO, sob as penas da lei, que o [ENTIDADE], CNPJ: [CNPJ], endereço [ENDERECO], CEP [CEP], [MUNICIPIO/UF], não possui legislação, na localidade de execução do objeto, que estabeleça a cobrança de taxa de administração de contrato, em consonância com a vedação do art. 21, parágrafo único, inciso I, da Portaria Conjunta MGI/MF/CGU n.º 33/2023.
    
        Por ser verdade, firmo a presente no exercício do respectivo cargo.
    
        [MUNICIPIO/UF], [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        ______________________________________________________
        [NOME]
        Chefe do Poder Executivo ou Secretário de Finanças
        `
    },

    {
        title: "DECLARAÇÃO NÃO RECEBE RECURSOS PARA A MESMA FINALIDADE DE OUTRA ENTIDADE",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR/UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], DECLARO ao Ministério do Esporte - MESP, que a entidade a qual represento não recebe recursos financeiros de outra entidade para a mesma finalidade na execução das ações apresentadas e especificadas na Proposta N° [PROPOSTA], cadastrada no Sistema Eletrônico Transferegov, para [OBJETO_CONVENIO], evitando desta forma a sobreposição de recursos.
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        ___________________________________________________
        [NOME]
        [CARGO]
        `
    },

    {
        title: "DECLARAÇÃO NÃO CONTRATAÇÃO COM RECURSOS DA PARCERIA",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR/UF], CPF [CPF], na condição de representante legal da [ENTIDADE], CNPJ nº [CNPJ], declaro para os devidos fins de celebração do Termo de Convênio, no âmbito do Ministério do Esporte - MESP, que a presente Entidade não contratará com recursos da presente parceria, empresas que sejam do mesmo grupo econômico; tenham participação societária cruzada; pertençam ou tenham participação societária de parentes de dirigentes ou funcionários da entidade; possuam o mesmo endereço, telefone e CNPJ; bem como, que as cotações relativas aos itens previstos no Plano de Trabalho não apresentarão incompatibilidade, no que se refere à situação cadastral dos fornecedores e à classificação de atividades econômicas – CNAE em relação ao serviço ou fornecimento de material alusivo à respectiva cotação. Além disso, responsabilizar-se-á pela veracidade dos documentos apresentados referentes às pesquisas de preços junto aos fornecedores.
    
        Por ser expressão da verdade, firmo a presente declaração.
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        __________________________________________
        [NOME]
        [CARGO]
        `
    },

    {
        title: "DECLARAÇÃO DE COMPROMISSO",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR/UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], declaro o compromisso de:
    
        • Dispor dos recursos informatizados necessários ao acesso ao Sistema Eletrônico Transferegov, com o objetivo de alimentar, atualizar e acompanhar de forma permanente o referido sistema, de acordo com a norma vigente, durante todo o período da formalização da parceria até a prestação de contas final;
    
        • Dar publicidade ao Projeto/Programa, durante toda a execução, em observância à aplicação dos selos e marcas, adotadas pelo Ministério do Esporte - MESP e Governo Federal, de acordo com o estipulado no Manual de Selos e Marcas do Governo Federal, inclusive em ações de Patrocínio;
    
        • Previamente à confecção dos materiais, encaminhar para aprovação os layouts, juntamente com o número do convênio, processo e nome do programa/projeto/evento, para o e-mail: publicidade.cgce@esporte.gov.br.
    
        Por ser expressão da verdade, firmo a presente declaração.
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        ......................................................................................................
        [NOME]
        [CARGO]
        `
    },
    {
        title: "DECLARAÇÃO DE CUSTOS",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR/UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ nº [CNPJ], ATESTO a planilha de custos, bem como as cotações obtidas, conforme Instrução Normativa SEGES/ME n.º 65, de 7 julho de 2021, inseridas no Sistema Eletrônico Transferegov, Proposta n.º [PROPOSTA].
    
        Ademais, DECLARO que os custos apresentados estão de acordo com os praticados no mercado.
    
        Por ser expressão da verdade, firmo a presente declaração.
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        ________________________________________________________
        [NOME]
        [CARGO]
        `
    },
    {
        title: "DECLARAÇÃO DE CESSÃO/POSSE DE ESPAÇO FÍSICO",
        content: `
        Eu, [NOME], portador da carteira de identidade nº [RG], expedida pelo [ORGAO_EMISSOR/UF], CPF [CPF], na condição de representante legal do(a) [ENTIDADE], CNPJ Nº [CNPJ], responsabilizo-me pela disponibilização do(s) espaço(s) físico(s), apto(s) e compatível(is) para o atendimento do público-alvo. Além disso, apresentarei a(s) cessão(ões) de espaço físico, se for o caso, a fim de não causar qualquer impedimento no desenvolvimento das atividades junto aos beneficiados, no(s) núcleo(s) do [PROJETO_PROGRAMA].
    
        Município, [DIA_ATUAL] de [MES_ATUAL] de [ANO_ATUAL].
    
        _________________________________________________________
        [NOME]
        [CARGO]
        `
    },

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
