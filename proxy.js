const user = {
  name: "John",
  age: 30,
};

const proxy = new Proxy(user, {
  get(target, prop) {
    console.log(`Reading ${prop}`);
    return prop in target ? target[prop] : 37;
  },

  set(target, prop, value) {
    console.log(`Updating ${prop} -> ${value}`);
    target[prop] = value;
    return true;
  },
  getPrototypeOf(target) {},
});

console.log(proxy.name);

proxy.age = 31;
