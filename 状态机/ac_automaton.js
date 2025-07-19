/**
 * AC自动机节点类
 */
class ACNode {
    constructor() {
        // 子节点映射表，key是字符，value是对应的子节点
        this.children = new Map();
        // fail指针，指向当前节点的最长后缀
        this.fail = null;
        // 当前节点是否是某个模式串的结尾
        this.isEnd = false;
        // 存储以当前节点结尾的模式串
        this.word = '';
    }
}

/**
 * AC自动机类
 */
class ACAutomaton {
    constructor() {
        // 创建根节点
        this.root = new ACNode();
    }

    /**
     * 添加模式串到Trie树中
     * @param {string} word - 要添加的模式串
     */
    addPattern(word) {
        let node = this.root;
        // 遍历模式串的每个字符
        for (let char of word) {
            // 如果当前节点没有对应的子节点，则创建一个
            if (!node.children.has(char)) {
                node.children.set(char, new ACNode());
            }
            // 移动到子节点
            node = node.children.get(char);
        }
        // 标记当前节点为模式串结尾
        node.isEnd = true;
        // 存储完整的模式串
        node.word = word;
    }

    /**
     * 构建fail指针
     * 使用BFS遍历Trie树，为每个节点建立fail指针
     */
    buildFailPointers() {
        // 使用队列进行BFS
        const queue = [];
        
        // 第一层节点的fail指针都指向root
        for (let [char, node] of this.root.children) {
            node.fail = this.root;
            // 将第一层节点加入队列
            queue.push(node);
        }

        // BFS遍历
        while (queue.length > 0) {
            const current = queue.shift();
            
            // 遍历当前节点的所有子节点
            for (let [char, child] of current.children) {
                // 获取当前节点的fail指针指向的节点
                let failNode = current.fail;
                
                // 如果fail指针指向的节点有相同字符的子节点，则设置fail指针
                while (failNode && !failNode.children.has(char)) {
                    failNode = failNode.fail;
                }
                
                // 设置fail指针
                child.fail = failNode ? failNode.children.get(char) : this.root;
                
                // 将子节点加入队列
                queue.push(child);
            }
        }
    }

    /**
     * 在文本中查找所有模式串
     * @param {string} text - 要搜索的文本
     * @returns {Array} - 找到的所有模式串及其位置
     */
    search(text) {
        const results = [];
        let current = this.root;

        // 遍历文本的每个字符
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            // 如果当前节点没有匹配的子节点，则沿着fail指针回溯
            while (current !== this.root && !current.children.has(char)) {
                current = current.fail;
            }
            
            // 如果找到匹配的子节点，则移动到该子节点
            if (current.children.has(char)) {
                current = current.children.get(char);
            }
            
            // 检查当前节点是否是某个模式串的结尾
            let temp = current;
            while (temp !== this.root) {
                if (temp.isEnd) {
                    results.push({
                        word: temp.word,
                        position: i - temp.word.length + 1
                    });
                }
                temp = temp.fail;
            }
        }

        return results;
    }
}

// 使用示例
function main() {
    // 创建AC自动机实例
    const ac = new ACAutomaton();
    
    // 添加模式串
    const patterns = ["he", "she", "his", "hers"];
    patterns.forEach(pattern => ac.addPattern(pattern));
    
    // 构建fail指针
    ac.buildFailPointers();
    
    // 测试搜索
    const text = "she was here with his dog";
    const results = ac.search(text);
    
    // 输出结果
    console.log("在文本中查找模式串：", text);
    console.log("找到的模式串：");
    results.forEach(result => {
        console.log(`- "${result.word}" 在位置 ${result.position}`);
    });
}

// 运行示例
main();