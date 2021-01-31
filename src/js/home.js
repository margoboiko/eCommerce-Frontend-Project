(function () {
	let dots = document.querySelectorAll("section.slider .slider-dots ul.dots li button");

	let dotsScreens = document.querySelectorAll("section.slider .slider-dots div.img");

	for (let i = 0; i < dots.length; i++) {

		dots[i].addEventListener("click", () => {
			dots.forEach(dot => {
				dot.classList.remove("active");
			});
			dotsScreens.forEach(screen => {
				screen.classList.remove("active");
			});

			dots[i].classList.add("active");
			dotsScreens[i].classList.add("active");
		});

	}
})();

document.addEventListener("DOMContentLoaded", () => {

	let arrowsLoaded = 0;

	let arrows = document.querySelectorAll("section.feat-prod .slider-arrows .arrows button");

	let arrowScreens = document.querySelectorAll("section.feat-prod .slider-arrows .items .screen");

	let focus = 1;
	arrowScreens[focus].classList.add("active");

	arrows[0].addEventListener("click", () => {

		focus--;
		if (focus < 0) {
			focus = 0;
		}

		arrowScreens.forEach(screen => {
			screen.classList.remove("active");
		});

		arrowScreens[focus].classList.add("active");
	});

	arrows[1].addEventListener("click", () => {

		focus++;
		if (focus > arrowScreens.length - 1) {
			focus = arrowScreens.length - 1;
		}

		arrowScreens.forEach(screen => {
			screen.classList.remove("active");
		});

		arrowScreens[focus].classList.add("active");


		const arrowBox = document.querySelector("section.feat-prod div.slider-arrows div.items");

		if (focus === arrowScreens.length - 1) {

			firebase.database().ref("/items").once('value', snap => {

				if (arrowsLoaded < snap.val().length) {

					let newScreen = document.createElement("div");
					newScreen.classList.add("screen");

					for (let i = arrowsLoaded; i < arrowsLoaded + 4; i++) {

						if (i < snap.val().length) {

							let futureArrowItem = futureArrowItems(
								snap.val()[i].image,
								snap.val()[i].name,
								snap.val()[i].tag
							);

							newScreen.append(futureArrowItem);

						}

						arrowBox.append(newScreen);

						arrowScreens = document.querySelectorAll("section.feat-prod .slider-arrows .items .screen");
					}

				};

			});

			arrowsLoaded += 4;

		}; 

	});

}); 


function futureArrowItems (imageURL, name, tag) {

	let item = document.createElement("div");
	item.classList.add("item");

	let itemImage = document.createElement("div");
	itemImage.classList.add("img");
	itemImage.style.backgroundImage = `url(${imageURL})`;
	item.append(itemImage);

	let itemName = document.createElement("h4");
	itemName.classList.add("name");
	itemName.innerText = name;
	item.append(itemName);

	let itemTag = document.createElement("a");
	itemTag.innerText = tag;
	item.append(itemTag);

	return item;
}

(function () {
	const buyNow = document.querySelector("section.pop-items div.items div.item div.paired button");

	buyNow.addEventListener("click", () => {

		addItem("cart");

	}, true);
})();

(function () {
	let addToCart = document.querySelectorAll("section.pop-items button.addToCart");

	addToCart.forEach(button => {

		button.addEventListener("click", () => {

			addItem("cart");

		}, true);

	});
})();

(function () {
	let addToWishlist = document.querySelectorAll("section.pop-items button.addToWishlist");

	addToWishlist.forEach(button => {

		button.addEventListener("click", () => {

			addItem("wishlist");

		}, true);

	});
})();


(function () {
	const loadMoreBtn = document.getElementById("loadMore");

	let itemsLoaded = 0;

	loadMoreBtn.addEventListener("click" , () => {

		const popItems = document.querySelector("section.pop-items div.items");

		firebase.database().ref("/items")
		.once('value', snap => {

			if (itemsLoaded < snap.val().length) {

				for (let i = itemsLoaded; i < itemsLoaded + 4; i++) {

					if (i < snap.val().length) {
						// Form HTML
						let newItem = createItem(
							snap.val()[i].image,
							snap.val()[i].name,
							snap.val()[i].price
						);

						popItems.append(newItem);
					} else {
						loadMoreBtn.innerText = "All items are loaded"
						loadMoreBtn.classList.remove("enabled");
						break;
					}
				}

				itemsLoaded += 4;
			}

		});

	}, true);
})();