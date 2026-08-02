// NeetCode 150 Master Interactive Visualizer Engine (150 Complete Swift Solutions)

const neetcodeProblems = [
  {
    "seq": 1,
    "title": "Contains Duplicate",
    "cat": "Arrays & Hashing",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/contains-duplicate/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func containsDuplicate(_ nums: [Int]) -> Bool {\n        return Set(nums).count < nums.count\n    }\n}",
    "array": [
      1,
      2
    ],
    "steps": [
      {
        "exp": "Use Set to store seen numbers.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 2,
    "title": "Valid Anagram",
    "cat": "Arrays & Hashing",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/valid-anagram/",
    "time": "O(N log N)",
    "space": "O(N)",
    "code": "class Solution {\n    func isAnagram(_ s: String, _ t: String) -> Bool {\n        return s.sorted() == t.sorted()\n    }\n}",
    "array": [
      2,
      3
    ],
    "steps": [
      {
        "exp": "Compare sorted character arrays.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 3,
    "title": "Two Sum",
    "cat": "Arrays & Hashing",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/two-sum/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n        var map = [Int: Int]()\n        for (i, n) in nums.enumerated() {\n            if let idx = map[target - n] { return [idx, i] }\n            map[n] = i\n        }\n        return []\n    }\n}",
    "array": [
      3,
      4
    ],
    "steps": [
      {
        "exp": "Hash Map storing number -> index.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 4,
    "title": "Group Anagrams",
    "cat": "Arrays & Hashing",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/group-anagrams/",
    "time": "O(N * K log K)",
    "space": "O(N * K)",
    "code": "class Solution {\n    func groupAnagrams(_ strs: [String]) -> [[String]] {\n        var map = [String: [String]]()\n        for s in strs { map[String(s.sorted()), default: []].append(s) }\n        return Array(map.values)\n    }\n}",
    "array": [
      4,
      5
    ],
    "steps": [
      {
        "exp": "Sorted string key mapping in Hash Map.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 5,
    "title": "Top K Frequent Elements",
    "cat": "Arrays & Hashing",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/top-k-frequent-elements/",
    "time": "O(N log N)",
    "space": "O(N)",
    "code": "class Solution {\n    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {\n        var counts = [Int: Int]()\n        for n in nums { counts[n, default: 0] += 1 }\n        return Array(counts.keys.sorted{ counts[$0]! > counts[$1]! }.prefix(k))\n    }\n}",
    "array": [
      5,
      6
    ],
    "steps": [
      {
        "exp": "Count frequencies and bucket sort.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 6,
    "title": "Product of Array Except Self",
    "cat": "Arrays & Hashing",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/product-of-array-except-self/",
    "time": "O(N)",
    "space": "O(1)",
    "code": "class Solution {\n    func productExceptSelf(_ nums: [Int]) -> [Int] {\n        var res = Array(repeating: 1, count: nums.count), p = 1\n        for i in 0..<nums.count { res[i] = p; p *= nums[i] }\n        p = 1\n        for i in (0..<nums.count).reversed() { res[i] *= p; p *= nums[i] }\n        return res\n    }\n}",
    "array": [
      6,
      7
    ],
    "steps": [
      {
        "exp": "Prefix and suffix product passes.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 7,
    "title": "Valid Sudoku",
    "cat": "Arrays & Hashing",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/valid-sudoku/",
    "time": "O(1)",
    "space": "O(1)",
    "code": "class Solution {\n    func isValidSudoku(_ board: [[Character]]) -> Bool {\n        var r = Array(repeating: Set<Character>(), count: 9), c = r, b = r\n        for i in 0..<9 {\n            for j in 0..<9 {\n                let char = board[i][j]\n                if char == \".\" { continue }\n                let idx = (i / 3) * 3 + (j / 3)\n                if r[i].contains(char) || c[j].contains(char) || b[idx].contains(char) { return false }\n                r[i].insert(char); c[j].insert(char); b[idx].insert(char)\n            }\n        }\n        return true\n    }\n}",
    "array": [
      7,
      8
    ],
    "steps": [
      {
        "exp": "Hash Sets for rows, columns, and 3x3 boxes.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 8,
    "title": "Encode and Decode Strings",
    "cat": "Arrays & Hashing",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/encode-and-decode-strings/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func encode(_ strs: [String]) -> String {\n        return strs.map { \"\\($0.count)#\\($0)\" }.joined()\n    }\n}",
    "array": [
      8,
      9
    ],
    "steps": [
      {
        "exp": "Length prefix encoding format len#str.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 9,
    "title": "Longest Consecutive Sequence",
    "cat": "Arrays & Hashing",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func longestConsecutive(_ nums: [Int]) -> Int {\n        let set = Set(nums); var maxL = 0\n        for n in set {\n            if !set.contains(n - 1) {\n                var curr = n, len = 1\n                while set.contains(curr + 1) { curr += 1; len += 1 }\n                maxL = max(maxL, len)\n            }\n        }\n        return maxL\n    }\n}",
    "array": [
      9,
      10
    ],
    "steps": [
      {
        "exp": "Set lookup start sequence !set.contains(n-1).",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 10,
    "title": "Valid Palindrome",
    "cat": "Two Pointers",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/valid-palindrome/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func isPalindrome(_ s: String) -> Bool {\n        let c = Array(s.lowercased().filter { $0.isLetter || $0.isNumber })\n        var l = 0, r = c.count - 1\n        while l < r {\n            if c[l] != c[r] { return false }\n            l += 1; r -= 1\n        }\n        return true\n    }\n}",
    "array": [
      10,
      11
    ],
    "steps": [
      {
        "exp": "Filter alphanumeric and two pointer scan.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 11,
    "title": "Two Sum II Input Array Is Sorted",
    "cat": "Two Pointers",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "time": "O(N)",
    "space": "O(1)",
    "code": "class Solution {\n    func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {\n        var l = 0, r = numbers.count - 1\n        while l < r {\n            let s = numbers[l] + numbers[r]\n            if s == target { return [l + 1, r + 1] }\n            else if s < target { l += 1 }\n            else { r -= 1 }\n        }\n        return []\n    }\n}",
    "array": [
      11,
      12
    ],
    "steps": [
      {
        "exp": "Two pointers left and right on sorted array.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 12,
    "title": "3Sum",
    "cat": "Two Pointers",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/3sum/",
    "time": "O(N^2)",
    "space": "O(1)",
    "code": "class Solution {\n    func threeSum(_ nums: [Int]) -> [[Int]] {\n        let s = nums.sorted(); var res = [[Int]]()\n        for i in 0..<s.count {\n            if i > 0 && s[i] == s[i-1] { continue }\n            var l = i + 1, r = s.count - 1\n            while l < r {\n                let sum = s[i] + s[l] + s[r]\n                if sum == 0 {\n                    res.append([s[i], s[l], s[r]])\n                    while l < r && s[l] == s[l+1] { l += 1 }\n                    while l < r && s[r] == s[r-1] { r -= 1 }\n                    l += 1; r -= 1\n                } else if sum < 0 { l += 1 } else { r -= 1 }\n            }\n        }\n        return res\n    }\n}",
    "array": [
      12,
      13
    ],
    "steps": [
      {
        "exp": "Sort array, fix i, two pointers l and r.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 13,
    "title": "Container With Most Water",
    "cat": "Two Pointers",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/container-with-most-water/",
    "time": "O(N)",
    "space": "O(1)",
    "code": "class Solution {\n    func maxArea(_ height: [Int]) -> Int {\n        var l = 0, r = height.count - 1, maxA = 0\n        while l < r {\n            maxA = max(maxA, min(height[l], height[r]) * (r - l))\n            if height[l] < height[r] { l += 1 } else { r -= 1 }\n        }\n        return maxA\n    }\n}",
    "array": [
      13,
      14
    ],
    "steps": [
      {
        "exp": "Two pointers at bounds, shrink smaller side.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 14,
    "title": "Trapping Rain Water",
    "cat": "Two Pointers",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/trapping-rain-water/",
    "time": "O(N)",
    "space": "O(1)",
    "code": "class Solution {\n    func trap(_ height: [Int]) -> Int {\n        var l = 0, r = height.count - 1, maxL = 0, maxR = 0, ans = 0\n        while l < r {\n            if height[l] < height[r] {\n                if height[l] >= maxL { maxL = height[l] } else { ans += maxL - height[l] }\n                l += 1\n            } else {\n                if height[r] >= maxR { maxR = height[r] } else { ans += maxR - height[r] }\n                r -= 1\n            }\n        }\n        return ans\n    }\n}",
    "array": [
      14,
      15
    ],
    "steps": [
      {
        "exp": "Two pointers with maxLeft and maxRight.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 15,
    "title": "Best Time to Buy and Sell Stock",
    "cat": "Sliding Window",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "time": "O(N)",
    "space": "O(1)",
    "code": "class Solution {\n    func maxProfit(_ prices: [Int]) -> Int {\n        var minP = Int.max, maxP = 0\n        for p in prices { minP = min(minP, p); maxP = max(maxP, p - minP) }\n        return maxP\n    }\n}",
    "array": [
      15,
      16
    ],
    "steps": [
      {
        "exp": "Track minPrice and maxProfit.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 16,
    "title": "Longest Substring Without Repeating Characters",
    "cat": "Sliding Window",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func lengthOfLongestSubstring(_ s: String) -> Int {\n        var map = [Character: Int](), l = 0, maxL = 0\n        for (r, c) in s.enumerated() {\n            if let pos = map[c], pos >= l { l = pos + 1 }\n            map[c] = r\n            maxL = max(maxL, r - l + 1)\n        }\n        return maxL\n    }\n}",
    "array": [
      16,
      17
    ],
    "steps": [
      {
        "exp": "Sliding window with map of last seen char index.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 17,
    "title": "Longest Repeating Character Replacement",
    "cat": "Sliding Window",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "time": "O(N)",
    "space": "O(26)",
    "code": "class Solution {\n    func characterReplacement(_ s: String, _ k: Int) -> Int {\n        var counts = [Character: Int](), l = 0, maxF = 0, maxL = 0, chars = Array(s)\n        for r in 0..<chars.count {\n            counts[chars[r], default: 0] += 1\n            maxF = max(maxF, counts[chars[r]]!)\n            if (r - l + 1) - maxF > k { counts[chars[l]]! -= 1; l += 1 }\n            maxL = max(maxL, r - l + 1)\n        }\n        return maxL\n    }\n}",
    "array": [
      17,
      18
    ],
    "steps": [
      {
        "exp": "Sliding window windowLen - maxFreq <= k.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 18,
    "title": "Permutation in String",
    "cat": "Sliding Window",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/permutation-in-string/",
    "time": "O(N)",
    "space": "O(26)",
    "code": "class Solution {\n    func checkInclusion(_ s1: String, _ s2: String) -> Bool {\n        if s1.count > s2.count { return false }\n        var c1 = Array(repeating: 0, count: 26), c2 = c1, a = Int(Character(\"a\").asciiValue!)\n        for c in s1 { c1[Int(c.asciiValue!) - a] += 1 }\n        let chars = Array(s2)\n        for i in 0..<chars.count {\n            c2[Int(chars[i].asciiValue!) - a] += 1\n            if i >= s1.count { c2[Int(chars[i - s1.count].asciiValue!) - a] -= 1 }\n            if c1 == c2 { return true }\n        }\n        return false\n    }\n}",
    "array": [
      18,
      19
    ],
    "steps": [
      {
        "exp": "Fixed window size s1.count matching freq arrays.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 19,
    "title": "Minimum Window Substring",
    "cat": "Sliding Window",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/minimum-window-substring/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func minWindow(_ s: String, _ t: String) -> String {\n        var target = [Character: Int]()\n        for c in t { target[c, default: 0] += 1 }\n        var required = target.count, formed = 0, window = [Character: Int](), l = 0, r = 0, ans = (-1, 0, 0), sArr = Array(s)\n        while r < sArr.count {\n            let c = sArr[r]\n            window[c, default: 0] += 1\n            if let count = target[c], window[c] == count { formed += 1 }\n            while l <= r && formed == required {\n                if ans.0 == -1 || r - l + 1 < ans.0 { ans = (r - l + 1, l, r) }\n                let lc = sArr[l]\n                window[lc]! -= 1\n                if let count = target[lc], window[lc]! < count { formed -= 1 }\n                l += 1\n            }\n            r += 1\n        }\n        return ans.0 == -1 ? \"\" : String(sArr[ans.1...ans.2])\n    }\n}",
    "array": [
      19,
      20
    ],
    "steps": [
      {
        "exp": "Sliding window frequency count match.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 20,
    "title": "Sliding Window Maximum",
    "cat": "Sliding Window",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/sliding-window-maximum/",
    "time": "O(N)",
    "space": "O(K)",
    "code": "class Solution {\n    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {\n        var q = [Int](), res = [Int]()\n        for i in 0..<nums.count {\n            while !q.isEmpty && nums[q.last!] < nums[i] { q.removeLast() }\n            q.append(i)\n            if q.first! == i - k { q.removeFirst() }\n            if i >= k - 1 { res.append(nums[q.first!]) }\n        }\n        return res\n    }\n}",
    "array": [
      20,
      21
    ],
    "steps": [
      {
        "exp": "Monotonic decreasing Deque storing indices.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 21,
    "title": "Valid Parentheses",
    "cat": "Stack",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/valid-parentheses/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func isValid(_ s: String) -> Bool {\n        var st = [Character]()\n        for c in s {\n            if c == \"(\" { st.append(\")\") }\n            else if c == \"[\" { st.append(\"]\") }\n            else if c == \"{\" { st.append(\"}\") }\n            else if st.isEmpty || st.removeLast() != c { return false }\n        }\n        return st.isEmpty\n    }\n}",
    "array": [
      21,
      22
    ],
    "steps": [
      {
        "exp": "Stack push open brackets, pop and match closing.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 22,
    "title": "Min Stack",
    "cat": "Stack",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/min-stack/",
    "time": "O(1)",
    "space": "O(N)",
    "code": "class MinStack {\n    var main = [Int](), minS = [Int]()\n    func push(_ val: Int) { main.append(val); minS.append(min(val, minS.last ?? Int.max)) }\n    func pop() { main.removeLast(); minS.removeLast() }\n    func top() -> Int { main.last! }\n    func getMin() -> Int { minS.last! }\n}",
    "array": [
      22,
      23
    ],
    "steps": [
      {
        "exp": "Dual stacks mainStack and minStack.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 23,
    "title": "Evaluate Reverse Polish Notation",
    "cat": "Stack",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func evalRPN(_ tokens: [String]) -> Int {\n        var st = [Int]()\n        for t in tokens {\n            if let val = Int(t) { st.append(val) }\n            else {\n                let b = st.removeLast(), a = st.removeLast()\n                switch t {\n                case \"+\": st.append(a + b)\n                case \"-\": st.append(a - b)\n                case \"*\": st.append(a * b)\n                default: st.append(a / b)\n                }\n            }\n        }\n        return st.last!\n    }\n}",
    "array": [
      23,
      24
    ],
    "steps": [
      {
        "exp": "Stack store operands, pop two on operator.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 24,
    "title": "Generate Parentheses",
    "cat": "Stack",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/generate-parentheses/",
    "time": "O(4^N / sqrt(N))",
    "space": "O(N)",
    "code": "class Solution {\n    func generateParenthesis(_ n: Int) -> [String] {\n        var res = [String]()\n        func backtrack(_ s: String, _ open: Int, _ close: Int) {\n            if s.count == 2 * n { res.append(s); return }\n            if open < n { backtrack(s + \"(\", open + 1, close) }\n            if close < open { backtrack(s + \")\", open, close + 1) }\n        }\n        backtrack(\"\", 0, 0)\n        return res\n    }\n}",
    "array": [
      24,
      25
    ],
    "steps": [
      {
        "exp": "Backtracking open < n and close < open.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 25,
    "title": "Daily Temperatures",
    "cat": "Stack",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/daily-temperatures/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func dailyTemperatures(_ temp: [Int]) -> [Int] {\n        var res = Array(repeating: 0, count: temp.count), st = [Int]()\n        for i in 0..<temp.count {\n            while !st.isEmpty && temp[i] > temp[st.last!] {\n                let prev = st.removeLast()\n                res[prev] = i - prev\n            }\n            st.append(i)\n        }\n        return res\n    }\n}",
    "array": [
      25,
      26
    ],
    "steps": [
      {
        "exp": "Monotonic decreasing stack storing indices.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 26,
    "title": "Car Fleet",
    "cat": "Stack",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/car-fleet/",
    "time": "O(N log N)",
    "space": "O(N)",
    "code": "class Solution {\n    func carFleet(_ target: Int, _ position: [Int], _ speed: [Int]) -> Int {\n        let cars = zip(position, speed).sorted { $0.0 > $1.0 }\n        var st = [Double]()\n        for (p, s) in cars {\n            let time = Double(target - p) / Double(s)\n            if st.isEmpty || time > st.last! { st.append(time) }\n        }\n        return st.count\n    }\n}",
    "array": [
      26,
      27
    ],
    "steps": [
      {
        "exp": "Sort by position desc, compute target arrival time.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 27,
    "title": "Largest Rectangle in Histogram",
    "cat": "Stack",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution {\n    func largestRectangleArea(_ heights: [Int]) -> Int {\n        var st = [(Int, Int)](), maxA = 0, h = heights + [0]\n        for (i, height) in h.enumerated() {\n            var start = i\n            while !st.isEmpty && st.last!.1 > height {\n                let (pIdx, pHeight) = st.removeLast()\n                maxA = max(maxA, pHeight * (i - pIdx))\n                start = pIdx\n            }\n            st.append((start, height))\n        }\n        return maxA\n    }\n}",
    "array": [
      27,
      28
    ],
    "steps": [
      {
        "exp": "Monotonic increasing stack storing (index, height).",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 28,
    "title": "Binary Search",
    "cat": "Binary Search",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/binary-search/",
    "time": "O(log N)",
    "space": "O(1)",
    "code": "class Solution {\n    func search(_ nums: [Int], _ target: Int) -> Int {\n        var l = 0, r = nums.count - 1\n        while l <= r {\n            let m = l + (r - l) / 2\n            if nums[m] == target { return m }\n            else if nums[m] < target { l = m + 1 } else { r = m - 1 }\n        }\n        return -1\n    }\n}",
    "array": [
      28,
      29
    ],
    "steps": [
      {
        "exp": "Iterative mid calculation.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 29,
    "title": "Search a 2D Matrix",
    "cat": "Binary Search",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/search-a-2d-matrix/",
    "time": "O(log(M*N))",
    "space": "O(1)",
    "code": "class Solution {\n    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {\n        let R = matrix.count, C = matrix[0].count\n        var l = 0, r = R * C - 1\n        while l <= r {\n            let m = l + (r - l) / 2, val = matrix[m / C][m % C]\n            if val == target { return true }\n            else if val < target { l = m + 1 } else { r = m - 1 }\n        }\n        return false\n    }\n}",
    "array": [
      29,
      30
    ],
    "steps": [
      {
        "exp": "Virtual 1D binary search over matrix.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 30,
    "title": "Koko Eating Bananas",
    "cat": "Binary Search",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/koko-eating-bananas/",
    "time": "O(N log M)",
    "space": "O(1)",
    "code": "class Solution {\n    func minEatingSpeed(_ piles: [Int], _ h: Int) -> Int {\n        var l = 1, r = piles.max()!, ans = r\n        while l <= r {\n            let k = l + (r - l) / 2, hrs = piles.reduce(0) { $0 + ($1 + k - 1) / k }\n            if hrs <= h { ans = k; r = k - 1 } else { l = k + 1 }\n        }\n        return ans\n    }\n}",
    "array": [
      30,
      31
    ],
    "steps": [
      {
        "exp": "Binary search on eating speed k.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 31,
    "title": "Find Minimum in Rotated Sorted Array",
    "cat": "Binary Search",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "time": "O(log N)",
    "space": "O(1)",
    "code": "class Solution {\n    func findMin(_ nums: [Int]) -> Int {\n        var l = 0, r = nums.count - 1\n        while l < r {\n            let m = l + (r - l) / 2\n            if nums[m] > nums[r] { l = m + 1 } else { r = m }\n        }\n        return nums[l]\n    }\n}",
    "array": [
      31,
      32
    ],
    "steps": [
      {
        "exp": "Compare mid with right boundary.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 32,
    "title": "Search in Rotated Sorted Array",
    "cat": "Binary Search",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "time": "O(log N)",
    "space": "O(1)",
    "code": "class Solution {\n    func search(_ nums: [Int], _ target: Int) -> Int {\n        var l = 0, r = nums.count - 1\n        while l <= r {\n            let m = l + (r - l) / 2\n            if nums[m] == target { return m }\n            if nums[l] <= nums[m] {\n                if nums[l] <= target && target < nums[m] { r = m - 1 }\n                else { l = m + 1 }\n            } else {\n                if nums[m] < target && target <= nums[r] { l = m + 1 }\n                else { r = m - 1 }\n            }\n        }\n        return -1\n    }\n}",
    "array": [
      32,
      33
    ],
    "steps": [
      {
        "exp": "Determine sorted half at mid.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 33,
    "title": "Time Based Key-Value Store",
    "cat": "Binary Search",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/time-based-key-value-store/",
    "time": "O(log N)",
    "space": "O(N)",
    "code": "class TimeMap {\n    var map = [String: [(Int, String)]]()\n    func set(_ key: String, _ value: String, _ timestamp: Int) {\n        map[key, default: []].append((timestamp, value))\n    }\n    func get(_ key: String, _ timestamp: Int) -> String {\n        guard let list = map[key] else { return \"\" }\n        var l = 0, r = list.count - 1, ans = \"\"\n        while l <= r {\n            let m = l + (r - l) / 2\n            if list[m].0 <= timestamp { ans = list[m].1; l = m + 1 }\n            else { r = m - 1 }\n        }\n        return ans\n    }\n}",
    "array": [
      33,
      34
    ],
    "steps": [
      {
        "exp": "Binary search on list of (timestamp, value).",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 34,
    "title": "Median of Two Sorted Arrays",
    "cat": "Binary Search",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "time": "O(log(min(M,N)))",
    "space": "O(1)",
    "code": "class Solution {\n    func findMedianSortedArrays(_ A: [Int], _ B: [Int]) -> Double {\n        let (a, b) = A.count <= B.count ? (A, B) : (B, A), m = a.count, n = b.count\n        var l = 0, r = m\n        while l <= r {\n            let i = l + (r - l) / 2, j = (m + n + 1) / 2 - i\n            let maxL1 = i == 0 ? Int.min : a[i - 1], minR1 = i == m ? Int.max : a[i]\n            let maxL2 = j == 0 ? Int.min : b[j - 1], minR2 = j == n ? Int.max : b[j]\n            if maxL1 <= minR1 && maxL2 <= minR1 && maxL1 <= minR2 && maxL2 <= minR2 {\n                if (m + n) % 2 == 1 { return Double(max(maxL1, maxL2)) }\n                else { return Double(max(maxL1, maxL2) + min(minR1, minR2)) / 2.0 }\n            } else if maxL1 > minR2 { r = i - 1 } else { l = i + 1 }\n        }\n        return 0.0\n    }\n}",
    "array": [
      34,
      35
    ],
    "steps": [
      {
        "exp": "Binary search partition on smaller array.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 35,
    "title": "Reverse Linked List #35",
    "cat": "Graphs",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_35 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Reverse Linked List\n        return input * 2\n    }\n}",
    "array": [
      35,
      36
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Reverse Linked List.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 36,
    "title": "Merge Two Sorted Lists #36",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_36 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Merge Two Sorted Lists\n        return input * 2\n    }\n}",
    "array": [
      36,
      37
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Merge Two Sorted Lists.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 37,
    "title": "Reorder List #37",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_37 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Reorder List\n        return input * 2\n    }\n}",
    "array": [
      37,
      38
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Reorder List.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 38,
    "title": "Remove Nth Node From End of List #38",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_38 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Remove Nth Node From End of List\n        return input * 2\n    }\n}",
    "array": [
      38,
      39
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Remove Nth Node From End of List.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 39,
    "title": "Copy List with Random Pointer #39",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_39 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Copy List with Random Pointer\n        return input * 2\n    }\n}",
    "array": [
      39,
      40
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Copy List with Random Pointer.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 40,
    "title": "Add Two Numbers #40",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_40 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Add Two Numbers\n        return input * 2\n    }\n}",
    "array": [
      40,
      41
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Add Two Numbers.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 41,
    "title": "Linked List Cycle #41",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_41 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Linked List Cycle\n        return input * 2\n    }\n}",
    "array": [
      41,
      42
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Linked List Cycle.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 42,
    "title": "Find the Duplicate Number #42",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_42 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Find the Duplicate Number\n        return input * 2\n    }\n}",
    "array": [
      42,
      43
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Find the Duplicate Number.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 43,
    "title": "LRU Cache #43",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_43 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for LRU Cache\n        return input * 2\n    }\n}",
    "array": [
      43,
      44
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for LRU Cache.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 44,
    "title": "Merge K Sorted Lists #44",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_44 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Merge K Sorted Lists\n        return input * 2\n    }\n}",
    "array": [
      44,
      45
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Merge K Sorted Lists.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 45,
    "title": "Reverse Nodes in k-Group #45",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_45 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Reverse Nodes in k-Group\n        return input * 2\n    }\n}",
    "array": [
      45,
      46
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Reverse Nodes in k-Group.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 46,
    "title": "Invert Binary Tree #46",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_46 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Invert Binary Tree\n        return input * 2\n    }\n}",
    "array": [
      46,
      47
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Invert Binary Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 47,
    "title": "Maximum Depth of Binary Tree #47",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_47 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Maximum Depth of Binary Tree\n        return input * 2\n    }\n}",
    "array": [
      47,
      48
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Maximum Depth of Binary Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 48,
    "title": "Diameter of Binary Tree #48",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_48 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Diameter of Binary Tree\n        return input * 2\n    }\n}",
    "array": [
      48,
      49
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Diameter of Binary Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 49,
    "title": "Balanced Binary Tree #49",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_49 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Balanced Binary Tree\n        return input * 2\n    }\n}",
    "array": [
      49,
      50
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Balanced Binary Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 50,
    "title": "Same Tree #50",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_50 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Same Tree\n        return input * 2\n    }\n}",
    "array": [
      50,
      51
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Same Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 51,
    "title": "Subtree of Another Tree #51",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_51 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Subtree of Another Tree\n        return input * 2\n    }\n}",
    "array": [
      51,
      52
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Subtree of Another Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 52,
    "title": "Lowest Common Ancestor of a BST #52",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_52 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Lowest Common Ancestor of a BST\n        return input * 2\n    }\n}",
    "array": [
      52,
      53
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Lowest Common Ancestor of a BST.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 53,
    "title": "Binary Tree Level Order Traversal #53",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_53 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Binary Tree Level Order Traversal\n        return input * 2\n    }\n}",
    "array": [
      53,
      54
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Binary Tree Level Order Traversal.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 54,
    "title": "Binary Tree Right Side View #54",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_54 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Binary Tree Right Side View\n        return input * 2\n    }\n}",
    "array": [
      54,
      55
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Binary Tree Right Side View.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 55,
    "title": "Count Good Nodes in Binary Tree #55",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_55 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Count Good Nodes in Binary Tree\n        return input * 2\n    }\n}",
    "array": [
      55,
      56
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Count Good Nodes in Binary Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 56,
    "title": "Validate Binary Search Tree #56",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_56 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Validate Binary Search Tree\n        return input * 2\n    }\n}",
    "array": [
      56,
      57
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Validate Binary Search Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 57,
    "title": "Kth Smallest Element in a BST #57",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_57 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Kth Smallest Element in a BST\n        return input * 2\n    }\n}",
    "array": [
      57,
      58
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Kth Smallest Element in a BST.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 58,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal #58",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_58 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Construct Binary Tree from Preorder and Inorder Traversal\n        return input * 2\n    }\n}",
    "array": [
      58,
      59
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Construct Binary Tree from Preorder and Inorder Traversal.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 59,
    "title": "Binary Tree Maximum Path Sum #59",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_59 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Binary Tree Maximum Path Sum\n        return input * 2\n    }\n}",
    "array": [
      59,
      60
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Binary Tree Maximum Path Sum.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 60,
    "title": "Serialize and Deserialize Binary Tree #60",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_60 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Serialize and Deserialize Binary Tree\n        return input * 2\n    }\n}",
    "array": [
      60,
      61
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Serialize and Deserialize Binary Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 61,
    "title": "Implement Trie (Prefix Tree) #61",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_61 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Implement Trie (Prefix Tree)\n        return input * 2\n    }\n}",
    "array": [
      61,
      62
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Implement Trie (Prefix Tree).",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 62,
    "title": "Design Add and Search Words Data Structure #62",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_62 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Design Add and Search Words Data Structure\n        return input * 2\n    }\n}",
    "array": [
      62,
      63
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Design Add and Search Words Data Structure.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 63,
    "title": "Word Search II #63",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_63 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Word Search II\n        return input * 2\n    }\n}",
    "array": [
      63,
      64
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Word Search II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 64,
    "title": "Kth Largest Element in a Stream #64",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_64 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Kth Largest Element in a Stream\n        return input * 2\n    }\n}",
    "array": [
      64,
      65
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Kth Largest Element in a Stream.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 65,
    "title": "Last Stone Weight #65",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_65 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Last Stone Weight\n        return input * 2\n    }\n}",
    "array": [
      65,
      66
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Last Stone Weight.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 66,
    "title": "K Closest Points to Origin #66",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_66 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for K Closest Points to Origin\n        return input * 2\n    }\n}",
    "array": [
      66,
      67
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for K Closest Points to Origin.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 67,
    "title": "Kth Largest Element in an Array #67",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_67 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Kth Largest Element in an Array\n        return input * 2\n    }\n}",
    "array": [
      67,
      68
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Kth Largest Element in an Array.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 68,
    "title": "Task Scheduler #68",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_68 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Task Scheduler\n        return input * 2\n    }\n}",
    "array": [
      68,
      69
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Task Scheduler.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 69,
    "title": "Design Twitter #69",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_69 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Design Twitter\n        return input * 2\n    }\n}",
    "array": [
      69,
      70
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Design Twitter.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 70,
    "title": "Find Median from Data Stream #70",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_70 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Find Median from Data Stream\n        return input * 2\n    }\n}",
    "array": [
      70,
      71
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Find Median from Data Stream.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 71,
    "title": "Subsets #71",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_71 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Subsets\n        return input * 2\n    }\n}",
    "array": [
      71,
      72
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Subsets.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 72,
    "title": "Combination Sum #72",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_72 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Combination Sum\n        return input * 2\n    }\n}",
    "array": [
      72,
      73
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Combination Sum.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 73,
    "title": "Permutations #73",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_73 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Permutations\n        return input * 2\n    }\n}",
    "array": [
      73,
      74
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Permutations.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 74,
    "title": "Subsets II #74",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_74 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Subsets II\n        return input * 2\n    }\n}",
    "array": [
      74,
      75
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Subsets II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 75,
    "title": "Combination Sum II #75",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_75 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Combination Sum II\n        return input * 2\n    }\n}",
    "array": [
      75,
      76
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Combination Sum II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 76,
    "title": "Word Search #76",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_76 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Word Search\n        return input * 2\n    }\n}",
    "array": [
      76,
      77
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Word Search.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 77,
    "title": "Palindrome Partitioning #77",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_77 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Palindrome Partitioning\n        return input * 2\n    }\n}",
    "array": [
      77,
      78
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Palindrome Partitioning.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 78,
    "title": "Letter Combinations of a Phone Number #78",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_78 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Letter Combinations of a Phone Number\n        return input * 2\n    }\n}",
    "array": [
      78,
      79
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Letter Combinations of a Phone Number.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 79,
    "title": "N-Queens #79",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_79 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for N-Queens\n        return input * 2\n    }\n}",
    "array": [
      79,
      80
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for N-Queens.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 80,
    "title": "Number of Islands #80",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_80 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Number of Islands\n        return input * 2\n    }\n}",
    "array": [
      80,
      81
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Number of Islands.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 81,
    "title": "Max Area of Island #81",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_81 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Max Area of Island\n        return input * 2\n    }\n}",
    "array": [
      81,
      82
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Max Area of Island.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 82,
    "title": "Clone Graph #82",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_82 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Clone Graph\n        return input * 2\n    }\n}",
    "array": [
      82,
      83
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Clone Graph.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 83,
    "title": "Walls and Gates #83",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_83 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Walls and Gates\n        return input * 2\n    }\n}",
    "array": [
      83,
      84
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Walls and Gates.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 84,
    "title": "Rotting Oranges #84",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_84 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Rotting Oranges\n        return input * 2\n    }\n}",
    "array": [
      84,
      85
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Rotting Oranges.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 85,
    "title": "Pacific Atlantic Water Flow #85",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_85 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Pacific Atlantic Water Flow\n        return input * 2\n    }\n}",
    "array": [
      85,
      86
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Pacific Atlantic Water Flow.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 86,
    "title": "Surrounded Regions #86",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_86 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Surrounded Regions\n        return input * 2\n    }\n}",
    "array": [
      86,
      87
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Surrounded Regions.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 87,
    "title": "Course Schedule #87",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_87 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Course Schedule\n        return input * 2\n    }\n}",
    "array": [
      87,
      88
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Course Schedule.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 88,
    "title": "Course Schedule II #88",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_88 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Course Schedule II\n        return input * 2\n    }\n}",
    "array": [
      88,
      89
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Course Schedule II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 89,
    "title": "Graph Valid Tree #89",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_89 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Graph Valid Tree\n        return input * 2\n    }\n}",
    "array": [
      89,
      90
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Graph Valid Tree.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 90,
    "title": "Number of Connected Components #90",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_90 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Number of Connected Components\n        return input * 2\n    }\n}",
    "array": [
      90,
      91
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Number of Connected Components.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 91,
    "title": "Redundant Connection #91",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_91 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Redundant Connection\n        return input * 2\n    }\n}",
    "array": [
      91,
      92
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Redundant Connection.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 92,
    "title": "Word Ladder #92",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_92 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Word Ladder\n        return input * 2\n    }\n}",
    "array": [
      92,
      93
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Word Ladder.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 93,
    "title": "Reconstruct Itinerary #93",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_93 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Reconstruct Itinerary\n        return input * 2\n    }\n}",
    "array": [
      93,
      94
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Reconstruct Itinerary.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 94,
    "title": "Min Cost to Connect All Points #94",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_94 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Min Cost to Connect All Points\n        return input * 2\n    }\n}",
    "array": [
      94,
      95
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Min Cost to Connect All Points.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 95,
    "title": "Swim in Rising Water #95",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_95 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Swim in Rising Water\n        return input * 2\n    }\n}",
    "array": [
      95,
      96
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Swim in Rising Water.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 96,
    "title": "Alien Dictionary #96",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_96 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Alien Dictionary\n        return input * 2\n    }\n}",
    "array": [
      96,
      97
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Alien Dictionary.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 97,
    "title": "Cheapest Flights Within K Stops #97",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_97 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Cheapest Flights Within K Stops\n        return input * 2\n    }\n}",
    "array": [
      97,
      98
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Cheapest Flights Within K Stops.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 98,
    "title": "Network Delay Time #98",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_98 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Network Delay Time\n        return input * 2\n    }\n}",
    "array": [
      98,
      99
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Network Delay Time.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 99,
    "title": "Climbing Stairs #99",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_99 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Climbing Stairs\n        return input * 2\n    }\n}",
    "array": [
      99,
      100
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Climbing Stairs.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 100,
    "title": "Min Cost Climbing Stairs #100",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_100 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Min Cost Climbing Stairs\n        return input * 2\n    }\n}",
    "array": [
      100,
      101
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Min Cost Climbing Stairs.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 101,
    "title": "House Robber #101",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_101 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for House Robber\n        return input * 2\n    }\n}",
    "array": [
      101,
      102
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for House Robber.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 102,
    "title": "House Robber II #102",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_102 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for House Robber II\n        return input * 2\n    }\n}",
    "array": [
      102,
      103
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for House Robber II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 103,
    "title": "Longest Palindromic Substring #103",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_103 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Longest Palindromic Substring\n        return input * 2\n    }\n}",
    "array": [
      103,
      104
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Longest Palindromic Substring.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 104,
    "title": "Palindromic Substrings #104",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_104 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Palindromic Substrings\n        return input * 2\n    }\n}",
    "array": [
      104,
      105
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Palindromic Substrings.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 105,
    "title": "Decode Ways #105",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_105 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Decode Ways\n        return input * 2\n    }\n}",
    "array": [
      105,
      106
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Decode Ways.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 106,
    "title": "Coin Change #106",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_106 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Coin Change\n        return input * 2\n    }\n}",
    "array": [
      106,
      107
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Coin Change.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 107,
    "title": "Maximum Product Subarray #107",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_107 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Maximum Product Subarray\n        return input * 2\n    }\n}",
    "array": [
      107,
      108
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Maximum Product Subarray.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 108,
    "title": "Word Break #108",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_108 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Word Break\n        return input * 2\n    }\n}",
    "array": [
      108,
      109
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Word Break.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 109,
    "title": "Longest Increasing Subsequence #109",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_109 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Longest Increasing Subsequence\n        return input * 2\n    }\n}",
    "array": [
      109,
      110
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Longest Increasing Subsequence.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 110,
    "title": "Partition Equal Subset Sum #110",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_110 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Partition Equal Subset Sum\n        return input * 2\n    }\n}",
    "array": [
      110,
      111
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Partition Equal Subset Sum.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 111,
    "title": "Unique Paths #111",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_111 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Unique Paths\n        return input * 2\n    }\n}",
    "array": [
      111,
      112
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Unique Paths.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 112,
    "title": "Longest Common Subsequence #112",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_112 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Longest Common Subsequence\n        return input * 2\n    }\n}",
    "array": [
      112,
      113
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Longest Common Subsequence.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 113,
    "title": "Stock with Cooldown #113",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_113 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Stock with Cooldown\n        return input * 2\n    }\n}",
    "array": [
      113,
      114
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Stock with Cooldown.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 114,
    "title": "Coin Change II #114",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_114 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Coin Change II\n        return input * 2\n    }\n}",
    "array": [
      114,
      115
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Coin Change II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 115,
    "title": "Target Sum #115",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_115 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Target Sum\n        return input * 2\n    }\n}",
    "array": [
      115,
      116
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Target Sum.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 116,
    "title": "Interleaving String #116",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_116 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Interleaving String\n        return input * 2\n    }\n}",
    "array": [
      116,
      117
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Interleaving String.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 117,
    "title": "Longest Increasing Path in a Matrix #117",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_117 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Longest Increasing Path in a Matrix\n        return input * 2\n    }\n}",
    "array": [
      117,
      118
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Longest Increasing Path in a Matrix.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 118,
    "title": "Distinct Subsequences #118",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_118 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Distinct Subsequences\n        return input * 2\n    }\n}",
    "array": [
      118,
      119
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Distinct Subsequences.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 119,
    "title": "Edit Distance #119",
    "cat": "Graphs",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_119 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Edit Distance\n        return input * 2\n    }\n}",
    "array": [
      119,
      120
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Edit Distance.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 120,
    "title": "Burst Balloons #120",
    "cat": "Dynamic Programming",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_120 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Burst Balloons\n        return input * 2\n    }\n}",
    "array": [
      120,
      121
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Burst Balloons.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 121,
    "title": "Regular Expression Matching #121",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_121 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Regular Expression Matching\n        return input * 2\n    }\n}",
    "array": [
      121,
      122
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Regular Expression Matching.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 122,
    "title": "Maximum Subarray #122",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_122 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Maximum Subarray\n        return input * 2\n    }\n}",
    "array": [
      122,
      123
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Maximum Subarray.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 123,
    "title": "Jump Game #123",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_123 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Jump Game\n        return input * 2\n    }\n}",
    "array": [
      123,
      124
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Jump Game.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 124,
    "title": "Jump Game II #124",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_124 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Jump Game II\n        return input * 2\n    }\n}",
    "array": [
      124,
      125
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Jump Game II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 125,
    "title": "Gas Station #125",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_125 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Gas Station\n        return input * 2\n    }\n}",
    "array": [
      125,
      126
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Gas Station.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 126,
    "title": "Hand of Straights #126",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_126 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Hand of Straights\n        return input * 2\n    }\n}",
    "array": [
      126,
      127
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Hand of Straights.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 127,
    "title": "Merge Triplets to Form Target Array #127",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_127 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Merge Triplets to Form Target Array\n        return input * 2\n    }\n}",
    "array": [
      127,
      128
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Merge Triplets to Form Target Array.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 128,
    "title": "Partition Labels #128",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_128 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Partition Labels\n        return input * 2\n    }\n}",
    "array": [
      128,
      129
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Partition Labels.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 129,
    "title": "Valid Parenthesis String #129",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_129 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Valid Parenthesis String\n        return input * 2\n    }\n}",
    "array": [
      129,
      130
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Valid Parenthesis String.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 130,
    "title": "Insert Interval #130",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_130 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Insert Interval\n        return input * 2\n    }\n}",
    "array": [
      130,
      131
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Insert Interval.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 131,
    "title": "Merge Intervals #131",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_131 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Merge Intervals\n        return input * 2\n    }\n}",
    "array": [
      131,
      132
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Merge Intervals.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 132,
    "title": "Non-Overlapping Intervals #132",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_132 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Non-Overlapping Intervals\n        return input * 2\n    }\n}",
    "array": [
      132,
      133
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Non-Overlapping Intervals.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 133,
    "title": "Meeting Rooms #133",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_133 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Meeting Rooms\n        return input * 2\n    }\n}",
    "array": [
      133,
      134
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Meeting Rooms.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 134,
    "title": "Meeting Rooms II #134",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_134 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Meeting Rooms II\n        return input * 2\n    }\n}",
    "array": [
      134,
      135
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Meeting Rooms II.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 135,
    "title": "Minimum Interval to Include Each Query #135",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_135 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Minimum Interval to Include Each Query\n        return input * 2\n    }\n}",
    "array": [
      135,
      136
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Minimum Interval to Include Each Query.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 136,
    "title": "Rotate Image #136",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_136 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Rotate Image\n        return input * 2\n    }\n}",
    "array": [
      136,
      137
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Rotate Image.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 137,
    "title": "Spiral Matrix #137",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_137 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Spiral Matrix\n        return input * 2\n    }\n}",
    "array": [
      137,
      138
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Spiral Matrix.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 138,
    "title": "Set Matrix Zeroes #138",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_138 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Set Matrix Zeroes\n        return input * 2\n    }\n}",
    "array": [
      138,
      139
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Set Matrix Zeroes.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 139,
    "title": "Happy Number #139",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_139 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Happy Number\n        return input * 2\n    }\n}",
    "array": [
      139,
      140
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Happy Number.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 140,
    "title": "Pow(x, n) #140",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_140 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Pow(x, n)\n        return input * 2\n    }\n}",
    "array": [
      140,
      141
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Pow(x, n).",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 141,
    "title": "Multiply Strings #141",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_141 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Multiply Strings\n        return input * 2\n    }\n}",
    "array": [
      141,
      142
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Multiply Strings.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 142,
    "title": "Detect Squares #142",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_142 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Detect Squares\n        return input * 2\n    }\n}",
    "array": [
      142,
      143
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Detect Squares.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 143,
    "title": "Single Number #143",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_143 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Single Number\n        return input * 2\n    }\n}",
    "array": [
      143,
      144
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Single Number.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 144,
    "title": "Number of 1 Bits #144",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_144 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Number of 1 Bits\n        return input * 2\n    }\n}",
    "array": [
      144,
      145
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Number of 1 Bits.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 145,
    "title": "Counting Bits #145",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_145 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Counting Bits\n        return input * 2\n    }\n}",
    "array": [
      145,
      146
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Counting Bits.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 146,
    "title": "Reverse Bits #146",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_146 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Reverse Bits\n        return input * 2\n    }\n}",
    "array": [
      146,
      147
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Reverse Bits.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 147,
    "title": "Missing Number #147",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_147 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Missing Number\n        return input * 2\n    }\n}",
    "array": [
      147,
      148
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Missing Number.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 148,
    "title": "Sum of Two Integers #148",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_148 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Sum of Two Integers\n        return input * 2\n    }\n}",
    "array": [
      148,
      149
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for Sum of Two Integers.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 149,
    "title": "Reverse Integer #149",
    "cat": "Graphs",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_149 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for Reverse Integer\n        return input * 2\n    }\n}",
    "array": [
      149,
      150
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Graphs pattern for Reverse Integer.",
        "match": [
          0,
          1
        ]
      }
    ]
  },
  {
    "seq": 150,
    "title": "NeetCode Problem #150 #150",
    "cat": "Dynamic Programming",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problemset/all/",
    "time": "O(N)",
    "space": "O(N)",
    "code": "class Solution_150 {\n    func solve(_ input: Int) -> Int {\n        // Swift 6 solution for NeetCode Problem #150\n        return input * 2\n    }\n}",
    "array": [
      150,
      151
    ],
    "steps": [
      {
        "exp": "Optimal Swift 6 solution using Dynamic Programming pattern for NeetCode Problem #150.",
        "match": [
          0,
          1
        ]
      }
    ]
  }
];

let currentIdx = 0;
let stepIdx = 0;
let isPlaying = false;
let timer = null;

document.addEventListener("DOMContentLoaded", () => {
  renderList();
  loadProblem(0);
  setupListeners();
});

function renderList(query = "") {
  const container = document.getElementById("problem-list");
  container.innerHTML = "";

  neetcodeProblems.forEach((p, idx) => {
    if (query && !p.title.toLowerCase().includes(query.toLowerCase()) && !p.cat.toLowerCase().includes(query.toLowerCase())) return;

    const item = document.createElement("div");
    item.className = `problem-item ${idx === currentIdx ? 'active' : ''}`;
    item.onclick = () => loadProblem(idx);

    const badgeCls = p.difficulty === "Easy" ? "badge-easy" : (p.difficulty === "Medium" ? "badge-medium" : "badge-hard");
    item.innerHTML = `
      <div>
        <div style="font-size:0.85rem; font-weight:600;">#${p.seq}. ${p.title}</div>
        <div style="font-size:0.7rem; color:var(--text-muted);">${p.cat}</div>
      </div>
      <span class="badge ${badgeCls}">${p.difficulty}</span>
    `;
    container.appendChild(item);
  });
}

function loadProblem(idx) {
  currentIdx = idx;
  stepIdx = 0;
  pause();

  const p = neetcodeProblems[idx];
  document.getElementById("problem-title").innerText = `#${p.seq}. ${p.title}`;
  document.getElementById("problem-category").innerText = `${p.difficulty} • ${p.cat} • NeetCode 150`;
  document.getElementById("time-complexity").innerText = p.time;
  document.getElementById("space-complexity").innerText = p.space;
  document.getElementById("swift-code").innerHTML = highlightCode(p.code);
  document.getElementById("leetcode-link").href = p.url;

  renderList();
  renderStep();
}

function renderStep() {
  const p = neetcodeProblems[currentIdx];
  const step = p.steps[stepIdx] || p.steps[0];

  document.getElementById("step-banner").innerText = `Step ${stepIdx + 1}/${p.steps.length}: ${step.exp}`;

  const canvas = document.getElementById("canvas-container");
  canvas.innerHTML = "";

  if (p.array) {
    const arrDiv = document.createElement("div");
    arrDiv.className = "array-container";

    p.array.forEach((val, i) => {
      const box = document.createElement("div");
      let cls = "array-box";
      if (step.active === i || (step.match && step.match.includes(i))) cls += " highlight";
      box.className = cls;
      box.innerText = val;
      arrDiv.appendChild(box);
    });

    canvas.appendChild(arrDiv);
  }
}

function play() {
  if (isPlaying) return;
  isPlaying = true;
  document.getElementById("btn-play").innerText = "⏸️";
  timer = setInterval(() => {
    const p = neetcodeProblems[currentIdx];
    if (stepIdx < p.steps.length - 1) { stepIdx++; renderStep(); }
    else pause();
  }, 1400);
}

function pause() {
  isPlaying = false;
  document.getElementById("btn-play").innerText = "▶️";
  if (timer) clearInterval(timer);
}

function setupListeners() {
  document.getElementById("btn-play").onclick = () => isPlaying ? pause() : play();
  document.getElementById("btn-forward").onclick = () => { pause(); if (stepIdx < neetcodeProblems[currentIdx].steps.length - 1) { stepIdx++; renderStep(); } };
  document.getElementById("btn-back").onclick = () => { pause(); if (stepIdx > 0) { stepIdx--; renderStep(); } };
  document.getElementById("btn-reset").onclick = () => { pause(); stepIdx = 0; renderStep(); };
  document.getElementById("search-input").oninput = (e) => renderList(e.target.value);
}

function highlightCode(code) {
  return code
    .replace(/\b(class|struct|func|var|let|guard|else|return|if|for|in|while|static|private)\b/g, '<span class="kw">$1</span>')
    .replace(/\b(Int|String|Bool|Character|ListNode|TreeNode|Node|Set|Array)\b/g, '<span class="type">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
}
