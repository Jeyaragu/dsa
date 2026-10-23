const validAnagram = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }
  const str1FreqCounter = new Map();
  // Looping through the str1 and counting the frequency of each character in str1
  for (const char of str1) {
    str1FreqCounter.set(char, (str1FreqCounter.get(char) || 0) + 1);
  }
  // Looping through the str1FreqCounter
  for (const char of str2) {
    if ((str1FreqCounter.get(char) || 0) === 0) {
      return false;
    }
    str1FreqCounter.set(char, str1FreqCounter.get(char) - 1);
  }
  return true;
};
// console.log(validAnagram("aat", "car"));

function findPair(nums, target) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num - target) || seen.has(num + target)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}
// console.log(findPair([-4, 4], 8));

function sameFrequency(num1, num2) {
  if (num1.toString().length !== num2.toString().length) {
    return false;
  }
  const freqNum1 = {};
  const freqNum2 = {};
  for (const n1 of num1.toString()) {
    freqNum1[n1] = (freqNum1[n1] || 0) + 1;
  }
  for (const n2 of num2.toString()) {
    freqNum2[n2] = (freqNum2[n2] || 0) + 1;
  }
  for (const key in freqNum1) {
    if (!(key in freqNum2)) return false;
    if (freqNum1[key] !== freqNum2[key]) return false;
  }
  return true;
}
// console.log(sameFrequency(2222, 2222));

function findAllDuplicates(nums) {
  const duplicates = new Set();
  const freqCounter = new Map();
  for (const num of nums) {
    if (freqCounter.has(num)) {
      duplicates.add(num);
      freqCounter.set(num, freqCounter.get(num) + 1);
    } else {
      freqCounter.set(num, 1);
    }
  }
  return Array.from(duplicates);
}
// console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3]));

// Able to fomulate the msg from the letters
function constructNote(msg, letters) {
  // If the length of the message is greater than the length of the letters, then it is not possible to construct the note
  if (msg.length > letters.length) return false;
  // Initializing the frequency counter for the message and the letters
  const msgFreqCounter = new Map();
  const lettersFreqCounter = new Map();
  // Looping through the message and counting the frequency of each character in the message
  for (const char of msg) {
    msgFreqCounter.set(char, (msgFreqCounter.get(char) || 0) + 1);
  }
  // Looping through the letters and counting the frequency of each character in the letters
  for (const l of letters) {
    lettersFreqCounter.set(l, (lettersFreqCounter.get(l) || 0) + 1);
  }
  // Looping through the message frequency counter
  for (const [key, value] of msgFreqCounter) {
    if (!lettersFreqCounter.has(key)) return false;
    if (value > lettersFreqCounter.get(key)) return false;
  }
  return true;
}

// console.log(constructNote('aabbcc', 'bcabcaddff'));

function areThereDuplicates(...args) {
  // Using a Set to store the unique values of the arguments
  const freqSet = new Set();
  // Looping through the arguments
  for (const arg of args) {
    // Checking if the argument is already present in the Set, if it is then return true, otherwise add it to the Set
    if (freqSet.has(arg)) return true;
    freqSet.add(arg);
  }
  // If we have looped through all the arguments and there are no duplicates, then we can return false
  return false;
}
// console.log(areThereDuplicates("z", "a", "c", "d"));

function canConstruct(ransomNote, magazine) {
  if (ransomNote.length > magazine.length) return false;
  const magazineMap = new Map();
  for (const char of magazine) {
    magazineMap.set(char, (magazineMap.get(char) || 0) + 1);
  }
  for (const char of ransomNote) {
    if (!magazineMap.has(char)) return false;
    if (magazineMap.get(char) > 0) {
      magazineMap.set(char, magazineMap.get(char) - 1);
    } else {
      return false;
    }
  }
  return true;
}
// console.log(canConstruct("aabbcc", "bcabcaddff"));

function uniqueOccurrences(arr) {
  const freqCounter = new Map();
  for (const num of arr) {
    freqCounter.set(num, (freqCounter.get(num) || 0) + 1);
  }
  // Checking if the size of the Set of the frequency counter values is equal to the size of the frequency counter itself. If it is, then it means that all the occurrences are unique, otherwise there are duplicates.
  return new Set(freqCounter.values()).size === freqCounter.size;
}
console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3, 4]));
