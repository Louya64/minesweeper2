<template>
	<header>
		<h1>Démineur</h1>
		Click sur le petit bonhomme jaune pour démarrer une partie
		<button class="rulesBtn btn" @click="toggleRules">Règles du jeu</button>
		<button class="settingsBtn btn" @click="toggleSettings">Réglages</button>
	</header>

	<div class="mainWrapper">
		<div v-if="showRules" class="rulesContainer">
			<h2>Règles du jeu</h2>
			<p class="rules">
				* Le but du jeu est de découvrir toutes les cases sans tomber sur une
				bombe<br /><br />
				* Un click gauche sur une case "cachée" révèle son contenu <br />
				* Un click droit sur une case "cachée" permet de déposer un drapeau<br />
				* Un double click sur une case découverte, si le nombre de drapeaux
				déposée sur les cases adjacentes correspond au contenu de cette case,
				révèle les cases adjacentes<br />
				* Le timer ... ne sert à rien mais il compte ^^<br /><br />
				**** Click sur le petit bonhomme jaune pour démarrer une partie
			</p>
		</div>

		<Settings
			@newRows="updateRows"
			@newCols="updateCols"
			@newNbMines="updateNbMines"
			v-if="showSettings"
		/>

		<div class="gameContainer">
			<div class="gameHeader">
				<div class="gameHeaderItem">
					<span>{{ flags < 100 ? "0" : "" }}{{ flags }}</span>
				</div>
				<div @click="start" class="gameHeaderItem">
					<p class="icon">{{ iconContent }}</p>
				</div>
				<div class="gameHeaderItem">
					{{ timerVal < 100 ? "0" : "" }}{{ timerVal < 10 ? "0" : ""
					}}{{ timerVal }}
				</div>
			</div>
			<div id="gameGrid">
				<div class="row" v-for="(row, indexRow) in rows">
					<Cell
						v-for="(col, indexCol) in cols"
						:content="gridContent[indexRow][indexCol]"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Cell from "./components/Cell.vue";
import { ref, reactive, onBeforeMount, watch } from "vue";
import Settings from "./components/Settings.vue";

const iconContent = ref(":)");
const nbMines = ref(10);
const timerVal = ref(0);
const rows = ref(9);
const cols = ref(9);
const showSettings = ref(false);
const showRules = ref(false);
const flags = ref(nbMines.value);
const isStarted = ref(false);
const show = ref(false);
const totalGoodCellsDisplayed = ref(0);

const toggleSettings = () => {
	if (showRules.value) {
		showRules.value = false;
	}
	showSettings.value = !showSettings.value;
};
const toggleRules = () => {
	if (showSettings.value) {
		showSettings.value = false;
	}
	showRules.value = !showRules.value;
};

let gridContent = reactive([] as number[][]);
onBeforeMount(() => {
	createGrid();
});
const createGrid = () => {
	// first empty grid (usefull if alredy exists)
	gridContent.splice(0, gridContent.length);
	// then fill it with 0 to initialize
	for (let i = 0; i < rows.value; i++) {
		gridContent.push([]);
		for (let j = 0; j < cols.value; j++) {
			gridContent[i].push(0);
		}
	}
};

const updateRows = (nb: number) => {
	rows.value = nb;
	createGrid();
};
const updateCols = (nb: number) => {
	cols.value = nb;
	createGrid();
};
const updateNbMines = (nb: number) => {
	nbMines.value = nb;
	createGrid();
};

////////////   flags   //////////////////////
watch(
	() => nbMines.value,
	(newVal) => {
		return (flags.value = newVal);
	}
);

// when click on yellow fellow
const start = () => {
	stopTimer();
	gridContent.map(
		(row, rowIndex) => (gridContent[rowIndex] = row.map(() => 0))
	);
	iconContent.value = ":)";
	isStarted.value = true;
	timerVal.value = 0;
	flags.value = nbMines.value;
	totalGoodCellsDisplayed.value = 0;
	show.value = true;
	setTimeout(() => {
		show.value = false;
		setTimeout(() => {
			// initialize bombs and timer
			randomFillBombs();
			startTimer();
		}, 150);
	}, 150);
};

// function to place bombs
const randomFillBombs = () => {
	// random cell (row and col), { nbMines } time
	for (let i = 0; i < nbMines.value; i++) {
		const randomRow = Math.floor(Math.random() * rows.value);
		const randomCol = Math.floor(Math.random() * cols.value);
		// if a bomb is already there => random once more
		if (gridContent[randomRow][randomCol] === 10) {
			i--;
		}
		gridContent[randomRow][randomCol] = 10;
	}
	calculate();
};

// function to place numbers near bombs
const calculate = () => {
	gridContent.map((row, indexRow) =>
		row.map((col, indexCol) => {
			if (gridContent[indexRow][indexCol] === 10) {
				// row above, from left to right:
				if (
					indexRow - 1 !== -1 &&
					indexCol - 1 !== -1 &&
					gridContent[indexRow - 1][indexCol - 1] !== 10
				) {
					gridContent[indexRow - 1][indexCol - 1] += 1;
				}
				if (indexRow - 1 !== -1 && gridContent[indexRow - 1][indexCol] !== 10) {
					gridContent[indexRow - 1][indexCol] += 1;
				}
				if (
					indexRow - 1 !== -1 &&
					indexCol + 1 !== cols.value &&
					gridContent[indexRow - 1][indexCol + 1] !== 10
				) {
					gridContent[indexRow - 1][indexCol + 1] += 1;
				}

				// same row, from left to right:
				if (indexCol - 1 !== -1 && gridContent[indexRow][indexCol - 1] !== 10) {
					gridContent[indexRow][indexCol - 1] += 1;
				}
				if (
					indexCol + 1 !== cols.value &&
					gridContent[indexRow][indexCol + 1] !== 10
				) {
					gridContent[indexRow][indexCol + 1] += 1;
				}

				// row below, from left to right:
				if (
					indexRow + 1 !== rows.value &&
					indexCol - 1 !== -1 &&
					gridContent[indexRow + 1][indexCol - 1] !== 10
				) {
					gridContent[indexRow + 1][indexCol - 1] += 1;
				}
				if (
					indexRow + 1 !== rows.value &&
					gridContent[indexRow + 1][indexCol] !== 10
				) {
					gridContent[indexRow + 1][indexCol] += 1;
				}
				if (
					indexRow + 1 !== rows.value &&
					indexCol + 1 !== cols.value &&
					gridContent[indexRow + 1][indexCol + 1] !== 10
				) {
					gridContent[indexRow + 1][indexCol + 1] += 1;
				}
			}
		})
	);
};

/////////////    timer     /////////////////
let timerId: number;
const startTimer = () => {
	timerId = setInterval(() => timerVal.value++, 1000);
};
const stopTimer = () => {
	clearInterval(timerId);
};

// increment totalGoodCellsDisplayed at leftClick => when reaches the good number => win
//   look, icon changes !!!!
const checkWin = () => {
	totalGoodCellsDisplayed.value++;

	if (
		totalGoodCellsDisplayed.value ===
		rows.value * cols.value - nbMines.value
	) {
		iconContent.value = ":D";
		show.value = true;
		isStarted.value = false;
		stopTimer();
		setTimeout(() => {
			alert("win !!!!!!!!");
		}, 150);
	}
};

const gameOver = () => {
	iconContent.value = ":(";
	show.value = true;
	isStarted.value = false;
	stopTimer();
	setTimeout(() => {
		alert("game over !");
	}, 150);
};
</script>

<style>
@import "./assets/base.css";

#app {
	margin: 0 auto;
	text-align: center;
	background-color: rgb(242, 237, 246);
	padding-bottom: 10vh;
}

header {
	/* background-color: purple; */
	position: relative;
	min-height: 10vw;
	padding: 2vw;
}

.btn {
	z-index: 1;
	position: absolute;
	border: 0;
	border-radius: 5px;
	padding: 0.7vw 1.2vw;
	background-color: blueviolet;
	box-shadow: 2px 2px 1px black;
	color: white;
	text-shadow: 2px 2px 1px black;
	font-size: 1vw;
}
.btn:hover {
	cursor: pointer;
}

.rulesBtn {
	top: 1.5vw;
	left: 5vw;
}

.settingsBtn {
	top: 5vw;
	left: 5vw;
}
</style>

<style scoped>
.mainWrapper {
	/* background-color: yellow; */
	position: relative;
	display: flex;
	justify-content: center;
}

.rulesContainer {
	z-index: 1;
	position: absolute;
	top: 5vw;
	left: 0;
	width: 33vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: rgb(242, 237, 246);
}
.rules {
	padding: 2vw;
	text-align: left;
}

.gameContainer {
	width: fit-content;
	margin: auto 5vw;
	border: 0.3vw rgb(230, 230, 230) outset;
	background-color: lightgray;
	padding: 1vw;
	font-size: 25px;
}
@media all and (max-width: 1224px) {
	.gameContainer {
		font-size: 20px;
	}
}
.gameHeader {
	border: 0.3vw rgb(230, 230, 230) inset;
	padding: 1vw;
	margin-bottom: 1vw;
	display: flex;
	justify-content: space-between;
}
.gameHeaderItem {
	font-family: "Press Start 2P", cursive;
	height: 3.5vw;
	background-color: black;
	color: red;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.3vw;
}
.icon {
	transform: rotate(0.25turn);
	background-color: yellow;
	border-radius: 50%;
	color: black;
}
.icon:hover {
	cursor: pointer;
}
#gameGrid {
	border: 0.3vw rgb(230, 230, 230) inset;
}
.row {
	display: flex;
}
@media all and (max-width: 1224px) {
	.gameContainer {
		margin: 5vw;
	}
}
@media all and (max-width: 1224px) {
	.settings {
		position: absolute;
		top: 0;
		left: 0;
		text-align: right;
	}
	.settings input {
		margin: 0.5vw 0;
	}
}
</style>
