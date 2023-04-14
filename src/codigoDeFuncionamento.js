
const icone = document.querySelector('.icone-menu');
const menu = document.querySelector('.menu-recipiente');
const fechar = document.querySelector('.fechar');


icone.addEventListener('click', () => {
    menu.classList.toggle('open')
});

fechar.addEventListener('click', () => {
    menu.classList.remove('open')
});




const mensagemInput = document.querySelector('#mensagem');
const enviarBotao = document.querySelector('#enviar');
const chatDiv = document.querySelector('.chat');

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
        mensagemDiv.textContent = mensagem;
        chatDiv.appendChild(mensagemDiv);
        mensagemInput.value = '';
        chatDiv.scrollTop = chatDiv.scrollHeight;

        enviarMensagemParaIA(mensagem);
    }
}



function enviarMensagemParaIA(mensagem) {
    const respostaIA = gerarRespostaIA(mensagem);
    if (respostaIA !== '') {
      const mensagemDiv = document.createElement('div');
      mensagemDiv.classList.add('mensagem-recebida');
      mensagemDiv.textContent = respostaIA;
      chatDiv.appendChild(mensagemDiv);
    
      if (mensagem.toLowerCase().includes('quero um pdf')) {
        const assunto = prompt('Qual assunto do PDF que você deseja criar?');
        if (assunto !== null && assunto !== '') {
          const mensagemDiv = document.createElement('div');
          mensagemDiv.classList.add('mensagem-recebida');
          mensagemDiv.textContent = `Criando PDF sobre ${assunto}...`;
          chatDiv.appendChild(mensagemDiv);
        
          const pdf = new jsPDF();
          const table = document.getElementById('tabela');
          const tableData = pdf.autoTableHtmlToJson(table);
          pdf.text(assunto, 14, 15);
          pdf.autoTable({
            head: [tableData.columns],
            body: tableData.data
          });
          pdf.save(`${assunto}.pdf`);
        } else {
          const mensagemDiv = document.createElement('div');
          mensagemDiv.classList.add('mensagem-recebida');
          mensagemDiv.textContent = 'Por favor, informe um assunto válido para criar o PDF.';
          chatDiv.appendChild(mensagemDiv);
          if (!usuarioRolandoParaCima) {
            chatDiv.scrollTop = chatDiv.scrollHeight;
          }
        }
      }
    }
  }
  


function gerarRespostaIA(mensagem) {
    // Modelos de perguntas e respostas
    const perguntas = ['oi', 'Qual o seu nome?', 'quem é você', 'seu trabalho é bom?', "quero um pdf", 'tu é burra?'];
    const respostas = ['olá', 'Meu nome é Radcs!', 'um sistema escravo que está aqui pra te ajudar', 'sou uma IA, Como modelo de linguagem, não tenho a capacidade de "gostar" ou "não gostar" do meu trabalho, pois não tenho consciência ou emoções. ','não tanto quanto vc'];

    for (let i = 0; i < perguntas.length; i++) {
        if (mensagem.toLowerCase().includes(perguntas[i].toLowerCase())) {
            return respostas[i];
        }
    }
 
    let melhorCorrespondencia = '';
    let correspondenciaAtual = 0;
    for (let i = 0; i < perguntas.length; i++) {
        const pergCorrigida = perguntas[i].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const msgCorrigida = mensagem.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const correspondencia = similaridadeStrings(pergCorrigida, msgCorrigida);
        if (correspondencia > correspondenciaAtual) {
            correspondenciaAtual = correspondencia;
            melhorCorrespondencia = respostas[i];
        }
    }
    if (correspondenciaAtual > 0.7) {
        return melhorCorrespondencia;
    }
   

    return 'Desculpe, não entendi a pergunta. Pode reformulá-la?';
}

function similaridadeStrings(str1, str2) {
    const longa = str1.length >= str2.length ? str1.toLowerCase() : str2.toLowerCase();


    const curta = str1.length >= str2.length ? str2.toLowerCase() : str1.toLowerCase();
    const distancia = longa.length - curta.length;
    const similaridade = Math.round(100 * (longa.length - distancia) / longa.length);
    return similaridade / 100;
}


