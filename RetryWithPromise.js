const fn1 = (str) => {
  return new Promise((resolve, reject) => {
    if (str.length === 0) {
      reject("length empty");
    } else {
      resolve(str);
    }
  });
};
const fn2 = () => {
  return new Promise((resolve, reject) => {
    resolve("F2 output");
  });
};

const fn3 = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve("---abce");
    } catch (error) {
      reject("Property Not found");
    }
  });
};
const getArgumnets = () => {};

const parallel = async (id) => {
  const tasks = [
    {
      fnName: fn1.name,
      id: fn1,
      run: () => fn1(),
    },
    {
      fnName: fn2.name,
      id: fn2,
      run: () => fn2(),
    },
    {
      fnName: fn3.name,
      id: fn3,
      run: () => fn3(),
    },
  ];
  const executeFunction = tasks.map((task) =>
    task
      .run()
      .then((data) => ({
        id: task.id,
        fnName: task.fnName,
        success: true,
        data: data,
      }))
      .catch((error) => ({
        id: task.id,
        fnName: task.fnName,
        success: false,
        error: error,
      })),
  );
  const result = await Promise.allSettled(executeFunction);
  const failedFunctions = result
    .filter((r) => !r.value.success)
    .map((obj) => ({
      id: obj.value.id,
      fnName: obj.value.fnName,
      run: () => obj.value.id,
    }));
  const successResult = result
    .filter((r) => r.value.success)
    .map((obj) => {
      return {
        [obj.value.fnName]: obj.value.data,
      };
    });
  const max_retry = 2;
  const retryResult = [];
  for (const fns of failedFunctions) {
    let retry = 0;
    console.log(fns);
     fns
      .id("ragu")
      .then(
        (result) =>
          (retryResult = [
            ...retryResult,
            {
              [fns.fnName]: result,
            },
          ]),
      )
      .catch((error) => retry + 1);
  }
};

console.log(parallel());
