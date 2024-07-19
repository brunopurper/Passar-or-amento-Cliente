document.getElementById('budgetForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const clientName = capitalizeFirstLetter(document.getElementById('clientName').value);
  const device = capitalizeFirstLetter(document.getElementById('device').value);
  const diagnosis = capitalizeFirstLetter(document.getElementById('diagnosis').value);
  const cashValue = formatCurrency(document.getElementById('cashValue').value);
  const installmentValue = formatCurrency(document.getElementById('installmentValue').value);
  const installments = document.getElementById('installments').value;

  const outputText = `
Olá, ${clientName}, tudo bem? Aqui é da Technique Eletrônica.

Referente ao seu orçamento do seu ${device}

${diagnosis}

O valor para o reparo com a peça + mão de obra:

*${cashValue}* Com desconto para pagamento à vista.
*${installmentValue}* Em até ${installments}x sem juros nos cartões Visa/Master.

Fico no aguardo da sua posição.

Tenha um ótimo dia.
`.trim(); // Remover espaços adicionais no início e fim

  document.getElementById('outputText').value = outputText;

  // Copiar texto para área de transferência
  copyToClipboard(outputText);

  // Mostrar modal
  $('#confirmationModal').modal('show');
});

document.getElementById('copyButton').addEventListener('click', function() {
  const outputText = document.getElementById('outputText').value;
  copyToClipboard(outputText);
  alert('Texto copiado para a área de transferência!');
});

document.getElementById('nextBudget').addEventListener('click', function() {
  // Limpar todos os campos do formulário
  document.getElementById('budgetForm').reset();
  // Fechar o modal
  $('#confirmationModal').modal('hide');
});

document.getElementById('sendWhatsAppButton').addEventListener('click', function() {
  const clientName = capitalizeFirstLetter(document.getElementById('clientName').value);
  const device = capitalizeFirstLetter(document.getElementById('device').value);
  const diagnosis = capitalizeFirstLetter(document.getElementById('diagnosis').value);
  const cashValue = formatCurrency(document.getElementById('cashValue').value);
  const installmentValue = formatCurrency(document.getElementById('installmentValue').value);
  const installments = document.getElementById('installments').value;
  const phoneNumber = document.getElementById('phoneNumber').value.trim();

  // Adicionar o DDD 51 e o prefixo internacional
  const phone = phoneNumber.replace(/\D/g, '');
  const whatsappNumber = `55${phone}`;

  if (phone.length >= 10 && phone.length <= 11) {
      // Formatar mensagem para o WhatsApp
      const whatsappMessage = `
Olá, ${clientName}, tudo bem? Aqui é da Technique Eletrônica.

Referente ao seu orçamento do seu ${device}

${diagnosis}

O valor para o reparo com a peça + mão de obra:

*${cashValue}* Com desconto para pagamento à vista.
*${installmentValue}* Em até ${installments}x sem juros nos cartões Visa/Master.

Fico no aguardo da sua posição.

Tenha um ótimo dia.
`;

      // Abrir WhatsApp Web com mensagem pré-preenchida
      const whatsappURL = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL);
  } else {
      alert('Por favor, insira um número de telefone válido com DDD.');
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.querySelectorAll('.capitalize').forEach(function(input) {
  input.addEventListener('input', function(event) {
      let words = input.value.split(' ');
      words = words.map(word => capitalizeFirstLetter(word));
      input.value = words.join(' ');
  });
});

function formatCurrency(value) {
  // Remove any non-numeric characters except for the decimal separator
  value = value.replace(/[^0-9,]/g, '');

  // Add decimal separator if not present
  if (!value.includes(',')) {
      value = value + ',00';
  }

  // Format the currency
  return value;
}

function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
