class SparseMatrix {
  constructor() {}
  convertCoOrdinateList(multiArr) {
    let nonZeroElements = 0;
    let result = [];
    for (let row = 0; row < multiArr.length; row++) {
      for (let column = 0; column < multiArr[row].length; column++) {
        if (multiArr[row][column] !== 0) {
          result.push([row, column, multiArr[row][column]]);
          nonZeroElements += 1;
        }
      }
    }
    // First index contain matrix informations such as number of rows, columns and non zero elements.
    return [[multiArr.length, multiArr[0].length, nonZeroElements], ...result];
  }

  sumOfMatrix(multiArray1, multiArray2) {
    if (multiArray1.length !== multiArray2.length) return [];
    if (multiArray1[0].length !== multiArray2[0].length) return [];
    const coOrdinateList1 = this.convertCoOrdinateList(multiArray1);
    const coOrdinateList2 = this.convertCoOrdinateList(multiArray2);
    let result = [];
    let i = 1,
      j = 1;
    while (i <= coOrdinateList1[0][2] && j <= coOrdinateList2[0][2]) {
      if (
        coOrdinateList1[i][0] === coOrdinateList2[j][0] &&
        coOrdinateList1[i][1] === coOrdinateList2[j][1]
      ) {
        result.push([
          coOrdinateList1[i][0], // Row index
          coOrdinateList1[i][1], // Column index
          coOrdinateList1[i][2] + coOrdinateList2[j][2], // Finding sum
        ]);
        i += 1;
        j += 1;
      } else if (
        coOrdinateList1[i][0] === coOrdinateList2[j][0] && // Inserting i since colmn value of i is less than j
        coOrdinateList1[i][1] < coOrdinateList2[j][1]
      ) {
        result.push(coOrdinateList1[i]);
        i += 1;
      } else if (
        coOrdinateList1[i][0] === coOrdinateList2[j][0] && // Inserting j since row value of j is less than i
        coOrdinateList1[i][1] > coOrdinateList2[j][1]
      ) {
        result.push(coOrdinateList2[j]);
        j += 1;
      } else if (coOrdinateList1[i][0] < coOrdinateList2[j][0]) {
        // Inserting i since row value of i is less than j
        result.push(coOrdinateList1[i]);
        i += 1;
      } else {
        // Inserting j since row value of j is less than i
        result.push(coOrdinateList2[j]);
        j += 1;
      }
    }
    return [
      [coOrdinateList1[0][0], coOrdinateList1[0][1], result.length],
      ...result,
    ];
  }
}

const twoDArray1 = [
  [0, 0, 0, 6, 0, 0],
  [0, 7, 0, 0, 0, 0],
  [0, 2, 0, 5, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0],
];
const twoDArray2 = [
  [0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 5, 0],
  [0, 0, 2, 0, 0, 7],
  [0, 0, 0, 9, 0, 0],
  [8, 0, 0, 0, 0, 0],
];
const sparseMatrix = new SparseMatrix();
// console.log(sparseMatrix.convertCoOrdinateList(twoDArray2));
console.log(sparseMatrix.sumOfMatrix(twoDArray1, twoDArray2));
