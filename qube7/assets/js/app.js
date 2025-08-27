// 공통 HTML include
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

// 네비게이션 초기화
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item.dropdown");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const offcanvas = document.querySelector("#mainNavbar");

  function handleDesktopMenu(item) {
    const link = item.querySelector(".nav-link");
    const submenu = item.querySelector(".dropdown-menu");
    if (!submenu) return;

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
  }

  function handleMobileMenu(item) {
    const link = item.querySelector(".nav-link");
    const submenu = item.querySelector(".dropdown-menu");
    if (!submenu) return;

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const isOpen = submenu.classList.contains("is-open");
        if (isOpen) {
          submenu.classList.remove("is-open");
          link.classList.remove("is-active");
          link.setAttribute("aria-expanded", "false");
          return;
        }
        closeAllDropdowns();
        submenu.classList.add("is-open");
        link.classList.add("is-active");
        link.setAttribute("aria-expanded", "true");
      }
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".nav-item.dropdown .dropdown-menu.is-open").forEach(m => m.classList.remove("is-open"));
    document.querySelectorAll(".nav-item.dropdown .nav-link.is-active").forEach(l => {
      l.classList.remove("is-active");
      l.setAttribute("aria-expanded", "false");
    });
  }

  function resetMenus() {
    closeAllDropdowns();
    if (offcanvas) offcanvas.classList.remove("is-show");
  }

  navItems.forEach(item => {
    handleDesktopMenu(item);
    handleMobileMenu(item);
  });

  window.addEventListener("resize", () => {
    resetMenus();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item.dropdown") &&
        !e.target.closest(".navbar-toggler") &&
        !e.target.closest("#mainNavbar")) {
      closeAllDropdowns();
    }
  });

  if (navbarToggler && offcanvas) {
    navbarToggler.addEventListener("click", () => {
      if (window.innerWidth <= 991) {
        offcanvas.classList.toggle("is-show");
        if (offcanvas.classList.contains("is-show")) closeAllDropdowns();
      }
    });
  }
}

// 라우팅 테이블
const base = '/qube7/templates/partials';
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

// 라우터 실행
async function router() {
  const path = window.location.hash.replace('#', '') || '/';
  const view = routes[path] || routes['/'];
  try {
    const res = await fetch(view);
    if (!res.ok) throw new Error(`Failed to fetch ${view}`);
    document.querySelector('#app').innerHTML = await res.text();
  } catch (err) {
    console.error(err);
    document.querySelector('#app').innerHTML = `<p style="color:red;">페이지 로드 실패</p>`;
  }
}

// 초기화
window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
  await includeHTML('#header', '/qube7/templates/fragments/header.html');
  initNavigation(); // header include 후 네비게이션 이벤트 바인딩
  await includeHTML('#footer', '/qube7/templates/fragments/footer.html');
  router();
});
