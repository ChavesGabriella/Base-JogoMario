const mario = document.querySelector('.mario');
const cano = document.querySelector('.cano');
const nuvem = document.querySelector('.nuvem');
const fimDeJogo = document.querySelector('.fim-de-jogo');
const botaoReiniciar = document.querySelector('.reiniciar');

let pontuacao = 0;

function fazerMarioPular() {
    mario.classList.add('pular');
    setTimeout(function () {
        mario.classList.remove('pular');
        const posicaoCano = cano.offsetLeft;
        const posicaoMario = parseFloat(getComputedStyle(mario).bottom);

        if (posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60) {
            pontuacao++;
            atualizarPontuacao();
        }

        // Ajuste da altura do pulo
        mario.style.bottom = '80px'; // Ajuste o valor conforme necessário
    }, 300);
}

document.addEventListener('keyup', fazerMarioPular);


function atualizarPontuacao() {
    console.log('Pontuação: ' + pontuacao);
    const elementoPontuacao = document.querySelector('.pontuacao');
    if (elementoPontuacao) {
        elementoPontuacao.innerText = 'Pontuação: ' + pontuacao;
    }
}

function verificarColisoes() {
    const posicaoCano = cano.offsetLeft;
    const posicaoMario = parseFloat(getComputedStyle(mario).bottom);
    const posicaoNuvem = parseFloat(getComputedStyle(nuvem).left);

    if (posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60) {
        console.log('Você morreu, sua pontuação foi de: ', pontuacao);
        pontuacao = 0;
        pararJogo();

        cano.style.animation = 'none';
        cano.style.left = `${posicaoCano}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${posicaoCano}px`;
        mario.src = 'assets/imgs/fim-de-jogo.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '35px';

        nuvem.style.animation = 'nuvem 20s infinite linear';
        nuvem.style.left = `${posicaoNuvem}px`;

        fimDeJogo.style.visibility = 'visible';
    }
}


let loopJogo = setInterval(verificarColisoes, 10);

function pararJogo(){
    clearInterval(loopJogo);
    console.log("Jogo Parado");
}

function reiniciarJogo() {
    pontuacao = 0;
    fimDeJogo.style.visibility = 'hidden';
    mario.src = 'assets/imgs/mario.png';
    mario.style.width = '60px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '80px'; 
    cano.style.animation = 'cano 2s infinite linear';
    nuvem.style.animation = 'nuvem 20s infinite linear';
    loopJogo = setInterval(verificarColisoes, 10);
    atualizarPontuacao();
}
botaoReiniciar.addEventListener('click', reiniciarJogo);
