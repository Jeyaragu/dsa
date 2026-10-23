const countUniqueValues = (arr) => {
  let leftPointer = 0;
  let rightPointer = 1;
  while (rightPointer < arr.length) {
    if (arr[leftPointer] === arr[rightPointer]) {
      rightPointer += 1;
    } else {
      leftPointer += 1;
      arr[leftPointer] = arr[rightPointer];
      rightPointer += 1;
    }
  }
  return leftPointer === 0 ? 0 : leftPointer + 1;
};
// console.log(countUniqueValues([1, 1, 2, 3, 5])); // 1,2,3,5
// console.log(countUniqueValues([-2,-1,-1,0,1]));
// console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));

// LeetCode: 125. Valid Palindrome
function isPalindrome(s) {
  const str = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let leftPointer = 0;
  let rightPointer = str.length - 1;
  while (leftPointer < rightPointer) {
    if (str[leftPointer] !== str[rightPointer]) {
      return false;
    } else {
      rightPointer -= 1;
      leftPointer += 1;
    }
  }
  return true;
}

// console.log(isPalindrome(' '))

/**
 * 167. Two Sum II - Input Array Is Sorted
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let indices = [];
  let leftPointer = 0;
  let rightPointer = numbers.length - 1;
  while (leftPointer < rightPointer) {
    const sum = numbers[leftPointer] + numbers[rightPointer];
    if (sum === target) {
      return [leftPointer + 1, rightPointer + 1];
    } else if (sum > target) {
      rightPointer -= 1;
    } else {
      leftPointer += 1;
    }
  }
  return [];
};
// console.log(twoSum([2,3,4], 6));

function averagePair(nums, target) {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;
  let avgStatus = false;
  while (leftPointer < rightPointer) {
    const avg = (nums[leftPointer] + nums[rightPointer]) / 2;
    if (avg > target) {
      rightPointer -= 1;
    } else if (avg < target) {
      leftPointer += 1;
    } else {
      avgStatus = true;
      break;
    }
  }
  return avgStatus;
}

// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1));

function isSubsequence(str1, str2) {
  let subSeqStatus = true;
  for (let i = 0; i < str1.length; i++) {
    for (let j = i; j < str2.length; j++) {
      if (str1[i] !== str2[j]) {
        subSeqStatus = false;
      } else {
        subSeqStatus = true;
        break;
      }
    }
    if (!subSeqStatus) {
      break;
    }
  }
  return subSeqStatus;
}

// console.log(isSubsequence('abc', 'abracadabra'));
function areThereDuplicates(...args) {
  let leftPointer = 0;
  let rightPointer = 1;
  while (rightPointer < args.length) {
    if (args[leftPointer] === args[rightPointer]) return true;
    leftPointer += 1;
    rightPointer += 1;
  }
  return false;
}

// console.log(areThereDuplicates(5, 5, 6, 7, 8));
function maxArea(height) {
  let leftPointer = 0;
  let rightPointer = height.length - 1;
  let maxWater = 0;
  while (leftPointer < rightPointer) {
    const findDistance = rightPointer - leftPointer;
    let minHeight = 0;
    if (height[leftPointer] === height[rightPointer]) {
      minHeight = height[leftPointer];
      leftPointer += 1;
      rightPointer -= 1;
    } else if (height[leftPointer] > height[rightPointer]) {
      minHeight = height[rightPointer];
      rightPointer -= 1;
    } else {
      minHeight = height[leftPointer];
      leftPointer += 1;
    }
    const area = minHeight * findDistance;
    maxWater = Math.max(maxWater, area);
  }
  return maxWater;
}

// 80. Remove Duplicates from Sorted Array II
function removeDuplicates(nums) {
  let slowPointer = 0;
  let fastPointer = 0;
  while (fastPointer < nums.length) {
    if (nums[slowPointer] !== nums[fastPointer]) {
      let previousSlowPointer = slowPointer;
      while (nums[previousSlowPointer] === nums[slowPointer]) {
        const windowSize = slowPointer - previousSlowPointer;
        if (nums[previousSlowPointer] === nums[slowPointer]) {
          if (windowSize < 2) {
            slowPointer += 1;
            // if (nums[slowPointer] !== nums[previousSlowPointer]) {
            //   nums[slowPointer] = nums[fastPointer];
            //   slowPointer += 1;
            // }
          } else {
            nums[slowPointer] = nums[fastPointer];
          }
        }
        // else {
        //   nums[slowPointer] = nums[fastPointer];
        //   // previousSlowPointer = slowPointer;
        // }
      }
    }
    fastPointer += 1;
  }
  return nums;
}

// console.log(removeDuplicates([1, 1, 1, 2, 2, 3]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]));

// 26. Remove Duplicates from Sorted Array
