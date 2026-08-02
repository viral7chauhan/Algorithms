//: [Previous](@previous) | [Next](@next)
/*:
 # Day 4 — Trees & Binary Search Trees (BST)
 **Core Focus:** DFS (Pre/In/Postorder), BFS Level Order, Tree Recursion, BST properties
 
 **Problems Covered:**
 1. Maximum Depth of Binary Tree (Easy)
 2. Invert Binary Tree (Easy)
 3. Binary Tree Level Order Traversal (Medium)
 4. Diameter of Binary Tree (Easy)
 5. Validate Binary Search Tree (Medium)
 6. Lowest Common Ancestor (Medium)
 7. Kth Smallest Element in a BST (Medium)
*/

import Foundation

// MARK: - TreeNode Definition
public class TreeNode {
    public var val: Int
    public var left: TreeNode?
    public var right: TreeNode?
    public init(_ val: Int, _ left: TreeNode? = nil, _ right: TreeNode? = nil) {
        self.val = val
        self.left = left
        self.right = right
    }
}

// MARK: - 1. Maximum Depth of Binary Tree
/*
 **Problem:** Return maximum number of nodes along longest path from root to leaf.
 **Time:** O(N) | **Space:** O(H)
*/
class MaxDepthBinaryTree {
    static func maxDepth(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + max(maxDepth(root.left), maxDepth(root.right))
    }
}

// MARK: - 2. Invert Binary Tree
/*
 **Problem:** Swap left and right children of every node in binary tree.
 **Time:** O(N) | **Space:** O(H)
*/
class InvertBinaryTree {
    static func invertTree(_ root: TreeNode?) -> TreeNode? {
        guard let root = root else { return nil }
        let temp = root.left
        root.left = invertTree(root.right)
        root.right = invertTree(temp)
        return root
    }
}

// MARK: - 3. Binary Tree Level Order Traversal
/*
 **Problem:** Return level order traversal (BFS) of binary tree node values.
 **Time:** O(N) | **Space:** O(N)
*/
class LevelOrderTraversal {
    static func solve(_ root: TreeNode?) -> [[Int]] {
        guard let root = root else { return [] }
        var result = [[Int]]()
        var queue = [root]
        
        while !queue.isEmpty {
            let levelSize = queue.count
            var levelVals = [Int]()
            for _ in 0..<levelSize {
                let node = queue.removeFirst()
                levelVals.append(node.val)
                if let l = node.left { queue.append(l) }
                if let r = node.right { queue.append(r) }
            }
            result.append(levelVals)
        }
        return result
    }
}

// MARK: - 4. Diameter of Binary Tree
/*
 **Problem:** Length of longest path between any two nodes in a tree.
 **Time:** O(N) | **Space:** O(H)
*/
class DiameterBinaryTree {
    static func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        var maxDiameter = 0
        func depth(_ node: TreeNode?) -> Int {
            guard let node = node else { return 0 }
            let leftDepth = depth(node.left)
            let rightDepth = depth(node.right)
            maxDiameter = max(maxDiameter, leftDepth + rightDepth)
            return 1 + max(leftDepth, rightDepth)
        }
        _ = depth(root)
        return maxDiameter
    }
}

// MARK: - 5. Validate Binary Search Tree
/*
 **Problem:** Check if binary tree is valid BST.
 **Time:** O(N) | **Space:** O(H)
*/
class ValidateBST {
    static func isValidBST(_ root: TreeNode?) -> Bool {
        return helper(root, nil, nil)
    }
    private static func helper(_ node: TreeNode?, _ minVal: Int?, _ maxVal: Int?) -> Bool {
        guard let node = node else { return true }
        if let minVal = minVal, node.val <= minVal { return false }
        if let maxVal = maxVal, node.val >= maxVal { return false }
        return helper(node.left, minVal, node.val) && helper(node.right, node.val, maxVal)
    }
}

// MARK: - 6. Lowest Common Ancestor
/*
 **Problem:** Lowest node having both p and q as descendants.
 **Time:** O(N) | **Space:** O(H)
*/
class LowestCommonAncestor {
    static func solve(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        if root == nil || root === p || root === q { return root }
        let left = solve(root?.left, p, q)
        let right = solve(root?.right, p, q)
        if left != nil && right != nil { return root }
        return left != nil ? left : right
    }
}

// MARK: - 7. Kth Smallest Element in a BST
/*
 **Problem:** Return kth 1-indexed smallest value in BST using Inorder traversal.
 **Time:** O(H + K) | **Space:** O(H)
*/
class KthSmallestBST {
    static func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        var stack = [TreeNode]()
        var curr = root
        var count = 0
        
        while curr != nil || !stack.isEmpty {
            while let node = curr {
                stack.append(node)
                curr = node.left
            }
            let node = stack.removeLast()
            count += 1
            if count == k { return node.val }
            curr = node.right
        }
        return -1
    }
}

// MARK: - Test Cases Execution
let root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
assert(MaxDepthBinaryTree.maxDepth(root) == 3, "Max Depth Failed")

let invRoot = InvertBinaryTree.invertTree(TreeNode(2, TreeNode(1), TreeNode(3)))
assert(invRoot?.left?.val == 3 && invRoot?.right?.val == 1, "Invert Tree Failed")

assert(LevelOrderTraversal.solve(root) == [[3], [9, 20], [15, 7]], "Level Order Failed")
assert(DiameterBinaryTree.diameterOfBinaryTree(root) == 3, "Diameter Tree Failed")

let validBst = TreeNode(2, TreeNode(1), TreeNode(3))
assert(ValidateBST.isValidBST(validBst) == true, "Validate BST Failed")

let pNode = root.left
let qNode = root.right
assert(LowestCommonAncestor.solve(root, pNode, qNode) === root, "LCA Failed")

let bstTree = TreeNode(5, TreeNode(3, TreeNode(2), TreeNode(4)), TreeNode(6))
assert(KthSmallestBST.kthSmallest(bstTree, 3) == 4, "Kth Smallest BST Failed")

print("✅ Day 4 — Trees & BST: All 7 Tests Passed!")
