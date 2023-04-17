const mensagemInput = document.querySelector('.mensagem');
const enviarBotao = document.querySelector('.enviar');
const chatDiv = document.querySelector('.chat-container');
var texto ;
var preco;
var produto;
var descricao;
var quantidade;
var cpf;
var atividade;
var dadosPdf2 =[];

enviarBotao.addEventListener('click', () => {
    texto = mensagemInput.value ;
    enviarMensagem();
});

mensagemInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
      texto = mensagemInput.value ;
      mensagemInput.value = '';
      if(texto == "Autorizar pessoa" ||texto == "autorizar pessoa"){
        mandarMensagem("Informe o CPF do colaborador que deseja autorizar: ")
        mensagemInput.textContent ="";
        await ActionCpf();
        await ActionAtividade();
        await autorizador();
      }
       enviarMensagem();
  }
});


function enviarMensagem() {
  var mensagem = mensagemInput.value;
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

    
  }
}

const chatMensagens = document.querySelector('#chat-mensagens');

var dadosPdf =[]

  const botaoGerado = document.createElement('div');
  botaoGerado.classList.add('botaoGerado');
  botaoGerado.id = 'meuBotaoGerarado';
  
  const botaoGerarSolicitacao = document.createElement('button');
  botaoGerarSolicitacao.textContent = 'Solicitação de compras';
  const btRelatorio = document.createElement('button');
  btRelatorio.textContent ='Relatórios'
  btRelatorio.addEventListener('click', () =>{
    window.location.href = "relatorio.html";
  });

  
  botaoGerado.appendChild(botaoGerarSolicitacao);
  botaoGerado.appendChild(btRelatorio);
  
  const divMen = document.querySelector('.mensagem-inicial');
  divMen.appendChild(botaoGerado);
  botaoGerarSolicitacao.addEventListener('click', async function() {
    nome = botaoGerarSolicitacao.textContent;
    mandarMensagem(`Você selecionou:<br><br> <strong>${nome}<\stron> <br>`);
    mandarMensagem("Qual o produto da compra ?");
    await ActionProduto();
    await ActionPreco();
    await ActionQuantidade();
    await ActionDescricao();
    await teste();
    
  });
  






function ActionProduto() {
  return new Promise((resolve, reject) => {
    const onClick = function() {
      produto = texto;
      dadosPdf.push(produto);
      mandarMensagem(`O produto selecionado foi : <strong>${produto}<\strong> <br> `);
      mandarMensagem("Qual o é o preço  por unidade?  ")
      mensagemInput.value = '';
      enviarBotao.removeEventListener('click', onClick);
      mensagemInput.removeEventListener('keydown', onKeyDown);
      resolve();
    };
  
    const onKeyDown = function(event) {
      if (event.key === 'Enter') {
        produto = texto;
        dadosPdf.push(produto);
        mandarMensagem(`O produto selecionado foi : <strong>${produto}<\strong> <br> `);
        mandarMensagem("Qual o é o preço  por unidade?  ")
        mensagemInput.value = '';
        enviarBotao.removeEventListener('click', onClick);
        mensagemInput.removeEventListener('keydown', onKeyDown);
        resolve();
      }
    };
  
    enviarBotao.addEventListener('click', onClick);
    mensagemInput.addEventListener('keydown', onKeyDown);
  });
}

function ActionPreco() {
  return new Promise((resolve, reject) => {
    const onClick = function() {
      preco = texto;
      dadosPdf.push(preco)
      mandarMensagem(`O preco selecionado foi :<strong> R$ ${preco}</strong> <br>`);
      mandarMensagem(`Quantos itens você deseja solicitar ? `);
      mensagemInput.value = '';
      enviarBotao.removeEventListener('click', onClick);
      mensagemInput.removeEventListener('keydown', onKeyDown);
      resolve();
    };
  
    const onKeyDown = function(event) {
      if (event.key === 'Enter') {
        preco = texto;
        dadosPdf.push(preco)
        mandarMensagem(`O preco selecionado foi :<strong> <br>R$ ${preco}</strong> <br>`);
        mandarMensagem(`Quantos itens você deseja solicitar ? `);
        mensagemInput.value = '';
        enviarBotao.removeEventListener('click', onClick);
        mensagemInput.removeEventListener('keydown', onKeyDown);
        resolve();
      }
    };
  
    enviarBotao.addEventListener('click', onClick);
    mensagemInput.addEventListener('keydown', onKeyDown);
  });
}

function ActionQuantidade() {
  return new Promise((resolve, reject) => {
    const onClick = function() {
      quantidade = texto;
      dadosPdf.push(quantidade);
      mandarMensagem(`Você solicitou :<strong> <br>R$ ${quantidade}</strong> itens <br>`);
        mandarMensagem(`Adicione uma descrição? `);
      mensagemInput.value = '';
      
      enviarBotao.removeEventListener('click', onClick);
      mensagemInput.removeEventListener('keydown', onKeyDown);
      resolve();
    };
  
    const onKeyDown = function(event) {
      if (event.key === 'Enter') {
        quantidade = texto;
        dadosPdf.push(quantidade);
        mandarMensagem(`Você solicitou :<strong> <br>R$ ${quantidade} itens</strong>  <br>`);
        mandarMensagem(`Adicione uma descrição? `);
        mensagemInput.value = '';
        enviarBotao.removeEventListener('click', onClick);
        mensagemInput.removeEventListener('keydown', onKeyDown);
        resolve();
      }
    };
  
    enviarBotao.addEventListener('click', onClick);
    mensagemInput.addEventListener('keydown', onKeyDown);
  });
}

async function ActionDescricao() {
  return new Promise((resolve, reject) => {
    const onClick = function() {
      descricao = texto;
      dadosPdf.push(descricao);
      mandarMensagem(`A descrição adicionada foi: ${descricao} `);
      mensagemInput.value = '';
      enviarBotao.removeEventListener('click', onClick);
      mensagemInput.removeEventListener('keydown', onKeyDown);
      resolve();
      }
      const onKeyDown = function(event) {
        if (event.key === 'Enter') {
          descricao = texto;
          dadosPdf.push(descricao);
          mandarMensagem(`A descrição adicionada foi: ${descricao} `);
          mensagemInput.value = '';
          enviarBotao.removeEventListener('click', onClick);
          mensagemInput.removeEventListener('keydown', onKeyDown);
          resolve();
        }
      }
      
      enviarBotao.addEventListener('click', onClick);
      mensagemInput.addEventListener('keydown', onKeyDown);
      });
      }
      
      

      async function teste(){
        return new Promise((resolve,reject)=>{
          const botaoGerarPDF = document.createElement('div');
          botaoGerarPDF.classList.add('botaoGerarPDF');
          botaoGerarPDF.id = 'meuBotaoGerarPDF';
          
          const botao = document.createElement('button');
          botao.textContent = 'Gerar Solicitação';

          
          botaoGerarPDF.appendChild(botao);
          
          const divMensagem = document.querySelector('#chat');
          divMensagem.appendChild(botaoGerarPDF);
          botao.addEventListener('click', () => {
            window.location.href = "t.html?produto=" + dadosPdf[0] + "&quantidade=" + dadosPdf[2] + "&preco=" + dadosPdf[1] + "&descricao=" + dadosPdf[3];
          });
          
          
        });
        
      }

      
      async function autorizador(){
        return new Promise((resolve,reject)=>{
          const botaoGerarPDF = document.createElement('div');
          botaoGerarPDF.classList.add('botaoGerarPDF');
          botaoGerarPDF.id = 'meuBotaoGerarPDF';
          
          const botao = document.createElement('button');
          botao.textContent = 'Autorizar';

          
          botaoGerarPDF.appendChild(botao);
          
          const divMensagem = document.querySelector('#chat');
          divMensagem.appendChild(botaoGerarPDF);
          botao.addEventListener('click', () => {
            window.location.href = "autoriza.html?cpf=" + dadosPdf2[0] + "&atividade=" + dadosPdf2[1];
          });
          
          
        });
        
      }

      function ActionCpf() {
        return new Promise((resolve, reject) => {
          const onClick = function() {
            cpf = texto;
            dadosPdf2.push(cpf);
            mensagemInput.value = '';
            mandarMensagem("Descreva a atividade para a liberação: ")
            enviarBotao.removeEventListener('click', onClick);
            mensagemInput.removeEventListener('keydown', onKeyDown);
            resolve();
          };
        
          const onKeyDown = function(event) {
            if (event.key === 'Enter') {
              cpf = texto;
              dadosPdf2.push(cpf);
              mensagemInput.value = '';
              mandarMensagem("Descreva a atividade para a liberação: ")
              
              enviarBotao.removeEventListener('click', onClick);
              mensagemInput.removeEventListener('keydown', onKeyDown);
              resolve();
            }
          };
        
          enviarBotao.addEventListener('click', onClick);
          mensagemInput.addEventListener('keydown', onKeyDown);
        });
      }
      

      function ActionAtividade() {
        return new Promise((resolve, reject) => {
          const onClick = function() {
            atividade = texto;
            dadosPdf2.push(atividade);
            mensagemInput.value = '';
            mandarMensagem(`Você deseja autorizar:<br>`); 
            mandarMensagem(`<strong>Lucas Gabriel da Silva<\strong> <br> `);
            mandarMensagem(`de cpf <strong>${dadosPdf2[0]}<\strong><br> `)
            mandarMensagem(`A realizar a seguinte atividade :<\br> ${dadosPdf2[1]}`);
            mensagemInput.value = '';
            enviarBotao.removeEventListener('click', onClick);
            mensagemInput.removeEventListener('keydown', onKeyDown);
            resolve();
          };
        
          const onKeyDown = function(event) {
            if (event.key === 'Enter') {
              atividade = texto;
              dadosPdf2.push(atividade);
              mandarMensagem(`Você deseja autorizar:<br>`); 
              mandarMensagem(`<strong>Lucas Gabriel da Silva<\strong> <br> `);
              mandarMensagem(`de cpf <strong>${dadosPdf2[0]}<\strong><br> `)
              mandarMensagem(`A realizar a seguinte atividade :<br> ${dadosPdf2[1]}`);
              
              mensagemInput.value = '';
              enviarBotao.removeEventListener('click', onClick);
              mensagemInput.removeEventListener('keydown', onKeyDown);
              resolve();
            }
          };
        
          enviarBotao.addEventListener('click', onClick);
          mensagemInput.addEventListener('keydown', onKeyDown);
        });
      }
      



function mandarMensagem(mensagem) {
  const mensagemDiv = document.createElement('div');
  mensagemDiv.classList.add('mensagem-recebida');

  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const horaDiv = document.createElement('div');
  horaDiv.classList.add('mensagem-hora-recebida');
  horaDiv.textContent = hora;

  const textoDiv = document.createElement('div');
  textoDiv.classList.add('mensagem-texto');
  textoDiv.innerHTML = mensagem;
 

  mensagemDiv.appendChild(horaDiv);
  mensagemDiv.appendChild(textoDiv);
  

  chatMensagens.insertBefore(mensagemDiv, null);
  
}