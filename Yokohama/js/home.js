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

const menuList = document.querySelector('.menuList')

menuList.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
})

