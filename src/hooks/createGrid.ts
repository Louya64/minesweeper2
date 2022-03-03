export function useCreateGrid(rows: number, cols: number) {
	interface GridCell {
		value: number;
		visible: boolean;
		flag: boolean;
		row: number;
		col: number;
		loosingBomb: boolean;
	}
	let grid = [] as GridCell[][];
	for (let i = 0; i < rows; i++) {
		grid.push([]);
		for (let j = 0; j < cols; j++) {
			grid[i].push({
				value: 0,
				visible: false,
				flag: false,
				row: i,
				col: j,
				loosingBomb: false,
			});
		}
	}
	return grid;
}
