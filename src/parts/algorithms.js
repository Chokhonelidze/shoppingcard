let bestSelection=(items,W)=>{
    function price(price, discount) {
        if (discount) {
          return price;
        } else {
          return price - (price / 100) * discount;
        }
      }
    let cache = [];
    for (let g = 0; g<items.length+1;g++){
        cache[g] = [];
        for(let h=0;h<W+1;h++){
            cache[g][h]=0;
        }
    }
    let values =[];
    let weights =[];
    Object.keys(items).forEach((item,index)=>{
      values.push(Number(price(items[item].price,items[item].discount)));
      weights.push(Math.round(Number(items[item].weight)*Number(items[item].stack)));
    });
    console.log(values,weights);
    let solution = solveKnapsack(values,weights,W);
    console.log(solution);
   
}

let solveKnapsack = function(profits, weights, capacity) {
    const n = profits.length;
    if (capacity <= 0 || n ===0 || weights.length !== n) return 0;
  
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
  


export {bestSelection};