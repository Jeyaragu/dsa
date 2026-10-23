// This hash function will convert string to number
function hash(str, arrLength) {
  let total = 0;
  let testMod = 0;
  const PRIME_NUMER = 3;
  for (let i = 0; i < str.length; i++) {
    // It will return integer value that represent the UTF-16 code unit at the given index.
    const converNum = str.charCodeAt(i); // str[i].charCodeAt(0)
    // Finding alphapet index of current string
    const alphapetIndex = converNum - 96;
    // Multiply prime number with total and then add to alphapet
    // Using prime number hash function will avoid colisions
    total = (total * PRIME_NUMER + alphapetIndex) % arrLength;
    console.log(i, str[i], total);
  }
  // Modulo uses to find index of the array where we can place this value
  return total;
}

// Example of data collisions
// console.log(hash("ac", 10));
// console.log(hash("d", 10));

/**
 * 13. Roman to Integer
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let total = 0;
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanMap[s[i]];
    const nextValue = romanMap[s[i + 1]];
    if (nextValue && currentValue < nextValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }
  }
  return total;
};

// console.log(romanToInt("MCMXCIV"));
