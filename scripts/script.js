const cardBackLocation = "./images/cards/cardBack.png"
const APILink = "https://altscry.vercel.app/api"

// Waits until animation is finished
function waitForAnimation(element) {
	return new Promise(resolve => {
		element.addEventListener("animationend", resolve, { once: true });
	});
}

// Waits until transition is finished
function waitForTransition(element) {
	return new Promise(resolve => {
		element.addEventListener("transitionend", resolve, { once: true });
	});
}

// Waits for program to update the src of the current card image
function waitForSrcChangeAndLoad(img, oldSrc) {
	return new Promise(resolve => {

		// In the event the server gives the same card twice, after timeout the program will force show the card
		const timeout = 1500;
		let resolved = false;

		const finish = () => {
			if (!resolved) {
				resolved = true;
				resolve();
			}
		}

		// Waits for the program to update the src by comparing it to the old src
		const checkSrc = () => {
			if (img.src !== oldSrc) {

				if (img.complete) {
					finish();
				} else {
					img.addEventListener("load", resolve, { once: true });
				}

			} else {
				requestAnimationFrame(checkSrc);
			}
		};

		setTimeout(finish, timeout)

		checkSrc();
	});
}

// Spin in card animation
async function spinInCard(card) {
	card.style.visibility = "visible";

	card.classList.add("spin-in");

	await waitForAnimation(card);

	card.classList.remove("spin-in");
}

// Spin out card animation
async function spinOutCard(card) {
	card.classList.add("spin-out");

	await waitForAnimation(card);

	card.classList.remove("spin-out");
	card.style.visibility = "hidden";
}

// Makes the card rotate by 180 when flip card animation is called
let currentRotation = 0;
async function flipCard() {
	const inner = document.querySelector(".card-flip-inner");

	currentRotation += 180;

	// Skip transform animation if the current card is not valid
	if (!hasValidIllustrationID) {
		// Temporarily disable transition
		const oldTransition = inner.style.transition;
		inner.style.transition = "none";

		inner.style.transform = `rotateY(${currentRotation}deg)`;

		// Force reflow so browser applies change instantly
		inner.offsetHeight;

		inner.style.transition = oldTransition;
		return;
	}

	inner.style.transform = `rotateY(${currentRotation}deg)`;

	await waitForTransition(inner);
}

// Sends illustrationID and altText to the server when the submit button is pressed
document.getElementById("submit-button").addEventListener("click", async function () {
	const currentCard = document.getElementById("current-card");
	const oldSrc = currentCard.src;
	const illustrationID = currentCard.dataset.illustration_id;
	const altText = document.getElementById("alt-text-box").value;

	// Skip if there is no alt text provided
	const hasAltText = (altText.trim() !== "")
	if (hasAltText) {
		// Spin out animation
		await spinOutCard(currentCard);

		// Submits alt text to server
		try {
			await fetch(`${APILink}/submitText`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ illustrationID, altText })
			});

		} catch (error) {
			console.error("Error submitting text:", error);
		}
	} else {
		// Flip animation
		await flipCard();
	}

	// If a card was rejected and new alt text was submitted, we check to make sure the new card is loaded in the correct judge mode
	const switchBtnRight = document.querySelector('.switch-button-verify');

	if (switchBtnRight.classList.contains('active-case')) {
		// Verify mode
		loadVerifiedCard()
	} else {
		// Contribute mode
		loadContributeCard()
	}

	// Wait until the src actually changes to avoid image pop in
	await waitForSrcChangeAndLoad(currentCard, oldSrc);

	// Final animations
	if (hasAltText) {
		// Spin in animation
		await spinInCard(currentCard);
	} else {
		// Flip animation
		await flipCard();
	}

});

// Marks card as verified when confirm button is pressed in verify mode
document.getElementById("confirm-button").addEventListener("click", async function () {
	const currentCard = document.getElementById("current-card")
	const illustrationID = currentCard.dataset.illustration_id;

	// Flip animation
	await flipCard();

	// Marks a card as verified by sending the illustrationID
	try {
		await fetch(`${APILink}/markVerified`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ illustrationID })
		});

	} catch (error) {
		console.error("Error verifying:", error);
	}

	// Load a new card to verify
	loadVerifiedCard()

	// Flip animation
	await flipCard();
});

// Runs when the reject button is pressed
document.getElementById("reject-button").addEventListener("click", () => {
	const altTextBox = document.getElementById("alt-text-box");
	const submitButton = document.getElementById("submit-button");
	const judgeButtons = document.getElementById("judge-button-container");

	// Makes the text box editable
	altTextBox.readOnly = false;

	// Hides the judge buttons and shows the submit button
	submitButton.style.display = "flex";
	judgeButtons.style.display = "none";

	// Update the submit button to correct text state
	updateSubmitButtonText()
});

// If the website can't load an image, show card back and error text
function handleCardFetchFail() {
	const currentCard = document.getElementById("current-card");
	const cardNameText = document.getElementById("card-text");

	cardNameText.textContent = "Unable to connect to server."
	currentCard.src = cardBackLocation
}

let hasValidIllustrationID;
// Loads a card that needs alt text written for it
async function loadContributeCard() {
	try {
		const response = await fetch(`${APILink}/getContributeCard`)
		const image = await response.json()

		const currentCard = document.getElementById("current-card");
		const cardNameText = document.getElementById("card-text");

		const altTextBox = document.getElementById("alt-text-box");
		const submitBtn = document.getElementById("submit-button");
		const judgeButtons = document.getElementById("judge-button-container");

		hasValidIllustrationID = (image)

		// Clears the alt text box
		altTextBox.value = ""

		if (!hasValidIllustrationID) {
			// Updates the altTextBox placeholder to reflect read only status
			altTextBox.placeholder = "Switch to verify mode to continue!"

			// If there is no illustrationID, show card back and complete text
			cardNameText.textContent = "No cards to write alt text for!"
			currentCard.src = cardBackLocation

			// Hide submit buttons and make text box read only
			submitBtn.style.display = "none";
			judgeButtons.style.display = "none";
			altTextBox.readOnly = true;

		} else {
			// Updates alt text placeholder text
			altTextBox.placeholder = "Write alt text here"

			// Make sure submit button is showing
			submitBtn.style.display = "flex";

			// Show the card name and image
			cardNameText.textContent = image.card_name
			currentCard.src = image.art_uri;
			currentCard.dataset.illustration_id = image.illustration_id;

			// Make the text box editable and show the submit button
			altTextBox.readOnly = false;
			submitBtn.style.display = "flex";
			judgeButtons.style.display = "none";
		}

		// Update the size of the alt text box and submit button
		updateAltTextBoxSize();
		updateSubmitButtonText()

	} catch (error) {
		handleCardFetchFail();
		console.error("Failed to load image:", error);
	}
}

// Loads a card that needs to be verified
async function loadVerifiedCard() {
	try {
		const response = await fetch(`${APILink}/getVerifiedCard`)
		const image = await response.json()

		const currentCard = document.getElementById("current-card");
		const cardNameText = document.getElementById("card-text");
		const cardAltText = document.getElementById("alt-text-box");

		const altTextBox = document.getElementById("alt-text-box");
		const submitBtn = document.getElementById("submit-button");
		const judgeButtons = document.getElementById("judge-button-container");

		// Marks if we returned an illustrationId
		hasValidIllustrationID = (image)

		if (!hasValidIllustrationID) {
			// If there is no illustrationID, show card back and complete text
			cardNameText.textContent = "No cards to verify!"
			currentCard.src = cardBackLocation

			// Hide judge buttons
			submitBtn.style.display = "none";
			judgeButtons.style.display = "none";

			// Clears the alt text box and makes it read only
			altTextBox.value = ""
			altTextBox.readOnly = true;

			// Updates the altTextBox placeholder to reflect read only status
			altTextBox.placeholder = "Switch to contribute mode to continue!"

		} else {
			// Make sure judge buttons are showing
			judgeButtons.style.display = "flex";

			// Display card information, display alt text, and update placeholder
			cardNameText.textContent = image.card_name
			currentCard.src = image.art_uri;
			currentCard.dataset.illustration_id = image.illustration_id;

			altTextBox.placeholder = "Write alt text here"
			cardAltText.value = image.alt_text

			// Make the text box read only and show the judge buttons
			cardAltText.readOnly = true;
			submitBtn.style.display = "none";
			judgeButtons.style.display = "flex";
		}

		// Updates the size of the alt text box
		updateAltTextBoxSize();

	} catch (error) {
		handleCardFetchFail();
		console.error("Failed to load image:", error);
	}
}

// Rotates image by 90 degrees
const rotateBtn = document.getElementById("rotate-button");
const currentCard = document.getElementById("current-card");
const cardBack = document.getElementById("reverse-card");

let rotationAmount = 0;
rotateBtn.addEventListener("click", () => {
	rotationAmount += 90;

	currentCard.style.setProperty("--rotation", `${rotationAmount}deg`);
	cardBack.style.setProperty("--rotation", `${rotationAmount}deg`);
});

// When the user types, makes the submit button say "Skip" when there is no text and "Submit" when it does
const altTextBox = document.getElementById("alt-text-box");
const submitButton = document.getElementById("submit-button");

altTextBox.addEventListener("input", updateSubmitButtonText);

function updateSubmitButtonText() {
	if (altTextBox.value.trim() === "") {
		submitButton.textContent = "Skip";
	} else {
		submitButton.textContent = "Submit";
	}
}

// Resizes text box as more text gets added
altTextBox.addEventListener("input", updateAltTextBoxSize);

function updateAltTextBoxSize() {
	altTextBox.style.height = "auto";
	altTextBox.style.height = altTextBox.scrollHeight + "px";
}

const downloadButton = document.getElementById("download-button")

// Requests CSV download from server
downloadButton.addEventListener("click", async function () {

	// Change download text to show that website is working
	downloadButton.textContent = "Downloading..."

	// Navigates the browser to the download endpoint
	window.location.href = `${APILink}/downloadCSV`

	// Change text back after time limit to show that the button is working
	setTimeout(() => {
		downloadButton.textContent = "Download CSV"
	}, 2000)

});

// Runs when the website loads
document.addEventListener("DOMContentLoaded", async () => {
	const currentCard = document.getElementById("current-card");
	let rect = currentCard.getBoundingClientRect();
	const cardFlipContainer = document.querySelector(".card-flip-container")

	// Starts the program in the correct mode (contribute by default)
	const switchBtnRight = document.querySelector('.switch-button-verify');
	const switchBtnLeft = document.querySelector('.switch-button-contribute');
	const activeSwitch = document.querySelector('.active');

	function updateMode() {
		if (switchBtnRight.classList.contains('active-case')) {
			// Verify mode
			loadVerifiedCard();
		} else {
			// Contribute mode
			loadContributeCard();
		}
	}

	// Runs when the left contribute button is clicked
	switchBtnLeft.addEventListener('click', async function () {
		// Only activate if the other mode switch button is active
		if (switchBtnRight.classList.contains('active-case')) {
			const oldSrc = currentCard.src;

			switchBtnRight.classList.remove('active-case');
			switchBtnLeft.classList.add('active-case');
			activeSwitch.style.left = '0%';

			// If the current card is the back of the card, we should not flip until we have an updated card
			await flipCard();

			updateMode();

			// Wait until the src actually changes to avoid image pop in
			await waitForSrcChangeAndLoad(currentCard, oldSrc);

			// If the current card is the back of the card, meaning there are no more cards left, skip animation
			await flipCard();
		}
	});

	// Runs when the right verify button is clicked
	switchBtnRight.addEventListener('click', async function () {
		// Only activate if the other mode switch button is active
		if (switchBtnLeft.classList.contains('active-case')) {
			const oldSrc = currentCard.src;

			switchBtnRight.classList.add('active-case');
			switchBtnLeft.classList.remove('active-case');
			activeSwitch.style.left = '50%';

			// If the current card is the back of the card, we should not flip until we have an updated card
			await flipCard();

			updateMode();

			// Wait until the src actually changes to avoid image pop in
			await waitForSrcChangeAndLoad(currentCard, oldSrc);

			// If the current card is the back of the card, meaning there are no more cards left, skip animation
			await flipCard();

		}
	});

	// Requests a new card
	updateMode();

	// Waits until the card has fully loaded by making sure it has a width
	while (rect.width == 0) {
		await new Promise(r => requestAnimationFrame(r));
		rect = currentCard.getBoundingClientRect();
	}

	// Overrides the width of the card after it has loaded in
	cardFlipContainer.style.width = "auto";

	// Spin in animation
	spinInCard(currentCard);

});
