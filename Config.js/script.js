// Função para formatar a data como "dd de mês de yyyy"
function formatDate() {
    const today = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return today.toLocaleDateString('pt-BR', options);
}

// Função para gerar o PDF
function generatePDF(dirigente, cpf, entidade, cnpj, endereco, proposta, municipio) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionando título
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("ATESTADO DE CAPACIDADE TÉCNICA", 105, 20, { align: "center" });

    // Texto da declaração com espaçamento e justificado
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);
    
    const declarationText = `Eu, ${dirigente}, CPF Nº ${cpf}, ATESTO, para fins de formalização de Termo de Fomento no âmbito do Ministério do Esporte - MESP, que o(a) ${entidade}, inscrito(a) no CNPJ sob o nº ${cnpj}, situado(a) no(a) ${endereco}, possui capacidade técnica e operacional para executar o objeto apresentado na Proposta nº ${proposta}/2024, em atendimento ao art. 33, inciso V, da Lei 13.019 de 2014 e art. 90, inciso XI, da Lei nº 14.791 de 29 de dezembro de 2023 (LDO 2024), considerando as experiências adquiridas na execução de projeto(s)/ação(es) na(s) área(s) esportivo/educacional/social, bem como qualificação profissional do seu quadro pessoal, e comprovação que dispõe de estruturas físicas conforme anexo.\n\nO(s) projeto(s)/ação(es) descrito(s) foi(ram) executado(s) com qualidade, não existindo, até a presente data, fatos que desabonem a conduta e a responsabilidade da entidade com as obrigações assumidas, confirmando assim a capacidade técnica e operacional para a execução do que foi proposto.`;

    doc.text(declarationText, 20, 40, { maxWidth: 170, align: "justify" });

    // Adicionar a data do dia automaticamente
    const currentDate = formatDate();
    doc.text(`${municipio}, ${currentDate}.`, 20, 140);

    // Assinatura
    doc.text("_____________________________", 20, 160);
    doc.text(`${dirigente}`, 20, 170);
    doc.text("Representante Legal", 20, 180);

    // Rodapé com fonte menor e formatação centralizada
    doc.setFontSize(10);
    doc.text("Este documento foi gerado automaticamente pelo Ministério do Esporte.", 105, 290, { align: "center" });

    // Baixar o PDF gerado
    doc.save(`Atestado_Capacidade_Tecnica_${dirigente}.pdf`);
}

// Função principal para capturar o evento de submit e gerar o PDF
document.getElementById('atestadoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o reload da página

    const dirigente = document.getElementById('dirigente').value;
    const cpf = document.getElementById('cpf').value;
    const entidade = document.getElementById('entidade').value;
    const cnpj = document.getElementById('cnpj').value;
    const endereco = document.getElementById('endereco').value;
    const proposta = document.getElementById('proposta').value;
    const municipio = document.getElementById('municipio').value;

    generatePDF(dirigente, cpf, entidade, cnpj, endereco, proposta, municipio); // Chama a função para gerar o PDF

});