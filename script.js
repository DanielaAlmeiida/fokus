const html = document.querySelector('html')

const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const buttons = document.querySelectorAll('.app__card-button')
const btnStartPause = document.querySelector('#start-pause')

const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

let tempoDecorridoEmSegundos = 5
let intervaloId = null

btnFoco.addEventListener('click', () => {
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})    

function alterarContexto(contexto) {
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




const inputFocoMusica = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

inputFocoMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})



const audioInicia = new Audio('sons/play.wav')
const audioPausa = new Audio('sons/pause.mp3')
const audioTempoFinalizado = new Audio('sons/beep.mp3')

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Tempo:' + tempoDecorridoEmSegundos)
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
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}