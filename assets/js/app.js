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

	// PC Hover
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

	// Mobile Click
	function handleMobileMenu(item) {
		const link = item.querySelector(".nav-link");
		const submenu = item.querySelector(".dropdown-menu");
		if (!submenu) return;

		link.addEventListener("click", (e) => {
			if (window.innerWidth <= 991) {
				e.preventDefault();
				const isOpen = submenu.classList.contains("is-open");

				// 이미 열려있으면 → 닫기
				if (isOpen) {
					submenu.classList.remove("is-open");
					link.classList.remove("is-active");
					link.setAttribute("aria-expanded", "false");
					return;
				}

				// 닫혀있으면 → 다른 메뉴 닫고 자신 열기
				closeAllDropdowns();
				submenu.classList.add("is-open");
				link.classList.add("is-active");
				link.setAttribute("aria-expanded", "true");

				// 모바일에서 메뉴 클릭 시 offcanvas 닫기 + body 스크롤 복원
				if (offcanvas && offcanvas.classList.contains("is-show")) {
					offcanvas.classList.remove("is-show");
					document.body.style.overflow = "";
				}
			}
		});
	}

	// 모든 드롭다운 닫기
	function closeAllDropdowns() {
		document.querySelectorAll(".nav-item.dropdown .dropdown-menu.is-open")
			.forEach(m => m.classList.remove("is-open"));
		document.querySelectorAll(".nav-item.dropdown .nav-link.is-active")
			.forEach(l => {
				l.classList.remove("is-active");
				l.setAttribute("aria-expanded", "false");
			});
	}

	// 메뉴 초기화
	function resetMenus() {
		closeAllDropdowns();
		if (offcanvas) {
			offcanvas.classList.remove("is-show");
			document.body.style.overflow = "";
		}
	}

	// 바인딩
	navItems.forEach(item => {
		handleDesktopMenu(item);
		handleMobileMenu(item);
	});

	// 리사이즈 시 lastWidth 비교 후 초기화
	let lastWidth = window.innerWidth;
	window.addEventListener("resize", () => {
		const currentWidth = window.innerWidth;
		if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
			resetMenus();
		}
		lastWidth = currentWidth;
	});

	// 외부 클릭 시 드롭다운 닫기
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".nav-item.dropdown") &&
			!e.target.closest(".navbar-toggler") &&
			!e.target.closest("#mainNavbar")) {
			closeAllDropdowns();
		}
	});

	// Offcanvas 토글
	if (navbarToggler && offcanvas) {
		navbarToggler.addEventListener("click", () => {
			if (window.innerWidth <= 991) {
				const isShow = offcanvas.classList.toggle("is-show");
				document.body.style.overflow = isShow ? "hidden" : "";
				if (isShow) closeAllDropdowns();
			}
		});
	}
}

// 라우팅 테이블
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
	await includeHTML('#header', 'templates/fragments/header.html');
	initNavigation(); // header include 후 네비게이션 이벤트 바인딩
	await includeHTML('#footer', 'templates/fragments/footer.html');
	router();

	// ==========================
	// 메인 Swiper 초기화
	const mainSwiperEl = document.querySelector(".mainSwiper");
	if (mainSwiperEl) {
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
	}
});
