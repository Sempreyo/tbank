document.addEventListener("DOMContentLoaded", () => {
	const articleCarousel1 = document.querySelector(".article__slider--1");
	const articleCarousel2 = document.querySelector(".article__slider--2");
	const TRANSITION_PAUSE = 500;

	const anchorScroll = (elem) => {
		const targetId = elem.getAttribute('data-target');
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

	if (articleCarousel1 && articleCarousel2) {
		const slider1 = new Swiper(articleCarousel1, {
			init: false,
			slidesPerView: 1,
			spaceBetween: 10,
			effect: "fade",
			autoHeight: true,
			pagination: {
				el: articleCarousel1.querySelector(".article__slider--1 .swiper-pagination"),
				clickable: true
			},
			breakpoints: {
				992: {
					pagination: false
				}
			}
		});

		const slider2 = new Swiper(articleCarousel2, {
			init: false,
			slidesPerView: 1,
			spaceBetween: 10,
			effect: "fade",
			autoHeight: true,
			pagination: {
				el: articleCarousel2.querySelector(".article__slider--2 .swiper-nav .swiper-pagination"),
				clickable: true
			},
			breakpoints: {
				992: {
					pagination: false
				}
			}
		});

		slider1.on("init", function() {
			const menuItems1 = slider1.el.querySelectorAll(".circle-menu__item");
			const menuBorders1 = slider1.el.querySelectorAll(".circle-menu__border-item");
			const menuBorders2 = slider2.el.querySelectorAll(".circle-menu__border-item");
			const menuIcons1 = slider1.el.querySelectorAll(".circle-menu__centered-icon");
			const menuIcons2 = slider2.el.querySelectorAll(".circle-menu__centered-icon");

			menuItems1.forEach(el => {
				el.addEventListener("click", () => {
					switch (el.dataset.menu) {
						case "0":
							slider1.slideTo(0);
							menuBorders1.forEach(border => border.classList.remove("active"));
							menuBorders1[0].classList.add("active");
							menuIcons1.forEach(icon => icon.classList.remove("active"));
							menuIcons1[0].classList.add("active");
							break;
						case "1":
							slider1.slideTo(1);
							menuBorders1.forEach(border => border.classList.remove("active"));
							menuBorders1[1].classList.add("active");
							menuIcons1.forEach(icon => icon.classList.remove("active"));
							menuIcons1[1].classList.add("active");
							break;
						case "2":
							anchorScroll(el);

							setTimeout(() => {
								slider2.slideTo(0);
								menuBorders2.forEach(border => border.classList.remove("active"));
								menuBorders2[2].classList.add("active");
								menuIcons2.forEach(icon => icon.classList.remove("active"));
								menuIcons2[2].classList.add("active");
							}, TRANSITION_PAUSE);
							break;
						case "3":
							anchorScroll(el);

							setTimeout(() => {
								slider2.slideTo(1);
								menuBorders2.forEach(border => border.classList.remove("active"));
								menuBorders2[3].classList.add("active");
								menuIcons2.forEach(icon => icon.classList.remove("active"));
								menuIcons2[3].classList.add("active");
							}, TRANSITION_PAUSE);
							break;
					}
				});
			});
		});

		slider2.on("init", function() {
			const menuItems2 = slider2.el.querySelectorAll(".circle-menu__item");
			const menuBorders1 = slider1.el.querySelectorAll(".circle-menu__border-item");
			const menuBorders2 = slider2.el.querySelectorAll(".circle-menu__border-item");
			const menuIcons1 = slider1.el.querySelectorAll(".circle-menu__centered-icon");
			const menuIcons2 = slider2.el.querySelectorAll(".circle-menu__centered-icon");

			menuItems2.forEach(el => {
				el.addEventListener("click", () => {
					switch (el.dataset.menu) {
						case "0":
							anchorScroll(el);

							setTimeout(() => {
								slider1.slideTo(0);
								menuBorders1.forEach(border => border.classList.remove("active"));
								menuBorders1[0].classList.add("active");
								menuIcons1.forEach(icon => icon.classList.remove("active"));
								menuIcons1[0].classList.add("active");
							}, TRANSITION_PAUSE);
							break;
						case "1":
							anchorScroll(el);

							setTimeout(() => {
								slider1.slideTo(1);
								menuBorders1.forEach(border => border.classList.remove("active"));
								menuBorders1[1].classList.add("active");
								menuIcons1.forEach(icon => icon.classList.remove("active"));
								menuIcons1[1].classList.add("active");
							}, TRANSITION_PAUSE);
							break;
						case "2":
							slider2.slideTo(0);
							menuBorders2.forEach(border => border.classList.remove("active"));
							menuBorders2[2].classList.add("active");
							menuIcons2.forEach(icon => icon.classList.remove("active"));
							menuIcons2[2].classList.add("active");
							break;
						case "3":
							slider2.slideTo(1);
							menuBorders2.forEach(border => border.classList.remove("active"));
							menuBorders2[3].classList.add("active");
							menuIcons2.forEach(icon => icon.classList.remove("active"));
							menuIcons2[3].classList.add("active");
							break;
					}
				});
			});
		});

		slider1.init();
		slider2.init();
	}

	/* Горизонтальный прокручивающийся слайдер с карточками */
	const horizontalCarousel = document.querySelectorAll(".horizontal-slider__slider .swiper");

	if (horizontalCarousel.length > 0) {
		horizontalCarousel.forEach(el => {
			const horizontalCarouselNext = el.nextElementSibling.querySelector(".swiper-btn-next");
			const horizontalCarouselPrev = el.nextElementSibling.querySelector(".swiper-btn-prev");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 10,
				navigation: {
					nextEl: horizontalCarouselNext,
					prevEl: horizontalCarouselPrev,
				},
				breakpoints: {
					576: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: el.classList.contains("other-articles") ? 3 : 'auto',
						spaceBetween: 20
					}
				}
			});
		});
	}

	/* Слайдшоу с текстом */
	const slideshowCarousel = document.querySelectorAll(".slideshow__slider .swiper");

	if (slideshowCarousel.length > 0) {
		slideshowCarousel.forEach(el => {
			const slideshowCarouselNext = el.nextElementSibling.querySelector(".swiper-btn-next");
			const slideshowCarouselPrev = el.nextElementSibling.querySelector(".swiper-btn-prev");

			const slider = new Swiper(el, {
				slidesPerView: 1,
				spaceBetween: 10,
				navigation: {
					nextEl: slideshowCarouselNext,
					prevEl: slideshowCarouselPrev,
				}
			});
		});
	}
});
