const calculateSeatBooking = (totalRow, seatsPerRow, ticketRate) => {
  const totalSeats = totalRow * seatsPerRow;
  let seatNumbers = [];
  let bookedSeats = [];
  let nonBookedSeats = [];
  // Finding total number of seats / odd seats
  for (let i = 1; i <= totalSeats; i++) {
    if (i % 2 !== 0) {
      bookedSeats.push(i);
    } else {
      nonBookedSeats.push(i);
    }
    seatNumbers.push(i);
  }
  let seatAllocation = [];
  for (let k = 0; k < seatNumbers.length; k = k + seatsPerRow) {
    seatAllocation.push(seatNumbers.slice(k, k + seatsPerRow));
  }
  let bookingOutLet = [];
  for (let m = 0; m < seatAllocation.length; m++) {
    let mockedSeats = [];
    if (m % 2 == 0) {
      // Odd Seats
      seatAllocation[m].forEach((seats) => {
        if (seats % 2 == 0) {
          mockedSeats.push(seats);
        } else {
          // Booked seat masked
          mockedSeats.push("*");
        }
      });
    } else {
      // Even Seats
      seatAllocation[m].forEach((seats) => {
        if (seats % 2 == 0) {
          // Booked seat masked
          mockedSeats.push("*");
        } else {
          mockedSeats.push(seats);
        }
      });
    }
    bookingOutLet.push(mockedSeats);
  }
  console.log("bookingOutLet", bookingOutLet);
  return {
    totalSeats,
    bookedSeats: bookedSeats.length,
    nonBookedSeats: nonBookedSeats.length,
  };
};

// console.log(calculateSeatBooking(4, 10, 100));

const findInterSection = (x1, d1, x2, d2) => {
  let jumpTime = 1;
  let movePositions_1 = new Map();
  let movePositions_2 = new Map();
  movePositions_1.set(jumpTime, x1 + d1);
  movePositions_2.set(jumpTime, x2 + d2);
  let insterSectionStatus = "No";
  while ((movePositions_1.size && movePositions_2.size) < 1000) {
    let newJumpLocation = jumpTime + 1;
    movePositions_1.set(
      newJumpLocation,
      Number(movePositions_1.get(jumpTime)) + d1,
    );
    movePositions_2.set(
      newJumpLocation,
      Number(movePositions_2.get(jumpTime)) + d2,
    );
    jumpTime += 1;
  }
  for (const [key, value] of movePositions_1) {
    let getJumpDistance = movePositions_2.get(key);
    console.log("key", key, value, getJumpDistance);
    if (getJumpDistance == value) {
      insterSectionStatus = "Yes";
      break;
    }
  }
  return {
    // movePositions_1,
    // movePositions_2,
    insterSectionStatus,
  };
};
// console.log(findInterSection(0, 1, 4, 2));
// console.log(findInterSection(0, 2, 5, 3));
// console.log(findInterSection(0, 3, 4, 2));

// const str = 'saveWaterAndSaveTheWorld'
// let captialLetter = /[A-Z]/g;
// console.log(str.match(captialLetter));
// console.log(str.indexOf("W", 5));
const findNumberOfWords = (str) => {
  const words = [];
  let word = "";
  for (const char of str) {
    if (char === char.toUpperCase() && word.length > 0) {
      words.push(word);
      word = char;
    } else {
      word += char;
    }
  }

  if (word) words.push(word);
  return words;

  // const convertArray = str.split("");
  // const captialLetter = /[A-Z]/g;
  // let words = [];
  // let word = "";
  // let currentIndex = 0;
  // for (const element in convertArray) {
  //   let matchCaptialLetter = convertArray[element].match(captialLetter);
  //   if (matchCaptialLetter) {
  //     words.push(word);
  //     currentIndex = element;
  //     word = convertArray[element];
  //   } else {
  //     word += convertArray[element];
  //   }
  // }
  // words.push(convertArray.splice(currentIndex).join(''))
  // return words;
};
// console.log(findNumberOfWords("saveWaterAndSaveTheWorld"));
// console.log(findNumberOfWords("saveWaterAndSaveTheWorld"));
// const arrayone = [1, 2, 6];
// const arraytwo = [0, 4, 5];

// const result = arrayone.reduce(
//   ([first, second], val, i) =>
//     val > arraytwo[i] ? [first + 1, second] : [first, second + 1],
//   [0, 0]
// );

// console.log("firstArrayRes", result[0]);
// console.log("secondArrayRes", result[1]);
// console.log("result", result);
function staircase(n) {
  let size = n;
  let lader = [];
  let hash = "#";
  while (size > 0) {
    lader.push(`${hash}`.padStart(n));
    // console.log(`${hash}`.padStart(n));
    hash += "#";
    size -= 1;
  }
  return lader.join("\n");
}
// console.log(staircase(6));

function test1() {
  const value = "something";
  return function test2() {
    const resutl = "add" + value;
    return resutl;
  };
}
// console.log(test1()());

// function test2() {
//   const resutl = "add" + value;
//   return resutl;
// }
// console.log(test2());

function minimumNumber(n, password) {
  // Return the minimum number of characters to make the password strong
  let minimumNumber = 0;
  !password.match(/[A-Z]/g) ? minimumNumber++ : "";
  !password.match(/[a-z]/g) ? minimumNumber++ : "";
  !password.match(/[!@#/$%/^&/*()\-/+]/g) ? minimumNumber++ : "";
  !password.match(/[0-9]/g) ? minimumNumber++ : "";
  // Calculating number of digits after the found missing conditions and it should be greater that 6
  minimumNumber + n < 6 ? minimumNumber++ : minimumNumber;
  minimumNumber + n < 6 ? minimumNumber++ : minimumNumber;
  return minimumNumber;
}
// console.log(minimumNumber(5, '$1234'));
// console.log(minimumNumber(5, '^e!zA'));
// console.log(minimumNumber(5, '#**#*'));
// console.log(minimumNumber(1, "!"));
// console.log(minimumNumber(3, '790'));

function superReducedString(s) {
  let distinctPair = [];
  const distinctChar = Array.from(new Set(s));
  let alternateStrMap = new Map();
  for (let i = 0; i < distinctChar.length; i = i + 1) {
    let j = i;
    while (j < distinctChar.length) {
      distinctChar[j + 1]
        ? distinctPair.push([distinctChar[i], distinctChar[j + 1]])
        : "";
      j++;
    }
  }
  for (const pair of distinctPair) {
    for (let l = 0; l < pair.length; l = l + 2) {
      const splitOriginalStr = s
        .split("")
        .filter((e) => e == pair[l] || e == pair[l + 1]);
      for (const index in splitOriginalStr) {
        if (splitOriginalStr[index - 1]) {
          if (splitOriginalStr[index] == splitOriginalStr[index - 1]) {
            alternateStrMap.set(splitOriginalStr.join(""), 0);
            break;
          } else {
            alternateStrMap.set(
              splitOriginalStr.join(""),
              splitOriginalStr.length,
            );
          }
        }
      }
    }
  }
  return distinctPair.length > 0
    ? Math.max.apply(this, Array.from(alternateStrMap.values()))
    : 0;
}

// console.log(superReducedString("beabeefeab"));

// Separate the Numbers
function separateNumbers(s) {
  const lgt = s.length;
  let status = "NO";
  let combinationArr = "";
  let firstElement = s[0];
  if (s.length === 1) {
    status = "NO";
  } else {
    for (let i = 0; i < Math.floor(s.length / 2); ) {
      let counter = 1;
      let sli = BigInt(s.slice(0, i + 1));
      combinationArr = sli.toString();
      while (combinationArr.length !== lgt) {
        let nextNumber = String(sli + BigInt(counter));
        if (
          s.slice(
            combinationArr.length,
            combinationArr.length + nextNumber.length,
          ) !== nextNumber
        ) {
          status = "NO";
          break;
        } else {
          combinationArr += nextNumber;
          counter++;
        }
      }
      if (combinationArr === s) {
        status = "YES";
        firstElement = sli;
        break;
      } else {
        combinationArr = "";
        i++;
      }
    }
  }
  // console.log(status, status == "YES" ? firstElement.toString() : "");
  return;
}

// console.log(separateNumbers("101103"));
// console.log(separateNumbers("1234"));
// console.log(separateNumbers("90071992547409929007199254740993"));
// console.log(separateNumbers("13"));
// console.log(separateNumbers("99100"));
// console.log(separateNumbers("91011"));
// console.log(separateNumbers("010203"));

function sortNonNegativeNumbers(arr) {
  let sortResult = [];
  let nonNegativeNumbers = [];
  for (const v of arr) {
    if (Math.sign(v) == -1) {
      if (nonNegativeNumbers.length > 0) {
        const sortArray = nonNegativeNumbers.sort((a, b) => a - b);
        nonNegativeNumbers = [];
        sortResult = [...sortResult, ...sortArray];
        sortResult.push(v);
      } else {
        sortResult.push(v);
      }
    } else {
      nonNegativeNumbers.push(v);
    }
  }
  return nonNegativeNumbers.length == 0
    ? sortResult
    : nonNegativeNumbers.sort((a, b) => a - b);
}

// console.log(sortNonNegativeNumbers([5, 0, 1, 2, 3, 7]));
// console.log(
//   sortNonNegativeNumbers([
//     -1, 8, 3, 7, 2, -1, -2, 9, 6, 5, -2, 10, -1, 4, 1, 0, -1, 11, -3, 13, 12,
//     -3, -1, 15, 14, 16, -1, 17, 18, 19, 20, -1,
//   ])
// );

// let findNegativeIndexes = [];
// let sortResult = [];
// arr.forEach((item, index) => {
//   if (Math.sign(item) == -1) {
//     return findNegativeIndexes.push(index);
//   }
// });
// for (let i = 0; i < findNegativeIndexes.length; ) {
//   sortResult.push(arr[findNegativeIndexes[i]]);
//   i++;
// }
// return { sortResult, findNegativeIndexes };

function funnyString(s) {
  // Finding uni code of all the characters
  const strUniCode = s.split("").map((char, index) => s.charCodeAt(index));
  let mainStrDifference = [];
  strUniCode.forEach((element, index) => {
    if (strUniCode[index + 1]) {
      mainStrDifference.push(Math.abs(strUniCode[index + 1] - element));
    }
  });
  const reverseResult = [...mainStrDifference].reverse();
  return mainStrDifference.join("") == reverseResult.join("")
    ? "Funny"
    : "Not Funny";
}
// console.log(funnyString("ivvkx")); // Funny

function hackerrankInString(s) {
  const hackerrank = Array.from("hackerrank");
  const strLowercase = Array.from(s.toLowerCase());
  const hIndex = strLowercase.indexOf("h");
  let isValidString = "YES";
  if (hIndex === -1) {
    isValidString = "NO";
  } else {
    let fromIndex = 0;
    for (const char of hackerrank) {
      const findChar = strLowercase.indexOf(char, fromIndex);
      if (findChar >= 0) {
        fromIndex = findChar + 1;
      } else {
        isValidString = "NO";
        break;
      }
    }
  }
  return isValidString;
}
// console.log(hackerrankInString("hackerworld"));
// console.log(hackerrankInString("hhaacckkekraraannk"));
// [].filter(item => !!item);
function caesarCipher(s, k) {
  // Generating Alphabets
  const alphaCharCode = Array.from(Array(26)).map((item, index) => index + 65);
  const alphabet = alphaCharCode.map((item, index) =>
    String.fromCharCode(item).toLocaleLowerCase(),
  );
  // If k is greater that 26 we have find the module value for rotoate the alphabet
  k > alphabet.length ? (k = k % alphabet.length) : k;
  const encryptedAlphabets = [...alphabet.slice(k), ...alphabet.slice(0, k)];
  let encryResult = [];
  for (const char of s) {
    const isSplChra = char.match(/[!``@#/$%/^&/?*().\-_/+0-9<>\[\]{}]/g);
    if (!isSplChra) {
      const getIndex = alphabet.indexOf(char);
      getIndex >= 0
        ? encryResult.push(encryptedAlphabets[getIndex])
        : encryResult.push(
            encryptedAlphabets[
              alphabet.indexOf(char.toLowerCase())
            ].toUpperCase(),
          );
    } else {
      encryResult.push(char);
    }
  }
  return encryResult.join("");
}
// console.log(caesarCipher("abcZ", 3));

function marsExploration(s) {
  // Write your code here
  const msgLength = Math.round(s.length / 3);
  let convertSos = [];
  let startIndex = 0;
  let toIndex = 3;
  let invalidMsgCount = 0;
  while (convertSos.length < msgLength) {
    convertSos.push(s.slice(startIndex, toIndex));
    startIndex += 3;
    toIndex += 3;
  }
  convertSos.forEach((item) => {
    if (item !== "SOS") {
      for (let i = 0; i < item.length; i++) {
        if (i == 0 && item[i] != "S") {
          invalidMsgCount += 1;
        }
        if (i == 1 && item[i] != "O") {
          invalidMsgCount += 1;
        }
        if (i == 2 && item[i] != "S") {
          invalidMsgCount += 1;
        }
      }
    }
  });
  return invalidMsgCount;
}

// function marsExploration(s) {
//   // Write your code here
//   console.log(s.length);
//   const msgLength = Math.round(s.length / 3);
//   const generateSOSMsg = "SOS".repeat(msgLength);
//   const patter = "SOS";
//   let invalidMsgCount = 0;
//   for (const index in s) {
//     if (char != patter[index % 3]) {
//       invalidMsgCount +=1
//     }
//   }
//   return invalidMsgCount;
// }

// console.log(marsExploration("SOSSPSSQSSORSSS"));
// console.log(marsExploration("OOSDSSOSOSWEWSOSOSOSOSOSOSSSSOSOSOSS")); // 12
// console.log(marsExploration("SOSOOSOSOSOSOSSOSOSOSOSOSOS"));
// function calculatePrice(price) {
//   return function findTax(tax) {
//     const taxValue = price + price * tax;
//     return function findDiscount(discount=0) {
//       const discountPrice = taxValue * discount;
//       return taxValue - discountPrice;
//     };
//   };
// }
// console.log(calculatePrice(100)(0.1)());

// function test1 () {
//   const a = [1,2,3]
//   return test2(...a) // unpack the elements
// }
// function test2 (...a) { // Collect all the elements
//   console.log(a)
//   return;
// }
// console.log(test1())

function sumOfTen(arr, target) {
  let leftPointer = 0;
  let rightPointer = arr.length - 1;
  while (arr[leftPointer] + arr[rightPointer] !== target) {
    if (arr[leftPointer] + arr[rightPointer] < target) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }
  return [arr[leftPointer], arr[rightPointer]];
}

// console.log(sumOfTen([8, 0, 2, 1], 10));
// console.log(sumOfTen([1, 2, 3, 4], 4));

function pangrams(s) {
  const str = new Set(
    s.replaceAll(/[\s!``@#/$%/^&/?*().\-_/+0-9<>\[\]{}]/g, "").toLowerCase(),
  );
  return Array.from(str).length === 26 ? "pangram" : "not pangram";
  // if (str.length > 26) {
  //   const alphaCharCode = Array.from(Array(26)).map(
  //     (item, index) => index + 65
  //   );
  //   const alphabet = alphaCharCode.map((item) =>
  //     String.fromCharCode(item).toLocaleLowerCase()
  //   );
  //   for (const char of alphabet) {
  //     const isChartAvailable = str.includes(char);
  //     if (!isChartAvailable) {
  //       isPangram = "not pangram";
  //       break;
  //     }
  //     isPangram = "pangram";
  //   }
  // }
  // console.log(new Set(str))
  // return isPangram;
}
// console.log(
//   pangrams("We promptly judged antique ivory buckles for the next prize")
// );
// console.log(pangrams("We promptly judged antique ivory buckles for the prize"));

function weightedUniformStrings(s, queries) {
  // Write your code here
  const strArry = Array.from(s);
  let uniformSet = new Set();
  let preVal = 0;
  let preStr = null;
  for (const str of strArry) {
    const charIndex = str.charCodeAt(0) - 96;
    if (str == preStr) {
      preVal += charIndex;
      uniformSet.add(preVal);
    } else {
      preVal = charIndex;
      preStr = str;
      uniformSet.add(charIndex);
    }
  }

  return queries.map((item) => (uniformSet.has(item) ? "Yes" : "No"));
}
// console.log(weightedUniformStrings("abccddde", [1, 3, 12, 5, 9, 10]));
// console.log(weightedUniformStrings("aaabbbbcccddd", [9, 7, 8, 12, 5]));

// function runFunc(){
//   console.log("1" + 1);
//   console.log("A" - 1);
//   console.log(2 + "-2" + "2");
//   console.log("Hello" - "World" + 78);
//   console.log("Hello"+ "78");
//   let a = 'string'.toUpperCase()
// }
// runFunc();

// a = 10
// let a
// console.log(a)

function theLoveLetterMystery(s) {
  let leftPointer = 0;
  let rightPointer = s.length - 1;
  let operationCount = 0;
  let newStr = Array.from(s);
  // let operations = 0;
  // let left = 0;
  // let right = s.length - 1;
  // while (left < right) {
  //   operations += Math.abs(
  //     s.charCodeAt(left) - s.charCodeAt(right)
  //   );
  //   left++;
  //   right--;
  // }
  // return operations;
  while (leftPointer < rightPointer) {
    if (s[leftPointer] === s[rightPointer]) {
      rightPointer -= 1;
      leftPointer += 1;
    } else {
      let leftStrCharCode = s[leftPointer].charCodeAt(0);
      let rightStrCharCode = s[rightPointer].charCodeAt(0);
      const diff = leftStrCharCode - rightStrCharCode;
      if (Math.sign(diff) === -1) {
        const rightNewChar = String.fromCharCode(
          rightStrCharCode - Math.abs(diff),
        );
        newStr[rightPointer] = rightNewChar;
      } else {
        const leftNewChar = String.fromCharCode(
          leftStrCharCode - Math.abs(diff),
        );
        newStr[leftPointer] = leftNewChar;
      }
      if (newStr.join("") === newStr.reverse().join("")) {
        operationCount += Math.abs(diff);
        rightPointer -= 1;
        leftPointer += 1;
        break;
      } else {
        operationCount += Math.abs(diff);
        rightPointer -= 1;
        leftPointer += 1;
      }
    }
  }
  return operationCount;
}
// console.log(theLoveLetterMystery("abcba"));
// console.log(theLoveLetterMystery("abc"));
// console.log(theLoveLetterMystery("abcd")); // abca !== acba , abca -- 4
// console.log(theLoveLetterMystery("cba"));
// console.log(theLoveLetterMystery("ofrhase"));

function beautifulBinaryString(b) {
  const windowSize = 3;
  let charToChange = 0;
  let binaryStr = b;
  for (let i = 0; i < b.length; i++) {
    let acc = "";
    let updateStrIndex = 0;
    for (let k = i; k < i + windowSize; k++) {
      binaryStr[k] ? (acc += binaryStr[k]) : "";
      updateStrIndex = k;
    }
    if (acc === "010") {
      charToChange += 1;
      let char = binaryStr[updateStrIndex] == "0" ? "1" : "0";
      binaryStr =
        binaryStr.substring(0, updateStrIndex) +
        char +
        binaryStr.substring(updateStrIndex + 1);
    }
  }
  return charToChange;
}
// console.log(beautifulBinaryString("01001001011101"));

function twoStrings(s1, s2) {
  let commonStrResult = "NO";
  console.log(new Set(s1));
  for (const str of s1) {
    const commonStr = s2.includes(str);
    if (commonStr) {
      commonStrResult = "YES";
      break;
    }
  }
  return commonStrResult;
}
// console.log(twoStrings("and", "art"));

function stringConstruction(s) {
  console.log(new Set(s).size);
}
// console.log(stringConstruction("abc"));

function anagram(s) {
  if (s.length % 2) {
    return -1;
  } else {
    const subStr1 = s.substring(0, s.length / 2);
    const subStr2 = s.substring(s.length / 2);
    let strMap1 = new Map();
    let strMap2 = new Map();
    for (const s1 of subStr1) {
      strMap1.set(s1, (strMap1.get(s1) || 0) + 1);
    }
    for (const s2 of subStr2) {
      strMap2.set(s2, (strMap2.get(s2) || 0) + 1);
    }
    let count = 0;
    for (const [key, value] of strMap1) {
      if (!strMap2.has(key)) {
        count += strMap1.get(key);
      } else {
        const getValue2 = strMap2.get(key);
        if (value > getValue2) {
          count += value - getValue2;
        }
      }
    }
    return count;
  }
}

function makingAnagrams(s1, s2) {
  let strMap1 = new Map();
  let strMap2 = new Map();
  let removeCount = 0;
  for (const str1 of s1) {
    strMap1.set(str1, (strMap1.get(str1) || 0) + 1);
  }
  for (const str2 of s2) {
    strMap2.set(str2, (strMap2.get(str2) || 0) + 1);
  }
  for (const [key, value] of strMap1) {
    if (!strMap2.has(key)) {
      removeCount += strMap1.get(key);
    } else {
      const getValue2 = strMap2.get(key);
      if (value > getValue2) {
        removeCount += value - getValue2;
      }
    }
  }
  for (const [key, value] of strMap2) {
    if (!strMap1.has(key)) {
      removeCount += strMap2.get(key);
    } else {
      const getValue2 = strMap1.get(key);
      if (value > getValue2) {
        removeCount += value - getValue2;
      }
    }
  }
  return removeCount;
}
// console.log(
//   makingAnagrams(
//     "absdjkvuahdakejfnfauhdsaavasdlkj",
//     "djfladfhiawasdkjvalskufhafablsdkashlahdfa",
//   ),
// );

function sumRange(arr, left, right) {
  const sumArr = [];
  let prevSum = 0;
  for (let i = 0; i < arr.length; i++) {
    prevSum += arr[i];
    sumArr.push(prevSum);
  }
  return left === 0 ? sumArr[right] : sumArr[right] - sumArr[left - 1];
}
// console.log(sumRange([-2, 0, 3, -5, 2, -1], 0, 2));
// console.log(sumRange([-2, 0, 3, -5, 2, -1], 1, 3));

function gameOfThrones(s) {
  const subStr1 = s.substring(0, s.length / 2);
  const subStr2 = s.substring(s.length / 2);
  let strMap1 = new Map();
  let strMap2 = new Map();
  let anagram1 = "";
  let anagram2 = "";
  for (const s1 of subStr1) {
    strMap1.set(s1, (strMap1.get(s1) || 0) + 1);
  }
  for (const s2 of subStr2) {
    strMap2.set(s2, (strMap2.get(s2) || 0) + 1);
  }
  for (const [key, value] of strMap1) {
    if (strMap2.has(key)) {
      const getValue2 = strMap2.get(key);
      if (value > getValue2) {
        anagram2 = anagram2 + key;
      } else if (value < getValue2) {
        anagram1 = key + anagram1;
      } else {
        anagram2 = anagram2 + key;
        anagram1 = key + anagram1;
      }
    } else {
    }
  }
  return { anagram1, anagram2, strMap1, strMap2 };
}

// Interview Question
// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

function largestAltitude(gain) {
  const cumSum = new Array(gain.length + 1);
  cumSum[0] = 0;
  let currentSum = 0;
  for (let i = 0; i < gain.length; i++) {
    const findIndicesSum = gain[i] + currentSum;
    cumSum[i + 1] = findIndicesSum;
    currentSum = findIndicesSum;
  }
  return Math.max.apply(null, cumSum);
}
// console.log(largestAltitude([-5, 1, 5, 0, -7]));

function pivotIndex(nums) {
  const cumSum = new Array(nums.length);
  cumSum[0] = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const findIndicesSum = nums[i] + currentSum;
    cumSum[i] = findIndicesSum;
    currentSum = findIndicesSum;
  }
  let leftSum = 0;
  let rightSum = 0;
  let index = 0;
  let indices = cumSum.length;
  for (let j = 1; j < cumSum.length; j++) {
    if (j !== 1) {
      rightSum = cumSum[indices - j] - cumSum[j - 1];
      leftSum = cumSum[j]; //
      index += 1;
    } else {
      rightSum = cumSum[indices - j] - cumSum[j - 1];
    }
  }
  return cumSum;
}
// console.log(pivotIndex([1, 7, 3, 6, 5, 6]));

// 1588. Sum of All Odd Length Subarrays
function sumOddLengthSubarrays(arr) {
  const recur = (arr, startIndex, maxLength) => {
    let subArrSum = 0;
    for (let s = startIndex; s <= startIndex + maxLength; s++) {
      subArrSum += arr[s];
    }
    return subArrSum;
  };

  let sumOfOddSubArrays = 0;
  for (let i = 0; i < arr.length; i++) {
    sumOfOddSubArrays += arr[i];
    let oddNoIncrement = 2;
    while (oddNoIncrement < arr.length) {
      if (arr[i + oddNoIncrement]) {
        let getSubArrSum = recur(arr, i, oddNoIncrement);
        sumOfOddSubArrays += getSubArrSum;
      }
      oddNoIncrement += 2;
    }
  }
  return sumOfOddSubArrays;
}
// const number = 1;
// console.log(number.toString(2));
// console.log(sumOddLengthSubarrays([1, 4, 2, 5, 3]));
// 1356. Sort Integers by The Number of 1 Bits
// function sortByBits(arr: number[]): number[] {

// };

function mergeAlternately(word1, word2) {
  let mergeResult = "";
  for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
    word1[i] ? (mergeResult += word1[i]) : mergeResult;
    word2[i] ? (mergeResult += word2[i]) : mergeResult;
  }
  return mergeResult;
}
// console.log(mergeAlternately("ab", "pqrs"));
// console.log(mergeAlternately("abcd", "pq"));
// console.log(mergeAlternately("abc", "pqr"));

// 643. Maximum Average Subarray I
function findMaxAverage(nums, k) {
  let averageMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    let currentSum = 0;
    for (let j = i; j < k; j++) {}
  }
}

function findMaxAverage(nums, k) {
  let maxAverageValue = 0;
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  maxAverageValue = windowSum;
  for (let j = k; j < nums.length; j++) {
    windowSum += nums[j] - nums[j - k];
    maxAverageValue = Math.max(maxAverageValue, windowSum);
  }
  return maxAverageValue / k;
}

function rotateLeft(d, arr) {
  // Write your code here
  const result = new Array(arr.length - 1).fill(0);
  for (const index in arr) {
    const findNewIndex = index - d;
    const alterValue = arr.length + findNewIndex;
    if (alterValue < arr.length) {
      result[alterValue] = arr[index];
    } else {
      result[findNewIndex] = arr[index];
    }
  }
  return result;
}
// console.log(rotateLeft(2, [1, 2, 3, 4, 5]));
