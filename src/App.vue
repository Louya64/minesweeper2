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
				<Grid
					@flagUpdate="updateFlagsRemaining"
					@endGame="endGame"
					:rows="rows"
					:cols="cols"
					:mines="nbMines"
					:fill="fill"
					:flags="flags"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Grid from "./components/Grid.vue";
import { ref, watch } from "vue";
import Settings from "./components/Settings.vue";

const iconContent = ref(":)");
const nbMines = ref(10);
const timerVal = ref(0);
const rows = ref(9);
const cols = ref(9);
const fill = ref(false);
const showSettings = ref(false);
const showRules = ref(false);
const flags = ref(nbMines.value);

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

const updateRows = (nb: number) => {
	rows.value = nb;
};
const updateCols = (nb: number) => {
	cols.value = nb;
};
const updateNbMines = (nb: number) => {
	nbMines.value = nb;
};
const updateFlagsRemaining = (nbToAdd: number) => {
	flags.value += nbToAdd;
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
	fill.value = false;
	flags.value = nbMines.value;
	stopTimer();
	setTimeout(() => ((fill.value = true), startTimer()), 150);
};

const endGame = () => {
	stopTimer();
};

/////////////    timer     /////////////////
let timerId: number;
const startTimer = () => {
	timerVal.value = 0;
	timerId = setInterval(() => timerVal.value++, 1000);
};
const stopTimer = () => {
	clearInterval(timerId);
};
</script>

<style>
@import "./assets/base.css";

#app {
	margin: 0 auto;
	text-align: center;
	background-color: rgb(242, 237, 246);
	padding-bottom: 10vh;
	min-height: 100vh;
}

header {
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
		margin: 5vw;
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
</style>
