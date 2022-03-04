<template>
	<div class="row" v-for="(row, indexRow) in gridContent.length">
		<Cell
			v-for="(col, indexCol) in gridContent[0].length"
			:content="{
				value: gridContent[indexRow][indexCol].value,
				visible: gridContent[indexRow][indexCol].visible,
				row: gridContent[indexRow][indexCol].row,
				col: gridContent[indexRow][indexCol].col,
				flag: gridContent[indexRow][indexCol].flag,
				loosingBomb: gridContent[indexRow][indexCol].loosingBomb,
			}"
			@click="leftClick(gridContent[indexRow][indexCol])"
			@contextmenu.prevent="rightClick(gridContent[indexRow][indexCol])"
			@dblclick="dbClick(gridContent[indexRow][indexCol])"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Cell from "./Cell.vue";
import { useCreateGrid } from "../hooks/createGrid";
import { useFillGrid } from "@/hooks/fillGrid";
import { useGetNeighbours } from "@/hooks/getNeighbours";

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "flagUpdate", nbToAdd: number): void;
	(e: "endGame"): void;
}>();

interface Props {
	rows: number;
	cols: number;
	mines: number;
	startClicked: boolean;
	flags: number;
}
interface GridCell {
	value: number;
	visible: boolean;
	flag: boolean;
	row: number;
	col: number;
	loosingBomb: boolean;
}

const firstClick = ref(true);
const okToPlay = ref(true);
let gridContent = ref(useCreateGrid(props.rows, props.cols));

const totalCellsWithoutMines = computed(
	() => props.rows * props.cols - props.mines
);
let nbCellsClicked = 0;

watch(
	() => props.startClicked,
	(newVal) => {
		if (newVal) {
			firstClick.value = true;
			okToPlay.value = true;
			gridContent.value = useCreateGrid(props.rows, props.cols);
		}
	}
);

watch(
	() => props.rows,
	(newVal) => {
		firstClick.value = true;
		okToPlay.value = true;
		gridContent.value = useCreateGrid(newVal, props.cols);
	}
);
watch(
	() => props.cols,
	(newVal) => {
		firstClick.value = true;
		okToPlay.value = true;
		gridContent.value = useCreateGrid(props.rows, newVal);
	}
);

// const leftClick = (e: Event) => {
const leftClick = (cellClicked: GridCell) => {
	if (firstClick.value && okToPlay.value) {
		useFillGrid(
			gridContent.value,
			props.rows,
			props.cols,
			props.mines,
			cellClicked
		);
		nbCellsClicked = 1;
		firstClick.value = false;
	}
	if (!cellClicked.flag && !cellClicked.visible && okToPlay.value) {
		cellClicked.visible = true;

		// if bomb => game over
		if (cellClicked.value === 10) {
			cellClicked.loosingBomb = true;
			gridContent.value.map((row) =>
				row.map((cell) => {
					if (cell.value === 10 && !cell.flag) {
						cell.visible = true;
					}
				})
			);
			emit("endGame");
			okToPlay.value = false;
			setTimeout(() => alert("game over"), 150);
			return;
		} else {
			nbCellsClicked++;
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

		// check win
		if (nbCellsClicked === totalCellsWithoutMines.value) {
			gridContent.value.map((row) =>
				row.map((cell) => {
					if (!cell.flag) {
						cell.visible = true;
					}
				})
			);
			emit("endGame");
			okToPlay.value = false;
			setTimeout(() => alert("wiiin"), 150);
		}
	}
};

const rightClick = (cellClicked: GridCell) => {
	if (!props.flags || cellClicked.visible || !okToPlay.value) {
		return;
	}
	cellClicked.flag = !cellClicked.flag;
	const nbFlagToAdd = cellClicked.flag ? -1 : 1;
	emit("flagUpdate", nbFlagToAdd);
};

const dbClick = (cellClicked: GridCell) => {
	if (!cellClicked.visible || cellClicked.flag || !okToPlay.value) {
		return;
	}
	let nbFlags = 0;
	useGetNeighbours(
		props.rows,
		props.cols,
		cellClicked.row,
		cellClicked.col
	).map((cell) => {
		if (gridContent.value[cell.row][cell.col].flag) {
			nbFlags++;
		}
	});
	if (nbFlags === cellClicked.value) {
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
};
</script>

<style>
.row {
	display: flex;
}
</style>
