let bestSelection = (items, W) => {
  function price(price, discount) {
    if (discount) {
      return price;
    } else {
      return price - (price / 100) * discount;
    }
  }
  let objects = [];
  Object.keys(items).forEach((item, index) => {
    let obj = {};
    obj.id = items[item].id;
    obj.price = items[item].price;
    obj.discount = items[item].discount;
    obj.weight = items[item].weight;
    obj.stack = items[item].stack;
    objects.push(obj);
  });

  objects = sort(objects);
  let ids = [];
  let weight = 0;
  let i = 0;
  while (i < objects.length - 1) {
    while (
      W > weight &&
      objects[i].stack > 0 &&
      objects[i].weight < W - weight
    ) {
      weight += objects[i].weight;
      objects[i].stack--;
      ids.push(objects[i].id);
    }
    i++;
  }
  return ids;
  function sort(arr) {
    let mid = arr.length / 2;
    if (arr.length < 2) {
      return arr;
    }
    let left = arr.splice(0, mid);
    return merge(sort(left), sort(arr));
  }
  function merge(left, right) {
    let arr = [];
    while (left.length && right.length) {
      if (Number(left[0].discount) < Number(right[0].discount)) {
        arr.push(right.shift());
      } else {
        arr.push(left.shift());
      }
    }
    return [...arr, ...left, ...right];
  }
};

let solveKnapsack = function (profits, weights, capacity) {
  const n = profits.length;
  if (capacity <= 0 || n === 0 || weights.length !== n) return 0;

  const dp = Array(profits.length)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));

  // populate the capacity=0 columns; with '0' capacity we have '0' profit
  for (let i = 0; i < n; i++) dp[i][0] = 0;

  // if we have only one weight, we will take it if it is not more than the capacity
  for (let c = 0; c <= capacity; c++) {
    if (weights[0] <= c) dp[0][c] = profits[0];
  }

  // process all sub-arrays for all the capacities
  for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
      let profit1 = 0,
        profit2 = 0;
      // include the item, if it is not more than the capacity
      if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
      // exclude the item
      profit2 = dp[i - 1][c];
      // take maximum
      dp[i][c] = Math.max(profit1, profit2);
    }
  }

  // maximum profit will be at the bottom-right corner.
  return dp;
};

export { bestSelection };
