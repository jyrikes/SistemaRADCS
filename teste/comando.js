const mensagemInput = document.querySelector('.mensagem');
const enviarBotao = document.querySelector('.enviar');
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
    horaDiv.classList.add('mensagem-hora-enviada');
    horaDiv.textContent = hora;

    const textoDiv = document.createElement('div');
    textoDiv.classList.add('mensagem-texto');
    textoDiv.textContent = mensagem;

    // Adiciona a nova mensagem abaixo da última mensagem recebida
    const mensagensRecebidas = chatDiv.querySelectorAll('.mensagem-recebida');
    const ultimaMensagemRecebida = mensagensRecebidas[mensagensRecebidas.length - 1];
    chatDiv.insertBefore(mensagemDiv, ultimaMensagemRecebida.nextSibling);

    mensagemDiv.appendChild(horaDiv);
    mensagemDiv.appendChild(textoDiv);

    mensagemInput.value = '';
    chatDiv.scrollTop = chatDiv.scrollHeight;

    enviarMensagemParaIA(mensagem);
  }
}

  
const select = document.querySelector('#tipo-documento-select');
const chatMensagens = document.querySelector('#chat-mensagens');

select.addEventListener('change', function() {
  const opcaoSelecionada = select.options[select.selectedIndex].text;

  const mensagemDiv = document.createElement('div');
  mensagemDiv.classList.add('mensagem-recebida');

  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const horaDiv = document.createElement('div');
  horaDiv.classList.add('mensagem-hora-recebida');
  horaDiv.textContent = hora;

  const textoDiv = document.createElement('div');
  textoDiv.classList.add('mensagem-texto');
  textoDiv.textContent = `ação confirmada "${opcaoSelecionada}".`;

  mensagemDiv.appendChild(horaDiv);
  mensagemDiv.appendChild(textoDiv);

  chatMensagens.insertBefore(mensagemDiv, null);
  
});

