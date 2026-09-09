function maxVowels(s, k) {
  let left = 0;
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let vowelsCount = 0;
  // Build vowel count for the first window [0, k - 1].
  for (let right = 0; right < k; right++) {
    if (vowels.has(s[right])) vowelsCount++;
  }
  let maxVowelsCount = vowelsCount;
  // Slide the window one character at a time.
  for (let right = k; right < s.length; right++) {
    if (vowels.has(s[right])) vowelsCount++;
    if (vowels.has(s[left])) vowelsCount--;
    left++;
    maxVowelsCount = Math.max(maxVowelsCount, vowelsCount);
  }
  return maxVowelsCount;
}
// console.log(maxVowels("abciiidef", 3));

// Finding the maximum sum of a subarray of size windowSize in an array of integers
function maxSubarraySum(arr, windowSize) {
  if (arr.length < windowSize) return null;
  let maxSum = 0;
  let tempSum = 0;
  // Looping through the array and calculating the sum of the first window
  for (let i = 0; i < windowSize; i++) {
    tempSum += arr[i];
  }
  // Assigning the first window sum to maxSum
  maxSum = tempSum;
  // Looping through the array starting from the windowSize as index and calculating the sum for each window
  for (let i = windowSize; i < arr.length; i++) {
    // Adding the next element in the window and subtracting the first element of the previous window to get the sum of the current window
    tempSum = tempSum + arr[i] - arr[i - windowSize];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
// console.log(maxSubarraySum([100,200,300,400], 2));

function findLongestSubstring(str) {
  if (str.length === 0) return 0;
  let left = 0;
  let charSet = new Set();
  let maxLength = 0;
  for (let right = 0; right < str.length; right++) {
    if (!charSet.has(str[right])) {
      charSet.add(str[right]);
      // Finding max length of the substring for contionus characters and its not repeating
      maxLength = Math.max(maxLength, charSet.size);
    } else {
      // Before shrink taking the maximum length of the substring
      maxLength = Math.max(maxLength, charSet.size);
      // Until the character at right pointer is not removed from the set, keep shrinking the window by moving the left pointer and removing the character at left pointer from the set
      while (charSet.has(str[right])) {
        charSet.delete(str[left]);
        left += 1;
      }
      // After shrinking the window, add the character at right pointer to the set
      charSet.add(str[right]);
    }
  }
  return maxLength;
}

// console.log(findLongestSubstring(""));

// Permutation in String (LeetCode 567)
function checkInclusion(s1, s2) {
  const s1Freq = new Map();
  const s1Size = s1.length;
  // Adding the frequency of each character in s1 to the s1Freq map
  for (const char of s1) {
    s1Freq.set(char, (s1Freq.get(char) || 0) + 1);
  }
  let left = 0;
  let windowFreq = new Map();
  let matchedCount = 0;
  for (let right = 0; right < s2.length; right++) {
    // Takingng the frequency of the character at right pointer in the windowFreq map and comparing it with the frequency of the same character in s1Freq map to check if we have matched all the characters in s1
    let oldRightCount = windowFreq.get(s2[right]) || 0;
    let requiredCount = s1Freq.get(s2[right]) || 0;
    let newCharCount = oldRightCount + 1;

    windowFreq.set(s2[right], newCharCount);
    if (oldRightCount !== requiredCount && newCharCount === requiredCount) {
      matchedCount++;
    } else if (
      oldRightCount === requiredCount &&
      newCharCount !== requiredCount
    ) {
      matchedCount--;
    }
    let windowSize = right - left + 1;
    if (windowSize > s1Size) {
      let charLeft = s2[left];
      let oldLeftCount = windowFreq.get(charLeft) || 0;
      let requiredLeft = s1Freq.get(charLeft) || 0;
      if (oldLeftCount === requiredLeft) {
        matchedCount--;
      }
      let newLeftCount = oldLeftCount - 1;
      if (newLeftCount === 0) {
        windowFreq.delete(charLeft);
      } else {
        windowFreq.set(charLeft, newLeftCount);
      }
      if (newLeftCount === requiredLeft) {
        matchedCount++;
      }
      left += 1;
    }
    if (matchedCount === s1Freq.size) return true;
  }
  return false;
}

// console.log(checkInclusion("ab", "aab"));

// 713. Subarray Product Less Than K
function numSubarrayProductLessThanK(nums, k) {
  let left = 0;
  let right = 0;
  let product = 1;
  let count = 0;
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];
    // Shrink the window until the product of the elements in the window is less than k.
    while (product >= k) {
      product /= nums[left];
      left += 1;
    }
    // Adding count of subarrays with product less than k
    if (product < k) {
      count += right - left + 1;
    }
  }
  return count > 0 ? count : 0;
}
// console.log(numSubarrayProductLessThanK([10, 5, 2, 1], 100));

// 438. Find All Anagrams in a String
function findAnagrams(s, p) {
  const pFreq = new Map();
  for (const char of p) {
    pFreq.set(char, (pFreq.get(char) || 0) + 1);
  }
  let windowFreq = new Map();
  let left = 0;
  let matchedCount = 0;
  let windowSize = p.length;
  let matchedIndices = [];
  for (let right = 0; right < s.length; right++) {
    let oldRightCount = windowFreq.get(s[right]) || 0;
    let requiredCount = pFreq.get(s[right]) || 0;
    let newRightCount = oldRightCount + 1;
    windowFreq.set(s[right], newRightCount);
    if (oldRightCount !== requiredCount && newRightCount === requiredCount) {
      matchedCount += 1;
    } else if (
      oldRightCount === requiredCount &&
      newRightCount !== requiredCount
    ) {
      matchedCount -= 1;
    }
    let slidingWindowSize = right - left + 1;
    if (slidingWindowSize > windowSize) {
      let shrinkLeftChar = s[left];
      let oldLeftCount = windowFreq.get(shrinkLeftChar) || 0;
      let requiredLeftCount = pFreq.get(shrinkLeftChar) || 0;
      if (oldLeftCount === requiredLeftCount) {
        matchedCount -= 1;
      }
      let newLeftCount = oldLeftCount - 1;
      if (newLeftCount === 0) {
        windowFreq.delete(shrinkLeftChar);
      } else {
        windowFreq.set(shrinkLeftChar, newLeftCount);
      }
      if (newLeftCount === requiredLeftCount) {
        matchedCount += 1;
      }
      left += 1;
    }
    if (matchedCount === pFreq.size) {
      matchedIndices.push(right - windowSize + 1);
    }
  }
  return matchedIndices;
}

// function findAnagrams(s, p) {
//   const pFreq = new Map();

//   // Build frequency map of p
//   for (const char of p) {
//     pFreq.set(char, (pFreq.get(char) || 0) + 1);
//   }

//   let windowFreq = new Map();
//   let left = 0;
//   let result = [];
//   let k = p.length;

//   for (let right = 0; right < s.length; right++) {
//     // Add current character
//     let char = s[right];
//     windowFreq.set(char, (windowFreq.get(char) || 0) + 1);

//     // Maintain window size
//     if (right - left + 1 > k) {
//       let leftChar = s[left];
//       windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);

//       if (windowFreq.get(leftChar) === 0) {
//         windowFreq.delete(leftChar);
//       }

//       left++;
//     }

//     // Check match when window size is exactly k
//     if (right - left + 1 === k) {
//       let isMatch = true;

//       for (let [key, value] of pFreq) {
//         if (windowFreq.get(key) !== value) {
//           isMatch = false;
//           break;
//         }
//       }

//       if (isMatch) {
//         result.push(left);
//       }
//     }
//   }

//   return result;
// }
// console.log(findAnagrams("abab", "ab")); // [1]

// 424. Longest Repeating Character Replacement
function characterReplacement(s, k) {
  const windowMap = new Map();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    windowMap.set(s[right], (windowMap.get(s[right]) || 0) + 1);
    // Below is nothing but a windowSize
    let subStringLength = right - left + 1;
    // Getting maximum repeating character count in the current window
    let maxFreq = Math.max(...windowMap.values());
    // Finding char to replace in the current window by substracting the maxFreq from the window size
    // Length of current window - maximum returning characters
    const charsToReplace = subStringLength - maxFreq;
    // Need to shrink the window until the charsToReplace is less than or equal to k
    if (charsToReplace > k) {
      let leftChar = s[left];
      let leftCharCount = windowMap.get(leftChar);
      let newLeftCharCount = leftCharCount - 1;
      if (newLeftCharCount === 0) {
        windowMap.delete(leftChar);
      } else {
        windowMap.set(leftChar, newLeftCharCount);
      }
      left += 1;
    }
    // If the charsToReplace is less than or equal to k, then we can update the maxLength of the substring
    if (charsToReplace <= k) {
      maxLength = Math.max(maxLength, subStringLength);
    }
  }
  return maxLength;
}
// console.log(characterReplacement("ABBB", 2));

// 76. Minimum Window Substring
// s - string, t - string containing characters to match
function minWindow(s, t) {
  const tFreq = new Map();
  let minimumWindow = "";
  // Looping through the string t because that is the string to be checked in the string s
  for (const char of t) {
    tFreq.set(char, (tFreq.get(char) || 0) + 1);
  }
  let left = 0;
  let sFreq = new Map();
  let matchedCount = 0;
  for (let right = 0; right < s.length; right++) {
    const oldRightCount = sFreq.get(s[right]) || 0;
    const requiredCount = tFreq.get(s[right]) || 0;
    const newRightCount = oldRightCount + 1;
    sFreq.set(s[right], newRightCount);
    // Only updating matched if new and required count are same.
    if (newRightCount === requiredCount && oldRightCount !== requiredCount) {
      matchedCount += 1;
    }
    // Since its minimum window substring, we need to shrink the window until we have matched all the characters in t and then we can update the minimum window substring.
    while (matchedCount === tFreq.size) {
      let charLeft = s[left];
      let oldLeftCount = sFreq.get(charLeft) || 0;
      let requiredLeftCount = tFreq.get(charLeft) || 0;
      // There will be change in old left character since we are going shrink the count of left so reducing the matched count
      if (oldLeftCount === requiredLeftCount) {
        matchedCount -= 1;
      }
      let newReduceLeftCount = oldLeftCount - 1;
      if (newReduceLeftCount === 0) {
        sFreq.delete(charLeft);
      } else {
        sFreq.set(charLeft, newReduceLeftCount);
      }
      // After shrinking the window, updating the minimum window substring only if the new window lesser than the previous window.
      // Other we will keep the new window as minimum window substring
      minimumWindow =
        minimumWindow === "" || right - left + 1 < minimumWindow.length
          ? s.substring(left, right + 1)
          : minimumWindow;
      left += 1;
    }
  }
  return minimumWindow;
}

// console.log(minWindow("ZOQHOQGEFH", "GH"));

// 209. Minimum Size Subarray Sum
var minSubArrayLen = function (target, nums) {
  let subArraLen = Infinity;
  let left = 0;
  let windowSum = 0;
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    // Shrink once the window size is valid
    while (windowSum >= target) {
      subArraLen = Math.min(subArraLen, right - left + 1);
      windowSum -= nums[left];
      left++;
    }
  }
  return subArraLen === Infinity ? 0 : subArraLen;
};

// console.log(minSubArrayLen(4, [1,4,4]));

// 930. Binary Subarrays With Sum
var numSubarraysWithSum = function (nums, goal) {
  let left = 0;
  let subarrys = 0;
  let windowSum = 0;
  let prefixSum = 0;
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];
    while (left < right && (nums[left] === 0 || windowSum > goal)) {
      if (nums[left] === 0) {
        prefixSum += 1;
      } else {
        prefixSum = 0;
      }
      windowSum -= nums[left];
      left += 1;
    }
    if (windowSum === goal) {
      subarrys += 1 + prefixSum;
    }
  }
  return subarrys;
};
// console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0));

/**
 * 1248. Count Number of Nice Subarrays
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function (nums, k) {
  let left = 0;
  const oddMap = new Map();
  let oddSubArr = 0;
  for (let right = 0; right < nums.length; right++) {
    let findOdd = nums[right] % 2;
    if (findOdd === 1) {
      oddMap.set("odd", (oddMap.get("odd") || 0) + 1);
      // while (oddMap.get("odd") > k) {
      //   const findLeftOdd = nums[left] % 2;
      //   if (findLeftOdd === 1) {
      //     oddMap.set("odd", oddMap.get("odd") - 1);
      //   }
      // }
      if (oddMap.set("odd") === k) {
        oddSubArr += 1;
      }
    }
  }
  return { oddMap, oddSubArr };
};
console.log(numberOfSubarrays([1, 1, 2, 1, 1], 3));
