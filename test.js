let recipeMap = new Map([
    ["огурец", 500],
    ["помидор", 350],
    ["лук",    50]
  ]);
  
  // перебор по значениям (числа)
  for (let amount of recipeMap.values()) {
    console.log(recipeMap.values()); // 500, 350, 50
  }