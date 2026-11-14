const sortArry = (arr) => {
  // Filter only numbers
  const convertToNumbers = arr
    .filter((element) => !isNaN(Number(element)))
    .map(Number);
  // Sort the positive values in acending order
  const sortedValues = convertToNumbers
    .filter((n) => Math.sign(n) !== -1)
    .sort((a, b) => a - b);
  const result = [];
  arr.map((a, index) => {
    if (Math.sign(a) == -1) result[index] = a;
    sortedValues[index] ? result.push(sortedValues[index]) : "";
  });
  return {
    arr,
    sortedValues,
    result,
  };
};

// console.log(sortArry([3, 1, -1, 5, 2, 4, -3]));

const getTotalX = (a, b) => {
    let multiplers = [];
    // Finding multiplers
    for (const index in a) {
        let multiplerIndexer = [];
        multiplerIndexer.push(a[index]);
        while (multiplerIndexer.length < 100) {
            const lastValue = multiplerIndexer.slice(-1)[0];
            const result = lastValue + a[index];
            multiplerIndexer.push(result);
        }
        multiplers.push(multiplerIndexer);
    }
    let divisors = []
    // Finding divisors
    for (const elements of b) {
        let divisorIndexer = [];
        let startDivisor = 1;
        while (divisorIndexer.length < 100 && startDivisor <= elements) {
            elements % startDivisor == 0 ? divisorIndexer.push(startDivisor) : '';
            startDivisor++;
        }
        divisors.push(divisorIndexer);
        startDivisor = 1;
    }
    return { multiplers, divisors };
};

console.log(getTotalX([2, 3], [16, 32, 96]))