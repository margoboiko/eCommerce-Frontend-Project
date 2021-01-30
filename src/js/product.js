// Tabs interaction ..............................
(function () {

	let btns = document.querySelectorAll("section.product .info ul > li");
	let tabs = document.querySelectorAll("section.product .info .tab-box .tab");

	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", () => {
			btns.forEach(btn => {
				btn.classList.remove("active");
			});
			tabs.forEach(tab => {
				tab.classList.remove("active");
			});

			btns[i].classList.add("active");
			tabs[i].classList.add("active");
		}, true);
	}

})();


// Product images interaction ..............................
(function () {

	const bigImages = document.querySelectorAll("section.product div.overview div.large img");
	const smallImages = document.querySelectorAll("section.product div.overview div.small img");

	// Small -> Big

	for (let i = 0; i < smallImages.length; i++) {
		smallImages[i].addEventListener("click", () => {
			smallImages.forEach(btn => {
				btn.classList.remove("active");
			});
			bigImages.forEach(tab => {
				tab.classList.remove("active");
			});

			smallImages[i].classList.add("active");
			bigImages[i].classList.add("active");
		}, true);
	}

	// Big -> Full
	let overlay = document.getElementById("overlay");

	for (let i = 0; i < bigImages.length; i++) {

		bigImages[i].addEventListener("click", () => {

			bigImages[i].classList.contains("full") ? (
				bigImages[i].classList.remove("full"),
				overlay.classList.remove("active")
			) : (
				overlay.classList.add("active"),
				bigImages[i].classList.add("full")
			);

		}, true);

	}

	overlay.addEventListener("click", () => {
		bigImages.forEach(bigImage => {
			bigImage.classList.remove("full");
		});

		document.body.classList.remove("noscroll");
		overlay.classList.remove("active");
	}, true);

})();


// Read more interaction ..............................
const text = document.querySelector("section.product div.overview div.about p");

// If the text is too long
if (text.innerHTML.length > 100) {

	// Remember the original amount
	var originalAmount = text.innerHTML;

	// Shorten the text
	var newAmount = originalAmount.slice(0, 100);
	text.innerHTML = newAmount;

	// Create "Read more" button, then append to p
	let more = document.createElement("button");
	more.classList.add("more");
	more.innerText = "Read more";

	// Find the right place for button
	const share = document.querySelector("section.product div.overview div.about div.share");
	// Find the parent element to insert button
	const parent = share.parentNode;

	parent.insertBefore(more, share);

	// Add event listener
	more.addEventListener("click", () => {
		text.innerHTML = originalAmount;
	}, true);
}

const colorSelect = document.querySelector("section.product div.overview div.about div.colorpick > select");

// Color select ..............................
(function () {

	const colors = document.querySelectorAll("section.product div.overview div.about div.colorpick > ul > li");

	colorSelect.addEventListener("change", () => {

		colors.forEach(color => {
			color.classList.remove("active");
		});

		colors[colorSelect.selectedIndex].classList.add("active");
	});

})();

const amount = document.querySelector("section.product div.overview div.about div.add div.amountpick > input");

// Amount select ..............................
(function () {

	const minus = document.querySelector("section.product div.overview div.about div.add div.amountpick > button.minus");
	const plus = document.querySelector("section.product div.overview div.about div.add div.amountpick > button.plus");

	// Initial value
	amount.value = 1;

	// Interaction and amount validate
	minus.addEventListener("click", () => {
		amount.focus();
		amount.value <= 1 ? amount.value = 1 : amount.value--;
	}, true);
	plus.addEventListener("click", () => {
		amount.focus();
		amount.value >= 99 ? amount.value = 9 : amount.value++;
	}, true);

	// Numbers validate - no need since it's input "number"

})();

function myFunction() {
	var dots = document.getElementById("dots");
	var moreText = document.getElementById("more");
	var btnText = document.getElementById("myBtn");
  
	if (dots.style.display === "none") {
	  dots.style.display = "inline";
	  btnText.innerHTML = "Read more";
	  moreText.style.display = "none";
	} else {
	  dots.style.display = "none";
	  btnText.innerHTML = "Read less";
	  moreText.style.display = "inline";
	}
  }
