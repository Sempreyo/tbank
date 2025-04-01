document.addEventListener("DOMContentLoaded", () => {
	const gridItems = document.querySelectorAll(".advantages__item");
	let transformValues = [];
	const grid = new Muuri(".advantages__grid", {
		dragEnabled: false,
		layout: {
			fillGaps: true,
			horizontal: false,
			itemMargin: {
				x: 7,
				y: 7
			}
		}
	});

	// Свап элементов между собой
	const swapItems = (index1, index2) => {
		const item1 = gridItems[index1];
		const item2 = gridItems[index2];

		if (!item1 || !item2) return;

		const tempWidth = item1.style.width;
		const tempHeight = item1.style.height;
		const tempTransform = item1.style.transform;

		console.log(item1.innerHTML)
		console.log(item2.innerHTML)

		// Меняем элементы местами
		setTimeout(() => {
			//item1.innerHTML = item2.innerHTML;
			item1.style.width = item2.style.width;
			item1.style.height = item2.style.height;
			item1.style.transform = item2.style.transform;
			//item2.innerHTML = tempContent;
			item2.style.width = tempWidth;
			item2.style.height = tempHeight;
			item2.style.transform = tempTransform;
		}, 300);
	}

	// Запускаем анимацию свапа каждые 4 секунды
	setInterval(() => {

	}, 4000);

	/* После построения сетки сохраняем значения позиционирования в массив transformValues */
	grid.on("layoutEnd", function () {
		gridItems.forEach(item => {
			transformValues.push(item.style.transform);
		});

		// Уничтожаем экземпляр Muuri и применяем стили позиционирования к элементам сетки
		grid.destroy();

		gridItems.forEach((item, index) => {
			item.style.transform = transformValues[index];
		});

		if (gridItems.length < 2) return;
		const index1 = Math.floor(Math.random() * gridItems.length);
		let index2 = Math.floor(Math.random() * gridItems.length);
		while (index2 === index1) index2 = Math.floor(Math.random() * gridItems.length);
		swapItems(index1, index2);
	});
});
