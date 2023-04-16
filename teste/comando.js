const mensagemInput = document.querySelector('#mensagem');
const enviarBotao = document.querySelector('#enviar');
const chatDiv = document.querySelector('.chat-container');

enviarBotao.addEventListener('click', () => {
  enviarMensagem();
});

mensagemInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    enviarMensagem();
  }
});


function enviarMensagem() {

  const mensagem = mensagemInput.value;
  if (mensagem !== '') {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.classList.add('mensagem-enviada');

    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const horaDiv = document.createElement('div');
    horaDiv.classList.add('mensagem-hora');
    horaDiv.textContent = hora;

    const textoDiv = document.createElement('div');
    textoDiv.classList.add('mensagem-texto');
    textoDiv.textContent = mensagem;

    // Adiciona a nova mensagem antes da primeira mensagem existente
    const primeiraMensagem = chatDiv.querySelector('.mensagem-enviada');
    chatDiv.insertBefore(mensagemDiv, primeiraMensagem);

    mensagemDiv.appendChild(horaDiv);
    mensagemDiv.appendChild(textoDiv);

    // Move as opções para cima
    const opcoes = document.querySelector('.tipo-documento');
    const mensagemRecebida = chatDiv.querySelector('.mensagem-recebida');
    chatDiv.insertBefore(opcoes, mensagemRecebida);

    mensagemInput.value = '';
    chatDiv.scrollTop = chatDiv.scrollHeight;

    enviarMensagemParaIA(mensagem);

    primeiraMensagemEnviada = true;
  }
}


function mostrarMensagemInicial() {
  const mensagemDiv = document.createElement('div');
  mensagemDiv.classList.add('mensagem-recebida');

  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const horaDiv = document.createElement('div');
  horaDiv.classList.add('mensagem-hora');
  horaDiv.textContent = hora;

  const textoDiv = document.createElement('div');
  textoDiv.classList.add('mensagem-texto');
  textoDiv.textContent = 'Bem-vindo(a). Por favor, selecione o vai trabalhar:';

  const tipoDocumentoDiv = document.createElement('div');
  tipoDocumentoDiv.classList.add('tipo-documento');

  const select = document.createElement('select');
  select.id = 'tipo-documento-select';
  const opcaoGerarDocumento = document.createElement('option');
  opcaoGerarDocumento.value = 'gerar-documento';
  opcaoGerarDocumento.text = 'Gerar Documento';
  select.appendChild(opcaoGerarDocumento);
  const opcaoFichaCompra = document.createElement('option');
  opcaoFichaCompra.value = 'ficha-compra';
  opcaoFichaCompra.text = 'Ficha de Compra';
  select.appendChild(opcaoFichaCompra);
  const opcaoPedidoEquipamento = document.createElement('option');
  opcaoPedidoEquipamento.value = 'pedido-equipamento';
  opcaoPedidoEquipamento.text = 'Pedido de Equipamento';
  select.appendChild(opcaoPedidoEquipamento);

  tipoDocumentoDiv.appendChild(select);

  mensagemDiv.appendChild(horaDiv);
  mensagemDiv.appendChild(textoDiv);
  mensagemDiv.appendChild(tipoDocumentoDiv);

  chatDiv.appendChild(mensagemDiv);

  chatDiv.scrollTop = chatDiv.scrollHeight;

  select.addEventListener('change', function () {
    const opcaoSelecionada = select.options[select.selectedIndex].text;
    const mensagemSelecionadaDiv = document.createElement('div');
    mensagemSelecionadaDiv.classList.add('mensagem-enviada');
    const horaSelecionadaDiv = document.createElement('div');
    horaSelecionadaDiv.classList.add('mensagem-hora');
    horaSelecionadaDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const textoSelecionadoDiv = document.createElement('div');
    textoSelecionadoDiv.classList.add('mensagem-texto');
    textoSelecionadoDiv.textContent = opcaoSelecionada + ' selecionado';
    mensagemSelecionadaDiv.appendChild(horaSelecionadaDiv);
    mensagemSelecionadaDiv.appendChild(textoSelecionadoDiv);
    chatDiv.appendChild(mensagemSelecionadaDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });
}

mostrarMensagemInicial();




function selecionarTipoDocumento() {
  const select = document.querySelector('#tipo-documento-select');
  const opcaoSelecionada = select.options[select.selectedIndex].value;
  const mensagem = document.createElement('div');
  mensagem.classList.add('mensagem-recebida');
  if (opcaoSelecionada === 'gerar-documento') {
    mensagem.innerHTML = 'Você selecionou "Gerar Documento".';
  } else if (opcaoSelecionada === 'ficha-compra') {
    mensagem.innerHTML = 'Você selecionou "Ficha de Compra".';
  } else if (opcaoSelecionada === 'pedido-equipamento') {
    mensagem.innerHTML = 'Você selecionou "Pedido de Equipamento".';
  }
  
  const primeiraMensagem = chatDiv.firstChild;
  if (primeiraMensagem) {
    primeiraMensagem.classList.remove('mensagem-recebida');
    primeiraMensagem.classList.add('mensagem-enviada');
    chatDiv.insertBefore(mensagem, primeiraMensagem.nextSibling);
  } else {
    chatDiv.appendChild(mensagem);
  }
  
  mensagem.scrollIntoView(); 
}

