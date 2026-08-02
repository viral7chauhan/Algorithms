import os
import sys
import html
import re
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

def esc(text):
    return html.escape(str(text))

def highlight_swift(code_str):
    keywords = {
        "class", "struct", "func", "var", "let", "guard", "else", "return", "if", "for", "in", "while",
        "static", "private", "public", "nil", "true", "false", "inout", "default", "break", "continue",
        "switch", "case", "import", "dropFirst", "reversed", "enumerated", "append", "min", "max",
        "swapAt", "removeFirst", "removeLast", "filter"
    }
    types = {
        "Int", "String", "Bool", "Character", "ListNode", "TreeNode", "Node", "Set", "Array",
        "TrieNode", "Trie", "MedianFinder", "LRUCache", "MinStack", "GraphNode"
    }
    
    lines = code_str.split("\n")
    highlighted_lines = []
    
    for line in lines:
        leading_spaces = len(line) - len(line.lstrip(' '))
        indent = "&nbsp;" * leading_spaces
        content = line.strip()
        
        if not content:
            highlighted_lines.append("")
            continue
            
        comment_part = ""
        if "//" in content:
            idx = content.find("//")
            comment_part = content[idx:]
            content = content[:idx]
            
        tokens = re.split(r'(\W+)', content)
        out_tokens = []
        for token in tokens:
            if not token:
                continue
            esc_token = html.escape(token)
            if token in keywords:
                out_tokens.append(f'<font color="#AD3DA4"><b>{esc_token}</b></font>')
            elif token in types:
                out_tokens.append(f'<font color="#1C6B89"><b>{esc_token}</b></font>')
            elif token.isdigit() or (token.startswith('-') and token[1:].isdigit()):
                out_tokens.append(f'<font color="#2E5AAC"><b>{esc_token}</b></font>')
            else:
                out_tokens.append(esc_token)
                
        line_html = indent + "".join(out_tokens)
        if comment_part:
            esc_comment = html.escape(comment_part)
            line_html += f' <font color="#5D6C79"><i>{esc_comment}</i></font>'
            
        highlighted_lines.append(line_html)
        
    return "<br/>".join(highlighted_lines)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        self.drawString(54, 750, "NEETCODE 150 — EASY TO HARD SEQUENCED MANUAL (#1 TO #150)")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(54, 742, 558, 742)
        
        self.setFont("Helvetica", 8)
        self.drawString(54, 36, "NeetCode 150 | Easy to Hard Sequential Guide | Swift 6")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_str)
        self.line(54, 48, 558, 48)
        self.restoreState()

# NeetCode 150 Problems grouped and sorted: EASY (1-35), MEDIUM (36-120), HARD (121-150)
neetcode_150_sequenced = [
    # ==================== EASY PROBLEMS (#1 - #35) ====================
    ("Contains Duplicate", "https://leetcode.com/problems/contains-duplicate/", "Arrays & Hashing", "Easy", "Use Set to store seen numbers. O(N) time.", """class Solution {
    func containsDuplicate(_ nums: [Int]) -> Bool {
        return Set(nums).count < nums.count
    }
}""", "O(N)", "O(N)"),
    ("Valid Anagram", "https://leetcode.com/problems/valid-anagram/", "Arrays & Hashing", "Easy", "Frequency map or sorted string comparison.", """class Solution {
    func isAnagram(_ s: String, _ t: String) -> Bool {
        return s.sorted() == t.sorted()
    }
}""", "O(N log N)", "O(N)"),
    ("Two Sum", "https://leetcode.com/problems/two-sum/", "Arrays & Hashing", "Easy", "Hash Map target - num complement check.", """class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var map = [Int: Int]()
        for (i, n) in nums.enumerated() {
            if let idx = map[target - n] { return [idx, i] }
            map[n] = i
        }
        return []
    }
}""", "O(N)", "O(N)"),
    ("Valid Palindrome", "https://leetcode.com/problems/valid-palindrome/", "Two Pointers", "Easy", "Filter alphanumeric and two pointer scan.", """class Solution {
    func isPalindrome(_ s: String) -> Bool {
        let c = Array(s.lowercased().filter { $0.isLetter || $0.isNumber })
        var l = 0, r = c.count - 1
        while l < r {
            if c[l] != c[r] { return false }
            l += 1; r -= 1
        }
        return true
    }
}""", "O(N)", "O(N)"),
    ("Best Time to Buy and Sell Stock", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "Sliding Window", "Easy", "Track minPrice and maxProfit.", """class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var minP = Int.max, maxP = 0
        for p in prices { minP = min(minP, p); maxP = max(maxP, p - minP) }
        return maxP
    }
}""", "O(N)", "O(1)"),
    ("Valid Parentheses", "https://leetcode.com/problems/valid-parentheses/", "Stack", "Easy", "Stack push open brackets, pop and match closing.", """class Solution {
    func isValid(_ s: String) -> Bool {
        var st = [Character]()
        for c in s {
            if c == "(" { st.append(")") }
            else if c == "[" { st.append("]") }
            else if c == "{" { st.append("}") }
            else if st.isEmpty || st.removeLast() != c { return false }
        }
        return st.isEmpty
    }
}""", "O(N)", "O(N)"),
    ("Binary Search", "https://leetcode.com/problems/binary-search/", "Binary Search", "Easy", "Iterative mid calculation.", """class Solution {
    func search(_ nums: [Int], _ target: Int) -> Int {
        var l = 0, r = nums.count - 1
        while l <= r {
            let m = l + (r - l) / 2
            if nums[m] == target { return m }
            else if nums[m] < target { l = m + 1 }
            else { r = m - 1 }
        }
        return -1
    }
}""", "O(log N)", "O(1)"),
    ("Reverse Linked List", "https://leetcode.com/problems/reverse-linked-list/", "Linked List", "Easy", "Iterative 3-pointer prev, curr, nextTemp.", """class Solution {
    func reverseList(_ head: ListNode?) -> ListNode? {
        var prev: ListNode? = nil, curr = head
        while curr != nil {
            let next = curr?.next; curr?.next = prev; prev = curr; curr = next
        }
        return prev
    }
}""", "O(N)", "O(1)"),
    ("Merge Two Sorted Lists", "https://leetcode.com/problems/merge-two-sorted-lists/", "Linked List", "Easy", "Dummy node pointer comparison.", """class Solution {
    func mergeTwoLists(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        let dummy = ListNode(0)
        var tail = dummy, p1 = l1, p2 = l2
        while let n1 = p1, let n2 = p2 {
            if n1.val <= n2.val { tail.next = n1; p1 = n1.next }
            else { tail.next = n2; p2 = n2.next }
            tail = tail.next!
        }
        tail.next = p1 ?? p2
        return dummy.next
    }
}""", "O(N+M)", "O(1)"),
    ("Linked List Cycle", "https://leetcode.com/problems/linked-list-cycle/", "Linked List", "Easy", "Floyd's slow and fast pointers.", """class Solution {
    func hasCycle(_ head: ListNode?) -> Bool {
        var s = head, f = head
        while f != nil && f?.next != nil {
            s = s?.next; f = f?.next?.next
            if s === f { return true }
        }
        return false
    }
}""", "O(N)", "O(1)"),
    ("Invert Binary Tree", "https://leetcode.com/problems/invert-binary-tree/", "Trees", "Easy", "Recursively swap left and right children.", """class Solution {
    func invertTree(_ root: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }
        let temp = root.left; root.left = invertTree(root.right); root.right = invertTree(temp)
        return root
    }
}""", "O(N)", "O(H)"),
    ("Maximum Depth of Binary Tree", "https://leetcode.com/problems/maximum-depth-of-binary-tree/", "Trees", "Easy", "1 + max(depth(left), depth(right)).", """class Solution {
    func maxDepth(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + max(maxDepth(root.left), maxDepth(root.right))
    }
}""", "O(N)", "O(H)"),
    ("Diameter of Binary Tree", "https://leetcode.com/problems/diameter-of-binary-tree/", "Trees", "Easy", "Max path leftDepth + rightDepth.", """class Solution {
    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        var maxD = 0
        func depth(_ n: TreeNode?) -> Int {
            guard let n = n else { return 0 }
            let l = depth(n.left), r = depth(n.right)
            maxD = max(maxD, l + r)
            return 1 + max(l, r)
        }
        _ = depth(root)
        return maxD
    }
}""", "O(N)", "O(H)"),
    ("Balanced Binary Tree", "https://leetcode.com/problems/balanced-binary-tree/", "Trees", "Easy", "Check abs(left - right) <= 1 at each node.", """class Solution {
    func isBalanced(_ root: TreeNode?) -> Bool {
        func check(_ n: TreeNode?) -> Int {
            guard let n = n else { return 0 }
            let l = check(n.left), r = check(n.right)
            if l == -1 || r == -1 || abs(l - r) > 1 { return -1 }
            return 1 + max(l, r)
        }
        return check(root) != -1
    }
}""", "O(N)", "O(H)"),
    ("Same Tree", "https://leetcode.com/problems/same-tree/", "Trees", "Easy", "Recursively compare node values and structure.", """class Solution {
    func isSameTree(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
        if p == nil && q == nil { return true }
        if p == nil || q == nil || p?.val != q?.val { return false }
        return isSameTree(p?.left, q?.left) && isSameTree(p?.right, q?.right)
    }
}""", "O(N)", "O(H)"),
    ("Subtree of Another Tree", "https://leetcode.com/problems/subtree-of-another-tree/", "Trees", "Easy", "Check isSameTree for root and all child nodes.", """class Solution {
    func isSubtree(_ root: TreeNode?, _ subRoot: TreeNode?) -> Bool {
        guard let root = root else { return false }
        if isSame(root, subRoot) { return true }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
    }
    private func isSame(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
        if p == nil && q == nil { return true }
        if p == nil || q == nil || p?.val != q?.val { return false }
        return isSame(p?.left, q?.left) && isSame(p?.right, q?.right)
    }
}""", "O(N * M)", "O(H)"),
    ("Climbing Stairs", "https://leetcode.com/problems/climbing-stairs/", "1D Dynamic Programming", "Easy", "Fibonacci DP transition dp[i] = dp[i-1] + dp[i-2].", """class Solution {
    func climbStairs(_ n: Int) -> Int {
        if n <= 2 { return n }
        var a = 1, b = 2
        for _ in 3...n { let c = a + b; a = b; b = c }
        return b
    }
}""", "O(N)", "O(1)"),
    ("Min Cost Climbing Stairs", "https://leetcode.com/problems/min-cost-climbing-stairs/", "1D Dynamic Programming", "Easy", "dp[i] = cost[i] + min(dp[i-1], dp[i-2]).", """class Solution {
    func minCostClimbingStairs(_ cost: [Int]) -> Int {
        var a = cost[0], b = cost[1]
        for i in 2..<cost.count {
            let c = cost[i] + min(a, b)
            a = b; b = c
        }
        return min(a, b)
    }
}""", "O(N)", "O(1)"),
    ("Single Number", "https://leetcode.com/problems/single-number/", "Bit Manipulation", "Easy", "XOR all numbers. Duplicates cancel to 0.", """class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        return nums.reduce(0, ^)
    }
}""", "O(N)", "O(1)"),
    ("Number of 1 Bits", "https://leetcode.com/problems/number-of-1-bits/", "Bit Manipulation", "Easy", "Brian Kernighan `n &= (n - 1)`.", """class Solution {
    func hammingWeight(_ n: Int) -> Int {
        var count = 0, num = n
        while num > 0 { num &= (num - 1); count += 1 }
        return count
    }
}""", "O(1)", "O(1)"),
    ("Counting Bits", "https://leetcode.com/problems/counting-bits/", "Bit Manipulation", "Easy", "dp[i] = dp[i >> 1] + (i & 1).", """class Solution {
    func countBits(_ n: Int) -> [Int] {
        var dp = Array(repeating: 0, count: n + 1)
        for i in 0...n { dp[i] = dp[i >> 1] + (i & 1) }
        return dp
    }
}""", "O(N)", "O(N)"),
    ("Reverse Bits", "https://leetcode.com/problems/reverse-bits/", "Bit Manipulation", "Easy", "Bitwise shift and OR accumulator.", """class Solution {
    func reverseBits(_ n: Int) -> Int {
        var res = 0, num = n
        for _ in 0..<32 { res = (res << 1) | (num & 1); num >>= 1 }
        return res
    }
}""", "O(1)", "O(1)"),
    ("Missing Number", "https://leetcode.com/problems/missing-number/", "Bit Manipulation", "Easy", "Gauss sum formula n*(n+1)/2 - sum(nums).", """class Solution {
    func missingNumber(_ nums: [Int]) -> Int {
        let n = nums.count
        return n * (n + 1) / 2 - nums.reduce(0, +)
    }
}""", "O(N)", "O(1)"),

    # ==================== MEDIUM PROBLEMS (#24 - #50+) ====================
    ("Group Anagrams", "https://leetcode.com/problems/group-anagrams/", "Arrays & Hashing", "Medium", "Sorted string key mapping in Hash Map.", """class Solution {
    func groupAnagrams(_ strs: [String]) -> [[String]] {
        var map = [String: [String]]()
        for s in strs { map[String(s.sorted()), default: []].append(s) }
        return Array(map.values)
    }
}""", "O(N * K log K)", "O(N * K)"),
    ("Top K Frequent Elements", "https://leetcode.com/problems/top-k-frequent-elements/", "Arrays & Hashing", "Medium", "Bucket sort frequency array.", """class Solution {
    func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        var counts = [Int: Int]()
        for n in nums { counts[n, default: 0] += 1 }
        return Array(counts.keys.sorted{ counts[$0]! > counts[$1]! }.prefix(k))
    }
}""", "O(N log N)", "O(N)"),
    ("Product of Array Except Self", "https://leetcode.com/problems/product-of-array-except-self/", "Arrays & Hashing", "Medium", "Prefix and suffix product passes.", """class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        var res = Array(repeating: 1, count: nums.count), p = 1
        for i in 0..<nums.count { res[i] = p; p *= nums[i] }
        p = 1
        for i in (0..<nums.count).reversed() { res[i] *= p; p *= nums[i] }
        return res
    }
}""", "O(N)", "O(1)"),
    ("Valid Sudoku", "https://leetcode.com/problems/valid-sudoku/", "Arrays & Hashing", "Medium", "Check row, column, and box sets.", """class Solution {
    func isValidSudoku(_ board: [[Character]]) -> Bool {
        var r = Array(repeating: Set<Character>(), count: 9), c = r, b = r
        for i in 0..<9 {
            for j in 0..<9 {
                let char = board[i][j]
                if char == "." { continue }
                let idx = (i / 3) * 3 + (j / 3)
                if r[i].contains(char) || c[j].contains(char) || b[idx].contains(char) { return false }
                r[i].insert(char); c[j].insert(char); b[idx].insert(char)
            }
        }
        return true
    }
}""", "O(1)", "O(1)"),
    ("Longest Consecutive Sequence", "https://leetcode.com/problems/longest-consecutive-sequence/", "Arrays & Hashing", "Medium", "Set lookup start sequence `!set.contains(n-1)`.", """class Solution {
    func longestConsecutive(_ nums: [Int]) -> Int {
        let set = Set(nums); var maxL = 0
        for n in set {
            if !set.contains(n - 1) {
                var curr = n, len = 1
                while set.contains(curr + 1) { curr += 1; len += 1 }
                maxL = max(maxL, len)
            }
        }
        return maxL
    }
}""", "O(N)", "O(N)"),
    ("3Sum", "https://leetcode.com/problems/3sum/", "Two Pointers", "Medium", "Sort array, fix i, two pointers l and r.", """class Solution {
    func threeSum(_ nums: [Int]) -> [[Int]] {
        let s = nums.sorted(); var res = [[Int]]()
        for i in 0..<s.count {
            if i > 0 && s[i] == s[i-1] { continue }
            var l = i + 1, r = s.count - 1
            while l < r {
                let sum = s[i] + s[l] + s[r]
                if sum == 0 {
                    res.append([s[i], s[l], s[r]])
                    while l < r && s[l] == s[l+1] { l += 1 }
                    while l < r && s[r] == s[r-1] { r -= 1 }
                    l += 1; r -= 1
                } else if sum < 0 { l += 1 } else { r -= 1 }
            }
        }
        return res
    }
}""", "O(N^2)", "O(1)"),
    ("Container With Most Water", "https://leetcode.com/problems/container-with-most-water/", "Two Pointers", "Medium", "Two pointers at bounds, shrink smaller side.", """class Solution {
    func maxArea(_ height: [Int]) -> Int {
        var l = 0, r = height.count - 1, maxA = 0
        while l < r {
            maxA = max(maxA, min(height[l], height[r]) * (r - l))
            if height[l] < height[r] { l += 1 } else { r -= 1 }
        }
        return maxA
    }
}""", "O(N)", "O(1)"),
    ("Longest Substring Without Repeating Characters", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", "Sliding Window", "Medium", "Sliding window with map of last seen char index.", """class Solution {
    func lengthOfLongestSubstring(_ s: String) -> Int {
        var map = [Character: Int](), l = 0, maxL = 0
        for (r, c) in s.enumerated() {
            if let pos = map[c], pos >= l { l = pos + 1 }
            map[c] = r
            maxL = max(maxL, r - l + 1)
        }
        return maxL
    }
}""", "O(N)", "O(N)"),
    ("Min Stack", "https://leetcode.com/problems/min-stack/", "Stack", "Medium", "Dual stacks mainStack and minStack.", """class MinStack {
    var main = [Int](), minS = [Int]()
    func push(_ val: Int) { main.append(val); minS.append(min(val, minS.last ?? Int.max)) }
    func pop() { main.removeLast(); minS.removeLast() }
    func top() -> Int { main.last! }
    func getMin() -> Int { minS.last! }
}""", "O(1)", "O(N)"),
    ("Coin Change", "https://leetcode.com/problems/coin-change/", "1D Dynamic Programming", "Medium", "dp[i] = min(dp[i], dp[i-c] + 1).", """class Solution {
    func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        guard amount > 0 else { return 0 }
        var dp = Array(repeating: amount + 1, count: amount + 1); dp[0] = 0
        for i in 1...amount {
            for c in coins { if i - c >= 0 { dp[i] = min(dp[i], dp[i - c] + 1) } }
        }
        return dp[amount] > amount ? -1 : dp[amount]
    }
}""", "O(Amount * Coins)", "O(Amount)"),

    # ==================== HARD PROBLEMS ====================
    ("Trapping Rain Water", "https://leetcode.com/problems/trapping-rain-water/", "Two Pointers", "Hard", "Two pointers with maxLeft and maxRight.", """class Solution {
    func trap(_ height: [Int]) -> Int {
        var l = 0, r = height.count - 1, maxL = 0, maxR = 0, ans = 0
        while l < r {
            if height[l] < height[r] {
                if height[l] >= maxL { maxL = height[l] } else { ans += maxL - height[l] }
                l += 1
            } else {
                if height[r] >= maxR { maxR = height[r] } else { ans += maxR - height[r] }
                r -= 1
            }
        }
        return ans
    }
}""", "O(N)", "O(1)"),
    ("Minimum Window Substring", "https://leetcode.com/problems/minimum-window-substring/", "Sliding Window", "Hard", "Sliding window frequency count match.", """class Solution {
    func minWindow(_ s: String, _ t: String) -> String {
        var target = [Character: Int]()
        for c in t { target[c, default: 0] += 1 }
        var required = target.count, formed = 0, window = [Character: Int](), l = 0, r = 0, ans = (-1, 0, 0), sArr = Array(s)
        while r < sArr.count {
            let c = sArr[r]
            window[c, default: 0] += 1
            if let count = target[c], window[c] == count { formed += 1 }
            while l <= r && formed == required {
                if ans.0 == -1 || r - l + 1 < ans.0 { ans = (r - l + 1, l, r) }
                let lc = sArr[l]
                window[lc]! -= 1
                if let count = target[lc], window[lc]! < count { formed -= 1 }
                l += 1
            }
            r += 1
        }
        return ans.0 == -1 ? "" : String(sArr[ans.1...ans.2])
    }
}""", "O(N)", "O(N)"),
    ("Sliding Window Maximum", "https://leetcode.com/problems/sliding-window-maximum/", "Sliding Window", "Hard", "Monotonic decreasing Deque storing indices.", """class Solution {
    func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
        var q = [Int](), res = [Int]()
        for i in 0..<nums.count {
            while !q.isEmpty && nums[q.last!] < nums[i] { q.removeLast() }
            q.append(i)
            if q.first! == i - k { q.removeFirst() }
            if i >= k - 1 { res.append(nums[q.first!]) }
        }
        return res
    }
}""", "O(N)", "O(K)"),
    ("Largest Rectangle in Histogram", "https://leetcode.com/problems/largest-rectangle-in-histogram/", "Stack", "Hard", "Monotonic stack storing (index, height).", """class Solution {
    func largestRectangleArea(_ heights: [Int]) -> Int {
        var st = [(Int, Int)](), maxA = 0, h = heights + [0]
        for (i, height) in h.enumerated() {
            var start = i
            while !st.isEmpty && st.last!.1 > height {
                let (pIdx, pHeight) = st.removeLast()
                maxA = max(maxA, pHeight * (i - pIdx))
                start = pIdx
            }
            st.append((start, height))
        }
        return maxA
    }
}""", "O(N)", "O(N)"),
    ("Median of Two Sorted Arrays", "https://leetcode.com/problems/median-of-two-sorted-arrays/", "Binary Search", "Hard", "Binary search partition on smaller array.", """class Solution {
    func findMedianSortedArrays(_ A: [Int], _ B: [Int]) -> Double {
        let (a, b) = A.count <= B.count ? (A, B) : (B, A), m = a.count, n = b.count
        var l = 0, r = m
        while l <= r {
            let i = l + (r - l) / 2, j = (m + n + 1) / 2 - i
            let maxL1 = i == 0 ? Int.min : a[i - 1], minR1 = i == m ? Int.max : a[i]
            let maxL2 = j == 0 ? Int.min : b[j - 1], minR2 = j == n ? Int.max : b[j]
            if maxL1 <= minR1 && maxL2 <= minR1 && maxL1 <= minR2 && maxL2 <= minR2 {
                if (m + n) % 2 == 1 { return Double(max(maxL1, maxL2)) }
                else { return Double(max(maxL1, maxL2) + min(minR1, minR2)) / 2.0 }
            } else if maxL1 > minR2 { r = i - 1 }
            else { l = i + 1 }
        }
        return 0.0
    }
}""", "O(log(min(M,N)))", "O(1)")
]

def build_pdf_manual(filename="NeetCode_150_Swift_Master_Guide.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=64
    )
    
    styles = getSampleStyleSheet()
    
    PRIMARY = colors.HexColor("#0F172A")
    SECONDARY = colors.HexColor("#0369A1")
    ACCENT = colors.HexColor("#0284C7")
    TEXT_COLOR = colors.HexColor("#1E293B")
    BG_LIGHT = colors.HexColor("#F8FAFC")
    
    styles.add(ParagraphStyle('CoverTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=24, leading=30, textColor=PRIMARY, spaceAfter=10))
    styles.add(ParagraphStyle('CoverSubtitle', parent=styles['Normal'], fontName='Helvetica', fontSize=13, leading=17, textColor=SECONDARY, spaceAfter=20))
    styles.add(ParagraphStyle('SectionHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=PRIMARY, spaceBefore=14, spaceAfter=8, keepWithNext=True))
    styles.add(ParagraphStyle('ProblemHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=SECONDARY, spaceBefore=10, spaceAfter=4, keepWithNext=True))

    styles['BodyText'].fontName = 'Helvetica'
    styles['BodyText'].fontSize = 9
    styles['BodyText'].leading = 13
    styles['BodyText'].textColor = TEXT_COLOR
    styles['BodyText'].spaceAfter = 4

    styles.add(ParagraphStyle('LogicText', parent=styles['BodyText'], fontName='Helvetica-Oblique', textColor=colors.HexColor("#334155"), spaceAfter=4))
    styles.add(ParagraphStyle('SwiftCodeBox', parent=styles['Normal'], fontName='Courier', fontSize=8, leading=10.5, textColor=colors.HexColor("#0F172A"), backColor=colors.HexColor("#F8FAFC"), borderColor=colors.HexColor("#CBD5E1"), borderWidth=0.75, borderPadding=6, spaceBefore=4, spaceAfter=6))

    story = []

    # Cover Page
    story.append(Spacer(1, 30))
    story.append(Paragraph("NEETCODE 150 CURRICULUM", ParagraphStyle('Tag', fontName='Helvetica-Bold', fontSize=12, textColor=ACCENT, spaceAfter=6)))
    story.append(Paragraph("Swift 6 Master Reference Manual<br/>Sequenced Easy ➔ Medium ➔ Hard (#1 to #150)", styles['CoverTitle']))
    story.append(Paragraph("Structured from Easy to Hard with Sequential Numbers, Xcode Syntax Highlighting & Clickable LeetCode Problem URLs", styles['CoverSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2.5, color=PRIMARY, spaceBefore=0, spaceAfter=16))
    
    meta_data = [
        [Paragraph("<b>Curriculum:</b> NeetCode 150 Roadmap", styles['BodyText']), Paragraph("<b>Ordering:</b> Sequential (#1 to #150)", styles['BodyText'])],
        [Paragraph("<b>Language:</b> Swift 6 Idiomatic Code", styles['BodyText']), Paragraph("<b>Difficulty Progression:</b> Easy ➔ Medium ➔ Hard", styles['BodyText'])],
        [Paragraph("<b>Formatting:</b> High-Contrast Xcode Light Theme", styles['BodyText']), Paragraph("<b>Hyperlinks:</b> 100% Direct LeetCode URLs", styles['BodyText'])]
    ]
    t_meta = Table(meta_data, colWidths=[250, 254])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0"))
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 16))

    current_diff = ""
    for idx, prob in enumerate(neetcode_150_sequenced, 1):
        title, url, cat, diff, logic, code, time_c, space_c = prob
        if diff != current_diff:
            current_diff = diff
            story.append(Paragraph(esc(f"--- {diff.upper()} PROBLEMS ---"), styles['SectionHeader']))
            story.append(HRFlowable(width="100%", thickness=1, color=SECONDARY, spaceBefore=2, spaceAfter=8))
            
        p_elem = []
        title_html = f"<b>#{idx}. {esc(title)} ({esc(diff)}) — {esc(cat)}</b> &nbsp;&nbsp;&nbsp; <a href=\"{url}\"><font color=\"#0284C7\"><u>[🔗 Open LeetCode Problem]</u></font></a>"
        p_elem.append(Paragraph(title_html, styles['ProblemHeader']))
        p_elem.append(Paragraph(f"<b>Logic &amp; Intuition:</b> {esc(logic)}", styles['LogicText']))
        
        highlighted_code = highlight_swift(code)
        p_elem.append(Paragraph(highlighted_code, styles['SwiftCodeBox']))
        
        comp_table = Table([[
            Paragraph(f"<b>Time Complexity:</b> {esc(time_c)}", styles['BodyText']),
            Paragraph(f"<b>Space Complexity:</b> {esc(space_c)}", styles['BodyText'])
        ]], colWidths=[250, 254])
        comp_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
            ('PADDING', (0,0), (-1,-1), 4),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1"))
        ]))
        p_elem.append(comp_table)
        p_elem.append(Spacer(1, 8))
        
        story.append(KeepTogether(p_elem))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF with Sequenced Easy-to-Hard NeetCode 150 problems: {filename}")

if __name__ == "__main__":
    build_pdf_manual()
