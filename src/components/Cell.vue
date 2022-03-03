<template>
	<div
		class="cell"
		:class="{ hidden: !isVisible }"
		:id="content.row.toString() + '-' + content.col.toString()"
	>
		<div :class="valNumToColorClass">
			{{ content.value }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<Props>();

interface Props {
	content: {
		value: number;
		visible: boolean;
		row: number;
		col: number;
	};
}
const isVisible = computed(() => {
	return props.content.visible;
});

// change color (css) depending on content
const valNumToColorClass = computed(() => {
	switch (props.content.value) {
		case 0:
			return "zero";
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

<style scoped>
.cell {
	width: 45px;
	height: 45px;
	border: 1px solid rgb(143, 143, 143);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 25px;
	font-family: "Press Start 2P", cursive;
	position: relative;
}

.hidden {
	width: 45px;
	height: 45px;
	background-color: blueviolet;
	border: 4px rgb(230, 230, 230) outset;
}
.hidden > * {
	color: transparent !important;
	background-color: blueviolet !important;
	border-radius: 0 !important;
	border: none !important;
	height: 0;
}
@media all and (max-width: 1224px) {
	.cell {
		width: 35px;
		height: 35px;
		font-size: 22px;
	}
}

.zero {
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
	text-shadow: 2px 1px 2px black;
}
.eight {
	color: rgb(236, 240, 36);
	text-shadow: -2px 1px 2px black;
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
</style>
