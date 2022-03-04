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
	mines: number,
	cellClicked: GridCell
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

	let cellsWithoutBomb = useGetNeighbours(
		rows,
		cols,
		cellClicked.row,
		cellClicked.col
	);
	cellsWithoutBomb[cellsWithoutBomb.length] = {
		row: cellClicked.row,
		col: cellClicked.col,
	};

	// random bombs
	for (let i = 0; i < mines; i++) {
		let randomRow = Math.floor(Math.random() * rows);
		let randomCol = Math.floor(Math.random() * cols);
		let okToPutABomb = false;

		while (!okToPutABomb) {
			okToPutABomb = true;
			cellsWithoutBomb.map((cellPos) => {
				if (cellPos.row === randomRow && cellPos.col === randomCol) {
					okToPutABomb = false;
				}
			});
			if (grid[randomRow][randomCol].value === 10) {
				okToPutABomb = false;
			}
			if (!okToPutABomb) {
				randomRow = Math.floor(Math.random() * rows);
				randomCol = Math.floor(Math.random() * cols);
			}
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
