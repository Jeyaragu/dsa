function maxVowels1(s: string, k: number): number {
  let left: number = 0;
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let vowelsCount = 0;

  // Build vowel count for the first window [0, k - 1].
  for (let right = 0; right < k; right++) {
    if (vowels.has(s[right])) vowelsCount++;
  }
  let maxVowelsCount = vowelsCount;
  // Slide the window one character at a time.
  for (let right = k; right < s.length; right++) {
    if (vowels.has(s[right])) vowelsCount++; // Right character is new to the window. So add it to the count.
    if (vowels.has(s[left])) vowelsCount--; // Left character is going out of the window. So remove it from the count.
    left++;
    maxVowelsCount = Math.max(maxVowelsCount, vowelsCount);
  }

  return maxVowelsCount;
}

// console.log(maxVowels("abciiidef", 3));

// 594. Longest Harmonious Subsequence
function findLHS(nums: number[]): number {
  let left: number = 0;
  let subArrCount: number = 0;
  let sortArr = nums.sort((a, b) => a - b);
  for (let right = 0; right < sortArr.length; right++) {
    while (sortArr[right] - sortArr[left] > 1) {
      left++;
    }
    if (sortArr[right] - sortArr[left] === 1) {
      subArrCount = Math.max(subArrCount, right - left + 1);
    }
  }
  return subArrCount;
}

// console.log(findLHS([1, 3, 2, 2, 5, 2, 3, 7]));

function birthday(s: number[], d: number, m: number): number {
  let count: number = 0;
  let sum: number = 0;
  for (let i = 0; i < m; i++) {
    sum += s[i];
  }
  if (sum === d) count++;
  for (let i = m; i < s.length; i++) {
    sum = sum + s[i] - s[i - m];
    if (sum === d) count++;
  }
  return count;
}
// 2760. Longest Even Odd Subarray With Threshold
// function longestAlternatingSubarray(nums: number[], threshold: number): number {
//   let sumArr: number[] = [];
//   let countSet: Set<number> = new Set();
//   let left: number = 0;
//   for(let right = 0; right < nums.length; right++) {
//     if(nums[right] % 2 === 0 && nums[right] <= threshold) {
//       if(nums[right - 1] % 2 === 1) {
//         sumArr.push(nums[right]);
//       }
//     }
//   }
//   return 0;
// }

// 3364. Minimum Positive Sum Subarray
// function minimumSumSubarray(nums: number[], l: number, r: number): number {
//   let minPositiveSum = Number.POSITIVE_INFINITY;

//   return 0;
// }

// 2841. Maximum Sum of Almost Unique Subarray
function maxSum(nums: number[], m: number, k: number): number {
  let sum = 0;
  let maxSum = 0;
  const freq = new Map<number, number>();
  for (let i = 0; i < k; i++) {
    sum += nums[i];
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }
  // Finding the sum of the first window and checking if it has at least m unique elements.
  if (freq.size >= m) {
    maxSum = sum;
  }
  for (let i = k; i < nums.length; i++) {
    const add = nums[i];
    const remove = nums[i - k];
    sum += add;
    freq.set(add, (freq.get(add) || 0) + 1);
    sum -= remove;
    freq.set(remove, freq.get(remove)! - 1);
    if (freq.get(remove) === 0) {
      freq.delete(remove);
    }
    if (freq.size >= m) {
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum;
  // let maxSum: number = 0;
  // let arrSet: Set<number> = new Set();
  // let maxSumSet: Set<number> = new Set();
  // for (let i = 0; i < k; i++) {
  //   maxSum += nums[i];
  //   arrSet.add(nums[i]);
  // }
  // if (arrSet.size >= m) {
  //   maxSumSet.add(maxSum);
  // } else {
  //   maxSumSet.add(0);
  // }
  // for (let i = k; i < nums.length; i++) {
  //   maxSum = maxSum + nums[i] - nums[i - k];
  //   arrSet.delete(nums[i - k]);
  //   arrSet.add(nums[i]);
  //   if (arrSet.size >= m) {
  //     maxSumSet.add(maxSum);
  //   } else {
  //     maxSumSet.add(0);
  //   }
  // }
  // return Math.max(...maxSumSet);
}

function maxSlidingWindow(nums: number[], k: number): number[] {
  // let maxVal: number = Number.NEGATIVE_INFINITY;
  // let freq: number[] = [];
  // let right: number = 0;
  // for (let left = 0; left < nums.length; left++) {
  //   let windowSize: number = k + left;
  //   while (right < windowSize && nums[right] !== undefined) {
  //     console.log(right, windowSize, nums[right]);
  //     maxVal = Math.max(maxVal, nums[right]);
  //     right++;
  //   }
  //   maxVal ? freq.push(maxVal) : "";
  // }
  // return freq;
  let maxVal: number = Number.NEGATIVE_INFINITY;
  let freq: number[] = [];
  let right: number = 0;
  for (let left = 0; left < nums.length; left++) {
    let windowSize: number = k + left;
    while (right < windowSize) {
      maxVal = Math.max(maxVal, nums[right]);
      right++;
    }
    maxVal ? freq.push(maxVal) : "";
    right = left + 1;
    maxVal = Number.NEGATIVE_INFINITY;
  }
  return freq;
}

function charCount(str: string) {
  let count = new Map();
  const lowerStr = str.toLowerCase();
  for (const s of lowerStr) {
    count.set(s, (count.get(s) || 0) + 1);
  }
  console.log(count);
  return count;
}

// charCount("SimBuU");

const data: number[] = new Array();
