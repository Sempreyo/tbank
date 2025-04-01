document.addEventListener("DOMContentLoaded", () => {
	const gridElement = document.querySelector(".advantages__grid");
	const SKIP_ELEMENT_INDEX = 8;
	let grid = "";
	let interval = "";

	if (gridElement) {
		const gridInit = () => {
			if (!grid || grid._isDestroyed) {
				grid = new Muuri(".advantages__grid", {
					dragEnabled: false,
					layoutOnResize: false,
					layout: {
						//fillGaps: true,
						horizontal: false,
						/*itemMargin: {
							x: 7,
							y: 7
						}*/
					}
				});
			}
		}

		gridInit();

		const gridDestroy = () => {
			const items = document.querySelectorAll(".advantages__item");

			items.forEach(item => {
				item.removeAttribute("style");
			});

			grid.destroy();
			grid = null;
		}

		/* Получаем 2 случайных индекса элементов */
		const getRandomIndexes = (totalItems) => {
			let index1 = Math.floor(Math.random() * totalItems);
			let index2 = Math.floor(Math.random() * totalItems);

			/* Проверим чтобы индекс был не равен значению, которое нужно пропустить */
			while (index1 === SKIP_ELEMENT_INDEX || index2 === SKIP_ELEMENT_INDEX) {
				if (index1 === SKIP_ELEMENT_INDEX) {
					index1 = Math.floor(Math.random() * totalItems);
				}

				if (index2 === SKIP_ELEMENT_INDEX) {
					index2 = Math.floor(Math.random() * totalItems);
				}
			}

			/* Проверим чтобы индексы отличались друг от друга */
			while (index2 === index1) {
				index2 = Math.floor(Math.random() * totalItems);
			}

			return [index1, index2];
		}

		/* Свап элементов между собой */
		const swapItems = (index1, index2) => {
			const items = grid.getItems();
			const item1 = items[index1];
			const item2 = items[index2];

			if (!item1 || !item2) return;

			const tempWidth = item1.getElement().offsetWidth;
			const tempHeight = item1.getElement().offsetHeight;
			const tempTransform = item1.getElement().style.transform;

			/* Меняем элементы местами */
			setTimeout(() => {
				/* Если карточка маленькая, уменьшаем в ней текст */
				if (item1.getElement().classList.contains("advantages__item--small") &&
					!item2.getElement().classList.contains("advantages__item--small")) {
					item1.getElement().classList.remove("advantages__item--small");
					item2.getElement().classList.add("advantages__item--small");
				} else if (!item1.getElement().classList.contains("advantages__item--small") &&
					item2.getElement().classList.contains("advantages__item--small")) {
					item1.getElement().classList.add("advantages__item--small");
					item2.getElement().classList.remove("advantages__item--small");
				}

				item1.getElement().style.width = `${item2.getElement().offsetWidth}px`;
				item1.getElement().style.height = `${item2.getElement().offsetHeight}px`;
				item1.getElement().style.transform = item2.getElement().style.transform;
				item2.getElement().style.width = `${tempWidth}px`;
				item2.getElement().style.height = `${tempHeight}px`;
				item2.getElement().style.transform = tempTransform;
			}, 300);
		}

		/* Запускаем анимацию свапа каждые 4 секунды */
		const animationInit = () => {
			interval = setInterval(() => {
				const items = grid.getItems();
				if (items.length < 2) return;
				const [index1, index2] = getRandomIndexes(items.length);
				swapItems(index1, index2);
			}, 4000);
		}

		if (grid && grid._isDestroyed === false) {
			grid.on("layoutEnd", function () {
				animationInit();
			});
		}

		const advantagesSection = document.querySelector(".advantages");

		const sectionResizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const width = entry.contentRect.width;

				if (width < 768) {
					gridDestroy();
				} else {
					gridDestroy();
					clearInterval(interval);
					gridInit();
					grid.on("layoutEnd", function () {
						animationInit();
					});
				}
			}
		});

		sectionResizeObserver.observe(advantagesSection);

		if (window.matchMedia("(max-width: 767px)").matches && !grid._isDestroyed) {
			gridDestroy();
		}
	}
});
