let eyeSenha = document.querySelector('.eye-senha')
let eyeConf = document.querySelector('.eye-conf')

const inputConf = document.querySelector('#confSenha')
const inputSenha = document.querySelector('#senha')
const inputEmail = document.getElementById('email')

const emailErro = document.getElementById('email-erro')
const senhaErro = document.getElementById('senha-erro')
const confErro = document.getElementById('conf-erro')
const preErro = document.getElementById('pre-erro')

let emailValid = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;


eyeSenha.addEventListener('click', () => {
    if (inputSenha.getAttribute('type') === 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})

eyeConf.addEventListener('click', () => {
    if (inputConf.getAttribute('type') === 'password') {
        inputConf.setAttribute('type', 'text')
    } else {
        inputConf.setAttribute('type', 'password')
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

function confSenha() {
    if (inputSenha.value != inputConf.value) {
        confErro.style.display = 'block'
        return false
    } else if (inputConf.value == '') {
        confErro.style.display = 'none'
        return false
    } else {
        confErro.style.display = 'none'
        return true
    }
}

function cadastrar() {
    if (confSenha && email && senha) {
        window.location.href = '../html/home.html'
    } else {
        preErro.style.display = 'block'
    }
}