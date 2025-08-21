/* eslint-disable no-new */
// main.js
document.addEventListener("DOMContentLoaded", () => {
  const ctaBtn = document.getElementById("ctaBtn");

  if (ctaBtn) {
	ctaBtn.addEventListener("click", () => {
	  alert("자세히 보기 버튼을 눌렀습니다!");
	});
  }
});
