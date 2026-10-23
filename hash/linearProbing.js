// LinerProbling implementation that support any type of inputs string, number or boolean
class LinerProbingHashFunction {
  constructor(size = 51) {
    this.count = 0;
    this.arrMap = new Array(size);
    this.primeNumber = 31; // 5381 - Most used prime number
  }
  // Not used by outside the module.
  // underscore (_) not enforced by node js and we can able to use outside of the module
  // # - enforced by node js and it truly a private method not able to use outside of the module
  #hash(key) {
    let hashValue = 0;
    for (const k of key) {
      let value = k.charCodeAt(0);
      hashValue = (hashValue * this.primeNumber + value) % this.arrMap.length;
    }
    return hashValue;
  }
  set(key, value) {
    let hashIndex = this.#hash(key);
    let startIndex = hashIndex;
    if (this.count < this.arrMap.length) {
      while (this.arrMap[hashIndex] !== undefined) {
        // If the same key exist, then it will update the new value
        if (this.arrMap[hashIndex][0] === key) {
          this.arrMap[hashIndex][1] = value;
          return true;
        }
        hashIndex = (hashIndex + 1) % this.arrMap.length;
        if (hashIndex === startIndex) return false;
      }
      this.arrMap[hashIndex] = [key, value];
      this.count++;
      return true;
    }
    return false;
  }
  
  get(key) {
    let hashIndex = this.#hash(key);
    let startIndex = hashIndex;
    while (this.arrMap[hashIndex] !== undefined) {
      if (this.arrMap[hashIndex][0] === key) {
        return this.arrMap[hashIndex];
      }
      hashIndex = (hashIndex + 1) % this.arrMap.length;
      if (hashIndex === startIndex) return null;
    }
    return null;
  }

  delete(key) {
    let hashIndex = this.#hash(key);
    let startIndex = hashIndex;
    while (this.arrMap[hashIndex] !== undefined) {
      if (this.arrMap[hashIndex][0] === key) {
        const value = this.arrMap[hashIndex];
        delete this.arrMap[hashIndex];
        this.count -= 1;
        return value;
      }
      hashIndex = (hashIndex + 1) % this.arrMap.length;
      if (hashIndex === startIndex) return null;
    }
    return null;
  }
  displayAll() {
    return this.arrMap;
  }
}

// const lp = new LinerProbingHashFunction(10);
// lp.set("astu", "A");
// lp.set("tuas", "C");
// lp.set("bstu", "B");
// lp.set("cstu", "B");
// lp.set("es#tu", "E");
// lp.delete("estu", "A");
// console.log(lp.displayAll());
