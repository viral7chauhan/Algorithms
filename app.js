// 7-Day DSA Interactive Visualizer Application

const problemsData = [
  // DAY 1: Arrays & Hashing
  {
    id: 1,
    day: "Day 1",
    title: "1. Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    type: "array-map",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day1_ArraysAndHashing.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/Swift_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: `class TwoSum {
    static func solve(_ nums: [Int], _ target: Int) -> [Int] {
        var map = [Int: Int]()
        for (i, num) in nums.enumerated() {
            let complement = target - num
            if let complementIndex = map[complement] {
                return [complementIndex, i]
            }
            map[num] = i
        }
        return []
    }
}`,
    array: [2, 7, 11, 15],
    target: 9,
    generateSteps: (arr, target) => [
      { exp: `Initialize array [${arr.join(", ")}], target = ${target}. Hash map is empty.`, active: -1, map: {} },
      { exp: `i = 0, num = ${arr[0]}. Complement = ${target} - ${arr[0]} = ${target - arr[0]}. Not in map. Store map[${arr[0]}] = 0.`, active: 0, map: { [arr[0]]: 0 } },
      { exp: `i = 1, num = ${arr[1]}. Complement = ${target} - ${arr[1]} = ${target - arr[1]}. FOUND in map at index 0! Pair = [0, 1]`, active: 1, match: [0, 1], map: { [arr[0]]: 0 } }
    ]
  },
  {
    id: 2,
    day: "Day 1",
    title: "2. Contains Duplicate",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    type: "array-set",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day1_ArraysAndHashing.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    code: `class ContainsDuplicate {
    static func solve(_ nums: [Int]) -> Bool {
        var seen = Set<Int>()
        for num in nums {
            if seen.contains(num) { return true }
            seen.insert(num)
        }
        return false
    }
}`,
    array: [1, 2, 3, 1],
    generateSteps: (arr) => [
      { exp: `Scanning array [${arr.join(", ")}]. Set is empty.`, active: -1, map: {} },
      { exp: `num = ${arr[0]}. Not in set. Insert ${arr[0]}.`, active: 0, map: { [arr[0]]: "seen" } },
      { exp: `num = ${arr[1]}. Not in set. Insert ${arr[1]}.`, active: 1, map: { [arr[0]]: "seen", [arr[1]]: "seen" } },
      { exp: `num = ${arr[2]}. Not in set. Insert ${arr[2]}.`, active: 2, map: { [arr[0]]: "seen", [arr[1]]: "seen", [arr[2]]: "seen" } },
      { exp: `num = ${arr[3]}. ALREADY in set! Duplicate found, return true.`, active: 3, match: [3], map: { [arr[0]]: "DUPLICATE" } }
    ]
  },
  {
    id: 3,
    day: "Day 1",
    title: "3. Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    type: "array-pointer",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day1_ArraysAndHashing.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: `class BuySellStock {
    static func solve(_ prices: [Int]) -> Int {
        var minPrice = Int.max, maxProfit = 0
        for price in prices {
            minPrice = min(minPrice, price)
            maxProfit = max(maxProfit, price - minPrice)
        }
        return maxProfit
    }
}`,
    array: [7, 1, 5, 3, 6, 4],
    generateSteps: (arr) => [
      { exp: `Stock prices [${arr.join(", ")}]. Initialize minPrice = ∞, maxProfit = 0.`, active: -1 },
      { exp: `Day 0 (price=${arr[0]}): minPrice = 7, maxProfit = 0.`, active: 0 },
      { exp: `Day 1 (price=${arr[1]}): New minPrice = 1.`, active: 1, left: 1 },
      { exp: `Day 2 (price=${arr[2]}): Profit = 5 - 1 = 4. maxProfit = 4.`, active: 2, left: 1 },
      { exp: `Day 4 (price=${arr[4]}): Profit = 6 - 1 = 5. New maxProfit = 5!`, active: 4, left: 1, match: [1, 4] }
    ]
  },
  {
    id: 4,
    day: "Day 1",
    title: "4. Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    type: "array-window",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day1_ArraysAndHashing.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: `class MaxSubarray {
    static func solve(_ nums: [Int]) -> Int {
        guard !nums.isEmpty else { return 0 }
        var maxSoFar = nums[0], currentSum = nums[0]
        for num in nums.dropFirst() {
            currentSum = max(num, currentSum + num)
            maxSoFar = max(maxSoFar, currentSum)
        }
        return maxSoFar
    }
}`,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    generateSteps: (arr) => [
      { exp: "Kadane's algorithm: Initialize currentSum = -2, maxSoFar = -2.", active: 0 },
      { exp: "idx 1 (1): max(1, -2+1) = 1. New contiguous subarray starts at index 1.", active: 1 },
      { exp: "idx 3 (4): currentSum = 4, maxSoFar = 4.", active: 3 },
      { exp: "Subarray [4, -1, 2, 1] achieves maximum contiguous sum = 6!", window: [3, 6], match: [3, 4, 5, 6] }
    ]
  },
  {
    id: 5,
    day: "Day 1",
    title: "5. Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Arrays & Hashing",
    type: "array-window",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day1_ArraysAndHashing.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(N, M))",
    code: `class LongestSubstringWithoutRepeating {
    static func solve(_ s: String) -> Int {
        let chars = Array(s)
        var map = [Character: Int](), left = 0, maxLen = 0
        for (right, char) in chars.enumerated() {
            if let lastPos = map[char], lastPos >= left {
                left = lastPos + 1
            }
            map[char] = right
            maxLen = max(maxLen, right - left + 1)
        }
        return maxLen
    }
}`,
    array: ["a", "b", "c", "a", "b", "c", "b", "b"],
    generateSteps: (arr) => [
      { exp: "Sliding window pointers left = 0, right = 0.", window: [0, 0], left: 0, right: 0 },
      { exp: "Expand window right = 2 ('abc'). Window is valid, maxLen = 3.", window: [0, 2], left: 0, right: 2 },
      { exp: "Encounter duplicate 'a' at idx 3. Move left pointer to idx 1 ('bca').", window: [1, 3], left: 1, right: 3 },
      { exp: "Max non-repeating substring length found is 3 ('abc').", window: [0, 2], match: [0, 1, 2] }
    ]
  },

  // DAY 2: Linked Lists & Stack
  {
    id: 9,
    day: "Day 2",
    title: "9. Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    type: "linkedlist",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day2_StringsLinkedListsStack.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    code: `class ReverseLinkedList {
    static func solve(_ head: ListNode?) -> ListNode? {
        var prev: ListNode? = nil, curr = head
        while curr != nil {
            let nextTemp = curr?.next
            curr?.next = prev
            prev = curr
            curr = nextTemp
        }
        return prev
    }
}`,
    nodes: [1, 2, 3, 4, 5],
    generateSteps: (arr) => [
      { exp: "Initial Linked List: 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5. prev = nil, curr = 1.", curr: 0, prev: -1 },
      { exp: "Save nextTemp = 2. Re-link 1 ➔ nil. Move prev = 1, curr = 2.", curr: 1, prev: 0 },
      { exp: "Save nextTemp = 3. Re-link 2 ➔ 1. Move prev = 2, curr = 3.", curr: 2, prev: 1 },
      { exp: "Re-linking complete! New reversed head is node 5: 5 ➔ 4 ➔ 3 ➔ 2 ➔ 1.", curr: -1, prev: 4, match: [4, 3, 2, 1, 0] }
    ]
  },

  // DAY 3: Binary Search
  {
    id: 14,
    day: "Day 3",
    title: "14. Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    type: "array-binary",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day3_BinarySearchAndIntervals.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    code: `class BinarySearch {
    static func solve(_ nums: [Int], _ target: Int) -> Int {
        var left = 0, right = nums.count - 1
        while left <= right {
            let mid = left + (right - left) / 2
            if nums[mid] == target { return mid }
            else if nums[mid] < target { left = mid + 1 }
            else { right = mid - 1 }
        }
        return -1
    }
}`,
    array: [-1, 0, 3, 5, 9, 12],
    target: 9,
    generateSteps: (arr, target) => [
      { exp: `Sorted array [${arr.join(", ")}], target = ${target}. left = 0, right = 5.`, left: 0, right: 5 },
      { exp: `mid = 0 + (5-0)/2 = 2. nums[2] = 3 < 9. Target is in right half. Move left = 3.`, left: 3, right: 5, mid: 2 },
      { exp: `mid = 3 + (5-3)/2 = 4. nums[4] = 9 == target! Target found at index 4!`, left: 3, right: 5, mid: 4, match: [4] }
    ]
  },

  // DAY 4: Trees & BST (SVG Visualizer)
  {
    id: 21,
    day: "Day 4",
    title: "21. Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Trees & BST",
    type: "tree-svg",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day4_TreesAndBST.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    code: `class MaxDepthBinaryTree {
    static func maxDepth(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + max(maxDepth(root.left), maxDepth(root.right))
    }
}`,
    tree: { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } },
    generateSteps: () => [
      { exp: "Tree Root = 3. Compute 1 + max(depth(left), depth(right)).", activeNode: 3 },
      { exp: "Visit left child 9. Leaf node depth = 1.", activeNode: 9 },
      { exp: "Visit right child 20 ➔ 15 & 7. Subtree depth = 2.", activeNode: 20 },
      { exp: "Maximum Depth of tree = 3!", activeNode: 3, matchNodes: [3, 20, 15] }
    ]
  },

  // DAY 5: Graphs (2D Grid Visualizer)
  {
    id: 28,
    day: "Day 5",
    title: "28. Number of Islands",
    difficulty: "Medium",
    category: "Graphs",
    type: "grid-matrix",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day5_Graphs.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(M * N)",
    spaceComplexity: "O(M * N)",
    code: `class NumberOfIslands {
    static func numIslands(_ grid: [[Character]]) -> Int {
        guard !grid.isEmpty else { return 0 }
        var g = grid, rows = g.count, cols = g[0].count, count = 0
        for r in 0..<rows {
            for c in 0..<cols {
                if g[r][c] == "1" { count += 1; dfs(&g, r, c, rows, cols) }
            }
        }
        return count
    }
}`,
    grid: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1]
    ],
    generateSteps: () => [
      { exp: "2D Grid of land (1) and water (0). Scan top-left cell (0,0).", activeCell: [0,0] },
      { exp: "Found land at (0,0)! Launch DFS to sink connected island 1.", activeCell: [0,0], sunk: [[0,0],[0,1],[1,0],[1,1]] },
      { exp: "Scan grid to (2,2). Found second isolated island land '1'!", activeCell: [2,2], sunk: [[0,0],[0,1],[1,0],[1,1],[2,2]] },
      { exp: "Total connected islands count = 2!", count: 2 }
    ]
  },

  // DAY 6: Dynamic Programming
  {
    id: 36,
    day: "Day 6",
    title: "36. Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    type: "dp-table",
    playgroundPage: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WBD_7Day_DSAPrep.playground/Pages/Day6_DynamicProgrammingAndHeap.xcplaygroundpage/Contents.swift",
    pdfLink: "file:///Users/viralchauhan/Developer/Antigravity/DSA/WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf",
    timeComplexity: "O(Amount * Coins)",
    spaceComplexity: "O(Amount)",
    code: `class CoinChange {
    static func solve(_ coins: [Int], _ amount: Int) -> Int {
        guard amount > 0 else { return 0 }
        var dp = Array(repeating: amount + 1, count: amount + 1)
        dp[0] = 0
        for i in 1...amount {
            for coin in coins {
                if i - coin >= 0 { dp[i] = min(dp[i], dp[i - coin] + 1) }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount]
    }
}`,
    coins: [1, 2, 5],
    amount: 11,
    generateSteps: () => [
      { exp: "Coins = [1, 2, 5], Amount = 11. Initialize dp[0...11] = ∞, dp[0] = 0.", dp: [0, "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞"] },
      { exp: "Compute dp[1..5]: dp[1]=1, dp[2]=1 (coin 2), dp[5]=1 (coin 5).", dp: [0, 1, 1, 2, 2, 1, 2, 3, 3, 4, 2, 3] },
      { exp: "dp[11] = min(dp[11], dp[11-5] + 1) = dp[6] + 1 = 3 coins (5 + 5 + 1).", activeIdx: 11, dp: [0, 1, 1, 2, 2, 1, 2, 3, 3, 4, 2, 3], match: [11] }
    ]
  }
];

// Player State
let currentProblemIndex = 0;
let currentStepIndex = 0;
let isPlaying = false;
let playbackTimer = null;
let speedMs = 1500;
let currentSteps = [];

document.addEventListener("DOMContentLoaded", () => {
  renderProblemList();
  loadProblem(0);
  setupEventListeners();
});

function renderProblemList(filterDay = "All", searchQuery = "") {
  const listContainer = document.getElementById("problem-list");
  listContainer.innerHTML = "";

  problemsData.forEach((p, idx) => {
    if (filterDay !== "All" && p.day !== filterDay) return;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return;

    const item = document.createElement("div");
    item.className = `problem-item ${idx === currentProblemIndex ? 'active' : ''}`;
    item.onclick = () => loadProblem(idx);

    const diffBadge = p.difficulty === "Easy" ? "badge-easy" : (p.difficulty === "Medium" ? "badge-medium" : "badge-hard");
    item.innerHTML = `
      <span class="problem-title-text">${p.title}</span>
      <span class="badge ${diffBadge}">${p.difficulty}</span>
    `;
    listContainer.appendChild(item);
  });
}

function loadProblem(idx) {
  currentProblemIndex = idx;
  currentStepIndex = 0;
  pauseAnimation();

  const problem = problemsData[idx];

  // Update Problem Header
  document.getElementById("problem-title").innerText = problem.title;
  document.getElementById("problem-category").innerText = `${problem.day} • ${problem.category}`;
  document.getElementById("time-complexity").innerText = problem.timeComplexity;
  document.getElementById("space-complexity").innerText = problem.spaceComplexity;
  document.getElementById("swift-code").innerHTML = highlightSwiftCode(problem.code);
  
  // Set Links
  document.getElementById("playground-link").href = problem.playgroundPage;
  document.getElementById("pdf-link").href = problem.pdfLink;

  // Generate steps
  if (problem.generateSteps) {
    currentSteps = problem.generateSteps(problem.array || problem.nodes || [], problem.target || problem.amount);
  } else {
    currentSteps = [{ exp: "Step visualization ready.", active: 0 }];
  }

  renderProblemList();
  renderStep();
}

function renderStep() {
  const problem = problemsData[currentProblemIndex];
  const step = currentSteps[currentStepIndex] || currentSteps[0];

  document.getElementById("step-banner").innerText = `Step ${currentStepIndex + 1}/${currentSteps.length}: ${step.exp}`;

  const canvas = document.getElementById("canvas-container");
  canvas.innerHTML = "";

  // 1. Array & Pointers Visualizer
  if (problem.type.startsWith("array")) {
    const arr = problem.array || [2, 7, 11, 15];
    const arrayContainer = document.createElement("div");
    arrayContainer.className = "array-container";

    arr.forEach((val, i) => {
      const box = document.createElement("div");
      let boxClass = "array-box";

      if (step.active === i) boxClass += " highlight";
      if (step.match && step.match.includes(i)) boxClass += " highlight";
      if (step.window && i >= step.window[0] && i <= step.window[1]) boxClass += " window";

      box.className = boxClass;
      box.innerHTML = `
        <span class="idx-label">${i}</span>
        ${val}
      `;

      if (step.left === i) box.innerHTML += `<span class="pointer-tag pointer-left">L</span>`;
      if (step.right === i) box.innerHTML += `<span class="pointer-tag pointer-right">R</span>`;
      if (step.mid === i) box.innerHTML += `<span class="pointer-tag pointer-mid">M</span>`;

      arrayContainer.appendChild(box);
    });
    canvas.appendChild(arrayContainer);

    // Hash map state display
    if (step.map && Object.keys(step.map).length > 0) {
      const mapContainer = document.createElement("div");
      mapContainer.className = "hashmap-container";
      mapContainer.innerHTML = `<div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em;">STATE MAP LOOKUP:</div>`;
      Object.entries(step.map).forEach(([k, v]) => {
        mapContainer.innerHTML += `<div class="hashmap-row"><span>Key (${k})</span><span>Value (${v})</span></div>`;
      });
      canvas.appendChild(mapContainer);
    }
  }

  // 2. Linked List Node Chain Visualizer
  else if (problem.type === "linkedlist") {
    const listContainer = document.createElement("div");
    listContainer.className = "linkedlist-container";
    const nodes = problem.nodes || [1, 2, 3, 4, 5];

    nodes.forEach((val, i) => {
      const nBox = document.createElement("div");
      let style = "node-box";
      if (step.curr === i) style += " highlight";
      if (step.match && step.match.includes(i)) style += " highlight";
      nBox.className = style;
      nBox.innerText = val;
      listContainer.appendChild(nBox);

      if (i < nodes.length - 1) {
        const arrIcon = document.createElement("span");
        arrIcon.className = "arrow-icon";
        arrIcon.innerText = "➔";
        listContainer.appendChild(arrIcon);
      }
    });
    canvas.appendChild(listContainer);
  }

  // 3. Binary Tree SVG Visualizer
  else if (problem.type === "tree-svg") {
    const treeDiv = document.createElement("div");
    treeDiv.className = "svg-tree-container";
    treeDiv.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 400 200">
        <line x1="200" y1="40" x2="100" y2="100" stroke="#334155" stroke-width="2"/>
        <line x1="200" y1="40" x2="300" y2="100" stroke="#334155" stroke-width="2"/>
        <line x1="300" y1="100" x2="250" y2="160" stroke="#334155" stroke-width="2"/>
        <line x1="300" y1="100" x2="350" y2="160" stroke="#334155" stroke-width="2"/>

        <circle cx="200" cy="40" r="22" fill="${step.activeNode === 3 ? '#10B981' : '#131C31'}" stroke="#3B82F6" stroke-width="3"/>
        <text x="200" y="45" fill="white" font-size="14" font-weight="bold" text-anchor="middle">3</text>

        <circle cx="100" cy="100" r="20" fill="${step.activeNode === 9 ? '#10B981' : '#131C31'}" stroke="#8B5CF6" stroke-width="2"/>
        <text x="100" y="105" fill="white" font-size="13" text-anchor="middle">9</text>

        <circle cx="300" cy="100" r="20" fill="${step.activeNode === 20 ? '#10B981' : '#131C31'}" stroke="#8B5CF6" stroke-width="2"/>
        <text x="300" y="105" fill="white" font-size="13" text-anchor="middle">20</text>

        <circle cx="250" cy="160" r="18" fill="#131C31" stroke="#06B6D4" stroke-width="2"/>
        <text x="250" y="165" fill="white" font-size="12" text-anchor="middle">15</text>

        <circle cx="350" cy="160" r="18" fill="#131C31" stroke="#06B6D4" stroke-width="2"/>
        <text x="350" y="165" fill="white" font-size="12" text-anchor="middle">7</text>
      </svg>
    `;
    canvas.appendChild(treeDiv);
  }

  // 4. 2D Grid Matrix (Islands / Oranges)
  else if (problem.type === "grid-matrix") {
    const gridDiv = document.createElement("div");
    gridDiv.className = "grid-matrix";
    gridDiv.style.gridTemplateColumns = "repeat(3, 44px)";
    const matrix = problem.grid || [[1,1,0],[1,1,0],[0,0,1]];

    matrix.forEach((row, r) => {
      row.forEach((cell, c) => {
        const cellBox = document.createElement("div");
        let cls = "grid-cell " + (cell === 1 ? "cell-land" : "cell-water");
        if (step.activeCell && step.activeCell[0] === r && step.activeCell[1] === c) cls += " cell-active";
        cellBox.className = cls;
        cellBox.innerText = cell;
        gridDiv.appendChild(cellBox);
      });
    });
    canvas.appendChild(gridDiv);
  }

  // 5. Dynamic Programming Table
  else if (problem.type === "dp-table") {
    const dpDiv = document.createElement("div");
    dpDiv.className = "array-container";
    const dpArr = step.dp || [0, 1, 1, 2, 2, 1, 2, 3, 3, 4, 2, 3];

    dpArr.forEach((val, i) => {
      const box = document.createElement("div");
      let cls = "array-box";
      if (step.match && step.match.includes(i)) cls += " highlight";
      box.className = cls;
      box.innerHTML = `<span class="idx-label">dp[${i}]</span>${val}`;
      dpDiv.appendChild(box);
    });
    canvas.appendChild(dpDiv);
  }
}

function playAnimation() {
  if (isPlaying) return;
  isPlaying = true;
  document.getElementById("btn-play").innerText = "⏸️";
  playbackTimer = setInterval(() => {
    if (currentStepIndex < currentSteps.length - 1) {
      currentStepIndex++;
      renderStep();
    } else {
      pauseAnimation();
    }
  }, speedMs);
}

function pauseAnimation() {
  isPlaying = false;
  document.getElementById("btn-play").innerText = "▶️";
  if (playbackTimer) clearInterval(playbackTimer);
}

function togglePlay() {
  if (isPlaying) pauseAnimation();
  else playAnimation();
}

function stepForward() {
  pauseAnimation();
  if (currentStepIndex < currentSteps.length - 1) {
    currentStepIndex++;
    renderStep();
  }
}

function stepBackward() {
  pauseAnimation();
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep();
  }
}

function resetAnimation() {
  pauseAnimation();
  currentStepIndex = 0;
  renderStep();
}

function runCustomInput() {
  const val = document.getElementById("custom-input-val").value;
  if (!val) return;
  try {
    const arr = val.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    if (arr.length > 0) {
      problemsData[currentProblemIndex].array = arr;
      loadProblem(currentProblemIndex);
    }
  } catch (e) {}
}

function setupEventListeners() {
  document.getElementById("btn-play").onclick = togglePlay;
  document.getElementById("btn-forward").onclick = stepForward;
  document.getElementById("btn-back").onclick = stepBackward;
  document.getElementById("btn-reset").onclick = resetAnimation;
  document.getElementById("btn-run-custom").onclick = runCustomInput;

  document.getElementById("speed-slider").oninput = (e) => {
    speedMs = 2500 - parseInt(e.target.value);
    if (isPlaying) {
      pauseAnimation();
      playAnimation();
    }
  };

  document.getElementById("search-input").oninput = (e) => {
    renderProblemList("All", e.target.value);
  };
}

function highlightSwiftCode(code) {
  return code
    .replace(/\b(class|struct|func|var|let|guard|else|return|if|for|in|while|static|private)\b/g, '<span class="kw">$1</span>')
    .replace(/\b(Int|String|Bool|Character|ListNode|TreeNode|Node|Set|Array)\b/g, '<span class="type">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
}
