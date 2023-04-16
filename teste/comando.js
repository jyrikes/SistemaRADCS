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
        horaDiv.classList.add('mensagem-hora-enviada');
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
    horaDiv.classList.add('mensagem-hora-recebida');
    horaDiv.textContent = hora;

    const textoDiv = document.createElement('div');
    textoDiv.classList.add('mensagem-texto');
    textoDiv.textContent = 'Bem-vindo(a). Por favor, selecione o vai trabalhar:';

    const opcaoSelecionadaDiv = document.createElement('div');
    opcaoSelecionadaDiv.classList.add('opcao-selecionada');

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

    opcaoSelecionadaDiv.appendChild(select);

    mensagemDiv.appendChild(horaDiv);
    mensagemDiv.appendChild(textoDiv);
    mensagemDiv.appendChild(opcaoSelecionadaDiv);

    chatDiv.appendChild(mensagemDiv);

    chatDiv.scrollTop = chatDiv.scrollHeight;

    select.addEventListener('change', function () {
        selecionarTipoDocumento(opcaoSelecionadaDiv, select);

    });
}

mostrarMensagemInicial()


function selecionarTipoDocumento(opcaoSelecionadaDiv, sele) {
    const select = document.querySelector('#tipo-documento-select');
    const opcaoSelecionada = select.options[select.selectedIndex].text;
    mostrarMensagemSelecionada(opcaoSelecionada);
}

function mostrarMensagemSelecionada(opcaoSelecionada) {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.classList.add('mensagem-recebida');

    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const horaDiv = document.createElement('div');
    horaDiv.classList.add('mensagem-hora-recebida');
    horaDiv.textContent = hora;

    const textoDiv = document.createElement('div');
    textoDiv.classList.add('mensagem-texto');
    textoDiv.textContent = `Você selecionou a opção "${opcaoSelecionada}"`;

    mensagemDiv.appendChild(horaDiv);
    mensagemDiv.appendChild(textoDiv);

    chatDiv.appendChild(mensagemDiv);

    chatDiv.scrollTop = chatDiv.scrollHeight;
}

