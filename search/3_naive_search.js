function naiveSearch(str, pattern) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (str[i + j] !== pattern[j]) break;
      if (j === pattern.length - 1) count += 1;
    }
  }
  return count;
}

console.log(
  naiveSearch(
    "No words start with the word because, because because is a conjuction",
    "a",
  ),
);
