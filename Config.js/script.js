document.getElementById('botaoGerarPDF').addEventListener('click', function (e) {
    e.preventDefault();
 
    // Exibe a mensagem de carregamento
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block'; // Mostra o aviso
 
    // Função simulada para gerar os PDFs
    generateAllPDFs().then(() => {
        // Oculta a mensagem de carregamento após o processo de geração
        loadingMessage.style.display = 'none';
    }).catch((error) => {
        // Se houver um erro, você pode lidar com ele aqui
        alert("Ocorreu um erro ao gerar os PDFs.");
        console.error(error);
 
        // Oculta a mensagem de carregamento também no caso de erro
        loadingMessage.style.display = 'none';
    });
});

// Função para mostrar ou esconder campos do Coordenador Geral
function mostrarCoordenador(resposta) {
    const coordenadorFields = document.getElementById('coordenadorFields');
    if (resposta === 'Sim') {
        coordenadorFields.classList.remove('hidden');
        coordenadorFields.classList.add('visible');
    } else {
        coordenadorFields.classList.add('hidden');
        coordenadorFields.classList.remove('visible');
    }
}

// Função para formatar CPF
function formatarCPF(campo) {
    let cpf = campo.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita a 11 dígitos
    campo.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}


// Função para formatar CNPJ
function formatCNPJ(input) {
    // Remove tudo o que não for número
    let cnpj = input.value.replace(/\D/g, '');
    
    // Limita o tamanho a 14 dígitos
    if (cnpj.length > 14) {
      cnpj = cnpj.slice(0, 14);
    }
  
    // Aplica a formatação CNPJ (XX.XXX.XXX/XXXX-XX)
    if (cnpj.length > 12) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    } else if (cnpj.length > 8) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, "$1.$2.$3/$4");
    } else if (cnpj.length > 5) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2.$3");
    } else if (cnpj.length > 2) {
      cnpj = cnpj.replace(/^(\d{2})(\d{3})$/, "$1.$2");
    }
  
    // Atualiza o valor do campo de input com a formatação
    input.value = cnpj;
  }
  



// Função para formatar a data
function formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para gerar o Atestado em PDF
function generateAtestadoPDF() {
    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const cnpj = document.getElementById('cnpj').value;
    const entidade = document.getElementById('entidade').value;
    const endereco = document.getElementById('endereco').value;
    const proposta = document.getElementById('proposta').value;
    const municipio = document.getElementById('municipio').value;

    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            {
                text: 'ATESTADO DE CAPACIDADE TÉCNICA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },
            {
                text: [
                    `Eu, ${dirigente}, CPF Nº ${cpf}, ATESTO para fins de formalização de Termo de Fomento no âmbito do Ministério do Esporte - MESP que o(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, situado(a) no(a) ${endereco}, possui capacidade técnica e operacional para executar o objeto apresentado na Proposta nº ${proposta}/2024 em atendimento ao art. 33 inciso V da Lei 13.019 de 2014 e art. 90 inciso XI da Lei nº 14.791 de 29 de dezembro de 2023 (LDO 2024), considerando as experiências adquiridas na execução de projeto(s)/ação(es) na(s) área(s) esportivo/educacional/social, bem como qualificação profissional do seu quadro pessoal e comprovação que dispõe de estruturas físicas conforme anexo.\n\n`,
                    'O(s) projeto(s)/ação(es) descrito(s) foi(ram) executado(s) com qualidade, não existindo até a presente data fatos que desabonem a conduta e a responsabilidade da entidade com as obrigações assumidas, confirmando assim a capacidade técnica e operacional para a execução do que foi proposto.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            },
            {
                text: [
                    'ANEXO\n\n',
                    'HISTÓRICO\n\n',
                    'I. Apresentação:\n\n',
                    `Nome do projeto/ação: \n\n`,
                    'Entidades Parceiras:\n\n',
                    'Data de início e término da execução: (Apresentar comprovantes de experiência prévia na realização do objeto da parceria ou de objeto de natureza semelhante de no mínimo um ano de capacidade técnica e operacional.)\n\n',
                    'Número de Beneficiados:\n\n',
                    'Ações/Atividades desenvolvidas: (Descrever as atividades desenvolvidas, recursos humanos envolvidos, objetivo geral e resultados alcançados)\n\n',
                    'Estruturas Físicas onde foram desenvolvidas as atividades:\n\n',
                    'Qualificação profissional do seu quadro pessoal:\n\n',
                    'Documentos Comprobatórios a serem encaminhados em anexo:\n\n',
                    'a) fotos\n\n',
                    'b) materiais de divulgação (folders, cartazes, etc)\n\n',
                    'c) matérias vinculadas na mídia (jornal, revistas, etc)\n\n',
                    'd) cópia de instrumento específico (contratos, convênios, termos de parceria, etc)\n\n'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },
        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    pdfMake.createPdf(docDefinition).download(`Atestado_Capacidade_Tecnica_${dirigente}.pdf`);
}




function generateDeclaracaoNaoUtilizacaoRecursosPDF() {
    // Coletar os dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao').value; // ID correto para o Órgão Expedidor
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const date = formatDate(); // Função para formatar a data atual

    // Definir o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE NÃO UTILIZAÇÃO DE RECURSOS',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins de celebração de Termo de Fomento no âmbito do Ministério do Esporte - MESP que a presente Entidade não utilizará os recursos para finalidade alheia ao objeto da parceria.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Nao_Utilizacao_Recursos_${dirigente}.pdf`);
}



function generateDeclaracaoLeiPDF() {
    // Coletar os dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const date = formatDate(); // Função já existente para formatar a data

    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado em duas linhas
            {
                text: 'DECLARAÇÃO DOS ARTS. 26, 27 DO DECRETO Nº 8.726 DE 2016',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior de 10
            },
            {
                text: 'E DO ART. 39 DA LEI Nº 13.019 DE 2014',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior de 20
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins, nos termos do art. 26 caput inciso VII e art. 27 do Decreto nº 8.726 de 2016 e do art. 39 incisos III ao VII da Lei nº 13.019 de 2014, que os dirigentes abaixo relacionados não incorrem em qualquer das vedações previstas em lei.\n\n`,
                    `I - Não são membros de Poder ou do Ministério Público ou dirigentes de órgão ou entidade da Administração Pública Federal;\n`,
                    `II – Não são cônjuges ou parentes de membros de Poder ou dirigentes de entidade da Administração Pública Federal;\n`,
                    `III - Não contratarão com recursos da parceria para prestação de serviços servidor ou empregado público, inclusive comissionados ou parentes;\n`,
                    `IV - Não serão remunerados a qualquer título com os recursos repassados membros do Ministério Público, dirigentes de órgãos públicos ou pessoas com condenações relativas a crimes contra a administração pública;\n`,
                    `V – Não tiveram as contas rejeitadas pela Administração Pública nos últimos cinco anos;\n`,
                    `VI – Não foram punidos com sanções de suspensão, declaração de inidoneidade ou qualquer outra sanção prevista em lei.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Justificação do texto
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },

        ],

        // Definindo estilos para o documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Lei_${dirigente}.pdf`);
}

function generateDeclaracaoAusenciaRecursosPDF() {
    // Coletar os dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const date = formatDate(); // Função já existente para formatar a data

    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Define o tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Define as margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE AUSÊNCIA DE DESTINAÇÃO DE RECURSOS',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior para o título
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro que os recursos do presente Termo de Fomento não se destinarão ao pagamento de despesas com pessoal ativo, inativo ou pensionista dos Estados, do Distrito Federal e Municípios, conforme o art. 167 inciso X da Constituição Federal de 1988 e o art. 25 § 1º inciso III da Lei Complementar nº 101/2000.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Alinhamento justificado do texto principal
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior para separar o texto da assinatura
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },
        ],

        // Estilos do documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Ausencia_Destinacao_Recursos_${dirigente}.pdf`);
}


function generateDeclaracaoCumprimentoArt90PDF() {
    // Coletar os dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const date = formatDate(); // Função já existente para formatar a data

    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado em duas linhas
            {
                text: 'DECLARAÇÃO DE CUMPRIMENTO DO ART. 90 DA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior
            },
            {
                text: 'LEI Nº 14.791 DE 29 DE DEZEMBRO DE 2023',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins que a presente Entidade cumprirá com o disposto no art. 90, incisos IV e VIII da Lei nº 14.791 de 29 de dezembro de 2023:\n\n`,
                    `1. Compromisso da entidade beneficiada de disponibilizar ao cidadão em seu sítio eletrônico ou, na falta deste, em sua sede, consulta ao extrato do convênio ou instrumento congênere que conterá, no mínimo, o objeto, a finalidade e o detalhamento da aplicação dos recursos;\n\n`,
                    `2. A cláusula de reversão patrimonial válida até a depreciação integral do bem ou a amortização do investimento, constituindo garantia real em favor da concedente, em montante equivalente aos recursos de capital destinados à entidade, cuja execução ocorrerá caso se verifique desvio de finalidade ou aplicação irregular dos recursos.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Texto justificado
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },
        ],

        // Estilos do documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Cumprimento_Art_90_${dirigente}.pdf`);
}




function generateDeclaracaoNaoContratacaoRecursosParceriaPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cargoDirigente = document.getElementById('cargoDirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const date = formatDate(); // Função existente que formata a data

    // Definindo o conteúdo do documento PDF
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior para o título
            },
            {
                text: 'NÃO CONTRATAÇÃO COM RECURSOS DA PARCERIA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior para o título
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins de celebração de Termo de Fomento no âmbito do Ministério do Esporte - MESP que a presente Entidade não contratará com recursos da presente parceria:\n\n`,
                    '1. Empresas que sejam do mesmo grupo econômico;\n',
                    '2. Empresas que tenham participação societária cruzada;\n',
                    '3. Empresas que possuam participação societária de parentes de dirigentes ou funcionários da entidade;\n',
                    '4. Empresas que possuam o mesmo endereço, telefone e CNPJ.\n\n',
                    'As cotações relativas aos itens previstos no Plano de Trabalho também não apresentarão incompatibilidades quanto à situação cadastral dos fornecedores e à classificação de atividades econômicas (CNAE) em relação ao serviço ou fornecimento de material. Além disso, a Entidade se responsabilizará pela veracidade dos documentos apresentados referentes às pesquisas de preços junto aos fornecedores.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Texto justificado
                fontSize: 12,
                margin: [0, 0, 0, 40] // Espaçamento inferior
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },
        ],

        // Estilos do documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Nao_Contratacao_Recursos_Parceria_${dirigente}.pdf`);
}


function generateDeclaracaoArt299AutonomiaFinanceiraPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cargoDirigente = document.getElementById('cargoDirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cnpj = document.getElementById('cnpj').value;
    const entidade = document.getElementById('entidade').value;
    const sede = document.getElementById('endereco').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const contador = document.getElementById('nomeContador').value;
    const date = formatDate(); // Função já existente para formatar a data

    // Verificando se os campos obrigatórios estão preenchidos
    if (!dirigente || !cargoDirigente || !cpf || !rg || !orgao || !cnpj || !entidade || !sede || !municipio || !uf || !contador) {
        alert("Por favor, preencha todos os campos antes de gerar o PDF.");
        return;
    }

    // Definindo o conteúdo do documento PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO ART. 299 CÓDIGO PENAL E AUTONOMIA FINANCEIRA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal justificado
            {
                text: [
                    `A ${entidade}, pessoa jurídica de direito privado, na forma de associação sem fins lucrativos, com sede na ${sede}, inscrita no CNPJ nº ${cnpj}, neste ato representada por ${dirigente}, brasileiro(a), ${cargoDirigente}, portador(a) do RG nº ${rg}, expedido(a) pelo(a) ${orgao}, CPF nº ${cpf}, declara para fins de cadastramento e celebração do presente Termo de Fomento junto ao Ministério do Esporte - MESP, que a ${entidade} é uma entidade viável e autônoma financeiramente, e que, de acordo com as demonstrações contábeis regularmente escrituradas, sob pena do art. 299 do Código Penal:\n\n`,
                    '- Compromete-se em manter a escrituração completa de suas receitas e despesas em livros revestidos das formalidades que assegurem a respectiva exatidão, de acordo com a legislação e normas editadas pelo Conselho Federal de Contabilidade;\n',
                    '- Compromete-se a conservar em boa ordem, pelo prazo de cinco anos contado da data da emissão, os documentos que comprovem a origem de suas receitas e a efetivação de suas despesas, bem como a realização de quaisquer outros atos ou operações que venham modificar a sua situação patrimonial;\n',
                    '- Apresentar à Secretaria da Receita Federal do Brasil, anualmente, Declaração de Rendimentos, em conformidade com o disposto em ato daquele órgão, sem prejuízo da exigência de apresentação da cópia do respectivo recibo de entrega da referida Declaração de Rendimentos.\n\n',
                    `${municipio}/${uf}, ${date}.`
                ],
                alignment: 'justify', // Alinhamento justificado
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },


        ],

        // Estilos para o documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Art_299_Autonomia_Financeira_${dirigente}.pdf`);
}



function generateDeclaracaoNaoOcorrenciaImpedimentosPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const orgaoEmissor = document.getElementById('orgao').value; // O ID correto para o Órgão Expedidor
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const cargoDirigente = document.getElementById('cargoDirigente').value;
    const date = formatDate(); // Função já existente para formatar a data

    // Verificar se todos os campos estão preenchidos
    if (!dirigente || !cpf || !rg || !orgaoEmissor || !entidade || !cnpj || !municipio || !uf || !cargoDirigente) {
        alert("Por favor, preencha todos os campos antes de gerar o PDF.");
        return;
    }

    // Definindo o conteúdo do documento PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE NÃO OCORRÊNCIA DE IMPEDIMENTOS',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior para o título
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador(a) da carteira de identidade nº ${rg}, expedida pelo(a) ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ nº ${cnpj}, DECLARO para os devidos fins, nos termos do art. 26, caput inciso IX do Decreto nº 8.726 de 2016, que a presente Entidade e seus dirigentes não incorrem em quaisquer das vedações previstas no art. 39 da Lei nº 13.019 de 2014. Nesse sentido:\n\n`,
                    '1. Está regularmente constituída ou, se estrangeira, está autorizada a funcionar no território nacional;\n',
                    '2. Não está omissa no dever de prestar contas de parceria anteriormente celebrada;\n',
                    '3. Não teve contas de parceria julgadas irregulares ou rejeitadas por Tribunal ou Conselho de Contas de qualquer esfera da Federação em decisão irrecorrível nos últimos 8 (oito) anos.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior para o conteúdo principal
            },
            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },


        ],

        // Estilos do documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Nao_Ocorrencia_Impedimentos_${dirigente}.pdf`);
}



function generateDeclaracaoNaoRecebeRecursosPDF() {
// Coleta dos dados do formulário
const dirigente = document.getElementById('dirigente').value;
const cpf = document.getElementById('cpf').value;
const rg = document.getElementById('rg').value;
const orgaoEmissor = document.getElementById('orgao').value; // O ID correto para o Órgão Expedidor
const entidade = document.getElementById('entidade').value;
const cnpj = document.getElementById('cnpj').value;
const proposta = document.getElementById('proposta').value;
const objeto = document.getElementById('objeto').value;
const municipio = document.getElementById('municipio').value;
const uf = document.getElementById('uf').value;
const cargoDirigente = document.getElementById('cargoDirigente').value;
const date = formatDate(); // Função já existente para formatar a data

// Verificação de campos obrigatórios
if (!dirigente || !cpf || !rg || !orgaoEmissor || !entidade || !cnpj || !proposta || !objeto || !municipio || !uf || !cargoDirigente) {
alert("Por favor, preencha todos os campos obrigatórios antes de gerar o PDF.");
return;
}

// Definindo o conteúdo do documento PDF
var docDefinition = {
pageSize: 'A4', // Tamanho da página A4
pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

content: [
    // Título centralizado
    {
        text: 'DECLARAÇÃO',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 10] // Margem inferior para o título
    },
    {
        text: 'NÃO RECEBE RECURSOS PARA A MESMA FINALIDADE',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20] // Margem inferior entre o título e o corpo do texto
    },

    // Texto principal justificado
    {
        text: [
            `Eu, ${dirigente}, portador(a) da carteira de identidade nº ${rg}, expedida pelo(a) ${orgaoEmissor}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ nº ${cnpj}, DECLARO ao Ministério do Esporte - MESP que a entidade a qual represento apresentou informações para apreciação SOMENTE junto a esse órgão e em nenhum outro ente da administração pública, bem como não recebe recursos financeiros de outra entidade ou órgão (incluindo a Lei de Incentivo ao Esporte, a Lei Agnelo-Piva e/ou patrocínio de empresas estatais) para a mesma finalidade na execução das ações apresentadas e especificadas na Proposta N° ${proposta}/2024, cadastrada no Sistema Eletrônico Transferegov para ${objeto}, evitando desta forma a sobreposição de recursos.\n\n`
        ],
        alignment: 'justify', // Alinhamento justificado
        fontSize: 12,
        margin: [0, 0, 0, 40] // Margem inferior
    },

    // Local e data
    {
        text: `${municipio}/${uf}, na data da assinatura digital.`,
        alignment: 'left',
        fontSize: 12,
        margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
    },

],

// Estilos do documento
styles: {
    header: {
        fontSize: 14,
        bold: true
    },
    normalText: {
        fontSize: 12
    }
}
};

// Gerando o PDF
pdfMake.createPdf(docDefinition).download(`Declaracao_Nao_Recebe_Recursos_${dirigente}.pdf`);
}



function generateDeclaracaoComprovacaoExistenciaPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const rg = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cpf = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const proposta = document.getElementById('proposta').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const date = formatDate(); // Formata a data atual

    // Definindo o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE COMPROVAÇÃO DE EXISTÊNCIA,',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 5]
            },
            {
                text: 'EXPERIÊNCIA, INSTALAÇÕES',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob o nº ${cnpj}, ATESTO que a presente entidade existe há no mínimo 3 (três) anos e possui o cadastro ativo, bem como experiência prévia na realização com efetividade no desenvolvimento de Projetos e/ou Eventos de objeto de natureza semelhante, assim como instalações, condições materiais e capacidade técnica e operacional para o desenvolvimento do objeto apresentado na Proposta nº ${proposta}/2024.\n\n`
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],

        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Comprovacao_Existencia_${entidade}.pdf`);
}



function generateDeclaracaoCompromissoPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const rg = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cpf = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const date = formatDate(); // Formata a data atual

    // Definindo o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE COMPROMISSO',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ nº ${cnpj}, declaro o compromisso de:\n\n`,
                    `• Dispor dos recursos informatizados necessários ao acesso ao Sistema Eletrônico Transferegov, com o objetivo de alimentar, atualizar e acompanhar de forma permanente o referido sistema, de acordo com a norma vigente, durante todo o período da formalização da parceria até a prestação de contas final;\n`,
                    `• Dar publicidade ao Projeto/Programa, durante toda a execução, em observância à aplicação dos selos e marcas adotadas pelo Ministério do Esporte - MESP e Governo Federal, de acordo com o estipulado no Manual de selos e marcas do Governo Federal, inclusive, em ações de Patrocínio;\n`,
                    `• Previamente à confecção dos materiais, encaminhar para aprovação os layouts, juntamente com o número do instrumento, processo e nome do programa/projeto/evento, para o e-mail: publicidade.cgce@esporte.gov.br.\n\n`,
                    `Por ser expressão da verdade, firmo a presente declaração.`
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],

        styles: {
            header: {
                fontSize: 14,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Compromisso_${entidade}.pdf`);
}

function generateDeclaracaoComprovacaoExistenciaPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const rg = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cpf = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const proposta = document.getElementById('proposta').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const date = formatDate(); // Função para formatar a data

    // Definindo o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE COMPROVAÇÃO DE EXISTÊNCIA,',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            {
                text: 'EXPERIÊNCIA, INSTALAÇÕES',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob o nº ${cnpj}, ATESTO que a presente entidade existe há no mínimo 3 (três) anos e possui o cadastro ativo, bem como experiência prévia na realização com efetividade no desenvolvimento de Projetos e/ou Eventos de objeto de natureza semelhante. A entidade dispõe de instalações, condições materiais e capacidade técnica e operacional para o desenvolvimento do objeto apresentado na Proposta nº ${proposta}, e para o cumprimento das metas estabelecidas em atendimento aos dispostos no art. 90 inciso XI da Lei nº 14.791/2023 (LDO 2024), no art. 33 inciso V da Lei nº 13.019/2014 e no art. 26 incisos I, II e III do Decreto nº 8.726/2016, ou outras condições materiais para contratar ou adquirir com recursos da parceria em conformidade com o art. 26 inciso X do Decreto nº 8.726/2016.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],

        // Definindo estilos para o documento
        styles: {
            header: {
                fontSize: 14,
                bold: true
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Comprovacao_Existencia_${entidade}.pdf`);
}


function generateDeclaracaoCustosPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const rg = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cpf = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const proposta = document.getElementById('proposta').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const date = formatDate(); // Função para formatar a data

    // Definindo o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE CUSTOS',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, ATESTO a planilha de custos, bem como as cotações obtidas, conforme o art. 25 § 1º do Decreto n.º 8.726 de 27 de abril de 2016, inseridas no Sistema Eletrônico Transferegov Proposta n.º ${proposta}/2024.\n\n`,
                    'Ademais, DECLARO que os custos apresentados estão de acordo com os praticados no mercado.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],

        // Definindo estilos para o documento
        styles: {
            header: {
                fontSize: 16,
                bold: true
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Custos_${entidade}.pdf`);
}

function generateTermoCompromissoCoordenadorPDF() {
// Coleta dos dados do formulário relacionados ao Coordenador Geral
const coordenador = document.getElementById('nomeCoordenador').value;
const rgCoordenador = document.getElementById('rgCoordenador').value;
const cpfCoordenador = document.getElementById('cpfCoordenador').value;

// Verifica se todos os campos relacionados ao Coordenador Geral estão preenchidos
if (!coordenador || !rgCoordenador || !cpfCoordenador) {
// Se os campos estiverem vazios, não gera o PDF e apenas continua
console.log("Campos do Coordenador não foram preenchidos. PDF não gerado.");
return; // Sai da função e não gera o PDF
}

// Se todos os campos estiverem preenchidos, gera o PDF
const dirigente = document.getElementById('dirigente').value;
const rgDirigente = document.getElementById('rg').value;
const orgao = document.getElementById('orgao').value;
const cpfDirigente = document.getElementById('cpf').value;
const entidade = document.getElementById('entidade').value;
const cnpjEntidade = document.getElementById('cnpj').value;
const nomePrograma = document.getElementById('nomePrograma').value;
const municipio = document.getElementById('municipio').value;
const uf = document.getElementById('uf').value;
const date = formatDate(); // Função que formata a data atual

// Definindo o conteúdo do PDF
var docDefinition = {
pageSize: 'A4',
pageMargins: [40, 60, 40, 60],
content: [
    // Título centralizado
    {
        text: 'TERMO DE COMPROMISSO',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
    },

    // Texto principal justificado
    {
        text: [
            `Eu, ${dirigente}, portador da carteira de identidade nº ${rgDirigente}, expedida pelo ${orgao}, CPF nº ${cpfDirigente}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpjEntidade}, indico para a atribuição de Coordenador Geral do Programa ${nomePrograma} o servidor ${coordenador}, RG nº ${rgCoordenador}, CPF nº ${cpfCoordenador}, vinculado à esta Entidade como Coordenador Geral, possuindo a qualificação exigida para o desenvolvimento do Programa ${nomePrograma}, devidamente comprovada, com dedicação de 40 horas semanais junto ao Programa.\n\n`
        ],
        alignment: 'justify',
        fontSize: 12,
        margin: [0, 0, 0, 40]
    },

    // Local e data
    {
        text: `${municipio}/${uf}, na data da assinatura digital.`,
        alignment: 'left',
        fontSize: 12,
        margin: [0, 0, 0, 20]
    }
],

// Estilos do documento
styles: {
    header: {
        fontSize: 16,
        bold: true
    }
}
};

// Gerando o PDF
pdfMake.createPdf(docDefinition).download(`Termo_Compromisso_${coordenador}.pdf`);
}

function generateDeclaracaoAdimplenciaPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const rg = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cpf = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const date = formatDate(); // Função para formatar a data

    // Definindo o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE ADIMPLÊNCIA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, DECLARO, no uso das atribuições que me foram delegadas e sob as penas da lei, que a presente Entidade:\n\n`,
                    `Não está inadimplente com a União, inclusive no que tange às contribuições de que tratam os artigos 195 e 239 da Constituição Federal (contribuições dos empregados para a seguridade social, contribuições para o PIS/PASEP e contribuições para o FGTS), com relação a recursos anteriormente recebidos da Administração Pública Federal por meio de convênios, contratos, acordos, ajustes, subvenções sociais, contribuições, auxílios e similares.\n\n`
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Adimplencia_${entidade}.pdf`);
}


function generateDeclaracaoCienciaDeveresResponsabilidadesPDF() {
    // Coleta dos dados do formulário
    const dirigente = document.getElementById('dirigente').value;
    const rgDirigente = document.getElementById('rg').value;
    const orgao = document.getElementById('orgao').value;
    const cpfDirigente = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpjEntidade = document.getElementById('cnpj').value;
    const termoFomento = document.getElementById('proposta').value;
    const municipio = document.getElementById('municipio').value;
    const uf = document.getElementById('uf').value;
    const date = formatDate(); // Função para formatar a data

    // Definindo o conteúdo do PDF
    var docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE CIÊNCIA DOS DEVERES E RESPONSABILIDADES',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            {
                text: 'IMPOSTOS PELA LEGISLAÇÃO ELEITORAL',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            // Texto principal
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${rgDirigente}, expedida pelo ${orgao}, inscrito no CPF sob nº ${cpfDirigente}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob nº ${cnpjEntidade}, DECLARO, sob as penas da lei e passível de devolução dos recursos do Termo de Fomento nº ${termoFomento}/2024:\n\n`,
                    '1. Estar ciente das condutas vedadas aos agentes públicos durante o período do defeso eleitoral, de acordo com o art. 73 da Lei nº 9.504 de 1997;\n',
                    '2. Estar ciente de que as condutas vedadas dispensam comprovação de dolo ou culpa, sendo cláusulas de responsabilidade objetiva;\n',
                    '3. Que a presente Entidade não possui dentro do quadro de dirigentes candidatos ao pleito eleitoral de 2024;\n',
                    `4. Que não será permitido no âmbito do Termo de Fomento nº ${termoFomento}/2024 a distribuição de brindes ou outros bens que possam proporcionar vantagem ao eleitor durante o período de campanha eleitoral;\n`,
                    `5. Que não será permitido o uso promocional em favor de candidatos, partidos políticos ou coligações de bens e serviços custeados pelo Termo de Fomento nº ${termoFomento}/2024;\n`,
                    '6. Que não será permitida qualquer promoção pessoal ou condutas que afetem a igualdade de oportunidades entre candidatos nos pleitos eleitorais;\n',
                    '7. Que não será realizada publicidade institucional de atos, programas, obras, serviços e campanhas dos órgãos públicos federais;\n',
                    '8. Estar ciente do inteiro teor da Cartilha de Condutas Vedadas aos Agentes Públicos Federais em Eleições, disponível no site do governo.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40]
            },

            // Local e data
            {
                text: `${municipio}, na data da assinatura digital.`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20]
            }
        ],

        // Estilos do documento
        styles: {
            header: {
                fontSize: 16,
                bold: true
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Declaracao_Ciencia_Deveres_Responsabilidades_${entidade}.pdf`);
}


// Função para gerar múltiplos PDFs
function generateAllPDFs() {
    return new Promise((resolve, reject) => {
      try {
        // Executa todas as funções de geração de PDFs com delays
        setTimeout(generateAtestadoPDF, 0);
        setTimeout(generateDeclaracaoNaoUtilizacaoRecursosPDF, 100);
        setTimeout(generateDeclaracaoLeiPDF, 200);
        setTimeout(generateDeclaracaoAusenciaRecursosPDF, 300);
        setTimeout(generateDeclaracaoCumprimentoArt90PDF, 400);
        setTimeout(generateDeclaracaoNaoContratacaoRecursosParceriaPDF, 500);
        setTimeout(generateDeclaracaoArt299AutonomiaFinanceiraPDF, 600);
        setTimeout(generateDeclaracaoNaoOcorrenciaImpedimentosPDF, 700);
        setTimeout(generateDeclaracaoNaoRecebeRecursosPDF, 800);
        setTimeout(generateDeclaracaoComprovacaoExistenciaPDF, 900);
        setTimeout(generateDeclaracaoCompromissoPDF, 1000);
        setTimeout(generateDeclaracaoComprovacaoExistenciaPDF, 1100);
        setTimeout(generateDeclaracaoCustosPDF, 1200);
        setTimeout(generateTermoCompromissoCoordenadorPDF, 1300);
        setTimeout(generateDeclaracaoAdimplenciaPDF, 1400);
        setTimeout(generateDeclaracaoCienciaDeveresResponsabilidadesPDF, 1500);
  
        // Simulação de tempo para garantir que todos os PDFs foram gerados.
        // Aqui você pode ajustar conforme o tempo real de geração.
        setTimeout(() => {
          resolve(); // Tudo concluído com sucesso após a execução de todas as funções
        }, 1600); // Tempo maior que o último timeout para garantir que todas funções terminaram
      } catch (error) {
        reject(error); // Lida com erros, se houverem
      }
    });
  }