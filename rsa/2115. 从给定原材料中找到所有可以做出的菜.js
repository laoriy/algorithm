/**
 * 你有 n 道不同菜的信息。给你一个字符串数组 recipes 和一个二维字符串数组 ingredients 。第 i 道菜的名字为 recipes[i] ，如果你有它 所有 的原材料 ingredients[i] ，那么你可以 做出 这道菜。一份食谱也可以是 其它 食谱的原料，也就是说 ingredients[i] 可能包含 recipes 中另一个字符串。

同时给你一个字符串数组 supplies ，它包含你初始时拥有的所有原材料，每一种原材料你都有无限多。

请你返回你可以做出的所有菜。你可以以 任意顺序 返回它们。

注意两道菜在它们的原材料中可能互相包含。

 

示例 1：

输入：recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
输出：["bread"]
解释：
我们可以做出 "bread" ，因为我们有原材料 "yeast" 和 "flour" 。
示例 2：

输入：recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
输出：["bread","sandwich"]
解释：
我们可以做出 "bread" ，因为我们有原材料 "yeast" 和 "flour" 。
我们可以做出 "sandwich" ，因为我们有原材料 "meat" 且可以做出原材料 "bread" 。
示例 3：

输入：recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
输出：["bread","sandwich","burger"]
解释：
我们可以做出 "bread" ，因为我们有原材料 "yeast" 和 "flour" 。
我们可以做出 "sandwich" ，因为我们有原材料 "meat" 且可以做出原材料 "bread" 。
我们可以做出 "burger" ，因为我们有原材料 "meat" 且可以做出原材料 "bread" 和 "sandwich" 。
示例 4：

输入：recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast"]
输出：[]
解释：
我们没法做出任何菜，因为我们只有原材料 "yeast" 。
 */

/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function (recipes, ingredients, supplies) {
    const ingredientMap = new Map() // 这些材料能作出哪些菜
    const recipeMap = new Map() // 每道菜依赖的原料数量
    const result = []
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i]
        recipeMap.set(recipe, ingredients[i].length)
        for (let ingredient of ingredients[i]) {
            const ingredientValue = ingredientMap.get(ingredient) || []
            ingredientMap.set(ingredient, ingredientValue.concat(recipe))
        }
    }
    function check(supply) {
        const supplyCanDos = ingredientMap.get(supply) || []
        for (let canDo of supplyCanDos) {
            if (recipeMap.get(canDo)) {
                recipeMap.set(canDo, recipeMap.get(canDo) - 1)
                if (recipeMap.get(canDo) === 0) check(canDo) // 当这个将要 canDo 的菜原材料为0 ，说明可以做出来，然后再检查这以这个菜为原材料能做出什么菜
            }
        }
    }
    for (let supply of supplies) check(supply)
    recipeMap.forEach((value,key) => {
        if (value === 0) result.push(key)
    })
    return result
};


findAllRecipes(["bread"], [["yeast", "flour"]], ["yeast", "flour", "corn"])
findAllRecipes(["bread", "sandwich"], [["yeast", "flour"], ["bread", "meat"]], ["yeast", "flour", "meat"])
findAllRecipes(["bread", "sandwich", "burger"], [["yeast", "flour"], ["bread", "meat"], ["sandwich", "meat", "bread"]], ["yeast", "flour", "meat"])
findAllRecipes(["bread"], [["yeast", "flour"]], ["yeast"])