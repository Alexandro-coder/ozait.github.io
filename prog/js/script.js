function checkScroll(){
    if (document.getElementsByClassName('header').length != 0) {
            header = document.getElementsByClassName('header')[0]
        if ($(window).scrollTop() > 200) {
            if (document.getElementsByClassName('header').length != 0) {
                header.classList.add('header-active')
            }
            
        }
        else {
            if (header.length !=0) {
                header.classList.remove('header-active')
            }
            
        }
    }
}

$(document).ready(function() {
    checkScroll();
    $(window).scroll(checkScroll);
});

qua_nav = document.getElementsByClassName('qua-nav-item')
qua_row = document.getElementsByClassName('qua-row')

for (let i = 0; i < qua_nav.length; i++) {
    qua_nav[i].addEventListener('click', function() {
        if (!qua_nav[i].classList.contains('qua-nav-item_active')) {
            for (let j = 0; j < qua_nav.length; j++) {
                qua_nav[j].classList.remove('qua-nav-item_active')
                qua_row[j].classList.remove('qua-row_active')
            }
            qua_nav[i].classList.add('qua-nav-item_active')
            qua_row[i].classList.add('qua-row_active')
        }
    })
}

qst_item = document.getElementsByClassName('qst-item')

for (let i = 0; i < qst_item.length; i++) {
    qst_item[i].addEventListener('click', function() {
        if (qst_item[i].classList.contains('qst-item_active')) {
            qst_item[i].classList.remove('qst-item_active')
        } else {
            for (let j = 0; j < qst_item.length; j++) {
                qst_item[j].classList.remove('qst-item_active')
            }
            qst_item[i].classList.add('qst-item_active')
        }
    })
}