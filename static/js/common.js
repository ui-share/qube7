

$( document ).ready(function() {
	
	$('#ok').click(function(){
		
		$('.overlay').removeClass('active');
		$('.overlay').addClass("hidden");
	});
	// modal close
	$('.overlay .btn-close').click(function(){
		
		$('.overlay').removeClass('active');
		$('.overlay').addClass("hidden");
	});
	$('.overlay .closeBt').click(function(){
		
		$('.overlay').removeClass('active');
		$('.overlay').addClass("hidden");
	});

	$('#connect').click(function(){
		$('#connect_pop').removeClass('hidden');
		$('#connect_pop').addClass("active");
	});
	$('#connect2').click(function(){
		$('#connect2_pop').removeClass('hidden');
		$('#connect2_pop').addClass("active");
	});	

$('#info').click(function() {
	$('#info_pop').removeClass('hidden');
	$('#info_pop').addClass("active");
});

	$('#counselor').click(function() {
		$('#counsel_pop').removeClass('hidden');
		$('#counsel_pop').addClass("active");
	});
	// endCall
	$(".footer .end").click(function () {
		$(location).attr('href','endCall.html');
	});

	$(".footer .end").click(function () {
		$(location).attr('href','endCall.html');
	});
   
   $("#cancelASP").click(function () {
		$(location).attr('href','b01.html');
	});
   $("#nextb01").click(function () {
		$(location).attr('href','b01.html');
	});
   $("#nextb07").click(function () {
		$(location).attr('href','b07.html');
	});

	
	// input clear
	$('input.hasicon').on('input propertychange', function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.siblings('.clearerBT').toggleClass('hidden', !visible);
	}).trigger('propertychange');

	$('.clearerBT').click(function() {
		$(this).siblings('input.hasicon').val('').trigger('propertychange').focus();
	});
	
	$("#viewLarge").click(function () {
		if($(".view_state").hasClass("view__large") === true) {
			$('.view_state').removeClass('view__large');
		}else{
			$('.view_state').addClass('view__large');
		}
	
		if( $("#viewLarge .label").text() == '크게보기' ) {
			$("#viewLarge .label").text('작게보기');
			$('.viewLarge').attr('class','button fit iconBt viewSmall');
		}
		else {
			$("#viewLarge .label").text('크게보기');
			$('.viewSmall').attr('class','button fit iconBt viewLarge');
		}
	});
	$(".more").click(function () {
		$('.botnavi__more').addClass("active");
	});

	
	var swiper = new Swiper(".benner-swiper", {
		slidesPerView: '1',
		spaceBetween: 1,
		slidesPerGroup: 1,
		// centeredSlides: true,
		loop: true,
		// loopFillGroupWithBlank: true,
		loopAdditionalSlides: 1,
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
			stopAutoOnClick: false,
		},
    	
		// pagination 기본은 bullet
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},

		// 좌우 화살표 navigation element 지정
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		// 반응형
		breakpoints: {
			// * =<이하가 되면 슬라이드 간 간격을 0으로
			480: {
				slidesPerView: '1',
				spaceBetween: 1,
			},
			768: {
				slidesPerView: '2',
				slidesPerGroup: '1',
				spaceBetween: 10,
				
			},
			992: {
				slidesPerView: '3',
				slidesPerGroup: '1',
				spaceBetween: 10,
				
			},
		},

		// on: {
		// 	init: function() {
		// 		$('.swiper-slide').addClass('changed');

		// 		// fraction에 현재 인덱스와 전체 인덱스 표시
		// 		// this.loopedSlides는 loop, slidesPerView: 'auto'일 때 제대로 동작
		// 		$('.custom-fraction .current').text(this.realIndex + 1);
		// 		$('.custom-fraction .all').text(this.loopedSlides);
				
		// 	},

		// 	slideChangeTransitionStart: function() {
		// 		// 기본적으로 제공하는 swiper-slide-active 클래스를 이용해
		// 		// css transition 애니메이션 작성 가능하다.
		// 		// 다만 루프 모드일 때에는 루프 픽스를 하며 slide를 바꿔치기를 하는데,
		// 		// 이 때 플리커링이 발생할 수 있다.
		// 		// css transition을 서로 다르게 설정한 changed, changing 클래스를 이용
		// 		$('.swiper-slide').addClass('changing');
		// 		$('.swiper-slide').removeClass('changed');

		// 		// 페이지 넘어갈 때마다 fraction 현재 인덱스 변경
		// 		$('.custom-fraction .current').text(this.realIndex + 1);
		// 	},

		// 	slideChangeTransitionEnd: function() {
		// 		// changing : transition O
		// 		// changed : transition X
		// 		$('.swiper-slide').removeClass('changing');
		// 		$('.swiper-slide').addClass('changed');
		// 	}
		// },
	});

	$('.swiper-button').on('click', function(e){
		$('.swiper').toggleClass('pause');
	  });
	  
	  $('.swiper-button').click(function() {
		  if ($('.swiper').hasClass('pause')) {
			swiper.autoplay.stop();
		  }
		  else {
			swiper.autoplay.start();
		  }
	  });

	$('.swiper-button').on('click', function(e){
		$('.swiper-button').toggleClass('auto-start');
	  });
	  
	  $('.swiper-button').click(function() {
		  if ($('.swiper-button').hasClass('auto-start')) {			
			$(".swiper-button .label").text('슬라이드 자동재생 시작');
		  }
		  else {
			$(".swiper-button .label").text('슬라이드 자동재생 정지');
		  }
	  });



	


	// Dark Theme Control Toggler
	function viewToggleGo () {

		const viewToggle = document.querySelector('#viewLarge'); 										// 모드변경 체크박스 정의
		
		if (!viewToggle) {return !1;}																			// 모드변경 체크박스 없을 시 종료
		const Realroot = document.querySelector('html');
		
		viewToggle.addEventListener('change', function(event) {
		
			// dwp_dark Class not in
			if (!Realroot.classList.contains('view__large')) { 
		
				Realroot.classList.add('view__large'); 																// 다크모드 클래스 추가
				localStorage.setItem('viewToggle', viewToggle.checked); 											// whatMode에 체크박스의 체크 여부 저장
				
			// dwp_dark Class in
			} else { 
		
				Realroot.classList.remove('dview__large');																// 다크모드 클래스 제거
				localStorage.setItem('viewToggle', viewToggle.checked);											// whatMode에 체크박스 체크 여부 저장
		
			}
		
		})
		
		}
		
		viewToggleGo ()
		
		document.addEventListener('DOMContentLoaded',function(){
		
		const Realroot = document.querySelector('html'); 
		const viewToggle = localStorage.getItem('viewToggle');															// whatMode 체크 여부 값 호출
		
		// Light Mode
		if (viewToggle === "false" || viewToggle == null) {																// 체크 여부 false면, 라이트모드
			
			return !1;
		
		// Dark Mode
		} else { 
		
			const viewToggle = document.querySelector('#viewLarge'); 									// 모드변경 체크박스
			
			if(viewToggle){ //스크립트 오류가 발생하여 null 처리 추가하였습니다~ by jeongsuk.ock
		
				viewToggle.checked = true;																		// 체크박스 체크
				Realroot.classList.add('dview__large');																	// html에 다크모드 클래스 추가
		
			}                
		
		}
		
		});


});
