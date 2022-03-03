<template>
	<!-- :class="{ hidden: !isVisible }" -->
	<div class="cell" :id="content.row.toString() + '-' + content.col.toString()">
		<div :class="valNumToColorClass">
			{{ content.value }}
		</div>
		<div v-if="!isVisible" class="hidden"></div>
		<div v-if="hasFlag" class="flag">!</div>
		<img
			class="isTheLoosingBomb"
			width="35"
			v-if="isTheLoosingBomb"
			src="../assets/croix.png"
			alt="dfg"
		/>
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
		flag: boolean;
		loosingBomb: boolean;
	};
}
const isVisible = computed(() => {
	return props.content.visible;
});
const hasFlag = computed(() => {
	return props.content.flag;
});
const isTheLoosingBomb = computed(() => {
	return props.content.loosingBomb;
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
	position: absolute;
	width: 45px;
	height: 45px;
	background-color: blueviolet;
	border: 4px rgb(230, 230, 230) outset;
}
/* .hidden > * {
	color: transparent !important;
	background-color: blueviolet !important;
	border-radius: 0 !important;
	border: none !important;
	height: 0;
} */
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
	color: rgb(59, 167, 59);
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
	color: rgb(32, 32, 32);
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

.isTheLoosingBomb {
	position: absolute;
}

.flag {
	position: absolute;
	top: 4px;
	left: 12px;
}
</style>
