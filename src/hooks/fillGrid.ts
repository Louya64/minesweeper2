import { useGetNeighbours } from "./getNeighbours";

interface GridCell {
	value: number;
	visible: boolean;
	flag: boolean;
	row: number;
	col: number;
	loosingBomb: boolean;
}

export function useFillGrid(
	grid: GridCell[][],
	rows: number,
	cols: number,
	mines: number
) {
	if (mines > rows * cols) {
		alert("il y a plus de bombes que de cases");
		return;
	}

	// emptying grid before filling it
	grid.map((row) =>
		row.map(
			(cell) => (
				(cell.value = 0),
				(cell.visible = false),
				(cell.flag = false),
				(cell.loosingBomb = false)
			)
		)
	);

	// random bombs
	for (let i = 0; i < mines; i++) {
		const randomRow = Math.floor(Math.random() * rows);
		const randomCol = Math.floor(Math.random() * cols);
		// if a bomb is already there => random once more
		if (grid[randomRow][randomCol].value === 10) {
			i--;
		}
		grid[randomRow][randomCol].value = 10;
	}

	// calcule numbers
	grid.map((row) =>
		row.map((cell) => {
			if (cell.value === 10) {
				useGetNeighbours(rows, cols, cell.row, cell.col).map((neighbour) => {
					if (grid[neighbour.row][neighbour.col].value !== 10) {
						grid[neighbour.row][neighbour.col].value++;
					}
				});
			}
		})
	);

	return grid;
}
