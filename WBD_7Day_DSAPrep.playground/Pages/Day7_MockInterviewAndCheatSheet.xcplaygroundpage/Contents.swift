//: [Previous](@previous)
/*:
 # Day 7 — Mock Interview & Revision
 **Core Focus:** Problem Solving Protocol, Big-O Complexity Matrix, Pattern Decision Trees, Timed Practice
 
 ---
 ## 🎯 7-Step Interview Response Framework
 1. **Clarify Requirements:** Confirm bounds, memory constraints, data types, nulls, duplicates, and expected outputs.
 2. **Brute Force First:** State the naive solution and its Time/Space complexity out loud.
 3. **Identify Optimal Pattern:** Explain why a specific pattern (Two Pointers, Sliding Window, Heap, BFS, DFS, DP) optimizes the naive approach.
 4. **Discuss Trade-offs:** Mention Time vs. Space trade-offs (e.g. $O(N)$ space Hash Map vs $O(N \log N)$ time sorting).
 5. **Clean Swift Code:** Write clean, modular Swift 6 code with explicit type safety.
 6. **Walkthrough with Test Cases:** Trace your code line-by-line using a simple sample input.
 7. **Test Edge Cases:** Check empty inputs, single element arrays, duplicates, zero, negative numbers, and boundary limits.

 ---
 ## 📊 Big-O Complexity Reference Matrix
 | Data Structure / Algorithm | Access / Search | Insertion / Deletion | Worst-Case Space |
 |---|---|---|---|
 | **Array** | O(1) Access / O(N) Search | O(N) Insert/Delete | O(N) |
 | **Hash Map / Set** | O(1) Avg Search | O(1) Avg Insert/Delete | O(N) |
 | **Stack / Queue** | O(N) Search | O(1) Push/Pop | O(N) |
 | **Singly Linked List** | O(N) Search | O(1) Insert at Head | O(N) |
 | **Binary Search Tree** | O(H) Search | O(H) Insert/Delete | O(N) |
 | **Min / Max Heap** | O(1) Min/Max | O(log N) Push/Pop | O(N) |
 | **Graph BFS / DFS** | O(V + E) Traversal | N/A | O(V + E) |
 | **Binary Search** | O(log N) Search | N/A | O(1) Iterative |
*/

import Foundation

// MARK: - Mock Interview Problem 1: Easy (Two Sum Pattern)
class MockProblemEasy {
    /// Mock Problem: Find if array has pair with sum equal to target.
    static func hasArrayTwoSum(_ nums: [Int], _ target: Int) -> Bool {
        var seen = Set<Int>()
        for num in nums {
            if seen.contains(target - num) { return true }
            seen.insert(num)
        }
        return false
    }
}

// MARK: - Mock Interview Problem 2: Medium (Sliding Window Pattern)
class MockProblemMedium1 {
    /// Mock Problem: Maximum sum of contiguous subarray of fixed size k.
    static func maxSubarraySumOfSizeK(_ nums: [Int], _ k: Int) -> Int {
        guard nums.count >= k && k > 0 else { return 0 }
        var currentSum = nums[0..<k].reduce(0, +)
        var maxSum = currentSum
        
        for i in k..<nums.count {
            currentSum += nums[i] - nums[i - k]
            maxSum = max(maxSum, currentSum)
        }
        return maxSum
    }
}

// MARK: - Mock Interview Problem 3: Medium (Tree BFS Pattern)
class MockProblemMedium2 {
    /// Mock Problem: Check if binary tree is symmetric around its center.
    public class TreeNode {
        var val: Int
        var left: TreeNode?
        var right: TreeNode?
        init(_ val: Int, _ left: TreeNode? = nil, _ right: TreeNode? = nil) {
            self.val = val
            self.left = left
            self.right = right
        }
    }
    
    static func isSymmetric(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }
        return isMirror(root.left, root.right)
    }
    
    private static func isMirror(_ t1: TreeNode?, _ t2: TreeNode?) -> Bool {
        if t1 == nil && t2 == nil { return true }
        guard let t1 = t1, let t2 = t2 else { return false }
        return (t1.val == t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)
    }
}

// MARK: - Verification of Mock Interview Suite
assert(MockProblemEasy.hasArrayTwoSum([1, 4, 3, 10], 7) == true, "Mock Easy Failed")
assert(MockProblemMedium1.maxSubarraySumOfSizeK([2, 1, 5, 1, 3, 2], 3) == 9, "Mock Medium 1 Failed")

let symTree = MockProblemMedium2.TreeNode(1,
    MockProblemMedium2.TreeNode(2, MockProblemMedium2.TreeNode(3), MockProblemMedium2.TreeNode(4)),
    MockProblemMedium2.TreeNode(2, MockProblemMedium2.TreeNode(4), MockProblemMedium2.TreeNode(3))
)
assert(MockProblemMedium2.isSymmetric(symTree) == true, "Mock Medium 2 Failed")

print("==================================================================")
print("✅ Day 7 — Mock Interview & Revision: All Mock Tests Passed!")
print("🎉 CONGRATULATIONS! ALL 7 DAYS (40 PROBLEMS) VERIFIED IN SWIFT!")
print("==================================================================")
