// ==============================
// HTML include
// ==============================
async function includeHTML(selector, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error(err);
    document.querySelector(selector).innerHTML = `<p style="color:red;">로드 실패: ${url}</p>`;
  }
}

// ==============================
// Navigation 초기화
// ==============================
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item.dropdown");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const offcanvas = document.querySelector("#mainNavbar");

  if (!navbarToggler || !offcanvas) return;

  // 1depth 메뉴 hover / click
  navItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    const submenu = item.querySelector(".dropdown-menu");
    if (!submenu) return;

    // PC hover
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        submenu.classList.add("is-open");
        link.classList.add("is-active");
        link.setAttribute("aria-expanded", "true");
      }
    });
    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 991) {
        submenu.classList.remove("is-open");
        link.classList.remove("is-active");
        link.setAttribute("aria-expanded", "false");
      }
    });

    // Mobile click (1depth)
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const isOpen = submenu.classList.contains("is-open");

        // 다른 1depth 메뉴 닫기
        navItems.forEach((i) => {
          if (i !== item) {
            const s = i.querySelector(".dropdown-menu");
            const l = i.querySelector(".nav-link");
            s?.classList.remove("is-open");
            l?.classList.remove("is-active");
            l?.setAttribute("aria-expanded", "false");
          }
        });

        // 현재 메뉴 토글
        if (isOpen) {
          submenu.classList.remove("is-open");
          link.classList.remove("is-active");
          link.setAttribute("aria-expanded", "false");
        } else {
          submenu.classList.add("is-open");
          link.classList.add("is-active");
          link.setAttribute("aria-expanded", "true");
        }
      }
    });
  });

  // 하위 메뉴 클릭 → 오프캔버스만 닫기
  document.querySelectorAll(".nav-item.dropdown .dropdown-menu .nav-link").forEach((subLink) => {
    subLink.addEventListener("click", () => {
      if (window.innerWidth <= 991 && offcanvas) {
        offcanvas.classList.remove("is-show");
        document.body.style.overflow = "";
      }
    });
  });

  // 외부 클릭 → 드롭다운 닫기
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item.dropdown") &&
        !e.target.closest(".navbar-toggler") &&
        !e.target.closest("#mainNavbar")) {
      navItems.forEach((item) => {
        const submenu = item.querySelector(".dropdown-menu");
        const link = item.querySelector(".nav-link");
        submenu?.classList.remove("is-open");
        link?.classList.remove("is-active");
        link?.setAttribute("aria-expanded", "false");
      });
    }
  });

  // 모바일 햄버거 토글
  navbarToggler.addEventListener("click", () => {
    offcanvas.classList.toggle("is-show");
    document.body.style.overflow = offcanvas.classList.contains("is-show") ? "hidden" : "";
  });

  // 리사이즈 시 드롭다운/오프캔버스 초기화
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;
    if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
      navItems.forEach((item) => {
        const submenu = item.querySelector(".dropdown-menu");
        const link = item.querySelector(".nav-link");
        submenu?.classList.remove("is-open");
        link?.classList.remove("is-active");
        link?.setAttribute("aria-expanded", "false");
      });
      offcanvas.classList.remove("is-show");
      document.body.style.overflow = "";
    }
    lastWidth = currentWidth;
  });
}

// ==============================
// Swiper 초기화
// ==============================
function initSwiper() {
  if (document.querySelector(".mainSwiper")) {
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
}

// ==============================
// 라우팅
// ==============================
const base = 'templates/partials';
const routes = {
  '/': `${base}/home.html`,
  '/about': `${base}/about.html`,
  '/culture': `${base}/culture.html`,
  '/contact': `${base}/contact.html`,
  '/business/cs': `${base}/business-cs.html`,
  '/business/mycar': `${base}/business-mycar.html`,
  '/business/o4o': `${base}/business-o4o.html`,
  '/business/operation': `${base}/business-operation.html`,
  '/services/platform': `${base}/services-platform.html`,
  '/services/app': `${base}/services-app.html`
};

async function router() {
  const path = window.location.hash.replace('#', '') || '/';
  const view = routes[path] || routes['/'];
  try {
    const res = await fetch(view);
    if (!res.ok) throw new Error(`Failed to fetch ${view}`);
    document.querySelector('#app').innerHTML = await res.text();
    initSwiper(); // Swiper 초기화
  } catch (err) {
    console.error(err);
    document.querySelector('#app').innerHTML = `<p style="color:red;">페이지 로드 실패</p>`;
  }
}

// ==============================
// SPA 초기화
// ==============================
window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
  await includeHTML('#header', 'templates/fragments/header.html');
  initNavigation(); // header include 후 Navigation 초기화
  await includeHTML('#footer', 'templates/fragments/footer.html');
  router();
});
