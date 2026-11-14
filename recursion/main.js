function wakeUp() {
  return `Woked Up. Time is ${Date.now()}`;
}
function getReady() {
  return `Took Shower..!`;
}

function eatFood() {
  const prepareFood = cookFood();
  return prepareFood;
}
function cookFood() {
  return "Food Idly...!";
}
function goToOffice() {
  wakeUp();
  getReady();
  eatFood();
  console.log("On the road to going to office...!");
}

// goToOffice();

function printNumber(num) {
  if (num <= 0) return "Completed..!";
  console.log(num);
  return printNumber(num - 1);
}

// console.log(printNumber(3));

function factorial(num) {
  if (num <= 1) return 1;
  return num * factorial(num - 1);
}

// console.log(factorial(4));

// How to handle negative power.
// 50. Pow(x, n)
function power(base, p) {
  if (p <= 0) return 1;
  return base * power(base, p - 1);
}
// console.log(power(2, 4));

function productOfArray(nums) {
  let result = 1;
  function product(nums) {
    if (nums.length === 0) return; // Base condition
    result *= nums[0];
    product(nums.slice(1));
  }
  product(nums);
  return result;
}

// console.log(productOfArray([1, 2, 3]));

function recursiveRange(n) {
  if (n === 1) return 1;
  return n + recursiveRange(n - 1);
}
// console.log(recursiveRange(5));

function fib(n) {
  if (n <= 0) return 0;
  if (n <= 2) return 1;
  const result = [1, 1];
  function findFib() {
    if (result.length >= n) return;
    const len = result.length;
    result.push(result[len - 1] + result[len - 2]);
    findFib();
  }
  findFib();
  return result[result.length - 1];
}
// console.log(fib(4));

// n - string
// k - number of time to repeat
function superDigit(n, k) {
  let result = 0;
  function sum(str) {
    for (const digit of str) {
      result += Number(digit);
    }
  }
  // function sum(str) {
  //   if (str.length <= 0) return;
  //   result += parseInt(str[0]);
  //   sum(str.substring(1));
  // }
  sum(n);
  result *= k;
  while (result > 9) {
    let temp = result;
    result = 0;
    sum(temp.toString());
  }
  return result;
}
// console.log(superDigit("123", 3));


function reverse(str) {
  if (str.length <= 1) return str;
  return reverse(str.slice(1)) + str[0];
}
// console.log(reverse("awesome"));

function isPalindrome(str) {
  let reverseStr = "";
  function reverse(str) {
    if (str.length <= 1) return str;
    reverseStr = reverse(str.slice(1)) + str[0];
    return reverseStr;
  }
  reverse(str);
  return str === reverseStr;
}
// console.log(isPalindrome("amanaplanacanalpandemonium"));

var myPow = function (x, n) {
  // const isNegatvive = Math.sign(n) === -1 ? true : false;
  // let result = 1;
  // for (let i = 1; i <= Math.abs(n); i++) {
  //   result *= x;
  // }
  // return isNegatvive ? 1 / result : result;
  const isNegatvive = Math.sign(n) === -1 ? true : false;
  let result = 1;
  function recur(x, n) {
    if (n <= 0) return 1;
    result = x * recur(x, n - 1);
    return result;
  }
  recur(x, Math.abs(n));
  return isNegatvive ? 1 / result : result;
  // return Math.pow(2, -2);
};
// console.log(myPow(2, -2147483648));

function someRecursive(arr, callback) {
  if (arr.length === 0) return false;
  if (callback(arr[0])) return true;
  return someRecursive(arr.slice(1), callback);
}
// console.log(someRecursive([2, 4, 3], (val) => val % 2 !== 0));

function flatten(multiDimArr) {
  let result = [];
  for (let i = 0; i < multiDimArr.length; i++) {
    if (typeof multiDimArr[i] !== "object") {
      result.push(multiDimArr[i]);
    } else {
      result = result.concat(flatten(multiDimArr[i]));
    }
  }
  return result;
}

// console.log(flatten([2, [[[1]]]]));

function capitalizeFirst(arr) {
  if (typeof arr === "string") {
    arr = arr.charAt(0).toUpperCase() + arr.substring(1);
  } else {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = capitalizeFirst(arr[i]);
    }
  }
  return arr;
}
// console.log(capitalizeFirst(["car", "taco", "banana"]));

function nestedEvenSum(obj) {
  let evenSum = 0;
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "number" && value % 2 === 0) {
      evenSum += value;
    }
    if (typeof value === "object") {
      evenSum += nestedEvenSum(obj[key]);
    }
  }
  return evenSum;
}

// console.log(
//   nestedEvenSum({
//     outer: 2,
//     obj: 5,
//     obj1: {
//       obj3: [
//         {
//           num1: 4,
//         },
//       ],
//     },
//   }),
// );

function capitalizeWords(arr) {
  if (typeof arr === "string") return arr.toUpperCase();
  for (let i = 0; i < arr.length; i++) {
    arr[i] = capitalizeWords(arr[i]);
  }
  return arr;
}

// console.log(capitalizeWords(["i", "am", "learning", "recursion"]));

function stringifyNumbers(obj) {
  let redefinedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value !== "number" || typeof value !== "object") {
      redefinedObj[key] = value;
    }
    if (typeof value === "number") {
      redefinedObj[key] = String(value);
    }
    if (typeof value === "object") {
      redefinedObj[key] = stringifyNumbers(value);
    }
  }
  return Object.keys(redefinedObj).length !== 0 ? redefinedObj : [];
}

// console.log(
//   stringifyNumbers({
//     num: 1,
//     test: [],
//     data: {
//       val: 4,
//       info: {
//         isRight: true,
//         random: 66,
//       },
//     },
//   }),
// );

function collectStrings(obj) {
  var strs = [];
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      strs.push(obj[key]);
    }
    if (typeof obj[key] === "object") {
      strs = strs.concat(collectStrings(obj[key]));
    }
  }
  return strs;
}

// console.log(
//   collectStrings({
//     stuff: "foo",
//     data: {
//       val: {
//         thing: {
//           info: "bar",
//           moreInfo: {
//             evenMoreInfo: {
//               weMadeIt: "baz",
//             },
//           },
//         },
//       },
//     },
//   }),
// );

// 231. Power of Two
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  if (n === 1) return true;
  if (n % 2 !== 0 || n < 0) return false;
  return isPowerOfTwo(n / 2);
};
// console.log(isPowerOfTwo(16));

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  if (n === 1) return true;
  if (n === 0 || n % 4 !== 0 || n < 0) return false;
  return isPowerOfFour(n / 4);
};
// console.log(isPowerOfFour(0));

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
  if (n === 1) return true;
  if (n === 0 || n % 3 !== 0 || n < 0) return false;
  return isPowerOfThree(n / 3);
};
