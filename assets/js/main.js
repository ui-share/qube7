// Swiper 초기화 함수
function initSwiper() {
    const swiperEl = document.querySelector(".mainSwiper");
    if (!swiperEl) return; // 해당 페이지에 Swiper 없으면 종료

    new Swiper(".mainSwiper", {
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
}

// 기존 router() 수정
async function router() {
    const path = window.location.hash.replace('#', '') || '/';
    const view = routes[path] || routes['/'];
    try {
        const res = await fetch(view);
        if (!res.ok) throw new Error(`Failed to fetch ${view}`);
        document.querySelector('#app').innerHTML = await res.text();

        // Swiper 초기화 호출
        initSwiper();

    } catch (err) {
        console.error(err);
        document.querySelector('#app').innerHTML = `<p style="color:red;">페이지 로드 실패</p>`;
    }
}
