const html = document.querySelector('html')

const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const buttons = document.querySelectorAll('.app__card-button')
const btnStartPause = document.querySelector('#start-pause')
const btnComecarOuPausar = document.querySelector('#start-pause span')

const imagemBtn = document.querySelector('.app__card-primary-butto-icon')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const tempoNaTela = document.querySelector('#timer')
const audioInicia = new Audio('sons/play.wav')
const audioPausa = new Audio('sons/pause.mp3')
const audioTempoFinalizado = new Audio('sons/beep.mp3')
const inputFocoMusica = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')

let tempoDecorridoEmSegundos = 1
let intervaloId = null

musica.loop = true


btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})    

function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    buttons.forEach( btn => btn.classList.remove('active'))

    switch (contexto) {
        case 'foco':
            titulo.innerHTML= `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case 'descanso-curto':
            titulo.innerHTML= `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case 'descanso-longo':
            titulo.innerHTML= `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
            
        default:
            break;
    }
}


inputFocoMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado')

        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }

        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

btnStartPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play()
        zerar()
        return
    }
    audioInicia.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausar.textContent = "Pausar"
    imagemBtn.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausar.textContent = "Iniciar"
    imagemBtn.setAttribute('src', '/imagens/play_arrow.png')
}


function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
