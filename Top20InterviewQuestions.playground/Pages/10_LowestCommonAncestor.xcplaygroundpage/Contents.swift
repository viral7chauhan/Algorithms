//: [Previous](@previous) | [Next](@next)
/*:
 # 10. Lowest Common Ancestor of a Binary Tree
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree `p` and `q`.
 The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T`
 that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).
 
 **Time Complexity:** O(N) - In worst case visits all N nodes in binary tree.
 **Space Complexity:** O(H) - Recursion call stack proportional to tree height H (O(N) for skewed tree, O(log N) for balanced).
*/

import Foundation

// MARK: - Binary Tree Node Definition
public class TreeNode {
    public var val: Int
    public var left: TreeNode?
    public var right: TreeNode?
    
    public init(_ val: Int) {
        self.val = val
        self.left = nil
        self.right = nil
    }
}

extension TreeNode: Equatable {
    public static func == (lhs: TreeNode, rhs: TreeNode) -> Bool {
        return lhs === rhs
    }
}

class LowestCommonAncestor {
    /// Recursively finds the lowest common ancestor of nodes p and q.
    /// - Parameters:
    ///   - root: Current root node being searched.
    ///   - p: First target node.
    ///   - q: Second target node.
    /// - Returns: The LCA node if found, otherwise nil.
    static func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        // Base case: if root is nil, or root is p, or root is q, return root
        if root == nil || root === p || root === q {
            return root
        }
        
        // Search left subtree
        let leftLCA = lowestCommonAncestor(root?.left, p, q)
        
        // Search right subtree
        let rightLCA = lowestCommonAncestor(root?.right, p, q)
        
        // If p and q are found in distinct subtrees of current node, root is the LCA
        if leftLCA != nil && rightLCA != nil {
            return root
        }
        
        // Otherwise, return whichever subtree returned non-nil
        return leftLCA != nil ? leftLCA : rightLCA
    }
}

// MARK: - Verification / Test Cases
// Tree: [3, 5, 1, 6, 2, 0, 8, nil, nil, 7, 4]
let root = TreeNode(3)
let node5 = TreeNode(5)
let node1 = TreeNode(1)
let node6 = TreeNode(6)
let node2 = TreeNode(2)
let node0 = TreeNode(0)
let node8 = TreeNode(8)
let node7 = TreeNode(7)
let node4 = TreeNode(4)

root.left = node5
root.right = node1
node5.left = node6
node5.right = node2
node1.left = node0
node1.right = node8
node2.left = node7
node2.right = node4

let lca1 = LowestCommonAncestor.lowestCommonAncestor(root, node5, node1)
assert(lca1 === root, "Test Case 1 Failed: Expected root (3), got \(lca1?.val ?? -1)")

let lca2 = LowestCommonAncestor.lowestCommonAncestor(root, node5, node4)
assert(lca2 === node5, "Test Case 2 Failed: Expected node 5, got \(lca2?.val ?? -1)")

print("✅ Page 10: Lowest Common Ancestor - All Test Cases Passed!")
