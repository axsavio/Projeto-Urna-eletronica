//Criando variavel para mudar Informações na tela-------------->
    let seuVotoPara = document.querySelector('.d-1-1 span'); 
    let cargo = document.querySelector('.d-1-2 span');
    let descricao = document.querySelector('.d-1-4');
    let aviso = document.querySelector('.d-2');
    let lateral = document.querySelector('.d-1-right');
    let numeros = document.querySelector('.d-1-3');

//Variavéis de controle de ambiente--------------------->
let etapaAtual = 0; //Etapa Atual
let numero = ''; //Inserir informações do teclado na tela
let votoBranco = false;
let votos = []; //Armazenar Votos para servidor


function comecarEtapa(){ //limpa a tela e preeche o que precisa ser preechido
   let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i < etapa.numeros; i++){ //Montar os numeros 
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>'; //Classe que pisca na tela
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
        
    }

   
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;


}

//Colocando ações nos botões (Controle de interface)-------------------->
    function atualizaInterface(){
        let etapa = etapas[etapaAtual];
        let candidato = etapa.candidatos.filter((item)=>{
            if(item.numero=== numero){
                return true;
            }else{
                return false;
            }
        });
        if(candidato.length > 0) { //Motando estrutura na tela e pegando informações
            candidato = candidato[0];
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block';
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`; //Mostrar Nome e partido

            let fotosHtml = '';
            for(let i in candidato.fotos){
                fotosHtml += `<div class="d-1-image"> <img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda} </div>`; //Mostrar fotos e infos
            }

            lateral.innerHTML = fotosHtml;

        }else{                                                                   //voto nulo
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block';
            descricao.innerHTML = `<div class ="aviso--grande pisca">VOTO NULO</div>`

        }


    }

    function clicou(n){
        let elNumero = document.querySelector('.numero.pisca');
        if(numero !== null){ //Permitir que preecha na tela onde está piscando
            elNumero.innerHTML = n;
            numero = `${numero}${n}`;

            elNumero.classList.remove('pisca'); //Remover o pisca quando a informação ja estiver inserida

            if(elNumero.nextElementSibling !== null){
                elNumero.nextElementSibling.classList.add('pisca');  //Pular para o proximo número
            }else{
                atualizaInterface();
            }
            
        }
    }

    function branco(){
        if(numero === ''){
            votoBranco = true;
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block';
            numeros.innerHTML = '';
            descricao.innerHTML = `<div class ="aviso--grande pisca">VOTO BRANCO</div>`
            lateral.innerHTML='';




        }else{
            alert("Para votar emn BRANCO, não pode ter digitado nenhum número ");
        }
    }

    function corrige(){
        comecarEtapa();
    }
    
    function confirma(){
        let etapa = etapas[etapaAtual];

        let votoConfirmado = true;


        if(votoBranco === true){
            votoConfirmado = true;
          votos.push({       //Enviar votos para servidor
                etapa: etapas[etapaAtual].titulo,
                voto: 'Branco'
          });  
        }else if(numero.length === etapa.numeros){
            votoConfirmado = true;
            
            votos.push({       //Enviar votos para servidor
                etapa: etapas[etapaAtual].titulo,
                voto: numero
          });  
        }

        if(votoConfirmado) {
            etapaAtual++;
            if(etapas[etapaAtual] !== undefined) {
                comecarEtapa();
            } else{
                document.querySelector('.tela').innerHTML = `<div class ="aviso--gigante pisca">FIM</div>`
                console.log(votos) //Vizualizar array de votos
            }
        }
    }
     

comecarEtapa(); //Função para zerar ou botão corrige

//PROJETO FINALIZADO!