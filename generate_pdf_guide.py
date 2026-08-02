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
    """Escapes XML special characters for ReportLab Paragraphs."""
    return html.escape(str(text))

def highlight_swift(code_str):
    """Syntax highlighter for Swift code rendering in ReportLab Paragraphs."""
    keywords = {
        "class", "struct", "func", "var", "let", "guard", "else", "return", "if", "for", "in", "while",
        "static", "private", "public", "nil", "true", "false", "inout", "default", "break", "continue",
        "switch", "case", "import", "dropFirst", "reversed", "enumerated", "append", "min", "max",
        "swapAt", "removeFirst", "removeLast", "filter"
    }
    types = {
        "Int", "String", "Bool", "Character", "ListNode", "TreeNode", "Node", "Set", "Array",
        "TwoSum", "ContainsDuplicate", "BuySellStock", "MaxSubarray", "LongestSubstringWithoutRepeating",
        "ProductExceptSelf", "ValidAnagram", "ValidParentheses", "ReverseLinkedList", "MergeTwoLists",
        "LinkedListCycle", "RemoveNthFromEnd", "MinStack", "BinarySearch", "SearchRotated", "FindMinRotated",
        "KokoEatingBananas", "MergeIntervals", "InsertInterval", "NonOverlappingIntervals", "MaxDepthBinaryTree",
        "InvertBinaryTree", "LevelOrderTraversal", "DiameterBinaryTree", "ValidateBST", "LowestCommonAncestor",
        "KthSmallestBST", "NumberOfIslands", "CloneGraph", "CourseSchedule", "RottingOranges", "PacificAtlantic",
        "GraphValidTree", "ClimbingStairs", "HouseRobber", "CoinChange", "LongestIncreasingSubsequence",
        "WordBreak", "KthLargestElement", "TopKFrequent"
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
            return  # Cover page custom layout
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Header
        self.drawString(54, 750, "WARNER BROS. DISCOVERY — 7-DAY DSA MASTER MANUAL")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(54, 742, 558, 742)
        
        # Footer
        self.setFont("Helvetica", 8)
        self.drawString(54, 36, "Swift 6 | All 40 Solved Problems | Warner Bros. Discovery Prep")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_str)
        self.line(54, 48, 558, 48)
        self.restoreState()

def build_pdf_manual(filename="WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=64
    )
    
    styles = getSampleStyleSheet()
    
    PRIMARY = colors.HexColor("#0A192F")    # Dark Navy
    SECONDARY = colors.HexColor("#1E3A8A")  # Deep Blue
    ACCENT = colors.HexColor("#2563EB")     # Bright Blue
    TEXT_COLOR = colors.HexColor("#1E293B") # Body text
    BG_LIGHT = colors.HexColor("#F8FAFC")   # Table light bg
    
    styles.add(ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=PRIMARY,
        spaceAfter=10
    ))
    
    styles.add(ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=17,
        textColor=SECONDARY,
        spaceAfter=20
    ))
    
    styles.add(ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        'ProblemHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=SECONDARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))

    styles['BodyText'].fontName = 'Helvetica'
    styles['BodyText'].fontSize = 9
    styles['BodyText'].leading = 13
    styles['BodyText'].textColor = TEXT_COLOR
    styles['BodyText'].spaceAfter = 4

    styles.add(ParagraphStyle(
        'LogicText',
        parent=styles['BodyText'],
        fontName='Helvetica-Oblique',
        textColor=colors.HexColor("#334155"),
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        'SwiftCodeBox',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0F172A"),
        backColor=colors.HexColor("#F8FAFC"),
        borderColor=colors.HexColor("#CBD5E1"),
        borderWidth=0.75,
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=6
    ))

    story = []

    # ==================== COVER PAGE ====================
    story.append(Spacer(1, 30))
    story.append(Paragraph("WARNER BROS. DISCOVERY", ParagraphStyle('WBDTag', fontName='Helvetica-Bold', fontSize=12, textColor=ACCENT, spaceAfter=6)))
    story.append(Paragraph("Software Engineering Interview<br/>7-Day DSA Complete Reference Manual", styles['CoverTitle']))
    story.append(Paragraph("40 Solved LeetCode Problems in Swift 6 with Line-by-Line Logic, Xcode Syntax Highlighting & Clickable Problem URLs", styles['CoverSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2.5, color=PRIMARY, spaceBefore=0, spaceAfter=16))
    
    meta_data = [
        [Paragraph("<b>Target Role:</b> Software Engineer (iOS / Core Swift)", styles['BodyText']), Paragraph("<b>Curriculum Length:</b> 7 Days", styles['BodyText'])],
        [Paragraph("<b>Total Solved Programs:</b> 40 Complete Solutions", styles['BodyText']), Paragraph("<b>Language:</b> Swift 6", styles['BodyText'])],
        [Paragraph("<b>Playground Artifact:</b> WBD_7Day_DSAPrep.playground", styles['BodyText']), Paragraph("<b>LeetCode Links:</b> 100% Clickable URLs Included", styles['BodyText'])]
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

    story.append(Paragraph("Curriculum Strategy & Priority Blueprint", styles['SectionHeader']))
    story.append(Paragraph(
        "This master reference manual contains full Swift 6 implementations and detailed algorithmic logic for all 40 core coding interview problems. "
        "Each section provides: (1) <b>Algorithmic Intuition & Logic</b>, (2) <b>Swift Implementation formatted in Xcode Light Theme</b>, (3) <b>Formal Time & Space Complexity Analyses</b>, and (4) <b>Clickable LeetCode Problem URLs</b>.",
        styles['BodyText']
    ))
    story.append(Spacer(1, 10))

    # Priority Tier Table
    prio_data = [
        ["Priority Tier", "Core Topics", "Target Mastery"],
        ["Tier 1 (Critical ⭐⭐⭐⭐⭐)", "Arrays & Hashing, Sliding Window, Trees & BST", "15-20 min O(N) execution"],
        ["Tier 2 (High ⭐⭐⭐⭐)", "Linked Lists, Binary Search, Graphs, Stack", "20 min pattern recognition"],
        ["Tier 3 (Medium ⭐⭐⭐)", "Heap / Priority Queue, Dynamic Programming", "1D DP & Top K patterns"]
    ]
    t_prio = Table(prio_data, colWidths=[120, 210, 174])
    t_prio.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('PADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT])
    ]))
    story.append(t_prio)
    story.append(PageBreak())

    # ==================== ALL 40 PROBLEMS DATA WITH LEETCODE URLS ====================
    all_days = [
        {
            "day": "Day 1",
            "title": "Arrays & Hashing",
            "problems": [
                {
                    "title": "1. Two Sum (Easy)",
                    "url": "https://leetcode.com/problems/two-sum/",
                    "logic": "Use a Hash Map mapping element values to their indices. For each number, compute complement = target - num. If complement exists in map, return indices immediately. Otherwise, store current num in map.",
                    "code": """class TwoSum {
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
}""",
                    "time": "O(N) - Single pass over array of length N",
                    "space": "O(N) - Hash map storing up to N entries"
                },
                {
                    "title": "2. Contains Duplicate (Easy)",
                    "url": "https://leetcode.com/problems/contains-duplicate/",
                    "logic": "Use a Hash Set to track visited elements. As we iterate through the array, check if current element is already present in the set. If yes, duplicate exists. Otherwise, insert element into set.",
                    "code": """class ContainsDuplicate {
    static func solve(_ nums: [Int]) -> Bool {
        var seen = Set<Int>()
        for num in nums {
            if seen.contains(num) { return true }
            seen.insert(num)
        }
        return false
    }
}""",
                    "time": "O(N) - Single pass over N elements",
                    "space": "O(N) - Space for Set storing unique values"
                },
                {
                    "title": "3. Best Time to Buy and Sell Stock (Easy)",
                    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                    "logic": "Maintain a running minimum purchase price minPrice. Iterate through stock prices: compute potential profit price - minPrice and update global maxProfit. Update minPrice whenever a lower price is found.",
                    "code": """class BuySellStock {
    static func solve(_ prices: [Int]) -> Int {
        var minPrice = Int.max, maxProfit = 0
        for price in prices {
            minPrice = min(minPrice, price)
            maxProfit = max(maxProfit, price - minPrice)
        }
        return maxProfit
    }
}""",
                    "time": "O(N) - Single linear pass",
                    "space": "O(1) - Constant auxiliary space"
                },
                {
                    "title": "4. Maximum Subarray (Medium - Kadane's Algorithm)",
                    "url": "https://leetcode.com/problems/maximum-subarray/",
                    "logic": "Kadane's algorithm: At each element, decide whether to append element to existing running subarray sum (currentSum + num) or start a fresh subarray from num. Track global maximum maxSoFar across all steps.",
                    "code": """class MaxSubarray {
    static func solve(_ nums: [Int]) -> Int {
        guard !nums.isEmpty else { return 0 }
        var maxSoFar = nums[0], currentSum = nums[0]
        for num in nums.dropFirst() {
            currentSum = max(num, currentSum + num)
            maxSoFar = max(maxSoFar, currentSum)
        }
        return maxSoFar
    }
}""",
                    "time": "O(N) - Linear pass through array",
                    "space": "O(1) - Constant memory variables"
                },
                {
                    "title": "5. Longest Substring Without Repeating Characters (Medium)",
                    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                    "logic": "Sliding window with two pointers left and right. Maintain a hash map of character -> last seen index. When a duplicate character is encountered inside window (lastSeen >= left), jump left past lastSeen.",
                    "code": """class LongestSubstringWithoutRepeating {
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
}""",
                    "time": "O(N) - Linear sweep of string length N",
                    "space": "O(min(N, M)) - Space for character map"
                },
                {
                    "title": "6. Product of Array Except Self (Medium)",
                    "url": "https://leetcode.com/problems/product-of-array-except-self/",
                    "logic": "Two prefix passes without division. Pass 1: compute prefix products from left to right into result array. Pass 2: compute suffix products from right to left while multiplying directly into result array.",
                    "code": """class ProductExceptSelf {
    static func solve(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var result = Array(repeating: 1, count: n)
        var leftProd = 1
        for i in 0..<n {
            result[i] = leftProd; leftProd *= nums[i]
        }
        var rightProd = 1
        for i in (0..<n).reversed() {
            result[i] *= rightProd; rightProd *= nums[i]
        }
        return result
    }
}""",
                    "time": "O(N) - Two linear passes",
                    "space": "O(1) - Output array does not count as extra space"
                }
            ]
        },
        {
            "day": "Day 2",
            "title": "Strings, Linked Lists & Stack",
            "problems": [
                {
                    "title": "7. Valid Anagram (Easy)",
                    "url": "https://leetcode.com/problems/valid-anagram/",
                    "logic": "Count character occurrences in string s using a hash map or frequency array. Decrement counts while iterating through string t. Return false if count drops below 0 or lengths differ.",
                    "code": """class ValidAnagram {
    static func solve(_ s: String, _ t: String) -> Bool {
        guard s.count == t.count else { return false }
        var counts = [Character: Int]()
        for char in s { counts[char, default: 0] += 1 }
        for char in t {
            guard let count = counts[char], count > 0 else { return false }
            counts[char] = count - 1
        }
        return true
    }
}""",
                    "time": "O(N) - Linear pass over both strings",
                    "space": "O(1) - Fixed 26-letter frequency table"
                },
                {
                    "title": "8. Valid Parentheses (Easy)",
                    "url": "https://leetcode.com/problems/valid-parentheses/",
                    "logic": "Push opening brackets onto stack. For closing brackets, check if stack is non-empty and matching opening bracket is at stack top. If valid, pop top; otherwise return false. Check stack is empty at end.",
                    "code": """class ValidParentheses {
    static func solve(_ s: String) -> Bool {
        var stack = [Character]()
        let map: [Character: Character] = [")": "(", "]": "[", "}": "{"]
        for char in s {
            if let expected = map[char] {
                if stack.isEmpty || stack.removeLast() != expected { return false }
            } else {
                stack.append(char)
            }
        }
        return stack.isEmpty
    }
}""",
                    "time": "O(N) - Single pass over string length N",
                    "space": "O(N) - Stack storing up to N brackets"
                },
                {
                    "title": "9. Reverse Linked List (Easy)",
                    "url": "https://leetcode.com/problems/reverse-linked-list/",
                    "logic": "Iterative 3-pointer strategy: maintain prev (starts nil) and curr (starts head). Save nextTemp = curr.next, set curr.next = prev, then advance prev = curr and curr = nextTemp. Return prev.",
                    "code": """class ReverseLinkedList {
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
}""",
                    "time": "O(N) - Single pass over linked list nodes",
                    "space": "O(1) - Constant auxiliary pointer space"
                },
                {
                    "title": "10. Merge Two Sorted Lists (Easy)",
                    "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
                    "logic": "Use dummy head node with pointer tail. Compare values p1.val vs p2.val, attach smaller node to tail.next, and advance that list pointer. Attach remaining non-nil list at end.",
                    "code": """class MergeTwoLists {
    static func solve(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
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
}""",
                    "time": "O(N + M) - Proportional to nodes in both lists",
                    "space": "O(1) - Constant extra pointers"
                },
                {
                    "title": "11. Linked List Cycle (Easy - Floyd's Tortoise and Hare)",
                    "url": "https://leetcode.com/problems/linked-list-cycle/",
                    "logic": "Fast & Slow pointer pattern. Advance slow pointer by 1 step and fast pointer by 2 steps. If a cycle exists, fast will eventually meet slow (slow === fast). If fast hits nil, no cycle exists.",
                    "code": """class LinkedListCycle {
    static func hasCycle(_ head: ListNode?) -> Bool {
        var slow = head, fast = head
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
            if slow === fast { return true }
        }
        return false
    }
}""",
                    "time": "O(N) - Fast pointer travels at most 2N steps",
                    "space": "O(1) - Two extra pointers"
                },
                {
                    "title": "12. Remove Nth Node From End of List (Medium)",
                    "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                    "logic": "Two pointers first and second initialized at dummy node. Advance first by n + 1 steps to create a gap of n nodes between them. Move both pointers together until first reaches nil. Unlink node.",
                    "code": """class RemoveNthFromEnd {
    static func solve(_ head: ListNode?, _ n: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var first: ListNode? = dummy, second: ListNode? = dummy
        for _ in 0...n { first = first?.next }
        while first != nil {
            first = first?.next
            second = second?.next
        }
        second?.next = second?.next?.next
        return dummy.next
    }
}""",
                    "time": "O(N) - Single pass over list",
                    "space": "O(1) - Constant pointer space"
                },
                {
                    "title": "13. Min Stack (Medium)",
                    "url": "https://leetcode.com/problems/min-stack/",
                    "logic": "Maintain two parallel stacks: mainStack for storing values, and minStack for storing the minimum value present up to that depth. On push, push min(val, minStack.last) onto minStack.",
                    "code": """class MinStack {
    private var mainStack = [Int](), minStack = [Int]()
    func push(_ val: Int) {
        mainStack.append(val)
        let curMin = minStack.last ?? Int.max
        minStack.append(min(val, curMin))
    }
    func pop() { _ = mainStack.popLast(); _ = minStack.popLast() }
    func top() -> Int { return mainStack.last ?? -1 }
    func getMin() -> Int { return minStack.last ?? -1 }
}""",
                    "time": "O(1) - Constant time for push, pop, top, getMin",
                    "space": "O(N) - Dual stacks storing N values"
                }
            ]
        },
        {
            "day": "Day 3",
            "title": "Binary Search, Sorting & Intervals",
            "problems": [
                {
                    "title": "14. Binary Search (Easy)",
                    "url": "https://leetcode.com/problems/binary-search/",
                    "logic": "Maintain left and right pointers. Calculate mid = left + (right - left) / 2 to avoid integer overflow. Compare nums[mid] with target to halve search range at each step.",
                    "code": """class BinarySearch {
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
}""",
                    "time": "O(log N) - Halves search space per step",
                    "space": "O(1) - Iterative search"
                },
                {
                    "title": "15. Search in Rotated Sorted Array (Medium)",
                    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
                    "logic": "Binary search on rotated array: At mid, check if left half nums[left...mid] is sorted (nums[left] <= nums[mid]). If yes, check if target lies in left range; else search right half.",
                    "code": """class SearchRotated {
    static func solve(_ nums: [Int], _ target: Int) -> Int {
        var left = 0, right = nums.count - 1
        while left <= right {
            let mid = left + (right - left) / 2
            if nums[mid] == target { return mid }
            if nums[left] <= nums[mid] {
                if nums[left] <= target && target < nums[mid] { right = mid - 1 }
                else { left = mid + 1 }
            } else {
                if nums[mid] < target && target <= nums[right] { left = mid + 1 }
                else { right = mid - 1 }
            }
        }
        return -1
    }
}""",
                    "time": "O(log N) - Modified binary search",
                    "space": "O(1) - Constant variables"
                },
                {
                    "title": "16. Find Minimum in Rotated Sorted Array (Medium)",
                    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
                    "logic": "Compare nums[mid] with right boundary nums[right]. If nums[mid] > nums[right], minimum lies strictly in right half (left = mid + 1). Otherwise minimum is at mid or in left half (right = mid).",
                    "code": """class FindMinRotated {
    static func solve(_ nums: [Int]) -> Int {
        var left = 0, right = nums.count - 1
        while left < right {
            let mid = left + (right - left) / 2
            if nums[mid] > nums[right] { left = mid + 1 }
            else { right = mid }
        }
        return nums[left]
    }
}""",
                    "time": "O(log N) - Logarithmic search",
                    "space": "O(1) - Constant extra space"
                },
                {
                    "title": "17. Koko Eating Bananas (Medium)",
                    "url": "https://leetcode.com/problems/koko-eating-bananas/",
                    "logic": "Binary search on eating speed k in range 1...maxPile. For candidate speed k, compute total hours spent using ceiling division (pile + k - 1) / k. If hours <= h, try smaller speed.",
                    "code": """class KokoEatingBananas {
    static func minEatingSpeed(_ piles: [Int], _ h: Int) -> Int {
        var left = 1, right = piles.max() ?? 1, result = right
        while left <= right {
            let k = left + (right - left) / 2
            var hours = 0
            for pile in piles { hours += (pile + k - 1) / k }
            if hours <= h { result = k; right = k - 1 }
            else { left = k + 1 }
        }
        return result
    }
}""",
                    "time": "O(N log(MaxPile)) - N piles * binary search on max pile",
                    "space": "O(1) - Constant auxiliary space"
                },
                {
                    "title": "18. Merge Intervals (Medium)",
                    "url": "https://leetcode.com/problems/merge-intervals/",
                    "logic": "Sort intervals by start times start_i. Maintain currentInterval. Iterate sorted list: if next.start <= current.end, merge by setting current.end = max(current.end, next.end). Else push current and update.",
                    "code": """class MergeIntervals {
    static func solve(_ intervals: [[Int]]) -> [[Int]] {
        guard intervals.count > 1 else { return intervals }
        let sorted = intervals.sorted { $0[0] < $1[0] }
        var res = [[Int]](), curr = sorted[0]
        for next in sorted.dropFirst() {
            if next[0] <= curr[1] { curr[1] = max(curr[1], next[1]) }
            else { res.append(curr); curr = next }
        }
        res.append(curr)
        return res
    }
}""",
                    "time": "O(N log N) - Sorting intervals takes N log N",
                    "space": "O(N) - Storage for merged result"
                },
                {
                    "title": "19. Insert Interval (Medium)",
                    "url": "https://leetcode.com/problems/insert-interval/",
                    "logic": "3 Phase processing: (1) Add all intervals ending before newInterval.start. (2) Merge all overlapping intervals with newInterval by expanding bounds. (3) Add all remaining intervals starting after.",
                    "code": """class InsertInterval {
    static func solve(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
        var res = [[Int]](), newInt = newInterval, i = 0, n = intervals.count
        while i < n && intervals[i][1] < newInt[0] { res.append(intervals[i]); i += 1 }
        while i < n && intervals[i][0] <= newInt[1] {
            newInt[0] = min(newInt[0], intervals[i][0])
            newInt[1] = max(newInt[1], intervals[i][1])
            i += 1
        }
        res.append(newInt)
        while i < n { res.append(intervals[i]); i += 1 }
        return res
    }
}""",
                    "time": "O(N) - Single linear pass over sorted intervals",
                    "space": "O(N) - Output array space"
                },
                {
                    "title": "20. Non-Overlapping Intervals (Medium)",
                    "url": "https://leetcode.com/problems/non-overlapping-intervals/",
                    "logic": "Greedy choice: Sort intervals by end times end_i. Maintain lastEnd. When an overlapping interval is found (interval.start < lastEnd), increment removal count. Otherwise update lastEnd = interval.end.",
                    "code": """class NonOverlappingIntervals {
    static func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        guard !intervals.isEmpty else { return 0 }
        let sorted = intervals.sorted { $0[1] < $1[1] }
        var removals = 0, lastEnd = sorted[0][1]
        for interval in sorted.dropFirst() {
            if interval[0] < lastEnd { removals += 1 }
            else { lastEnd = interval[1] }
        }
        return removals
    }
}""",
                    "time": "O(N log N) - Sorting intervals",
                    "space": "O(1) - Constant variables"
                }
            ]
        },
        {
            "day": "Day 4",
            "title": "Trees & Binary Search Trees",
            "problems": [
                {
                    "title": "21. Maximum Depth of Binary Tree (Easy)",
                    "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
                    "logic": "Recursion base case: nil node has depth 0. For non-nil node, depth is 1 + max(depth(left), depth(right)). Postorder DFS traversal.",
                    "code": """class MaxDepthBinaryTree {
    static func maxDepth(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + max(maxDepth(root.left), maxDepth(root.right))
    }
}""",
                    "time": "O(N) - Visits each tree node once",
                    "space": "O(H) - Recursion call stack proportional to height H"
                },
                {
                    "title": "22. Invert Binary Tree (Easy)",
                    "url": "https://leetcode.com/problems/invert-binary-tree/",
                    "logic": "Recursively swap left and right children: save root.left, set root.left = invertTree(root.right) and root.right = invertTree(temp). Return root.",
                    "code": """class InvertBinaryTree {
    static func invertTree(_ root: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }
        let temp = root.left
        root.left = invertTree(root.right)
        root.right = invertTree(temp)
        return root
    }
}""",
                    "time": "O(N) - Visits all nodes",
                    "space": "O(H) - Call stack space"
                },
                {
                    "title": "23. Binary Tree Level Order Traversal (Medium)",
                    "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                    "logic": "BFS Queue traversal. Process level by level: snapshot current queue.count, dequeue nodes of current level into level array, and enqueue non-nil left and right children.",
                    "code": """class LevelOrderTraversal {
    static func solve(_ root: TreeNode?) -> [[Int]] {
        guard let root = root else { return [] }
        var res = [[Int]](), queue = [root]
        while !queue.isEmpty {
            let levelSize = queue.count
            var level = [Int]()
            for _ in 0..<levelSize {
                let node = queue.removeFirst()
                level.append(node.val)
                if let l = node.left { queue.append(l) }
                if let r = node.right { queue.append(r) }
            }
            res.append(level)
        }
        return res
    }
}""",
                    "time": "O(N) - Dequeues every node once",
                    "space": "O(N) - Queue holds max nodes at tree level"
                },
                {
                    "title": "24. Diameter of Binary Tree (Easy)",
                    "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
                    "logic": "At each node, the longest path passing through it is leftDepth + rightDepth. Maintain a global maxDiameter. Recursive depth helper returns 1 + max(leftDepth, rightDepth).",
                    "code": """class DiameterBinaryTree {
    static func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        var maxDia = 0
        func depth(_ node: TreeNode?) -> Int {
            guard let node = node else { return 0 }
            let l = depth(node.left), r = depth(node.right)
            maxDia = max(maxDia, l + r)
            return 1 + max(l, r)
        }
        _ = depth(root)
        return maxDia
    }
}""",
                    "time": "O(N) - Single pass over tree",
                    "space": "O(H) - Recursion depth H"
                },
                {
                    "title": "25. Validate Binary Search Tree (Medium)",
                    "url": "https://leetcode.com/problems/validate-binary-search-tree/",
                    "logic": "Recursive bound validation: pass minVal and maxVal down recursive calls. Left child must satisfy val < parent.val, right child must satisfy val > parent.val.",
                    "code": """class ValidateBST {
    static func isValidBST(_ root: TreeNode?) -> Bool { return helper(root, nil, nil) }
    private static func helper(_ node: TreeNode?, _ min: Int?, _ max: Int?) -> Bool {
        guard let node = node else { return true }
        if let min = min, node.val <= min { return false }
        if let max = max, node.val >= max { return false }
        return helper(node.left, min, node.val) && helper(node.right, node.val, max)
    }
}""",
                    "time": "O(N) - Visits each node once",
                    "space": "O(H) - Call stack depth H"
                },
                {
                    "title": "26. Lowest Common Ancestor (Medium)",
                    "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
                    "logic": "Recursive bottom-up search: if root is nil, p, or q, return root. Recurse left and right subtrees. If both left and right return non-nil, root is the LCA. Otherwise return non-nil branch.",
                    "code": """class LowestCommonAncestor {
    static func solve(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        if root == nil || root === p || root === q { return root }
        let left = solve(root?.left, p, q), right = solve(root?.right, p, q)
        if left != nil && right != nil { return root }
        return left != nil ? left : right
    }
}""",
                    "time": "O(N) - Worst case visits all nodes",
                    "space": "O(H) - Call stack depth"
                },
                {
                    "title": "27. Kth Smallest Element in a BST (Medium)",
                    "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
                    "logic": "Iterative Inorder traversal (Left -> Node -> Right) using a stack. Nodes are popped in strictly ascending order. Increment counter on pop; when counter == k, return node value.",
                    "code": """class KthSmallestBST {
    static func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var stack = [TreeNode](), curr = root, count = 0
        while curr != nil || !stack.isEmpty {
            while let node = curr { stack.append(node); curr = node.left }
            let node = stack.removeLast()
            count += 1
            if count == k { return node.val }
            curr = node.right
        }
        return -1
    }
}""",
                    "time": "O(H + K) - Traverses to left leaf and pops K nodes",
                    "space": "O(H) - Stack depth H"
                }
            ]
        },
        {
            "day": "Day 5",
            "title": "Graphs",
            "problems": [
                {
                    "title": "28. Number of Islands (Medium)",
                    "url": "https://leetcode.com/problems/number-of-islands/",
                    "logic": "Iterate 2D grid cell by cell. When a land cell '1' is found, increment island counter and launch DFS to sink all connected land cells by mutating them to '0'.",
                    "code": """class NumberOfIslands {
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
    private static func dfs(_ g: inout [[Character]], _ r: Int, _ c: Int, _ R: Int, _ C: Int) {
        if r < 0 || c < 0 || r >= R || c >= C || g[r][c] == "0" { return }
        g[r][c] = "0"
        dfs(&g, r+1, c, R, C); dfs(&g, r-1, c, R, C)
        dfs(&g, r, c+1, R, C); dfs(&g, r, c-1, R, C)
    }
}""",
                    "time": "O(M * N) - Every grid cell visited at most a constant number of times",
                    "space": "O(M * N) - Worst case recursion depth for all land cells"
                },
                {
                    "title": "29. Clone Graph (Medium)",
                    "url": "https://leetcode.com/problems/clone-graph/",
                    "logic": "Deep copy undirected graph using DFS and a visited dictionary mapping original node value -> cloned Node. For each neighbor of current node, attach recursively cloned neighbor.",
                    "code": """class CloneGraph {
    static func clone(_ node: Node?) -> Node? {
        guard let node = node else { return nil }
        var visited = [Int: Node]()
        func dfs(_ curr: Node) -> Node {
            if let cloned = visited[curr.val] { return cloned }
            let copy = Node(curr.val)
            visited[curr.val] = copy
            for n in curr.neighbors { copy.neighbors.append(dfs(n)) }
            return copy
        }
        return dfs(node)
    }
}""",
                    "time": "O(V + E) - Visits all vertices V and edges E",
                    "space": "O(V) - Visited dictionary storing V nodes"
                },
                {
                    "title": "30. Course Schedule (Medium - Topological Sort)",
                    "url": "https://leetcode.com/problems/course-schedule/",
                    "logic": "Kahn's Algorithm BFS: Build adjacency list and in-degree count for each course. Enqueue all courses with in-degree 0. Dequeue course, increment processed count, and decrement in-degree of neighbors.",
                    "code": """class CourseSchedule {
    static func canFinish(_ numCourses: Int, _ pre: [[Int]]) -> Bool {
        var inDeg = Array(repeating: 0, count: numCourses), adj = [Int: [Int]]()
        for p in pre { adj[p[1], default: []].append(p[0]); inDeg[p[0]] += 1 }
        var q = (0..<numCourses).filter { inDeg[$0] == 0 }, count = 0
        while !q.isEmpty {
            let curr = q.removeFirst(); count += 1
            for n in adj[curr] ?? [] {
                inDeg[n] -= 1
                if inDeg[n] == 0 { q.append(n) }
            }
        }
        return count == numCourses
    }
}""",
                    "time": "O(V + E) - Processing nodes and edges",
                    "space": "O(V + E) - Adjacency list and in-degree table"
                },
                {
                    "title": "31. Rotting Oranges (Medium - Multi-Source BFS)",
                    "url": "https://leetcode.com/problems/rotting-oranges/",
                    "logic": "Multi-Source BFS: Enqueue all rotten oranges 2 initially and count fresh oranges 1. Process queue level by level (1 minute step). Rot adjacent fresh oranges and enqueue them.",
                    "code": """class RottingOranges {
    static func orangesRotting(_ grid: [[Int]]) -> Int {
        var g = grid, R = g.count, C = g[0].count, q = [(Int, Int)](), fresh = 0
        for r in 0..<R {
            for c in 0..<C {
                if g[r][c] == 2 { q.append((r, c)) }
                else if g[r][c] == 1 { fresh += 1 }
            }
        }
        if fresh == 0 { return 0 }
        var mins = 0, dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        while !q.isEmpty && fresh > 0 {
            mins += 1
            for _ in 0..<q.count {
                let (r, c) = q.removeFirst()
                for (dr, dc) in dirs {
                    let nr = r + dr, nc = c + dc
                    if nr>=0 && nc>=0 && nr<R && nc<C && g[nr][nc] == 1 {
                        g[nr][nc] = 2; fresh -= 1; q.append((nr, nc))
                    }
                }
            }
        }
        return fresh == 0 ? mins : -1
    }
}""",
                    "time": "O(M * N) - Every cell visited in BFS",
                    "space": "O(M * N) - Queue space for grid cells"
                },
                {
                    "title": "32. Pacific Atlantic Water Flow (Medium)",
                    "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
                    "logic": "Reverse ocean border DFS: Start DFS from Pacific borders (top/left) and Atlantic borders (bottom/right). Water flows uphill (nextHeight >= currHeight). Result cells are reachable by both oceans.",
                    "code": """class PacificAtlantic {
    static func solve(_ heights: [[Int]]) -> [[Int]] {
        guard !heights.isEmpty else { return [] }
        let R = heights.count, C = heights[0].count
        var pac = Array(repeating: Array(repeating: false, count: C), count: R)
        var atl = Array(repeating: Array(repeating: false, count: C), count: R)
        func dfs(_ r: Int, _ c: Int, _ vis: inout [[Bool]], _ prev: Int) {
            if r<0 || c<0 || r>=R || c>=C || vis[r][c] || heights[r][c] < prev { return }
            vis[r][c] = true
            dfs(r+1,c,&vis,heights[r][c]); dfs(r-1,c,&vis,heights[r][c])
            dfs(r,c+1,&vis,heights[r][c]); dfs(r,c-1,&vis,heights[r][c])
        }
        for c in 0..<C { dfs(0, c, &pac, heights[0][c]); dfs(R-1, c, &atl, heights[R-1][c]) }
        for r in 0..<R { dfs(r, 0, &pac, heights[r][0]); dfs(r, C-1, &atl, heights[r][C-1]) }
        var res = [[Int]]()
        for r in 0..<R { for c in 0..<C { if pac[r][c] && atl[r][c] { res.append([r, c]) } } }
        return res
    }
}""",
                    "time": "O(M * N) - DFS from ocean borders",
                    "space": "O(M * N) - Matrix for ocean visited flags"
                },
                {
                    "title": "33. Graph Valid Tree (Medium)",
                    "url": "https://leetcode.com/problems/graph-valid-tree/",
                    "logic": "A graph of n nodes is a valid tree iff: (1) edges.count == n - 1, and (2) it is fully connected with no cycles (DFS starting from node 0 visits all n nodes without visiting parent).",
                    "code": """class GraphValidTree {
    static func validTree(_ n: Int, _ edges: [[Int]]) -> Bool {
        if edges.count != n - 1 { return false }
        var adj = [Int: [Int]]()
        for e in edges {
            adj[e[0], default: []].append(e[1]); adj[e[1], default: []].append(e[0])
        }
        var visited = Set<Int>()
        func dfs(_ curr: Int, _ parent: Int) -> Bool {
            if visited.contains(curr) { return false }
            visited.insert(curr)
            for neighbor in adj[curr] ?? [] {
                if neighbor == parent { continue }
                if !dfs(neighbor, curr) { return false }
            }
            return true
        }
        return dfs(0, -1) && visited.count == n
    }
}""",
                    "time": "O(V + E) - DFS graph traversal",
                    "space": "O(V + E) - Adjacency list + visited set"
                }
            ]
        },
        {
            "day": "Day 6",
            "title": "Dynamic Programming & Heap",
            "problems": [
                {
                    "title": "34. Climbing Stairs (Easy)",
                    "url": "https://leetcode.com/problems/climbing-stairs/",
                    "logic": "Fibonacci DP transition: dp[i] = dp[i-1] + dp[i-2]. Space optimized to two rolling variables first and second representing previous step combinations.",
                    "code": """class ClimbingStairs {
    static func climbStairs(_ n: Int) -> Int {
        if n <= 2 { return n }
        var first = 1, second = 2
        for _ in 3...n {
            let third = first + second
            first = second; second = third
        }
        return second
    }
}""",
                    "time": "O(N) - Linear iteration up to stair N",
                    "space": "O(1) - Constant variables"
                },
                {
                    "title": "35. House Robber (Medium)",
                    "url": "https://leetcode.com/problems/house-robber/",
                    "logic": "1D DP state: At house i, max stolen money is max(prev1, prev2 + num). Maintain prev1 (max up to i-1) and prev2 (max up to i-2) across iteration.",
                    "code": """class HouseRobber {
    static func rob(_ nums: [Int]) -> Int {
        var prev1 = 0, prev2 = 0
        for num in nums {
            let current = max(prev1, prev2 + num)
            prev2 = prev1; prev1 = current
        }
        return prev1
    }
}""",
                    "time": "O(N) - Single pass over houses",
                    "space": "O(1) - Rolling variables"
                },
                {
                    "title": "36. Coin Change (Medium)",
                    "url": "https://leetcode.com/problems/coin-change/",
                    "logic": "Unbounded knapsack bottom-up DP table dp of size amount + 1 initialized to amount + 1. Base case dp[0] = 0. For i in 1...amount, dp[i] = min(dp[i], dp[i - coin] + 1).",
                    "code": """class CoinChange {
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
}""",
                    "time": "O(Amount * Coins.count) - Inner loop over coin types",
                    "space": "O(Amount) - 1D DP table array"
                },
                {
                    "title": "37. Longest Increasing Subsequence (Medium - Patience Sorting)",
                    "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
                    "logic": "Maintain tails array storing smallest tail value of all increasing subsequences of length i+1. Binary search position of num in tails: replace element or append.",
                    "code": """class LongestIncreasingSubsequence {
    static func lengthOfLIS(_ nums: [Int]) -> Int {
        var tails = [Int]()
        for num in nums {
            var left = 0, right = tails.count
            while left < right {
                let mid = left + (right - left) / 2
                if tails[mid] < num { left = mid + 1 }
                else { right = mid }
            }
            if left == tails.count { tails.append(num) }
            else { tails[left] = num }
        }
        return tails.count
    }
}""",
                    "time": "O(N log N) - Binary search inside linear loop",
                    "space": "O(N) - Space for tails array"
                },
                {
                    "title": "38. Word Break (Medium)",
                    "url": "https://leetcode.com/problems/word-break/",
                    "logic": "Boolean DP table dp[i] representing if string prefix s[0..<i] can be segmented. Base case dp[0] = true. For j from 0 to i-1, if dp[j] && wordSet.contains(s[j..<i]), set dp[i] = true.",
                    "code": """class WordBreak {
    static func solve(_ s: String, _ wordDict: [String]) -> Bool {
        let dict = Set(wordDict), n = s.count, chars = Array(s)
        var dp = Array(repeating: false, count: n + 1)
        dp[0] = true
        for i in 1...n {
            for j in 0..<i {
                if dp[j] && dict.contains(String(chars[j..<i])) {
                    dp[i] = true; break
                }
            }
        }
        return dp[n]
    }
}""",
                    "time": "O(N^2 * L) - Substring slice and set check",
                    "space": "O(N + D) - DP array and dictionary hash set"
                },
                {
                    "title": "39. Kth Largest Element in an Array (Medium - QuickSelect)",
                    "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                    "logic": "QuickSelect algorithm: Partition array around pivot element. If pivot index equals target rank (count - k), return pivot value. Otherwise recurse into left or right partition.",
                    "code": """class KthLargestElement {
    static func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
        var copy = nums, target = copy.count - k
        func quickSelect(_ l: Int, _ r: Int) -> Int {
            if l == r { return copy[l] }
            let p = partition(&copy, l, r)
            if p == target { return copy[p] }
            else if p < target { return quickSelect(p + 1, r) }
            else { return quickSelect(l, p - 1) }
        }
        return quickSelect(0, copy.count - 1)
    }
    private static func partition(_ nums: inout [Int], _ l: Int, _ r: Int) -> Int {
        let pivot = nums[r]; var i = l
        for j in l..<r {
            if nums[j] <= pivot { nums.swapAt(i, j); i += 1 }
        }
        nums.swapAt(i, r)
        return i
    }
}""",
                    "time": "O(N) Average, O(N^2) Worst Case - QuickSelect expected time",
                    "space": "O(1) - In-place partition"
                },
                {
                    "title": "40. Top K Frequent Elements (Medium - Bucket Sort)",
                    "url": "https://leetcode.com/problems/top-k-frequent-elements/",
                    "logic": "Count frequency of each number into hash map. Create bucket array buckets where index represents frequency count. Iterate buckets backwards from highest frequency to collect top k elements.",
                    "code": """class TopKFrequent {
    static func solve(_ nums: [Int], _ k: Int) -> [Int] {
        var counts = [Int: Int]()
        for num in nums { counts[num, default: 0] += 1 }
        var buckets = Array(repeating: [Int](), count: nums.count + 1)
        for (num, freq) in counts { buckets[freq].append(num) }
        var res = [Int]()
        for i in (0...nums.count).reversed() {
            for num in buckets[i] {
                res.append(num); if res.count == k { return res }
            }
        }
        return res
    }
}""",
                    "time": "O(N) - Bucket sort linear sweep",
                    "space": "O(N) - Hash map and bucket storage"
                }
            ]
        }
    ]

    for d in all_days:
        story.append(Paragraph(esc(f"{d['day']}: {d['title']}"), styles['SectionHeader']))
        story.append(HRFlowable(width="100%", thickness=1, color=SECONDARY, spaceBefore=2, spaceAfter=8))
        
        for p in d['problems']:
            p_elem = []
            title_html = f"<b>{esc(p['title'])}</b> &nbsp;&nbsp;&nbsp; <a href=\"{p['url']}\"><font color=\"#2563EB\"><u>[🔗 Open LeetCode Problem]</u></font></a>"
            p_elem.append(Paragraph(title_html, styles['ProblemHeader']))
            p_elem.append(Paragraph(f"<b>Logic &amp; Intuition:</b> {esc(p['logic'])}", styles['LogicText']))
            
            highlighted_code = highlight_swift(p['code'])
            p_elem.append(Paragraph(highlighted_code, styles['SwiftCodeBox']))
            
            comp_table = Table([[
                Paragraph(f"<b>Time Complexity:</b> {esc(p['time'])}", styles['BodyText']),
                Paragraph(f"<b>Space Complexity:</b> {esc(p['space'])}", styles['BodyText'])
            ]], colWidths=[250, 254])
            comp_table.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
                ('PADDING', (0,0), (-1,-1), 4),
                ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1"))
            ]))
            p_elem.append(comp_table)
            p_elem.append(Spacer(1, 8))
            
            story.append(KeepTogether(p_elem))
            
        story.append(PageBreak())

    # ==================== DAY 7: MOCK INTERVIEW & CHEAT SHEET ====================
    story.append(Paragraph("Day 7: Mock Interview &amp; Final Revision Guide", styles['SectionHeader']))
    story.append(Paragraph(
        "Day 7 is dedicated to consolidating all learned patterns and performing timed mock interview simulations. "
        "Do not learn new topics on Day 7. Focus on clean communication, Big-O mastery, and edge-case validation.",
        styles['BodyText']
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph("🎯 7-Step Interview Response Framework", styles['ProblemHeader']))
    steps = [
        "1. <b>Clarify Requirements:</b> Confirm array length, range of integers, duplicates, nulls, and expected return types.",
        "2. <b>State Naive / Brute Force Solution:</b> State the naive approach and analyze its Time &amp; Space complexity out loud.",
        "3. <b>Identify Optimal Pattern:</b> Transition to the optimal pattern (e.g. Hash Map, Two Pointers, BFS, DP).",
        "4. <b>Discuss Time vs Space Trade-offs:</b> Explain why spending memory improves time (e.g. O(N) space map reduces time to O(N)).",
        "5. <b>Write Clean Swift Code:</b> Write idiomatic Swift with type inference, clean optionals, and guard statements.",
        "6. <b>Dry Run with Sample Inputs:</b> Walk through your code line-by-line using a short test array.",
        "7. <b>Test Edge Cases:</b> Test empty input, single element, negative numbers, duplicates, and max boundaries."
    ]
    for step in steps:
        story.append(Paragraph(step, styles['BodyText']))
    story.append(Spacer(1, 10))

    story.append(Paragraph("📊 Master Data Structure Complexity Reference Table", styles['ProblemHeader']))
    ds_matrix = [
        ["Data Structure / Algorithm", "Access", "Search", "Insertion / Deletion", "Space Complexity"],
        ["Array / Contiguous Buffer", "O(1)", "O(N)", "O(N)", "O(N)"],
        ["Hash Map / Set", "N/A", "O(1) Avg", "O(1) Avg", "O(N)"],
        ["Singly Linked List", "O(N)", "O(N)", "O(1) at Head", "O(N)"],
        ["Binary Search Tree (BST)", "O(H)", "O(H)", "O(H)", "O(N)"],
        ["Min / Max Heap", "O(1) Top", "O(N)", "O(log N) Push/Pop", "O(N)"],
        ["Graph BFS / DFS", "N/A", "O(V + E)", "O(V + E)", "O(V + E)"],
        ["Binary Search", "N/A", "O(log N)", "N/A", "O(1) Iterative"]
    ]
    t_ds = Table(ds_matrix, colWidths=[150, 60, 74, 110, 110])
    t_ds.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('PADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT])
    ]))
    story.append(t_ds)
    story.append(Spacer(1, 14))

    story.append(Paragraph("🏆 Final Checklist Before Interview", styles['ProblemHeader']))
    story.append(Paragraph("✔️ Ensure 100% test assertions pass in <code>WBD_7Day_DSAPrep.playground</code>.", styles['BodyText']))
    story.append(Paragraph("✔️ Memorize binary search templates (left &lt;= right vs left &lt; right).", styles['BodyText']))
    story.append(Paragraph("✔️ Practice speaking out loud while coding in Swift.", styles['BodyText']))
    story.append(Paragraph("✔️ Stay calm, communicate clearly, and enjoy the problem-solving process!", styles['BodyText']))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {filename}")

if __name__ == "__main__":
    build_pdf_manual()
