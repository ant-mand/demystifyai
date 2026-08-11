var imgs = document.querySelectorAll('.image-slider img');
var dots = document.querySelectorAll('.dot');
var currentImg = 0;
const interval = 3000;

function changeSlide(n) {
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = 0;
        dots[i].className = dots[i].className.replace('active', '');
    }
        
    if (n != undefined) {
        currentImg = n;
        clearInterval(timer);
        timer = setInterval(changeSlide, interval);
    } else {
        currentImg = (currentImg + 1) % imgs.length;
    }

    imgs[currentImg].style.opacity = 1;
    dots[currentImg].className += ' active';
}

var timer = setInterval(changeSlide, interval);
