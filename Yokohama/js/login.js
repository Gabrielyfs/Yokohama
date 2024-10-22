let bnt = document.querySelector('.fa-eye')
const logo = document.getElementById('logo')

const inputSenha = document.querySelector('#senha')
const inputEmail = document.getElementById('email')

const emailErro = document.getElementById('email-erro')
const senhaErro = document.getElementById('senha-erro')
const preErro = document.getElementById('pre-erro')

let emailValid = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;

bnt.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')
    if (inputSenha.getAttribute('type') === 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

function email() {
    if (inputEmail.value.match(emailValid)) {
        emailErro.style.display = 'none'
        return true
    } else if (inputEmail.value == '') {
        emailErro.style.display = 'none'
        return false
    } else {
        emailErro.style.display = 'block'
        return false
    }
}

function senha() {
    if (inputSenha.value.length <= 4) {
        senhaErro.style.display = 'block'
        return false
    } else if (inputSenha.value == '') {
        senhaErro.style.display = 'none'
        return false
    } else {
        senhaErro.style.display = 'none'
        return true
    }
}

function entrar() {
    if (email && senha) {
        window.location.href = '../html/home.html'
    } else {
        preErro.style.display = 'block'
    }
}

logo.addEventListener('click', () => {
    window.location.href = '../html/home.html'
})