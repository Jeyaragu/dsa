// Representing Diagonal Matrix is other than diagonal all other elements must be zero
// In the DiagonalMatrix call, converting diagonal array to single dimention array.
class DiagonalMatrix {
  singleDimensionArr = [];
  multiDimensionArr = [];
  constructor() {}
  setValue(arr, value, i, j) {
    if (i === j) {
      arr[i] = value;
    }
  }
  getValue(arr, i, j) {
    if (i === j) {
      return arr[i];
    } else {
      return 0;
    }
  }
  convertMatrixToArray(multiArr) {
    for (let i = 0; i < multiArr.length; i++) {
      for (let j = 0; j < multiArr[i].length; j++) {
        this.setValue(this.singleDimensionArr, multiArr[i][j], i, j);
      }
    }
  }

  convertArrayToMatrix(arr) {
    const dimension = arr.length;
    for (let i = 0; i < arr.length; i++) {
      const newArr = new Array(dimension).fill(0);
      newArr[i] = arr[i];
      this.multiDimensionArr.push(newArr);
    }
    return this.multiDimensionArr;
  }
}

const diagonalMatrix = new DiagonalMatrix();
diagonalMatrix.convertMatrixToArray([
  [1, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 3, 0],
  [0, 0, 0, 4],
]);
console.log(
  diagonalMatrix.convertArrayToMatrix(diagonalMatrix.singleDimensionArr),
);
