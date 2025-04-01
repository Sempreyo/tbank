document.addEventListener("DOMContentLoaded", () => {
	/* Анимация прорисовки иконки здания */
	const heroBg = document.querySelector(".hero__bg");

	if (heroBg) {
		const heroObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					heroBg.classList.add("show");

					/* Анимация "свет в окнах" */
					setTimeout(() => {
						const buildingWindows = heroBg.querySelectorAll(".building-window");
						[...buildingWindows]
							.sort((a, b) => a.dataset.order - b.dataset.order)
							.forEach(el => {
								setTimeout(() => {
									el.classList.add("active");
								}, 400 * +el.dataset.order);
							});
					}, 1100);
				}
			});
		});

		heroObserver.observe(heroBg);
	}
});
