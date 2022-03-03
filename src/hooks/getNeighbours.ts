export function useGetNeighbours(
	totalRows: number,
	totalCols: number,
	currentRow: number,
	currentCol: number
) {
	let neighbours = [];
	if (currentRow !== 0) {
		if (currentCol !== 0) {
			neighbours.push({ row: currentRow - 1, col: currentCol - 1 });
		}
		neighbours.push({ row: currentRow - 1, col: currentCol });
		if (currentCol !== totalCols - 1) {
			neighbours.push({ row: currentRow - 1, col: currentCol + 1 });
		}
	}

	if (currentCol !== 0) {
		neighbours.push({ row: currentRow, col: currentCol - 1 });
	}
	if (currentCol !== totalCols - 1) {
		neighbours.push({ row: currentRow, col: currentCol + 1 });
	}

	if (currentRow !== totalRows - 1) {
		if (currentCol !== 0) {
			neighbours.push({ row: currentRow + 1, col: currentCol - 1 });
		}
		neighbours.push({ row: currentRow + 1, col: currentCol });
		if (currentCol !== totalCols - 1) {
			neighbours.push({ row: currentRow + 1, col: currentCol + 1 });
		}
	}

	return neighbours;
}
