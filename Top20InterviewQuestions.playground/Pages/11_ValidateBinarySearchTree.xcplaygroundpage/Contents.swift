//: [Previous](@previous) | [Next](@next)
/*:
 # 11. Validate Binary Search Tree
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).
 A valid BST is defined as follows:
 - The left subtree of a node contains only nodes with keys **strictly less** than the node's key.
 - The right subtree of a node contains only nodes with keys **strictly greater** than the node's key.
 - Both the left and right subtrees must also be binary search trees.
 
 **Time Complexity:** O(N) - Visits each node once.
 **Space Complexity:** O(H) - Recursion call stack space proportional to height of tree H.
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

class ValidateBinarySearchTree {
    /// Validates if tree rooted at `root` is a valid BST.
    /// - Parameter root: Tree root node.
    /// - Returns: Bool indicating validity.
    static func isValidBST(_ root: TreeNode?) -> Bool {
        return helper(root, min: nil, max: nil)
    }
    
    /// Recursive helper tracking lower (min) and upper (max) bound constraints.
    private static func helper(_ node: TreeNode?, min: Int?, max: Int?) -> Bool {
        guard let node = node else { return true }
        
        // Check lower bound constraint
        if let minVal = min, node.val <= minVal {
            return false
        }
        
        // Check upper bound constraint
        if let maxVal = max, node.val >= maxVal {
            return false
        }
        
        // Recursively check left subtree (upper bound becomes node.val)
        // and right subtree (lower bound becomes node.val)
        return helper(node.left, min: min, max: node.val) &&
               helper(node.right, min: node.val, max: max)
    }
}

// MARK: - Verification / Test Cases
// Valid BST: [2, 1, 3]
let bstValid = TreeNode(2)
bstValid.left = TreeNode(1)
bstValid.right = TreeNode(3)
assert(ValidateBinarySearchTree.isValidBST(bstValid) == true, "Test Case 1 Failed")

// Invalid BST: [5, 1, 4, nil, nil, 3, 6] (4 has left child 3 which is fine, but right child of 5 has value 4 < 5)
let bstInvalid = TreeNode(5)
bstInvalid.left = TreeNode(1)
bstInvalid.right = TreeNode(4)
bstInvalid.right?.left = TreeNode(3)
bstInvalid.right?.right = TreeNode(6)
assert(ValidateBinarySearchTree.isValidBST(bstInvalid) == false, "Test Case 2 Failed")

print("✅ Page 11: Validate Binary Search Tree - All Test Cases Passed!")
