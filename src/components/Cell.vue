<template>
	<div class="cell">
		<div :class="valNumToColorClass">
			{{ content }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";

const props = defineProps<Props>();
interface Props {
	content: number;
}

// change color (css) depending on content
const valNumToColorClass = computed(() => {
	switch (props.content) {
		case 0:
			return "invisible";
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
		case 5:
			return "five";
		case 6:
			return "six";
		case 7:
			return "seven";
		case 8:
			return "eight";
		case 10:
			return "bomb";
		default:
			return "unknown";
	}
});
</script>

<style></style>

<style scoped>
.cell {
	border: 1px solid rgb(143, 143, 143);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	font-family: "Press Start 2P", cursive;
	position: relative;
}
.hiding {
	position: absolute;
	background-color: blueviolet;
	border: 4px rgb(230, 230, 230) outset;
}

.cell,
.hiding {
	width: 45px;
	height: 45px;
}
@media all and (max-width: 1224px) {
	.cell,
	.hiding {
		width: 35px;
		height: 35px;
		font-size: 22px;
	}
}

.displayNone {
	display: none;
}

.invisible {
	color: transparent;
}
.one {
	color: rgb(57, 57, 250);
}
.two {
	color: green;
}
.three {
	color: rgba(255, 0, 0, 0.746);
}
.four {
	color: rgb(0, 0, 144);
}
.five {
	color: rgb(138, 38, 38);
}
.six {
	color: rgb(54, 165, 154);
}
.seven {
	color: rgb(109, 246, 109);
}
.eight {
	color: rgb(236, 240, 36);
}

.bomb {
	border-radius: 50%;
	background-color: red;
	border: 0.2vw solid black;
	color: transparent;
	width: 27px;
	height: 27px;
	margin: 10px;
}
@media all and (max-width: 1224px) {
	.bomb {
		width: 22px;
		height: 22px;
	}
}

.imgBombClicked {
	position: absolute;
	width: 35px;
	height: 35px;
	top: -0.5vw;
	left: -0.5vw;
}
@media all and (max-width: 1224px) {
	.imgBombClicked {
		width: 30px;
		height: 30px;
	}
}
</style>
