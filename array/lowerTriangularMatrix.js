class LowerTriangularMatrix {
  singleDimensionArray = [];
  multiDimensionArray = [];
  constructor() {}

  addValue(arr, value, i, j) {
    if (i >= j) {
      arr[arr.length] = value;
    }
  }
  countNonZeroElements(dimension) {
    return (dimension * (dimension + 1)) / 2;
  }
  countZeroElements(dimension) {
    return (dimension * (dimension - 1)) / 2;
  }
  convertToSingleDimensionArray(multiArr) {
    for (let i = 0; i < multiArr.length; i++) {
      for (let j = 0; j < multiArr[i].length; j++) {
        this.addValue(this.singleDimensionArray, multiArr[i][j], i, j);
      }
    }
  }
  // Row Major Method
  convertToMultidimensionArray(arr) {
    const dimension = arr.length;
    for (let i = 0; i < arr.length; i++) {
      const newArr = new Array(dimension).fill(0);
      newArr[this.multiDimensionArray[i] ? this.multiDimensionArray.length : i];
      this.multiDimensionArray.push(newArr);
    }
    return this.multiDimensionArray
  }
}

const lowerTriangularMatrix = new LowerTriangularMatrix();
// lowerTriangularMatrix.convertToSingleDimensionArray([
//   [1, 0, 0, 0],
//   [2, 3, 0, 0],
//   [4, 5, 6, 0],
//   [7, 8, 9, 10],
// ]);

console.log(
  lowerTriangularMatrix.convertToMultidimensionArray([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]),
);
