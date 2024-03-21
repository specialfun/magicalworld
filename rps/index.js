"use strict";

alert('Let the game begin!');
let computerChoice;
let userChoice;
let userScore = 0;
let computerScore = 0;
const text = document.querySelector(`.text`);
const buttons = document.querySelectorAll(`.button`);
const result = document.querySelector(`#result`);

function loadComputerChoice() {
	computerChoice = Math.floor(Math.random() * 3);
}

function translate(input) {
	switch (input) {
		case 0:
			return `Rock`;
			break;
		case 1:
			return `Paper`;
			break;
		case 2:
			return `Scissors`;
			break;
		default:
			return `Error`;
			break;
	}
}

loadComputerChoice();

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", () => {
		userChoice = i;
		if (computerChoice === userChoice) {
			text.innerHTML = `<span style="color: green">Won!</span>`;
			userScore++;
		} else {
			text.innerHTML = `<span style="color: red">Lost.</span>`;
			computerScore++;
		}
		result.textContent = `Computer: ${computerScore} | User: ${userScore}.`;
		document.getElementById(
			"chose"
		).innerHTML = `Computer chose <em>${translate(
			computerChoice
		)}</em>, user chose <em>${translate(userChoice)}</em>.`;
		loadComputerChoice();
		buttons.forEach((button) => {
			button.classList.add("disabled");
		});
		console.info(`Computer: ${computerScore} | User: ${userScore}.`);
		console.log(
			`Computer: ${translate(computerChoice)} | User: ${translate(
				userChoice
			)}.\n`
		);
		document.querySelector("body").style.cursor = "wait";
		setTimeout(() => {
			buttons.forEach((button) => {
				button.classList.remove("disabled");
				document.querySelector("body").style.cursor = "";
			});
			text.textContent = "Choose again:";
		}, 1500);

		if (userScore > 5) {
			const result = document.getElementById('result');
			alert("---good job!! You won!! You can proceed now---");
			result.innerHTML = "<a href = '../final.html?name=SMILE4EVER'> Hello Champ! Take your gift! <a/>";
		}
	});
}