// Função para formatar a data no formato dd/mm/yyyy
function formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}
function generateAtestadoPDF(dirigente, cpf, cnpj, entidade, endereco, proposta, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'ATESTADO DE CAPACIDADE TÉCNICA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior após o título
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${document.getElementById('dirigente').value}, CPF Nº ${document.getElementById('cpf').value}, ATESTO para fins de formalização de Termo de Fomento no âmbito do Ministério do Esporte - MESP que o(a) ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, situado(a) no(a) ${document.getElementById('endereco').value}, possui capacidade técnica e operacional para executar o objeto apresentado na Proposta nº ${document.getElementById('proposta').value}/2024, em atendimento ao art. 33 inciso V da Lei 13.019 de 2014 e art. 90 inciso XI da Lei nº 14.791 de 29 de dezembro de 2023 (LDO 2024), considerando as experiências adquiridas na execução de projeto(s)/ação(es) na(s) área(s) esportivo/educacional/social, bem como a qualificação profissional do seu quadro pessoal, e a comprovação de que dispõe de estruturas físicas conforme anexo.\n\n`,
                    'O(s) projeto(s)/ação(es) descrito(s) foi(ram) executado(s) com qualidade, não existindo até a presente data fatos que desabonem a conduta e a responsabilidade da entidade com as obrigações assumidas, confirmando assim a capacidade técnica e operacional para a execução do que foi proposto.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior após o texto principal
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },

            // Anexo (inserido em uma nova página)
            {
                text: 'ANEXO',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Título do anexo
            },
            {
                text: [
                    'HISTÓRICO\n\n',
                    'I. Apresentação:\n',
                    'Nome do projeto/ação:\n',
                    'Entidades Parceiras:\n',
                    'Data de início e término da execução: (Apresentar comprovantes de experiência prévia na realização do objeto da parceria ou de objeto de natureza semelhante de no mínimo um ano de capacidade técnica e operacional.)\n',
                    'Número de Beneficiados:\n',
                    'Ações/Atividades desenvolvidas: (Descrever as atividades desenvolvidas, recursos humanos envolvidos, objetivo geral e resultados alcançados)\n',
                    'Estruturas Físicas onde foram desenvolvidas as atividades:\n',
                    'Qualificação profissional do seu quadro pessoal:\n\n',
                    'Documentos Comprobatórios a serem encaminhados em anexo:\n',
                    'a) fotos;\n',
                    'b) materiais de divulgação (folders, cartazes, etc);\n',
                    'c) matérias vinculadas na mídia (jornal, revistas, etc);\n',
                    'd) cópia de instrumento específico (contratos, convênios, termos de parceria, etc).\n'
                ],
                alignment: 'justify',
                fontSize: 12
            }
        ],

        // Estilos do documento
        styles: {
            header: {
                fontSize: 16,
                bold: true
            },
            normalText: {
                fontSize: 12
            }
        },

        // Opção de nova página para o anexo
        defaultStyle: {
            pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
                return currentNode.text === 'ANEXO';
            }
        }
    };

    // Gerando o PDF
    pdfMake.createPdf(docDefinition).download(`Atestado_Capacidade_Tecnica_${dirigente}.pdf`);
}

function generateDeclaracaoNaoUtilizacaoRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Define o tamanho da página
        pageMargins: [40, 60, 40, 60], // Define as margens [left, top, right, bottom]
        
        content: [
            // Título centralizado
            { 
                text: 'DECLARAÇÃO DE NÃO UTILIZAÇÃO DE RECURSOS', 
                style: 'header',
                alignment: 'center', // Centraliza o texto
                margin: [0, 0, 0, 20] // Adiciona espaçamento abaixo do título
            },

            // Corpo do texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${cdocument.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, declaro para os devidos fins de celebração de Termo de Fomento no âmbito do Ministério do Esporte - MESP que a presente Entidade não utilizará os recursos para finalidade alheia ao objeto da parceria.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Texto justificado
                fontSize: 12, // Tamanho da fonte
                margin: [0, 0, 0, 20] // Adiciona espaçamento abaixo do parágrafo
            },

            // Rodapé com local, data e assinatura
           // Local e data
           {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Nao_Utilizacao_Recursos_${dirigente}.pdf`);
}



function generateDeclaracaoLeiPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, date) {
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
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, declaro para os devidos fins, nos termos do art. 26 caput inciso VII e art. 27 do Decreto nº 8.726 de 2016 e do art. 39 incisos III ao VII da Lei nº 13.019 de 2014, que os dirigentes abaixo relacionados não incorrem em qualquer das vedações previstas em lei.\n\n`,
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
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },

            // Assinatura e nome do dirigente
            {
                text: '_____________________________________',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Pequena margem inferior
            },
            {
                text: `${dirigente}`,
                alignment: 'center',
                margin: [0, 0, 0, 5] // Pequena margem inferior
            },
            {
                text: 'Representante Legal',
                alignment: 'center',
                margin: [0, 0, 0, 0]
            }
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Lei_8726_13019_${dirigente}.pdf`);
}
function generateDeclaracaoAusenciaRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, date) {
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
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, declaro que os recursos do presente Termo de Fomento não se destinarão ao pagamento de despesas com pessoal ativo, inativo ou pensionista dos Estados, do Distrito Federal e Municípios, conforme o art. 167 inciso X da Constituição Federal de 1988 e o art. 25 § 1º inciso III da Lei Complementar nº 101/2000.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Alinhamento justificado do texto principal
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior para separar o texto da assinatura
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },
            // Assinatura centralizada
            {
                text: '_____________________________________',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Pequena margem inferior
            },
            {
                text: `${dirigente}`,
                alignment: 'center',
                margin: [0, 0, 0, 5] // Pequena margem inferior entre a linha e o nome
            },
            {
                text: 'Representante Legal',
                alignment: 'center',
                margin: [0, 0, 0, 0] // Sem margem inferior
            }
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
function generateDeclaracaoCumprimentoArt90PDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, date) {
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
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, declaro para os devidos fins que a presente Entidade cumprirá com o disposto no art. 90, incisos IV e VIII da Lei nº 14.791 de 29 de dezembro de 2023:\n\n`,
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
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },
            // Assinatura centralizada
            {
                text: '_____________________________________',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior para a linha de assinatura
            },
            {
                text: `${dirigente}`,
                alignment: 'center',
                margin: [0, 0, 0, 5] // Pequena margem entre a linha e o nome
            },
            {
                text: 'Representante Legal',
                alignment: 'center',
                margin: [0, 0, 0, 0] // Sem margem inferior
            }
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
function generateDeclaracaoNaoContratacaoRecursosParceriaPDF(dirigente, cargoDirigente, cpf, cnpj, entidade, rg, orgaoEmissor, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]
        
        content: [
            // Título centralizado em duas linhas
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
                    `Eu, ${document.getElementById('dirigente').value}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${ document.getElementById('cpf').value}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, declaro para os devidos fins de celebração de Termo de Fomento no âmbito do Ministério do Esporte - MESP que a presente Entidade não contratará com recursos da presente parceria:\n\n`,
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
                text: `${document.getElementById('municipio').value}, na data da assinatura digital.`,
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Nao_Contratacao_Recursos_Parceria_${dirigente}.pdf`);
}




function generateDeclaracaoArt299AutonomiaFinanceiraPDF(dirigente, cargoDirigente, cpf, rg, orgao, cnpj, entidade, sede, municipio, uf, contador, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            { 
                text: 'DECLARAÇÃO ART. 299 CÓDIGO PENAL E AUTONOMIA FINANCEIRA', 
                style: 'header', 
                alignment: 'center', 
                margin: [0, 0, 0, 20] // Margem inferior para o título
            },

            // Texto principal justificado
            {
                text: [
                    `A ${document.getElementById('entidade').value}, pessoa jurídica de direito privado, na forma de associação sem fins lucrativos, com sede na ${document.getElementById('sede').value}, inscrita no CNPJ nº ${document.getElementById('cnpj').value}, neste ato representada por ${document.getElementById('dirigente').value}, brasileiro(a), ${document.getElementById('cargoDirigente').value}, portador(a) do RG nº ${document.getElementById('rg').value}, expedido(a) pelo(a) ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, declara para fins de cadastramento e celebração do presente Termo de Fomento junto ao Ministério do Esporte - MESP, que a ${document.getElementById('entidade').value} é uma entidade viável e autônoma financeiramente, e que, de acordo com as demonstrações contábeis regularmente escrituradas, sob pena do art. 299 do Código Penal:\n\n`,
                    '- Compromete-se em manter a escrituração completa de suas receitas e despesas em livros revestidos das formalidades que assegurem a respectiva exatidão, de acordo com a legislação e normas editadas pelo Conselho Federal de Contabilidade;\n',
                    '- Compromete-se a conservar em boa ordem, pelo prazo de cinco anos contado da data da emissão, os documentos que comprovem a origem de suas receitas e a efetivação de suas despesas, bem como a realização de quaisquer outros atos ou operações que venham modificar a sua situação patrimonial;\n',
                    '- Apresentar à Secretaria da Receita Federal do Brasil, anualmente, Declaração de Rendimentos, em conformidade com o disposto em ato daquele órgão, sem prejuízo da exigência de apresentação da cópia do respectivo recibo de entrega da referida Declaração de Rendimentos.\n\n',
                    `${document.getElementById('municipio').value}/${document.getElementById('uf').value}, ${date}.`
                ],
                alignment: 'justify', // Alinhamento justificado
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Assinatura e rodapé centralizados
            {
                text: '_____________________________________',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior para a linha de assinatura
            },
            {
                text: 'Nome do Responsável da Entidade Proponente',
                alignment: 'center',
                margin: [0, 0, 0, 5] // Pequena margem inferior entre a linha e o nome
            },
            {
                text: `(${cargoDirigente})`,
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Assinatura do contador
            {
                text: '_____________________________________',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior para a linha de assinatura
            },
            {
                text: 'Nome do Contador',
                alignment: 'center',
                margin: [0, 0, 0, 0] // Sem margem inferior
            }
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Art_299_Autonomia_Financeira_${dirigente}.pdf`);
}


function generateDeclaracaoNaoOcorrenciaImpedimentosPDF(dirigente, cpf, rg, orgaoEmissor, cnpj, entidade, cargoDirigente, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

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
                    `Eu, ${document.getElementById('dirigente').value}, portador(a) da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo(a) ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrita no CNPJ nº ${document.getElementById('cnpj').value}, DECLARO para os devidos fins, nos termos do art. 26, caput inciso IX do Decreto nº 8.726 de 2016, que a presente Entidade e seus dirigentes não incorrem em quaisquer das vedações previstas no art. 39 da Lei nº 13.019 de 2014. Nesse sentido:\n\n`,
                    '1. Está regularmente constituída ou, se estrangeira, está autorizada a funcionar no território nacional;\n',
                    '2. Não está omissa no dever de prestar contas de parceria anteriormente celebrada;\n',
                    '3. Não teve contas de parceria julgadas irregulares ou rejeitadas por Tribunal ou Conselho de Contas de qualquer esfera da Federação em decisão irrecorrível nos últimos 8 (oito) anos.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify', // Alinhamento justificado
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

           // Local e data
           {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
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

function generateDeclaracaoNaoRecebeRecursosPDF(dirigente, cpf, rg, orgaoEmissor, cnpj, entidade, proposta, objeto, municipio, uf, date, cargoDirigente) {
    // Definindo o conteúdo do documento
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
                    `Eu, ${document.getElementById('dirigente').value}, portador(a) da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo(a) ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrita no CNPJ nº ${document.getElementById('cnpj').value}, DECLARO ao Ministério do Esporte - MESP que a entidade a qual represento apresentou informações para apreciação SOMENTE junto a esse órgão e em nenhum outro ente da administração pública, bem como não recebe recursos financeiros de outra entidade ou órgão (incluindo a Lei de Incentivo ao Esporte, a Lei Agnelo-Piva e/ou patrocínio de empresas estatais) para a mesma finalidade na execução das ações apresentadas e especificadas na Proposta N° ${document.getElementById('proposta').value}, cadastrada no Sistema Eletrônico Transferegov para ${document.getElementById('objeto').value}, evitando desta forma a sobreposição de recursos.\n\n`
                ],
                alignment: 'justify', // Alinhamento justificado
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
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



function generateDeclaracaoComprovacaoExistenciaPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página A4
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado em duas linhas
            { 
                text: 'DECLARAÇÃO DE COMPROVAÇÃO DE EXISTÊNCIA,', 
                style: 'header', 
                alignment: 'center', 
                margin: [0, 0, 0, 5] // Margem inferior
            },
            {
                text: 'EXPERIÊNCIA, INSTALAÇÕES',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior entre o título e o corpo do texto
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}/${document.getElementById('uf').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrita no CNPJ sob o nº ${document.getElementById('cnpj').value}, ATESTO que a presente entidade existe há no mínimo 3 (três) anos e possui o cadastro ativo, bem como experiência prévia na realização com efetividade no desenvolvimento de Projetos e/ou Eventos de objeto de natureza semelhante, assim como instalações, condições materiais e capacidade técnica e operacional para o desenvolvimento do objeto apresentado na Proposta nº ${document.getElementById('proposta').value} e para o cumprimento das metas estabelecidas em atendimento aos dispostos no art. 90 inciso XI da Lei nº 14.791/2023 (LDO 2024), no art. 33 inciso V da Lei nº 13.019/2014 e no art. 26 incisos I, II e III do Decreto nº 8.726/2016 ou outras condições materiais para contratar ou adquirir com recursos da parceria em conformidade com o art. 26 inciso X do Decreto nº 8.726/2016.\n\n`
                ],
                alignment: 'justify', // Alinhamento justificado
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Comprovacao_Existencia_${entidade}.pdf`);
}

function generateDeclaracaoCompromissoPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            { 
                text: 'DECLARAÇÃO DE COMPROMISSO', 
                style: 'header', 
                alignment: 'center', 
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${document.getElementById('dirigente').value}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}/${document.getElementById('uf').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal do(a) ${document.getElementById('entidade').value}, inscrito(a) no CNPJ nº ${document.getElementById('cnpj').value}, declaro o compromisso de:\n\n`,
                    `• Dispor dos recursos informatizados necessários ao acesso ao Sistema Eletrônico Transferegov, com o objetivo de alimentar, atualizar e acompanhar de forma permanente o referido sistema, de acordo com a norma vigente, durante todo o período da formalização da parceria até a prestação de contas final;\n`,
                    `• Dar publicidade ao Projeto/Programa, durante toda a execução, em observância à aplicação dos selos e marcas adotadas pelo Ministério do Esporte - MESP e Governo Federal, de acordo com o estipulado no Manual de selos e marcas do Governo Federal, inclusive, em ações de Patrocínio;\n`,
                    `• Previamente à confecção dos materiais, encaminhar para aprovação os layouts, juntamente com o número do instrumento, processo e nome do programa/projeto/evento, para o e-mail: publicidade.cgce@esporte.gov.br.\n\n`,
                    `Por ser expressão da verdade, firmo a presente declaração.`
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Compromisso_${entidade}.pdf`);
}


function generateDeclaracaoComprovacaoExistenciaPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado em duas linhas
            {
                text: 'DECLARAÇÃO DE COMPROVAÇÃO DE EXISTÊNCIA,',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior
            },
            {
                text: 'EXPERIÊNCIA, INSTALAÇÕES',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${document.getElementById('dirigente').value}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}/${document.getElementById('uf').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal da ${document.getElementById('entidade').value}, inscrita no CNPJ sob o nº ${document.getElementById('cnpj').value}, ATESTO que a presente entidade existe há no mínimo 3 (três) anos e possui o cadastro ativo, bem como experiência prévia na realização com efetividade no desenvolvimento de Projetos e/ou Eventos de objeto de natureza semelhante. A entidade dispõe de instalações, condições materiais e capacidade técnica e operacional para o desenvolvimento do objeto apresentado na Proposta nº ${document.getElementById('proposta').value}, e para o cumprimento das metas estabelecidas em atendimento aos dispostos no art. 90 inciso XI da Lei nº 14.791/2023 (LDO 2024), no art. 33 inciso V da Lei nº 13.019/2014 e no art. 26 incisos I, II e III do Decreto nº 8.726/2016, ou outras condições materiais para contratar ou adquirir com recursos da parceria em conformidade com o art. 26 inciso X do Decreto nº 8.726/2016.\n\n`,
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Comprovacao_Existencia_${entidade}.pdf`);
}


function generateDeclaracaoCustosPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE CUSTOS',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${document.getElementById('dirigente').value}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal do(a) ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, ATESTO a planilha de custos, bem como as cotações obtidas, conforme o art. 25 § 1º do Decreto n.º 8.726 de 27 de abril de 2016, inseridas no Sistema Eletrônico Transferegov Proposta n.º ${document.getElementById('proposta').value}.\n\n`,
                    'Ademais, DECLARO que os custos apresentados estão de acordo com os praticados no mercado.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior após o texto
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },

        ],

        // Estilos do documento
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Custos_${entidade}.pdf`);
}
function generateTermoCompromissoCoordenadorPDF(dirigente, rgDirigente, orgaoDirigente, cpfDirigente, entidade, cnpjEntidade, nomePrograma, coordenador, rgCoordenador, cpfCoordenador, cargoCoordenador, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'TERMO DE COMPROMISSO',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${dirigente}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal do(a) ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, indico para a atribuição de Coordenador Geral do Programa ${document.getElementById('nomePrograma').value} o servidor ${document.getElementById('coordenador').value}, RG nº ${document.getElementById('rgCoordenador').value}, CPF nº ${document.getElementById('cpfCoordenador').value}, vinculado à esta Entidade como ${document.getElementById('cargoCoordenador').value}, possuindo a qualificação exigida para o desenvolvimento do Programa ${document.getElementById('nomePrograma').value}, devidamente comprovada, com dedicação de 40 horas semanais junto ao Programa.\n\n`
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior após o texto
            },

           // Local e data
           {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },
        ],

        // Estilos do documento
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
    pdfMake.createPdf(docDefinition).download(`Termo_Compromisso_Coordenador_${coordenador}.pdf`);
}
function generateDeclaracaoAdimplenciaPDF(dirigente, rg, orgao, cpf, entidade, cnpj, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE ADIMPLÊNCIA',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${document.getElementById('dirigente').value}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${document.getElementById('orgaoEmissor').value}, CPF nº ${document.getElementById('cpf').value}, na condição de representante legal do(a) ${document.getElementById('entidade').value}, inscrito(a) no CNPJ sob o nº ${document.getElementById('cnpj').value}, DECLARO, no uso das atribuições que me foram delegadas e sob as penas da lei, que a presente Entidade:\n\n`,
                    `Não está inadimplente com a União, inclusive no que tange às contribuições de que tratam os artigos 195 e 239 da Constituição Federal (contribuições dos empregados para a seguridade social, contribuições para o PIS/PASEP e contribuições para o FGTS), com relação a recursos anteriormente recebidos da Administração Pública Federal por meio de convênios, contratos, acordos, ajustes, subvenções sociais, contribuições, auxílios e similares.\n\n`
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior após o texto
            },

             // Local e data
             {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },

        ],

        // Estilos do documento
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
function generateDeclaracaoCienciaDeveresResponsabilidadesPDF(dirigente, rgDirigente, orgaoDirigente, cpfDirigente, entidade, cnpjEntidade, termoFomento, municipio, uf, date) {
    // Definindo o conteúdo do documento
    var docDefinition = {
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens [esquerda, topo, direita, baixo]

        content: [
            // Título centralizado
            {
                text: 'DECLARAÇÃO DE CIÊNCIA DOS DEVERES E RESPONSABILIDADES',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 10] // Margem inferior
            },
            {
                text: 'IMPOSTOS PELA LEGISLAÇÃO ELEITORAL',
                style: 'header',
                alignment: 'center',
                margin: [0, 0, 0, 20] // Margem inferior
            },

            // Texto principal justificado
            {
                text: [
                    `Eu, ${ document.getElementById('dirigente').value}, portador da carteira de identidade nº ${document.getElementById('rg').value}, expedida pelo ${orgaoEmissor}, inscrito no CPF sob nº ${document.getElementById('cpf').value}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob nº ${cnpjEntidade}, DECLARO, sob as penas da lei e passível de devolução dos recursos do Termo de Fomento nº ${termoFomento}/2024:\n\n`,
                    '1. Estar ciente das condutas vedadas aos agentes públicos durante o período do defeso eleitoral, de acordo com o art. 73 da Lei nº 9.504 de 1997;\n',
                    '2. Estar ciente de que as condutas vedadas dispensam comprovação de dolo ou culpa, sendo cláusulas de responsabilidade objetiva;\n',
                    '3. Que a presente Entidade não possui dentro do quadro de dirigentes candidatos ao pleito eleitoral de 2024;\n',
                    '4. Que não será permitido no âmbito do Termo de Fomento nº ' + document.getElementById('proposta').value + '/2024 a distribuição de brindes ou outros bens que possam proporcionar vantagem ao eleitor durante o período de campanha eleitoral;\n',
                    '5. Que não será permitido o uso promocional em favor de candidatos, partidos políticos ou coligações de bens e serviços custeados pelo Termo de Fomento nº ' + document.getElementById('proposta').value + '/2024;\n',
                    '6. Que não será permitida qualquer promoção pessoal ou condutas que afetem a igualdade de oportunidades entre candidatos nos pleitos eleitorais;\n',
                    '7. Que não será realizada publicidade institucional de atos, programas, obras, serviços e campanhas dos órgãos públicos federais;\n',
                    '8. Estar ciente do inteiro teor da Cartilha de Condutas Vedadas aos Agentes Públicos Federais em Eleições, disponível no site do governo.\n\n',
                    'Por ser expressão da verdade, firmo a presente declaração.'
                ],
                alignment: 'justify',
                fontSize: 12,
                margin: [0, 0, 0, 40] // Margem inferior após o texto
            },

            // Local e data
            {
                text: `${document.getElementById('municipio').value}, na data da assinatura digital..`,
                alignment: 'left',
                fontSize: 12,
                margin: [0, 0, 0, 20] // Margem inferior antes da assinatura
            },

         
        ],

        // Estilos do documento
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
    pdfMake.createPdf(docDefinition).download(`Declaracao_Ciencia_Deveres_Responsabilidades_${entidade}.pdf`);
}


// Função para gerar PDFs de forma sequencial
function generateSequentialPDFs(data) {
    const {
        dirigente, cargoDirigente, cpf, rg, orgao, cnpj, entidade, endereco, proposta, contador,
        sede, municipio, uf, objeto, orgaoEmissor, today
    } = data;

    const delay = 1000; // Delay de 500ms entre os downloads

    // Cria uma fila para cada função
    setTimeout(function () {
        generateAtestadoPDF(dirigente, cpf, cnpj, entidade, endereco, proposta, today);
    }, delay);

    setTimeout(function () {
        generateDeclaracaoNaoUtilizacaoRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, today);
    }, delay * 2);

    setTimeout(function () {
        generateDeclaracaoLeiPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, today);
    }, delay * 3);

    setTimeout(function () {
        generateDeclaracaoAusenciaRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, today);
    }, delay * 4);

    setTimeout(function () {
        generateDeclaracaoCumprimentoArt90PDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, today);
    }, delay * 5);

    setTimeout(function () {
        generateDeclaracaoNaoContratacaoRecursosParceriaPDF(dirigente, cpf, cnpj, entidade, rg, orgaoEmissor, today);
    }, delay * 6);

    setTimeout(function () {
        generateDeclaracaoArt299AutonomiaFinanceiraPDF(dirigente, cargoDirigente, cpf, rg, orgaoEmissor, cnpj, entidade, sede, municipio, uf, contador, today);
    }, delay * 7);

    setTimeout(function () {
        generateDeclaracaoNaoOcorrenciaImpedimentosPDF(dirigente, cpf, rg, orgaoEmissor, cnpj, entidade, cargoDirigente, municipio, uf, today);
    }, delay * 8);

    setTimeout(function () {
        generateDeclaracaoNaoRecebeRecursosPDF(dirigente, cpf, rg, orgaoEmissor, cnpj, entidade, proposta, objeto, municipio, uf, today, cargoDirigente);
    }, delay * 9);

    setTimeout(function () {
        generateDeclaracaoCustosPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, today);
    }, delay * 10);

    setTimeout(function () {
        generateDeclaracaoComprovacaoExistenciaPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, today);
    }, delay * 11);

    setTimeout(function () {
        generateDeclaracaoCompromissoPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, municipio, today);
    }, delay * 12);

    setTimeout(function () {
        generateTermoCompromissoCoordenadorPDF(
            data.dirigente, data.rgDirigente, data.orgaoDirigente, data.cpfDirigente,
            data.entidade, data.cnpjEntidade, data.nomePrograma, data.coordenador,
            data.rgCoordenador, data.cpfCoordenador, data.cargoCoordenador,
            data.municipio, data.today
        );
    }, delay * 12);

    setTimeout(function () {
        generateDeclaracaoAdimplenciaPDF(dirigente, rg, orgao, cpf, entidade, cnpj, municipio, today);
    }, delay * 13);

    setTimeout(function () {
        generateDeclaracaoCienciaDeveresResponsabilidadesPDF(data.dirigente, data.rgDirigente, data.orgaoDirigente, data.cpfDirigente, data.entidade, data.cnpjEntidade, data.termoFomento, data.municipio, data.uf, data.today);
    }, delay * 14);


}

document.getElementById('declaracoesForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Certifique-se de que os IDs do formulário correspondem corretamente
    const data = {
        dirigente: document.getElementById('dirigente').value,
        cargoDirigente: document.getElementById('cargoDirigente').value,
        cpf: document.getElementById('cpf').value, // Certifique-se de que o ID está correto
        rg: document.getElementById('rg').value,
        orgao: document.getElementById('orgao').value,
        cnpj: document.getElementById('cnpj').value, // Consistência nos IDs
        entidade: document.getElementById('entidade').value,
        endereco: document.getElementById('endereco').value,
        proposta: document.getElementById('proposta').value,
        contador: document.getElementById('contador').value,
        sede: document.getElementById('sede').value,
        municipio: document.getElementById('municipio').value,
        uf: document.getElementById('uf').value,
        objeto: document.getElementById('objeto').value,
        orgaoEmissor: document.getElementById('orgaoEmissor').value,

        // Campos específicos do Termo de Compromisso Coordenador
        nomePrograma: document.getElementById('nomePrograma').value,
        coordenador: document.getElementById('coordenador').value,
        cpfCoordenador: document.getElementById('cpfCoordenador').value,
        rgCoordenador: document.getElementById('rgCoordenador').value,
        cargoCoordenador: document.getElementById('cargoCoordenador').value,

        today: formatDate()
    };

    // Chama a função para gerar PDFs em sequência
    generateSequentialPDFs(data);
});
