const mario = document.querySelector('.mario')
const cano = document.querySelector('.cano')
const nuvem = document.querySelector('.nuvem')
const fimDeJogo = document.querySelector('.fim-de-jogo')
const botaoReiniciar = document.querySelector('.reiniciar')
const ponto = document.querySelector('.ponto');

let pontuacao = 0

function atualizarPontuacao() {
  /*console.log('Pontuação: ' + pontuacao)
  const elementoPontuacao = document.querySelector('.pontuacao')
  if (elementoPontuacao) {
    elementoPontuacao.innerText = 'Pontuação: ' + pontuacao
  }*/
  ponto.innerHTML = "Pontuação: " + pontuacao;
}

let loopJogo = setInterval(verificarColisoes, 10);

function pararJogo() {
  clearInterval(loopJogo);
  console.log("Jogo em pausa");
}

function fazerMarioPular() {
  mario.classList.add('pular')
  setTimeout(function () {
    mario.classList.remove('pular');
    pontuacao++
    atualizarPontuacao()
  }, 500);
}

function verificarColisoes() {
  const posicaoCano = cano.offsetLeft
  const posicaoMario = parseFloat(getComputedStyle(mario).bottom);
  const posicaoNuvem = parseFloat(getComputedStyle(nuvem).bottom);

  if (posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60) {
    console.log('Colisão detectada! Pontuação atual: ' + pontuacao)
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

function reiniciarJogo() {
  location.reload();
  atualizarPontuacao();
}

document.addEventListener("keyup", fazerMarioPular);
document.addEventListener("click", reiniciarJogo);
