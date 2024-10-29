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

}

function pagSobre() {
    window.location.href = '../html/sobre.html'
}