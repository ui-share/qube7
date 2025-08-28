// ==============================
// HTML include
// ==============================
async function includeHTML(selector, url) {
	const container = document.querySelector(selector);
	if (!container) return;

	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Failed to fetch ${url}`);
		container.innerHTML = await res.text();
	} catch (err) {
		console.error(err);
		container.innerHTML = `<p style="color:red;">로드 실패: ${url}</p>`;
	}
}

// ==============================
// 스크롤 차단 안전 처리
// ==============================
function preventDefault(e) { e.preventDefault(); }

function blockScroll(enable) {
	const body = document.body;
	if (enable) {
		body.style.overflow = 'hidden';
		body.addEventListener('touchmove', preventDefault, { passive: false });
	} else {
		body.style.overflow = '';
		body.removeEventListener('touchmove', preventDefault, { passive: false });
	}
}

// ==============================
// Navigation 초기화
// ==============================
function initNavigation() {
	const navItems = document.querySelectorAll(".nav-item.dropdown");
	const navbarToggler = document.querySelector(".navbar-toggler");
	const offcanvas = document.querySelector("#mainNavbar");
	const body = document.body;

	if (!navbarToggler || !offcanvas) return;

	function resetNavigationState() {
		navItems.forEach((item) => {
			const submenu = item.querySelector(".dropdown-menu");
			const link = item.querySelector(".nav-link");
			if (!submenu) return;

			submenu.classList.remove("is-open");
			submenu.inert = true;
			link.classList.remove("is-active");
			link.setAttribute("aria-expanded", "false");
		});

		offcanvas.classList.remove("is-show");
		blockScroll(false);
	}

	// PC hover
	navItems.forEach((item) => {
		const link = item.querySelector(".nav-link");
		const submenu = item.querySelector(".dropdown-menu");
		if (!submenu) return;

		item.addEventListener("mouseenter", () => {
			if (window.innerWidth > 991) {
				submenu.classList.add("is-open");
				submenu.inert = false;
				link.classList.add("is-active");
				link.setAttribute("aria-expanded", "true");
			}
		});

		item.addEventListener("mouseleave", () => {
			if (window.innerWidth > 991) {
				submenu.classList.remove("is-open");
				submenu.inert = true;
				link.classList.remove("is-active");
				link.setAttribute("aria-expanded", "false");
			}
		});
	});

	// 모바일 1depth 클릭
	document.querySelectorAll("#mainNavbar .nav-item > .nav-link").forEach((link) => {
		link.addEventListener("click", (e) => {
			const parentItem = link.closest(".nav-item");
			const submenu = parentItem.querySelector(".dropdown-menu");

			if (window.innerWidth <= 991) {
				if (submenu) {
					e.preventDefault();
					const isOpen = submenu.classList.contains("is-open");

					resetNavigationState();

					if (!isOpen) {
						submenu.classList.add("is-open");
						submenu.inert = false;
						link.classList.add("is-active");
						link.setAttribute("aria-expanded", "true");

						offcanvas.classList.add("is-show");
						blockScroll(true);
					}
				} else {
					resetNavigationState();
				}
			}
		});
	});

	// 하위 메뉴 클릭
	document.querySelectorAll("#mainNavbar .dropdown-menu .nav-link").forEach((subLink) => {
		subLink.addEventListener("click", () => {
			if (window.innerWidth <= 991) resetNavigationState();
		});
	});

	// 로고 클릭
	const logoLink = document.querySelector(".header__brand a[href='#/']");
	if (logoLink) {
		logoLink.addEventListener("click", () => {
			if (window.innerWidth <= 991) resetNavigationState();
		});
	}

	// 외부 클릭
	document.addEventListener("click", (e) => {
		if (
			!e.target.closest(".nav-item.dropdown") &&
			!e.target.closest(".navbar-toggler") &&
			!e.target.closest("#mainNavbar")
		) {
			resetNavigationState();
		}
	});

	// 모바일 햄버거 버튼
	navbarToggler.addEventListener("click", () => {
		const show = offcanvas.classList.toggle("is-show");
		blockScroll(show);
	});

	// 리사이즈 시 초기화
	let lastWidth = window.innerWidth;
	window.addEventListener("resize", () => {
		const currentWidth = window.innerWidth;
		if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
			resetNavigationState();
		}
		lastWidth = currentWidth;
	});
}

// ==============================
// Swiper 초기화 (passive-safe)
// ==============================
let mainSwiperInstance = null;
function initSwiper() {
	const swiperEl = document.querySelector(".mainSwiper");
	if (!swiperEl) return;

	if (mainSwiperInstance) mainSwiperInstance.destroy(true, true);

	mainSwiperInstance = new Swiper(".mainSwiper", {
		cssMode: true,
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
		pagination: { el: ".swiper-pagination", clickable: true },
		mousewheel: true,
		keyboard: true,
		touchStartPreventDefault: false,
		passiveListeners: true,
	});
}

// ==============================
// SPA 라우팅 + meta 업데이트
// ==============================
const base = "templates/partials";
const routes = {
	"/": { view: `${base}/home.html`, title: "홈 | 주식회사 큐브7", description: "한눈에 보는 회사 소개 및 주요 서비스" },
	"/about": { view: `${base}/about.html`, title: "회사소개 | 주식회사 큐브7", description: "우리의 비전과 미션" },
	"/culture": { view: `${base}/culture.html`, title: "기업문화 | 주식회사 큐브7", description: "함께 성장하는 문화" },
	"/contact": { view: `${base}/contact.html`, title: "문의하기 | 주식회사 큐브7", description: "연락처 및 문의 안내" },
	"/business/cs": { view: `${base}/business-cs.html`, title: "CS사업 | 주식회사 큐브7", description: "CS사업부 소개" },
	"/business/mycar": { view: `${base}/business-mycar.html`, title: "MyCar | 주식회사 큐브7", description: "자동차 관련 사업" },
	"/business/o4o": { view: `${base}/business-o4o.html`, title: "O4O | 주식회사 큐브7", description: "Online for Offline 서비스" },
	"/business/operation": { view: `${base}/business-operation.html`, title: "Operation | 주식회사 큐브7", description: "운영관리 서비스" },
	"/services/platform": { view: `${base}/services-platform.html`, title: "플랫폼 서비스 | 주식회사 큐브7", description: "플랫폼 기반 사업 소개" },
	"/services/app": { view: `${base}/services-app.html`, title: "앱 서비스 | 주식회사 큐브7", description: "앱 서비스 제공" },
};

function updateMeta(title, description) {
	document.title = title;
	let descTag = document.querySelector("meta[name='description']");
	if (!descTag) {
		descTag = document.createElement("meta");
		descTag.name = "description";
		document.head.appendChild(descTag);
	}
	descTag.content = description;
}

async function router() {
	const path = window.location.hash.replace("#", "") || "/";
	const route = routes[path] || routes["/"];
	try {
		const res = await fetch(route.view);
		if (!res.ok) throw new Error(`Failed to fetch ${route.view}`);
		document.querySelector("#app").innerHTML = await res.text();

		updateMeta(route.title, route.description);
		initSwiper();
	} catch (err) {
		console.error(err);
		document.querySelector("#app").innerHTML = `<p style="color:red;">페이지 로드 실패</p>`;
	}
}

// ==============================
// SPA 초기화
// ==============================
window.addEventListener("hashchange", router);
window.addEventListener("load", async () => {
	await includeHTML("#header", "templates/fragments/header.html");
	initNavigation();
	await includeHTML("#footer", "templates/fragments/footer.html");
	router();
});
