//: [Previous](@previous) | [Next](@next)
/*:
 # 3. Reverse Linked List
 **Difficulty:** Easy
 
 **Problem Statement:**
 Given the head of a singly linked list, reverse the list, and return the reversed list's head.
 
 **Time Complexity:** O(N) - Single traversal of the linked list with N nodes.
 **Space Complexity:** O(1) - Constant auxiliary space for pointers (iterative approach).
*/

import Foundation

// MARK: - Definition for Singly-Linked List Node
public class ListNode {
    public var val: Int
    public var next: ListNode?
    
    public init() { self.val = 0; self.next = nil }
    public init(_ val: Int) { self.val = val; self.next = nil }
    public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next }
}

extension ListNode {
    /// Helper initializer for array input
    static func fromArray(_ array: [Int]) -> ListNode? {
        guard !array.isEmpty else { return nil }
        let head = ListNode(array[0])
        var current = head
        for val in array.dropFirst() {
            let newNode = ListNode(val)
            current.next = newNode
            current = newNode
        }
        return head
    }
    
    /// Helper to convert linked list back to array for assertions
    func toArray() -> [Int] {
        var result: [Int] = []
        var curr: ListNode? = self
        while let node = curr {
            result.append(node.val)
            curr = node.next
        }
        return result
    }
}

class ReverseLinkedList {
    /// Reverses a singly linked list iteratively.
    /// - Parameter head: Head node of the input linked list.
    /// - Returns: Head node of the reversed linked list.
    static func reverseList(_ head: ListNode?) -> ListNode? {
        var prev: ListNode? = nil
        var current = head
        
        while current != nil {
            // Save the next pointer before overwriting it
            let nextTemp = current?.next
            
            // Reverse the forward link to point to previous node
            current?.next = prev
            
            // Advance prev and current pointers one step forward
            prev = current
            current = nextTemp
        }
        
        // prev will now be pointing to the new head of the reversed list
        return prev
    }
}

// MARK: - Verification / Test Cases
let list1 = ListNode.fromArray([1, 2, 3, 4, 5])
let reversed1 = ReverseLinkedList.reverseList(list1)
assert(reversed1?.toArray() == [5, 4, 3, 2, 1], "Test Case 1 Failed")

let list2 = ListNode.fromArray([1, 2])
let reversed2 = ReverseLinkedList.reverseList(list2)
assert(reversed2?.toArray() == [2, 1], "Test Case 2 Failed")

let list3 = ListNode.fromArray([])
let reversed3 = ReverseLinkedList.reverseList(list3)
assert(reversed3?.toArray() == nil, "Test Case 3 Failed")

print("✅ Page 03: Reverse Linked List - All Test Cases Passed!")
