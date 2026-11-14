let x = 10;
console.log(x++);
console.log(++x);
console.log(x++);
console.log(--x);
console.log(x + 1);
console.log(x++);
console.log(++x);
console.log(--x);

let y = 5;

for (;;) {
  y = y + 5;
  console.log(1);
}
console.log("hai", y);
/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  let leftPointer = 0;
  let rightPointer = s.length - 1;
  while (leftPointer < rightPointer) {
    [s[leftPointer], s[rightPointer]] = [s[rightPointer], s[leftPointer]];
    leftPointer += 1;
    rightPointer - +1;
  }
}
