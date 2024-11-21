const logoL = document.querySelector('.logoL')
const logoF = document.querySelector('.logoF')

logoL.addEventListener('click', () => {
    window.location.href = '/'
});
logoF.addEventListener('click', () => {
    window.location.href = '/'
});

var al = document.getElementById("reservado")
al.onclick = function () {
    alert("Reserva efetuada!")
    adulto.removeAttribute("style")
}
src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"
 function reservado(){
    swall({
        title: "Reserva efetuada com sucesso!",
        text:  "Obrigada por sua preferência em nos escolher",
        icon:  "sucess",
    });
 }
