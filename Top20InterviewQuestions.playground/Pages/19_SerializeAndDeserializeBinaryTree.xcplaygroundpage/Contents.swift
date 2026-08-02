//: [Previous](@previous) | [Next](@next)
/*:
 # 19. Serialize and Deserialize Binary Tree
 **Difficulty:** Hard
 
 **Problem Statement:**
 Serialization is the process of converting a data structure or object into a sequence of bits
 so that it can be stored in a file or memory buffer.
 Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your
 serialization/deserialization algorithm should work.
 
 **Time Complexity:** O(N) - Both serialization and deserialization traverse each node once.
 **Space Complexity:** O(N) - Space for string output and recursion stack / queue of node values.
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

class Codec {
    private let nilMarker = "null"
    private let delimiter = ","
    
    /// Encodes a binary tree to a single string using Preorder Traversal.
    /// - Parameter root: Root of binary tree.
    /// - Returns: String representation of tree.
    func serialize(_ root: TreeNode?) -> String {
        var result: [String] = []
        
        func buildString(_ node: TreeNode?) {
            guard let node = node else {
                result.append(nilMarker)
                return
            }
            // Preorder: Node -> Left -> Right
            result.append(String(node.val))
            buildString(node.left)
            buildString(node.right)
        }
        
        buildString(root)
        return result.joined(separator: delimiter)
    }

    /// Decodes serialized string back to binary tree.
    /// - Parameter data: Serialized string.
    /// - Returns: Reconstructed binary tree root.
    func deserialize(_ data: String) -> TreeNode? {
        var values = data.components(separatedBy: delimiter)
        
        func buildTree() -> TreeNode? {
            guard !values.isEmpty else { return nil }
            let valStr = values.removeFirst()
            
            if valStr == nilMarker {
                return nil
            }
            
            guard let val = Int(valStr) else { return nil }
            let node = TreeNode(val)
            node.left = buildTree()
            node.right = buildTree()
            return node
        }
        
        return buildTree()
    }
}

// MARK: - Helper function to compare trees
func isSameTree(_ p: TreeNode?, _ q: TreeNode?) -> Bool {
    if p == nil && q == nil { return true }
    guard let p = p, let q = q else { return false }
    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// MARK: - Verification / Test Cases
let codec = Codec()

// Build tree: [1, 2, 3, nil, nil, 4, 5]
let original = TreeNode(1)
original.left = TreeNode(2)
original.right = TreeNode(3)
original.right?.left = TreeNode(4)
original.right?.right = TreeNode(5)

let serializedStr = codec.serialize(original)
let reconstructed = codec.deserialize(serializedStr)

assert(isSameTree(original, reconstructed) == true, "Test Case 1 Failed: Reconstructed tree doesn't match original")
assert(codec.deserialize(codec.serialize(nil)) == nil, "Test Case 2 Failed: Empty tree handling")

print("✅ Page 19: Serialize and Deserialize Binary Tree - All Test Cases Passed!")
