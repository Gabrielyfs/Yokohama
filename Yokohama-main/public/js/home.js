let count = 1;
document.getElementById('radio1').checked = true;

setInterval(function () {
    proximaImg()
}, 8000)

function proximaImg() {
    count++;
    if (count > 6) {
        count = 1;
    }

    document.getElementById('radio' + count).checked = true;

    //reiniciar animação
    resetAnimation();

}

function resetAnimation() {
    let animatedElements = document.querySelectorAll('.slider-titulo, .slider-sub');

    // Remova e adicione a classe de animação para reiniciar
    animatedElements.forEach(element => {
        // Remova qualquer animação em andamento
        element.style.animation = 'none';

        // Forçar reflow para garantir que a animação seja reiniciada
        element.offsetHeight;

        // Adicione a animação novamente
        element.style.animation = 'sliderReveal 1.5s ease forwards';
    });
}

function pagSobre() {
    window.location.href = '/sobre'
}

function agendar() {
    window.location.href = '/reservar'
}

const logoL = document.querySelector('.logoL')
const logoF = document.querySelector('.logoF')

logoL.addEventListener('click', () => {
    window.location.href = '/'
});
logoF.addEventListener('click', () => {
    window.location.href = '/'
});

function menuDrop() {
    const menu = document.querySelector('.menu')
    if (menu.style.display == 'none') {
        menu.style.display = 'block'
    } else {
        menu.style.display = 'none'
    }
}
