<template>
	<div class="row" v-for="(row, indexRow) in gridContent.length">
		<Cell
			v-for="(col, indexCol) in gridContent[0].length"
			:content="{
				value: gridContent[indexRow][indexCol].value,
				visible: gridContent[indexRow][indexCol].visible,
				row: gridContent[indexRow][indexCol].row,
				col: gridContent[indexRow][indexCol].col,
			}"
			@click="leftClick(gridContent[indexRow][indexCol])"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Cell from "./Cell.vue";
import { useCreateGrid } from "../hooks/createGrid";
import { useFillGrid } from "@/hooks/fillGrid";
import { useGetNeighbours } from "@/hooks/getNeighbours";

const props = defineProps<Props>();

interface Props {
	rows: number;
	cols: number;
	mines: number;
	fill: boolean;
}
interface GridCell {
	value: number;
	visible: boolean;
	row: number;
	col: number;
}

let gridContent = ref(useCreateGrid(props.rows, props.cols));
console.log(gridContent.value.length);
console.log(gridContent.value[0].length);

watch(
	() => props.fill,
	(newVal) => {
		if (newVal) {
			useFillGrid(gridContent.value, props.rows, props.cols, props.mines);
		}
	}
);

watch(
	() => props.rows,
	(newVal) => {
		gridContent.value = useCreateGrid(newVal, props.cols);
	}
);
watch(
	() => props.cols,
	(newVal) => {
		gridContent.value = useCreateGrid(props.rows, newVal);
	}
);

// const leftClick = (e: Event) => {
const leftClick = (cellClicked: GridCell) => {
	console.log(cellClicked);
	cellClicked.visible = true;

	// if bomb game over
	if (cellClicked.value === 10) {
		//emit game over
		return console.log("game over");
	}

	//if empty => recursive display empty cells around
	if (cellClicked.value === 0) {
		useGetNeighbours(
			props.rows,
			props.cols,
			cellClicked.row,
			cellClicked.col
		).map((cell) => {
			if (gridContent.value[cell.row][cell.col].visible) {
				return;
			}
			leftClick(gridContent.value[cell.row][cell.col]);
		});
	}

	//check win
};
</script>

<style>
.row {
	display: flex;
}
</style>
