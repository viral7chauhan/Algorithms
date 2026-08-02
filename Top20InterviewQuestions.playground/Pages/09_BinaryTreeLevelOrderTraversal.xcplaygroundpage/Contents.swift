//: [Previous](@previous) | [Next](@next)
/*:
 # 9. Binary Tree Level Order Traversal
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given the `root` of a binary tree, return the level order traversal of its nodes' values
 (i.e., from left to right, level by level).
 
 **Time Complexity:** O(N) - Every node in the binary tree is visited exactly once.
 **Space Complexity:** O(N) - Maximum queue size at the widest level of the tree (leaf nodes in balanced tree ~ N/2).
*/

import Foundation

// MARK: - Binary Tree Node Definition
public class TreeNode {
    public var val: Int
    public var left: TreeNode?
    public var right: TreeNode?
    
    public init() { self.val = 0; self.left = nil; self.right = nil }
    public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil }
    public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
        self.val = val
        self.left = left
        self.right = right
    }
}

class BinaryTreeLevelOrderTraversal {
    /// Returns level-by-level array of node values using BFS queue.
    /// - Parameter root: Root of binary tree.
    /// - Returns: 2D array where each inner array contains values for one level.
    static func levelOrder(_ root: TreeNode?) -> [[Int]] {
        guard let root = root else { return [] }
        
        var result: [[Int]] = []
        var queue: [TreeNode] = [root]
        
        while !queue.isEmpty {
            let levelSize = queue.count
            var currentLevel: [Int] = []
            
            // Process all nodes belonging to the current tree level
            for _ in 0..<levelSize {
                let node = queue.removeFirst()
                currentLevel.append(node.val)
                
                // Enqueue left child if present
                if let left = node.left {
                    queue.append(left)
                }
                // Enqueue right child if present
                if let right = node.right {
                    queue.append(right)
                }
            }
            
            result.append(currentLevel)
        }
        
        return result
    }
}

// MARK: - Verification / Test Cases
// Construct test tree: [3, 9, 20, nil, nil, 15, 7]
let root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20, TreeNode(15), TreeNode(7))

let levelResult = BinaryTreeLevelOrderTraversal.levelOrder(root)
assert(levelResult == [[3], [9, 20], [15, 7]], "Test Case 1 Failed: Got \(levelResult)")

let singleRoot = TreeNode(1)
assert(BinaryTreeLevelOrderTraversal.levelOrder(singleRoot) == [[1]], "Test Case 2 Failed")
assert(BinaryTreeLevelOrderTraversal.levelOrder(nil) == [], "Test Case 3 Failed")

print("✅ Page 09: Binary Tree Level Order Traversal - All Test Cases Passed!")
