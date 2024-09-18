// Função para formatar a data no formato dd/mm/yyyy
function formatDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para gerar o PDF do Atestado de Capacidade Técnica com formatação oficial
function generateAtestadoPDF(dirigente, cpf, cnpj, entidade, endereco, proposta, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("ATESTADO DE CAPACIDADE TÉCNICA", pageWidth / 2, 40, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, CPF Nº ${cpf}, ATESTO para fins de formalização de Termo de Fomento no âmbito do Ministério do Esporte - MESP que o(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, situado(a) no(a) ${endereco}, possui capacidade técnica e operacional para executar o objeto apresentado na Proposta nº ${proposta}/2024, em atendimento ao art. 33 inciso V da Lei 13.019 de 2014 e art. 90 inciso XI da Lei nº 14.791 de 29 de dezembro de 2023 (LDO 2024), considerando as experiências adquiridas na execução de projeto(s)/ação(es) na(s) área(s) esportivo/educacional/social, bem como a qualificação profissional do seu quadro pessoal, e a comprovação de que dispõe de estruturas físicas conforme anexo.

O(s) projeto(s)/ação(es) descrito(s) foi(ram) executado(s) com qualidade, não existindo até a presente data fatos que desabonem a conduta e a responsabilidade da entidade com as obrigações assumidas, confirmando assim a capacidade técnica e operacional para a execução do que foi proposto.
`;

    // Alinhando o texto ao centro e justificado, com quebra automática
    doc.text(mainText, margin, 60, { maxWidth: contentWidth, align: "justify" });

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município, ${date}.`, margin, 220, { align: "left" });

    // Centralizando assinatura e nome do dirigente
    const signatureLine = "_____________________________________";
    const signatureY = 240;
    const nameY = 250;
    const roleY = 260;

    // Centralizando com base na largura da página
    doc.text(signatureLine, pageWidth / 2, signatureY, { align: "center" });
    doc.text(`${dirigente}`, pageWidth / 2, nameY, { align: "center" });
    doc.text("Representante Legal", pageWidth / 2, roleY, { align: "center" });

    // Página do anexo
    doc.addPage();
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("ANEXO", pageWidth / 2, 40, { align: "center" });

    // Conteúdo do anexo com espaçamento ajustado manualmente
    const anexoText = `
HISTÓRICO

I. Apresentação:
Nome do projeto/ação:
Entidades Parceiras:
Data de início e término da execução: (Apresentar comprovantes de experiência prévia na realização do objeto da parceria ou de objeto de natureza semelhante de no mínimo um ano de capacidade técnica e operacional.)
Número de Beneficiados:
Ações/Atividades desenvolvidas: (Descrever as atividades desenvolvidas, recursos humanos envolvidos, objetivo geral e resultados alcançados)
Estruturas Físicas onde foram desenvolvidas as atividades:
Qualificação profissional do seu quadro pessoal:

Documentos Comprobatórios a serem encaminhados em anexo:
a) fotos;
b) materiais de divulgação (folders, cartazes, etc);
c) matérias vinculadas na mídia (jornal, revistas, etc);
d) cópia de instrumento específico (contratos, convênios, termos de parceria, etc).
`;

    // Dividindo o texto do anexo em linhas para controle manual de espaçamento
    const anexoLines = doc.splitTextToSize(anexoText, contentWidth);

    // Ajustando espaçamento entre as linhas para parecer mais como um documento oficial
    let currentHeight = 60;
    const lineSpacing = 10;  // Espaçamento entre linhas ajustado manualmente

    anexoLines.forEach((line) => {
        doc.text(line, margin, currentHeight, { align: "justify" });
        currentHeight += lineSpacing;
    });

    // Salvando o PDF com nome dinâmico
    doc.save(`Atestado_Capacidade_Tecnica_${dirigente}.pdf`);
}

// Função para gerar o PDF da Declaração de Não Utilização de Recursos com formatação ajustada
function generateDeclaracaoNaoUtilizacaoRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgao, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE NÃO UTILIZAÇÃO DE RECURSOS", pageWidth / 2, 40, { align: "center" });

    // Texto principal justificado com divisão automática para evitar espaçamento excessivo
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins de celebração de Termo de Fomento no âmbito do Ministério do Esporte - MESP que a presente Entidade não utilizará os recursos para finalidade alheia ao objeto da parceria.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços
    const splitText = doc.splitTextToSize(mainText, contentWidth);
    doc.text(splitText, margin, 60);

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município, ${date}.`, margin, 190, { align: "left" });

    // Centralizando assinatura e nome do dirigente
    const signatureLine = "_____________________________________";
    const signatureY = 210; // Ajustando a assinatura mais para cima
    const nameY = 220; // Ajustando o nome mais próximo da assinatura
    const roleY = 230; // Ajustando o título abaixo do nome

    // Centralizando com base na largura da página
    doc.text(signatureLine, pageWidth / 2, signatureY, { align: "center" });
    doc.text(`${dirigente}`, pageWidth / 2, nameY, { align: "center" });
    doc.text("Representante Legal", pageWidth / 2, roleY, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Nao_Utilizacao_Recursos_${dirigente}.pdf`);
}



// Função para gerar o PDF da Declaração dos Arts. 26, 27 do Decreto 8.726 e 39 da Lei 13.019 com ajuste de texto
function generateDeclaracaoLeiPDF(dirigente, cpf, cnpj, entidade, rg, orgao, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado em duas linhas
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DOS ARTS. 26, 27 DO DECRETO Nº 8.726 DE 2016", pageWidth / 2, 20, { align: "center" });
    doc.text("E DO ART. 39 DA LEI Nº 13.019 DE 2014", pageWidth / 2, 30, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins, nos termos do art. 26 caput inciso VII e art. 27 do Decreto nº 8.726 de 2016 e do art. 39 incisos III ao VII da Lei nº 13.019 de 2014, que os dirigentes abaixo relacionados não incorrem em qualquer das vedações previstas em lei.

I - Não são membros de Poder ou do Ministério Público ou dirigentes de órgão ou entidade da Administração Pública Federal;
II – Não são cônjuges ou parentes de membros de Poder ou dirigentes de entidade da Administração Pública Federal;
III - Não contratarão com recursos da parceria para prestação de serviços servidor ou empregado público, inclusive comissionados ou parentes;
IV - Não serão remunerados a qualquer título com os recursos repassados membros do Ministério Público, dirigentes de órgãos públicos ou pessoas com condenações relativas a crimes contra a administração pública;
V – Não tiveram as contas rejeitadas pela Administração Pública nos últimos cinco anos;
VI – Não foram punidos com sanções de suspensão, declaração de inidoneidade ou qualquer outra sanção prevista em lei.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);
    doc.text(splitText, margin, 50);

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município, ${date}.`, margin, 250, { align: "left" });

    // Centralizando assinatura e nome do dirigente
    const signatureLine = "_____________________________________";
    const signatureY = 270;
    const nameY = 280;
    const roleY = 290;

    // Centralizando com base na largura da página
    doc.text(signatureLine, pageWidth / 2, signatureY, { align: "center" });
    doc.text(`${dirigente}`, pageWidth / 2, nameY, { align: "center" });
    doc.text("Representante Legal", pageWidth / 2, roleY, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Lei_8726_13019_${dirigente}.pdf`);
}


// Função para gerar o PDF da Declaração de Ausência de Destinação de Recursos com ajuste de texto
function generateDeclaracaoAusenciaRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgao, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE AUSÊNCIA DE DESTINAÇÃO DE RECURSOS", pageWidth / 2, 20, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro que os recursos do presente Termo de Fomento não se destinarão ao pagamento de despesas com pessoal ativo, inativo ou pensionista dos Estados, do Distrito Federal e Municípios, conforme o art. 167 inciso X da Constituição Federal de 1988 e o art. 25 § 1º inciso III da Lei Complementar nº 101/2000.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);
    doc.text(splitText, margin, 50);

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município, ${date}.`, margin, 120, { align: "left" });

    // Centralizando assinatura e nome do dirigente
    const signatureLine = "_____________________________________";
    const signatureY = 140;
    const nameY = 150;
    const roleY = 160;

    // Centralizando com base na largura da página
    doc.text(signatureLine, pageWidth / 2, signatureY, { align: "center" });
    doc.text(`${dirigente}`, pageWidth / 2, nameY, { align: "center" });
    doc.text("Representante Legal", pageWidth / 2, roleY, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Ausencia_Destinacao_Recursos_${dirigente}.pdf`);
}



// Função para gerar o PDF da Declaração de Cumprimento do Art. 90 da Lei nº 14.791-2023 com ajuste de texto
function generateDeclaracaoCumprimentoArt90PDF(dirigente, cpf, cnpj, entidade, rg, orgao, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado em duas linhas
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE CUMPRIMENTO DO ART. 90 DA", pageWidth / 2, 20, { align: "center" });
    doc.text("LEI Nº 14.791 DE 29 DE DEZEMBRO DE 2023", pageWidth / 2, 30, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins que a presente Entidade cumprirá com o disposto no art. 90, incisos IV e VIII da Lei nº 14.791 de 29 de dezembro de 2023:

1. Compromisso da entidade beneficiada de disponibilizar ao cidadão em seu sítio eletrônico ou, na falta deste, em sua sede, consulta ao extrato do convênio ou instrumento congênere que conterá, no mínimo, o objeto, a finalidade e o detalhamento da aplicação dos recursos;

2. A cláusula de reversão patrimonial válida até a depreciação integral do bem ou a amortização do investimento, constituindo garantia real em favor da concedente, em montante equivalente aos recursos de capital destinados à entidade, cuja execução ocorrerá caso se verifique desvio de finalidade ou aplicação irregular dos recursos.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);
    doc.text(splitText, margin, 50);

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município, ${date}.`, margin, 140, { align: "left" });

    // Centralizando assinatura e nome do dirigente
    const signatureLine = "_____________________________________";
    const signatureY = 160;
    const nameY = 170;
    const roleY = 180;

    // Centralizando com base na largura da página
    doc.text(signatureLine, pageWidth / 2, signatureY, { align: "center" });
    doc.text(`${dirigente}`, pageWidth / 2, nameY, { align: "center" });
    doc.text("Representante Legal", pageWidth / 2, roleY, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Cumprimento_Art_90_${dirigente}.pdf`);
}

// Função para gerar o PDF da Declaração de Não Contratação com Recursos da Parceria com formatação ajustada
function generateDeclaracaoNaoContratacaoRecursosParceriaPDF(dirigente, cargoDirigente, cpf, cnpj, entidade, rg, orgao, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado em duas linhas
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO", pageWidth / 2, 20, { align: "center" });
    doc.text("NÃO CONTRATAÇÃO COM RECURSOS DA PARCERIA", pageWidth / 2, 30, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, declaro para os devidos fins de celebração de Termo de Fomento no âmbito do Ministério do Esporte - MESP que a presente Entidade não contratará com recursos da presente parceria:

1. Empresas que sejam do mesmo grupo econômico;
2. Empresas que tenham participação societária cruzada;
3. Empresas pertencentes ou com participação societária de parentes de dirigentes ou funcionários da entidade;
4. Empresas que possuam o mesmo endereço, telefone e CNPJ.

As cotações relativas aos itens previstos no Plano de Trabalho também não apresentarão incompatibilidades quanto à situação cadastral dos fornecedores e à classificação de atividades econômicas (CNAE) em relação ao serviço ou fornecimento de material. Além disso, a Entidade se responsabilizará pela veracidade dos documentos apresentados referentes às pesquisas de preços junto aos fornecedores.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);

    // Calcular a altura do texto principal para evitar sobreposição
    let currentHeight = 50; // Posição inicial do texto principal
    doc.text(splitText, margin, currentHeight);

    // Adicionando espaço para a data, evitando sobreposição
    currentHeight += splitText.length * 10 + 10; // Ajuste com base no número de linhas do texto

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município, ${date}.`, pageWidth / 2, currentHeight, { align: "center" });

    // Ajustando posição dinâmica para assinatura e centralizando-a na página
    currentHeight += 10; // Move assinatura para cima
    const signatureLine = "_____________________________________";
    doc.text(signatureLine, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do nome do dirigente
    doc.text(`${dirigente}`, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do cargo
    doc.text(`${cargoDirigente}`, pageWidth / 2, currentHeight, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Nao_Contratacao_Recursos_Parceria_${dirigente}.pdf`);
}



// Função para gerar o PDF da Declaração sob pena do art. 299 e Autonomia Financeira com ajuste de formatação oficial
function generateDeclaracaoArt299AutonomiaFinanceiraPDF(dirigente, cargoDirigente, cpf, rg, orgao, cnpj, entidade, sede, municipio, uf, contador, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO ART. 299 CÓDIGO PENAL E AUTONOMIA FINANCEIRA", pageWidth / 2, 40, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
A ${entidade}, pessoa jurídica de direito privado, na forma de associação sem fins lucrativos, com sede na ${sede}, inscrita no CNPJ nº ${cnpj}, neste ato representada por ${dirigente}, brasileiro(a), ${cargoDirigente}, portador(a) do RG nº ${rg}, expedido(a) pelo(a) ${orgao}, CPF nº ${cpf}, declara para fins de cadastramento e celebração do presente Termo de Fomento junto ao Ministério do Esporte - MESP, que a ${entidade} é uma entidade viável e autônoma financeiramente, e que, de acordo com as demonstrações contábeis regularmente escrituradas, sob pena do art. 299 do Código Penal:

- Compromete-se em manter a escrituração completa de suas receitas e despesas em livros revestidos das formalidades que assegurem a respectiva exatidão, de acordo com a legislação e normas editadas pelo Conselho Federal de Contabilidade;
- Compromete-se a conservar em boa ordem, pelo prazo de cinco anos contado da data da emissão, os documentos que comprovem a origem de suas receitas e a efetivação de suas despesas, bem como a realização de quaisquer outros atos ou operações que venham modificar a sua situação patrimonial;
- Apresentar à Secretaria da Receita Federal do Brasil, anualmente, Declaração de Rendimentos, em conformidade com o disposto em ato daquele órgão, sem prejuízo da exigência de apresentação da cópia do respectivo recibo de entrega da referida Declaração de Rendimentos.

${municipio}/${uf}, ${date}.
`;

    // Dividindo o texto principal para ajustar automaticamente
    const splitText = doc.splitTextToSize(mainText, contentWidth);
    let currentHeight = 60; // Posição inicial do texto principal
    doc.text(splitText, margin, currentHeight);

    // Ajustando a altura do texto para centralizar as assinaturas
    currentHeight += splitText.length * 10 + 30;

    // Campo de assinatura
    const signatureLine = "_____________________________________";

    // Ajuste dinâmico para garantir que o campo de assinatura fique centralizado
    const signatureY = Math.min(pageHeight - 60, currentHeight + 20); // Limitar a posição da assinatura para não ficar muito abaixo

    // Assinatura do dirigente
    doc.text(signatureLine, pageWidth / 2, signatureY, { align: "center" });
    doc.text("Nome do Responsável da Entidade Proponente", pageWidth / 2, signatureY + 10, { align: "center" });
    doc.text(`(${cargoDirigente})`, pageWidth / 2, signatureY + 20, { align: "center" });

    // Assinatura do contador
    doc.text(signatureLine, pageWidth / 2, signatureY + 40, { align: "center" });
    doc.text("Nome do Contador", pageWidth / 2, signatureY + 50, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Art_299_Autonomia_Financeira_${dirigente}.pdf`);
}



// Função para gerar o PDF da Declaração de Não Ocorrência de Impedimentos com formatação oficial
function generateDeclaracaoNaoOcorrenciaImpedimentosPDF(dirigente, cpf, rg, orgao, cnpj, entidade, cargoDirigente, municipio, uf, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE NÃO OCORRÊNCIA DE IMPEDIMENTOS", pageWidth / 2, 40, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador(a) da carteira de identidade nº ${rg}, expedida pelo(a) ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ nº ${cnpj}, DECLARO para os devidos fins, nos termos do art. 26, caput inciso IX do Decreto nº 8.726 de 2016, que a presente Entidade e seus dirigentes não incorrem em quaisquer das vedações previstas no art. 39 da Lei nº 13.019 de 2014. Nesse sentido:

1. Está regularmente constituída ou, se estrangeira, está autorizada a funcionar no território nacional;
2. Não está omissa no dever de prestar contas de parceria anteriormente celebrada;
3. Não teve contas de parceria julgadas irregulares ou rejeitadas por Tribunal ou Conselho de Contas de qualquer esfera da Federação em decisão irrecorrível nos últimos 8 (oito) anos.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);

    // Calcular a altura do texto principal para evitar sobreposição
    let currentHeight = 60; // Posição inicial
    const textHeight = splitText.length * 10; // Multiplicamos pelo espaçamento entre linhas
    currentHeight += textHeight;

    doc.text(splitText, margin, 60);

    // Adicionando espaço para a assinatura, evitando sobreposição
    currentHeight += 20; // Adiciona espaço extra para o rodapé

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município ${municipio}, ${uf}, ${date}.`, pageWidth / 2, currentHeight, { align: "center" });

    // Ajustando posição dinâmica para assinatura e centralizando-a na página
    currentHeight += 30; // Move para evitar colisão com o rodapé
    const signatureLine = "_____________________________________";
    doc.text(signatureLine, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do nome do dirigente
    doc.text(`${dirigente}`, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do cargo
    doc.text(`(${cargoDirigente})`, pageWidth / 2, currentHeight, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Nao_Ocorrencia_Impedimentos_${dirigente}.pdf`);
}

// Função para gerar o PDF da Declaração de Não Recebe Recursos Para a Mesma Finalidade com formatação oficial
function generateDeclaracaoNaoRecebeRecursosPDF(dirigente, cpf, rg, orgao, cnpj, entidade, proposta, objeto, municipio, uf, date, cargoDirigente) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado em duas linhas
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO", pageWidth / 2, 20, { align: "center" });
    doc.text("NÃO RECEBE RECURSOS PARA A MESMA FINALIDADE", pageWidth / 2, 30, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador(a) da carteira de identidade nº ${rg}, expedida pelo(a) ${orgao}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ nº ${cnpj}, DECLARO ao Ministério do Esporte - MESP que a entidade a qual represento apresentou informações para apreciação SOMENTE junto a esse órgão e em nenhum outro ente da administração pública, bem como não recebe recursos financeiros de outra entidade ou órgão (incluindo a Lei de Incentivo ao Esporte, a Lei Agnelo-Piva e/ou patrocínio de empresas estatais) para a mesma finalidade na execução das ações apresentadas e especificadas na Proposta N° ${proposta}, cadastrada no Sistema Eletrônico Transferegov para ${objeto}, evitando desta forma a sobreposição de recursos.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);

    // Calcular a altura do texto principal para evitar sobreposição
    let currentHeight = 60; // Posição inicial
    const textHeight = splitText.length * 10; // Multiplicamos pelo espaçamento entre linhas
    currentHeight += textHeight;

    doc.text(splitText, margin, 60);

    // Adicionando espaço para a assinatura, evitando sobreposição
    currentHeight += 20; // Adiciona espaço extra para o rodapé

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município ${municipio}, ${uf}, ${date}.`, pageWidth / 2, currentHeight, { align: "center" });

    // Ajustando posição dinâmica para assinatura e centralizando-a na página
    currentHeight += 30; // Move para evitar colisão com o rodapé
    const signatureLine = "_____________________________________";
    doc.text(signatureLine, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do nome do dirigente
    doc.text(`${dirigente}`, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do cargo
    doc.text(`(${cargoDirigente})`, pageWidth / 2, currentHeight, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Nao_Recebe_Recursos_${dirigente}.pdf`);
}


// Função para gerar o PDF da Declaração de Comprovação de Existência, Experiência, Instalações com formatação oficial
function generateDeclaracaoComprovacaoExistenciaPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, uf, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado em duas linhas
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE COMPROVAÇÃO DE EXISTÊNCIA,", pageWidth / 2, 20, { align: "center" });
    doc.text("EXPERIÊNCIA, INSTALAÇÕES", pageWidth / 2, 30, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}/${uf}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob o nº ${cnpj}, ATESTO que a presente entidade existe há no mínimo 3 (três) anos e possui o cadastro ativo, bem como experiência prévia na realização com efetividade no desenvolvimento de Projetos e/ou Eventos de objeto de natureza semelhante, assim como instalações, condições materiais e capacidade técnica e operacional para o desenvolvimento do objeto apresentado na Proposta nº ${proposta} e para o cumprimento das metas estabelecidas em atendimento aos dispostos no art. 90 inciso XI da Lei nº 14.791/2023 (LDO 2024), no art. 33 inciso V da Lei nº 13.019/2014 e no art. 26 incisos I, II e III do Decreto nº 8.726/2016 ou outras condições materiais para contratar ou adquirir com recursos da parceria em conformidade com o art. 26 inciso X do Decreto nº 8.726/2016.
`;

    // Utilizando splitTextToSize para ajustar o texto automaticamente e evitar grandes espaços entre palavras
    const splitText = doc.splitTextToSize(mainText, contentWidth);

    // Calcular a altura do texto principal para evitar sobreposição
    let currentHeight = 50; // Posição inicial
    const textHeight = splitText.length * 10; // Multiplicamos pelo espaçamento entre linhas
    currentHeight += textHeight;

    doc.text(splitText, margin, 50);

    // Adicionando espaço para a assinatura, evitando sobreposição
    currentHeight += 20; // Adiciona espaço extra para o rodapé

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município ${municipio}, ${uf}, ${date}.`, pageWidth / 2, currentHeight, { align: "center" });

    // Ajustando posição dinâmica para assinatura e centralizando-a na página
    currentHeight += 30; // Move para evitar colisão com o rodapé
    const signatureLine = "_____________________________________";
    doc.text(signatureLine, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do nome do dirigente
    doc.text(`${dirigente}`, pageWidth / 2, currentHeight, { align: "center" });

    currentHeight += 10; // Move a linha do cargo
    doc.text("Representante Legal", pageWidth / 2, currentHeight, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Comprovacao_Existencia_${entidade}.pdf`);
}

// Função para gerar o PDF da Declaração de Compromisso com formatação oficial
function generateDeclaracaoCompromissoPDF(dirigente, rg, orgao, cpf, entidade, cnpj, municipio, uf, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Definindo o tamanho da página e margens
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Título centralizado
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DECLARAÇÃO DE COMPROMISSO", pageWidth / 2, 40, { align: "center" });

    // Texto principal justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}/${uf}, CPF nº ${cpf}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ nº ${cnpj}, declaro o compromisso de:

• Dispor dos recursos informatizados necessários ao acesso ao Sistema Eletrônico Transferegov, com o objetivo de alimentar, atualizar e acompanhar de forma permanente o referido sistema, de acordo com a norma vigente, durante todo o período da formalização da parceria até a prestação de contas final;
• Dar publicidade ao Projeto/Programa, durante toda a execução, em observância à aplicação dos selos e marcas adotadas pelo Ministério do Esporte - MESP e Governo Federal, de acordo com o estipulado no Manual de selos e marcas do Governo Federal, inclusive, em ações de Patrocínio;
• Previamente à confecção dos materiais, encaminhar para aprovação os layouts, juntamente com o número do instrumento, processo e nome do programa/projeto/evento, para o e-mail: publicidade.cgce@esporte.gov.br.

Por ser expressão da verdade, firmo a presente declaração.
`;

    // Ajustando o texto para caber corretamente na página e manter formatação oficial
    const splitText = doc.splitTextToSize(mainText, contentWidth);
    doc.text(splitText, margin, 60);

    // Rodapé com local, data e assinatura centralizados
    doc.setFontSize(12);
    doc.text(`Município ${municipio}, ${date}.`, pageWidth / 2, 200, { align: "center" });

    // Espaço para a assinatura, centralizado
    const signatureLineY = 220; // Ajustando a posição da assinatura para não sobrepor o texto
    doc.text("______________________________________________", pageWidth / 2, signatureLineY, { align: "center" });
    doc.text(`${dirigente}`, pageWidth / 2, signatureLineY + 10, { align: "center" });
    doc.text("CARGO", pageWidth / 2, signatureLineY + 20, { align: "center" });

    // Salvando o PDF com nome dinâmico
    doc.save(`Declaracao_Compromisso_${entidade}.pdf`);
}

// Função para gerar o PDF da Declaração de Comprovação de Existência, Experiência, Instalações
function generateDeclaracaoComprovacaoExistenciaPDF(dirigente, rg, orgaoEmissor, cpf, entidade, cnpj, proposta, municipio, uf, date) {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Definindo o tamanho da página e margens
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;
const contentWidth = pageWidth - 2 * margin;

// Título centralizado em duas linhas
doc.setFont("times", "bold");
doc.setFontSize(16);
doc.text("DECLARAÇÃO DE COMPROVAÇÃO DE EXISTÊNCIA,", pageWidth / 2, 20, { align: "center" });
doc.text("EXPERIÊNCIA, INSTALAÇÕES", pageWidth / 2, 30, { align: "center" });

// Texto principal justificado
doc.setFont("times", "normal");
doc.setFontSize(12);
doc.setLineHeightFactor(1.5);

const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgaoEmissor}/${uf}, CPF nº ${cpf}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob o nº ${cnpj}, ATESTO que a presente entidade existe há no mínimo 3 (três) anos e possui o cadastro ativo, bem como experiência prévia na realização com efetividade no desenvolvimento de Projetos e/ou Eventos de objeto de natureza semelhante. A entidade dispõe de instalações, condições materiais e capacidade técnica e operacional para o desenvolvimento do objeto apresentado na Proposta nº ${proposta}, e para o cumprimento das metas estabelecidas em atendimento aos dispostos no art. 90 inciso XI da Lei nº 14.791/2023 (LDO 2024), no art. 33 inciso V da Lei nº 13.019/2014 e no art. 26 incisos I, II e III do Decreto nº 8.726/2016, ou outras condições materiais para contratar ou adquirir com recursos da parceria em conformidade com o art. 26 inciso X do Decreto nº 8.726/2016.

Por ser expressão da verdade, firmo a presente declaração.
`;

// Utilizando splitTextToSize para ajustar o texto automaticamente
const splitText = doc.splitTextToSize(mainText, contentWidth);

// Posição inicial para o texto principal
doc.text(splitText, margin, 50);

// Data e Local centralizados
doc.setFontSize(12);
doc.text(`Município ${municipio}, ${uf}, ${date}.`, pageWidth / 2, 230, { align: "center" });

// Centralizando a assinatura
const signatureLineY = 250; // Ajustando a posição da assinatura
doc.text("________________________________________", pageWidth / 2, signatureLineY, { align: "center" });
doc.text(`${dirigente}`, pageWidth / 2, signatureLineY + 10, { align: "center" });
doc.text("Representante Legal", pageWidth / 2, signatureLineY + 20, { align: "center" });

// Salvar o PDF com nome dinâmico
doc.save(`Declaracao_Comprovacao_Existencia_${entidade}.pdf`);
}



// Função para gerar o PDF da Declaração de Custos
function generateDeclaracaoCustosPDF(dirigente, rg, orgao, cpf, entidade, cnpj, proposta, municipio, uf, date) {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Definindo o tamanho da página e margens
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;
const contentWidth = pageWidth - 2 * margin;

// Título centralizado
doc.setFont("times", "bold");
doc.setFontSize(16);
doc.text("DECLARAÇÃO DE CUSTOS", pageWidth / 2, 20, { align: "center" });

// Texto principal justificado
doc.setFont("times", "normal");
doc.setFontSize(12);
doc.setLineHeightFactor(1.5);

const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, ATESTO a planilha de custos, bem como as cotações obtidas, conforme o art. 25 § 1º do Decreto n.º 8.726 de 27 de abril de 2016, inseridas no Sistema Eletrônico Transferegov Proposta n.º ${proposta}.
Ademais, DECLARO que os custos apresentados estão de acordo com os praticados no mercado.

Por ser expressão da verdade, firmo a presente declaração.
`;

// Utilizando splitTextToSize para ajustar o texto automaticamente
const splitText = doc.splitTextToSize(mainText, contentWidth);

// Posição inicial para o texto principal
doc.text(splitText, margin, 50);

// Data e Local centralizados
doc.setFontSize(12);
doc.text(`Município ${municipio}, ${uf}, ${date}.`, pageWidth / 2, 140, { align: "center" });

// Centralizando a assinatura
const signatureLineY = 160; // Ajustando a posição da assinatura
doc.text("________________________________________", pageWidth / 2, signatureLineY, { align: "center" });
doc.text(`${dirigente}`, pageWidth / 2, signatureLineY + 10, { align: "center" });
doc.text("Representante Legal", pageWidth / 2, signatureLineY + 20, { align: "center" });

// Salvando o PDF com nome dinâmico
doc.save(`Declaracao_Custos_${entidade}.pdf`);
}

// Função para gerar o PDF do Termo de Compromisso Coordenador Geral
function generateTermoCompromissoCoordenadorPDF(dirigente, rgDirigente, orgaoDirigente, cpfDirigente, entidade, cnpjEntidade, nomePrograma, coordenador, rgCoordenador, cpfCoordenador, cargoCoordenador, municipio, uf, date) {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Definindo o tamanho da página e margens
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;
const contentWidth = pageWidth - 2 * margin;

// Título centralizado
doc.setFont("times", "bold");
doc.setFontSize(16);
doc.text("TERMO DE COMPROMISSO", pageWidth / 2, 20, { align: "center" });

// Texto principal justificado
doc.setFont("times", "normal");
doc.setFontSize(12);
doc.setLineHeightFactor(1.5);

const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rgDirigente}, expedida pelo ${orgaoDirigente}, CPF nº ${cpfDirigente}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpjEntidade}, indico para a atribuição de Coordenador Geral do Programa ${nomePrograma} o servidor ${coordenador}, RG nº ${rgCoordenador}, CPF nº ${cpfCoordenador}, vinculado à esta Entidade como ${cargoCoordenador}, possuindo a qualificação exigida para o desenvolvimento do Programa ${nomePrograma}, devidamente comprovada, com dedicação de 40 horas semanais junto ao Programa.
`;

// Utilizando splitTextToSize para ajustar o texto automaticamente
const splitText = doc.splitTextToSize(mainText, contentWidth);

// Posição inicial para o texto principal
doc.text(splitText, margin, 50);

// Local e data centralizados
doc.setFontSize(12);
doc.text(`Município ${municipio}/${uf}, ${date}.`, pageWidth / 2, 140, { align: "center" });

// Centralizando a assinatura
const signatureLineY = 160; // Ajustando a posição da assinatura
doc.text("________________________________________", pageWidth / 2, signatureLineY, { align: "center" });
doc.text(`${dirigente}`, pageWidth / 2, signatureLineY + 10, { align: "center" });
doc.text("Representante Legal", pageWidth / 2, signatureLineY + 20, { align: "center" });

// Salvando o PDF com nome dinâmico
doc.save(`Termo_Compromisso_Coordenador_${coordenador}.pdf`);
}

// Função para gerar o PDF da Declaração de Adimplência
function generateDeclaracaoAdimplenciaPDF(dirigente, rg, orgao, cpf, entidade, cnpj, municipio, uf, date) {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Definindo o tamanho da página e margens
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;
const contentWidth = pageWidth - 2 * margin;

// Título centralizado
doc.setFont("times", "bold");
doc.setFontSize(16);
doc.text("DECLARAÇÃO DE ADIMPLÊNCIA", pageWidth / 2, 20, { align: "center" });

// Texto principal justificado
doc.setFont("times", "normal");
doc.setFontSize(12);
doc.setLineHeightFactor(1.5);

const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rg}, expedida pelo ${orgao}, CPF nº ${cpf}, na condição de representante legal do(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, DECLARO, no uso das atribuições que me foram delegadas e sob as penas da lei, que a presente Entidade:

Não está inadimplente com a União, inclusive no que tange às contribuições de que tratam os artigos 195 e 239 da Constituição Federal (contribuições dos empregados para a seguridade social, contribuições para o PIS/PASEP e contribuições para o FGTS), com relação a recursos anteriormente recebidos da Administração Pública Federal por meio de convênios, contratos, acordos, ajustes, subvenções sociais, contribuições, auxílios e similares.
`;

// Utilizando splitTextToSize para ajustar o texto automaticamente
const splitText = doc.splitTextToSize(mainText, contentWidth);

// Posição inicial do texto principal
doc.text(splitText, margin, 50);

// Local e data centralizados
doc.setFontSize(12);
doc.text(`Município ${municipio}/${uf}, ${date}.`, pageWidth / 2, 140, { align: "center" });

// Centralizando a assinatura
const signatureLineY = 160; // Ajustando a posição da assinatura
doc.text("________________________________________", pageWidth / 2, signatureLineY, { align: "center" });
doc.text(`${dirigente}`, pageWidth / 2, signatureLineY + 10, { align: "center" });
doc.text("Representante Legal", pageWidth / 2, signatureLineY + 20, { align: "center" });

// Salvando o PDF com nome dinâmico
doc.save(`Declaracao_Adimplencia_${entidade}.pdf`);
}


// Função para gerar o PDF da Declaração de Ciência dos Deveres e Responsabilidades
function generateDeclaracaoCienciaDeveresResponsabilidadesPDF(dirigente, rgDirigente, orgaoDirigente, cpfDirigente, entidade, cnpjEntidade, termoFomento, municipio, uf, date) {
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Definindo o tamanho da página e margens
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;
const contentWidth = pageWidth - 2 * margin;

// Título centralizado em duas linhas
doc.setFont("times", "bold");
doc.setFontSize(16);
doc.text("DECLARAÇÃO DE CIÊNCIA DOS DEVERES E RESPONSABILIDADES", pageWidth / 2, 20, { align: "center" });
doc.text("IMPOSTOS PELA LEGISLAÇÃO ELEITORAL", pageWidth / 2, 30, { align: "center" });

// Texto principal justificado
doc.setFont("times", "normal");
doc.setFontSize(12);
doc.setLineHeightFactor(1.5);

const mainText = `
Eu, ${dirigente}, portador da carteira de identidade nº ${rgDirigente}, expedida pelo ${orgaoDirigente}, inscrito no CPF sob nº ${cpfDirigente}, na condição de representante legal da ${entidade}, inscrita no CNPJ sob nº ${cnpjEntidade}, DECLARO, sob as penas da lei e passível de devolução dos recursos do Termo de Fomento nº ${termoFomento}/2024:

1. Estar ciente das condutas vedadas aos agentes públicos durante o período do defeso eleitoral, de acordo com o art. 73 da Lei nº 9.504 de 1997;
2. Estar ciente de que as condutas vedadas dispensam comprovação de dolo ou culpa, sendo cláusulas de responsabilidade objetiva;
3. Que a presente Entidade não possui dentro do quadro de dirigentes candidatos ao pleito eleitoral de 2024;
4. Que não será permitido no âmbito do Termo de Fomento nº ${termoFomento}/2024 a distribuição de brindes ou outros bens que possam proporcionar vantagem ao eleitor durante o período de campanha eleitoral;
5. Que não será permitido o uso promocional em favor de candidatos, partidos políticos ou coligações de bens e serviços custeados pelo Termo de Fomento nº ${termoFomento}/2024;
6. Que não será permitida qualquer promoção pessoal ou condutas que afetem a igualdade de oportunidades entre candidatos nos pleitos eleitorais;
7. Que não será realizada publicidade institucional de atos, programas, obras, serviços e campanhas dos órgãos públicos federais;
8. Estar ciente do inteiro teor da Cartilha de Condutas Vedadas aos Agentes Públicos Federais em Eleições, disponível no site do governo.

Por ser expressão da verdade, firmo a presente declaração.
`;

// Adicionar o texto ao PDF
const splitText = doc.splitTextToSize(mainText, contentWidth);
doc.text(splitText, margin, 50);

// Adicionar local e data
doc.setFontSize(12);
doc.text(`Município ${municipio}/${uf}, ${date}.`, pageWidth / 2, 230, { align: "center" });

// Assinatura
const signatureLineY = 250;
doc.text("_____________________________", pageWidth / 2, signatureLineY, { align: "center" });
doc.text(`${dirigente}`, pageWidth / 2, signatureLineY + 10, { align: "center" });
doc.text("Representante Legal", pageWidth / 2, signatureLineY + 20, { align: "center" });

// Salvar PDF
doc.save(`Declaracao_Ciencia_Deveres_Responsabilidades_${entidade}.pdf`);
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
        generateDeclaracaoNaoUtilizacaoRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgao, today);
    }, delay * 2);

    setTimeout(function () {
        generateDeclaracaoLeiPDF(dirigente, cpf, cnpj, entidade, rg, orgao, today);
    }, delay * 3);

    setTimeout(function () {
        generateDeclaracaoAusenciaRecursosPDF(dirigente, cpf, cnpj, entidade, rg, orgao, today);
    }, delay * 4);

    setTimeout(function () {
        generateDeclaracaoCumprimentoArt90PDF(dirigente, cpf, cnpj, entidade, rg, orgao, today);
    }, delay * 5);

    setTimeout(function () {
        generateDeclaracaoNaoContratacaoRecursosParceriaPDF(dirigente, cpf, cnpj, entidade, rg, orgao, today);
    }, delay * 6);

    setTimeout(function () {
        generateDeclaracaoArt299AutonomiaFinanceiraPDF(dirigente, cargoDirigente, cpf, rg, orgao, cnpj, entidade, sede, municipio, uf, contador, today);
    }, delay * 7);

    setTimeout(function () {
        generateDeclaracaoNaoOcorrenciaImpedimentosPDF(dirigente, cpf, rg, orgao, cnpj, entidade, cargoDirigente, municipio, uf, today);
    }, delay * 8);

    setTimeout(function () {
        generateDeclaracaoNaoRecebeRecursosPDF(dirigente, cpf, rg, orgao, cnpj, entidade, proposta, objeto, municipio, uf, today, cargoDirigente);
    }, delay * 9);

    setTimeout(function () {
        generateDeclaracaoCustosPDF(dirigente, rg, orgao, cpf, entidade, cnpj, proposta, municipio, today);
    }, delay * 10);

    setTimeout(function () {
        generateDeclaracaoComprovacaoExistenciaPDF(dirigente, rg, orgao, cpf, entidade, cnpj, proposta, municipio, today);
    }, delay * 11);

    setTimeout(function () {
        generateDeclaracaoCompromissoPDF(dirigente, rg, orgao, cpf, entidade, cnpj, municipio, today);
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