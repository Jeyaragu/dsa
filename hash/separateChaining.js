// Hash Function using separate chaining
class SeparateChaining {
  constructor(size = 53) {
    this.arrMap = new Array(size);
    this.primeNumber = 31; // 5381 - Most used prime number
  }
  _hash(key) {
    let total = 0;
    for (const k of key) {
      // It will give alphabet number of a string
      let value = k.charCodeAt(0) - 96;
      total = (total * this.primeNumber + value) % this.arrMap.length;
    }
    return total;
  }
  set(key, value) {
    const index = this._hash(key);
    if (!this.arrMap[index]) {
      this.arrMap[index] = [];
    }
    this.arrMap[index].push([key, value]);
    return this.arrMap;
  }

  get(key) {
    const getValue = this.arrMap[this._hash(key)];
    if (getValue) {
      for (const value of getValue) {
        // Mathching 0th index with key
        if (value[0] === key) {
          return value;
        }
      }
    }
    return;
  }

  getKeys() {
    const keys = [];
    for (const elements of this.arrMap) {
      if (elements) {
        for (const key of elements) {
          keys.push(key[0]);
        }
      }
    }
    return keys;
  }

  getValues() {
    const values = new Set();
    for (const elements of this.arrMap) {
      if (elements) {
        for (const value of elements) {
          values.add(value[1]);
        }
      }
    }
    return Array.from(values);
  }
}

// const hashFn = new SeparateChaining(10);
// hashFn.set("astu", "A");
// hashFn.set("tuas", "C");
// hashFn.set("bstu", "B");
// hashFn.set("cstu", "B");
// hashFn.set("estu", "E");
// console.log(hashFn.get("estu"));

/**
 * 242. Valid Anagram
 * https://www.hackerrank.com/challenges/game-of-thrones/problem
 * It uses separte chaining method
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let sCount = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    // It will give the index based on the alphabet
    const currentElement = s.charCodeAt(i) - 97;
    sCount[currentElement]
      ? (sCount[currentElement] += 1)
      : (sCount[currentElement] = 1);
  }

  for (let j = 0; j < t.length; j++) {
    const currentTElement = t.charCodeAt(j) - 97;
    sCount[currentTElement] -= 1;
    if (sCount[currentTElement] < 0) return false;
  }
  return true;
};
// console.log(isAnagram("anagram", "anagram"));
/**
 * This uses Separate chaining method to store the value
 * 438. Find All Anagrams in a String
 * https://www.hackerrank.com/challenges/ctci-making-anagrams/problem
 * @param {string} s - Higher length
 * @param {string} p - Small length
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const matchedIndexes = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  // Generating initial window by using p.length.
  for (let i = 0; i < p.length; i++) {
    // Minizing by 97 so it will give value from 0
    pCount[p.charCodeAt(i) - 97]
      ? (pCount[p.charCodeAt(i) - 97] += 1)
      : (pCount[p.charCodeAt(i) - 97] = 1);
    sCount[s.charCodeAt(i) - 97]
      ? (sCount[s.charCodeAt(i) - 97] += 1)
      : (sCount[s.charCodeAt(i) - 97] = 1);
  }

  const checkCoutn = (a, b) => {
    for (let j = 0; j < 26; j++) {
      if (a[j] !== b[j]) return false;
    }
    return true;
  };
  // s.length - p.length will give the total number sliding windows
  for (let right = 0; right <= s.length - p.length; right++) {
    if (checkCoutn(sCount, pCount)) matchedIndexes.push(right);
    // Moving the window to right
    if (right + p.length < s.length) {
      sCount[s.charCodeAt(right) - 97]
        ? (sCount[s.charCodeAt(right) - 97] -= 1)
        : "";
      const newChar = s.charCodeAt(right + p.length) - 97;
      sCount[newChar] ? (sCount[newChar] += 1) : (sCount[newChar] = 1);
    }
  }
  return matchedIndexes;
};

// console.log(findAnagrams("cbaebabacd", "abc"));

/**
 * Separate chaining method
 * 49. Group Anagrams
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const hash = new Map();
  for (const word of strs) {
    let strCount = new Array(26).fill(0);
    // Forming separete chaining hash table
    for (const s of word) {
      const currentElement = s.charCodeAt(0) - 97;
      strCount[currentElement]
        ? (strCount[currentElement] += 1)
        : (strCount[currentElement] = 1);
    }
    let chars = ""; // Unique character from the word
    // From the hash table, formulating unique key to store the key value pair in hash table.
    // If any other word with the same unique character and same count that is one of the equalant anagram
    // chars - is the concadination of current a character and number of occurance in the word. strCount[0] -> No. of occurance
    for (let c = 0; c < 26; c++) {
      if (strCount[c] > 0) {
        const fromCharCode = String.fromCharCode(c + 97);
        chars += `${fromCharCode}_${strCount[c]}_`;
      }
    }
    if (!hash.get(chars)) {
      hash.set(chars, []);
    }
    hash.get(chars).push(word);
  }
  return Array.from(hash.values());
};

console.log(groupAnagrams(["a"]));
