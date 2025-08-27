
document.addEventListener("DOMContentLoaded", function () {
    // Swiper 초기화
    var swiper = new Swiper(".mainSwiper", {
        cssMode: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        mousewheel: true,
        keyboard: true,
    });
});
