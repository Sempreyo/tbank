document.addEventListener("DOMContentLoaded", () => {
	const articleCarousel1 = document.querySelector(".article__slider--1");
	const articleCarousel2 = document.querySelector(".article__slider--2");
	let slider1 = "";
	let slider2 = "";
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
		const articleCarousel1Next = articleCarousel1.querySelector(".article__nav-mobile .swiper-btn-next");
		const articleCarousel1Prev = articleCarousel1.querySelector(".article__nav-mobile .swiper-btn-prev");
		const articleCarousel2Next = articleCarousel2.querySelector(".article__nav-mobile .swiper-btn-next");
		const articleCarousel2Prev = articleCarousel2.querySelector(".article__nav-mobile .swiper-btn-prev");
		const menuItems1 = articleCarousel1.querySelectorAll(".circle-menu__item");
		const menuItems2 = articleCarousel2.querySelectorAll(".circle-menu__item");
		const menuBorders1 = articleCarousel1.querySelectorAll(".circle-menu__border-item");
		const menuBorders2 = articleCarousel2.querySelectorAll(".circle-menu__border-item");
		const menuIcons1 = articleCarousel1.querySelectorAll(".circle-menu__centered-icon");
		const menuIcons2 = articleCarousel2.querySelectorAll(".circle-menu__centered-icon");
		const aricleTitles1 = articleCarousel1.querySelectorAll(".article__title");
		const aricleTitles2 = articleCarousel2.querySelectorAll(".article__title");
		const aricleContents1 = articleCarousel1.querySelectorAll(".article__person");
		const aricleContents2 = articleCarousel2.querySelectorAll(".article__person");

		const setMaxHeight = (elems) => {
			elems.forEach(el => el.style.height = "auto");

			const max =  Math.max(...[...elems].map(el => el.offsetHeight));

			elems.forEach(el => {
				el.style.height = `${max}px`;
			});
		}

		setMaxHeight(aricleTitles1);
		setMaxHeight(aricleTitles2);
		setMaxHeight(aricleContents1);
		setMaxHeight(aricleContents2);

		const activateMenu = (activeIndex, border, icon, isNextSwipers=false) => { // isNextSwipers для расчета индексов элементов следующих после первого свайперов
			border.forEach(border => border.classList.remove("active"));
			border[isNextSwipers ? activeIndex + 2 : activeIndex].classList.add("active");
			icon.forEach(icon => icon.classList.remove("active"));
			icon[isNextSwipers ? activeIndex + 2 : activeIndex].classList.add("active");
		}

		const changeActiveMenu1 = (menuItem, index) => {
			switch (index) {
				case 0:
					activateMenu(0, menuBorders1, menuIcons1);
					break;
				case 1:
					activateMenu(1, menuBorders1, menuIcons1);
					break;
			}
		}

		const changeActiveMenu2 = (menuItem, index) => {
			switch (index) {
				case 0:
					activateMenu(0, menuBorders2, menuIcons2, true);
					break;
				case 1:
					activateMenu(1, menuBorders2, menuIcons2, true);
					break;
			}
		}

		const clickActiveMenu1 = (menuItem, index) => {
			switch (index) {
				case "0":
					slider1.slideTo(0);
					activateMenu(0, menuBorders1, menuIcons1);
					break;
				case "1":
					slider1.slideTo(1);
					activateMenu(1, menuBorders1, menuIcons1);
					break;
				case "2":
					anchorScroll(menuItem);

					setTimeout(() => {
						slider2.slideTo(0);
						activateMenu(2, menuBorders2, menuIcons2);
					}, TRANSITION_PAUSE);
					break;
				case "3":
					anchorScroll(menuItem);

					setTimeout(() => {
						slider2.slideTo(1);
						activateMenu(3, menuBorders2, menuIcons2);
					}, TRANSITION_PAUSE);
					break;
			}
		}

		const clickActiveMenu2 = (menuItem, index) => {
			switch (index) {
				case "0":
					anchorScroll(menuItem);

					setTimeout(() => {
						slider1.slideTo(0);
						activateMenu(0, menuBorders1, menuIcons1);
					}, TRANSITION_PAUSE);
					break;
				case "1":
					anchorScroll(menuItem);

					setTimeout(() => {
						slider1.slideTo(1);
						activateMenu(1, menuBorders1, menuIcons1);
					}, TRANSITION_PAUSE);
					break;
				case "2":
					slider2.slideTo(0);
					activateMenu(2, menuBorders2, menuIcons2);
					break;
				case "3":
					slider2.slideTo(1);
					activateMenu(3, menuBorders2, menuIcons2);
					break;
			}
		}

		slider1 = new Swiper(articleCarousel1, {
			init: false,
			slidesPerView: 1,
			spaceBetween: 10,
			effect: "fade",
			autoHeight: true,
			navigation: {
				nextEl: articleCarousel1Next,
				prevEl: articleCarousel1Prev
			},
			on: {
				slideChange: function (swiper) {
					changeActiveMenu1(swiper.slides[swiper.activeIndex], swiper.activeIndex);
				}
			}
		});

		slider2 = new Swiper(articleCarousel2, {
			init: false,
			slidesPerView: 1,
			spaceBetween: 10,
			effect: "fade",
			autoHeight: true,
			navigation: {
				nextEl: articleCarousel2Next,
				prevEl: articleCarousel2Prev
			},
			on: {
				slideChange: function (swiper) {
					changeActiveMenu2(swiper.slides[swiper.activeIndex], swiper.activeIndex);
				}
			}
		});

		slider1.on("init", function() {
			menuItems1.forEach(el => {
				el.addEventListener("click", () => {
					clickActiveMenu1(el, el.dataset.menu);
				})
			});
		});

		slider2.on("init", function() {
			menuItems2.forEach(el => {
				el.addEventListener("click", () => {
					clickActiveMenu2(el, el.dataset.menu);
				})
			});
		});

		slider1.init();
		slider2.init();

		const articlesSections = document.querySelectorAll(".article");

		if (articlesSections && articlesSections.length > 0) {
			const articleResizeObserver = new ResizeObserver(entries => {
				setMaxHeight(aricleTitles1);
				setMaxHeight(aricleTitles2);
				setMaxHeight(aricleContents1);
				setMaxHeight(aricleContents2);
			});

			articlesSections.forEach(article => {
				articleResizeObserver.observe(article);
			});
		}
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
