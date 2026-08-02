//: [Previous](@previous) | [Next](@next)
/*:
 # Day 2 — Strings, Linked Lists & Stack
 **Core Focus:** String manipulation, Fast & slow pointers, Stack patterns
 
 **Problems Covered:**
 1. Valid Anagram (Easy)
 2. Valid Parentheses (Easy)
 3. Reverse Linked List (Easy)
 4. Merge Two Sorted Lists (Easy)
 5. Linked List Cycle (Easy)
 6. Remove Nth Node From End of List (Medium)
 7. Min Stack (Medium)
*/

import Foundation

// MARK: - Linked List Helper Node
public class ListNode {
    public var val: Int
    public var next: ListNode?
    public init(_ val: Int, _ next: ListNode? = nil) {
        self.val = val
        self.next = next
    }
    
    static func fromArray(_ arr: [Int]) -> ListNode? {
        guard !arr.isEmpty else { return nil }
        let head = ListNode(arr[0])
        var curr = head
        for v in arr.dropFirst() {
            curr.next = ListNode(v)
            curr = curr.next!
        }
        return head
    }
    
    func toArray() -> [Int] {
        var res = [Int]()
        var curr: ListNode? = self
        while let node = curr {
            res.append(node.val)
            curr = node.next
        }
        return res
    }
}

// MARK: - 1. Valid Anagram
/*
 **Problem:** Return true if t is an anagram of s.
 **Time:** O(N) | **Space:** O(1) for fixed alphabet
*/
class ValidAnagram {
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
}

// MARK: - 2. Valid Parentheses
/*
 **Problem:** Determine if input string has valid matching open/close brackets.
 **Time:** O(N) | **Space:** O(N)
*/
class ValidParentheses {
    static func solve(_ s: String) -> Bool {
        var stack = [Character]()
        let map: [Character: Character] = [")": "(", "]": "[", "}": "{"]
        
        for char in s {
            if let expectedOpen = map[char] {
                if stack.isEmpty || stack.removeLast() != expectedOpen {
                    return false
                }
            } else {
                stack.append(char) // Open bracket pushed onto stack
            }
        }
        return stack.isEmpty
    }
}

// MARK: - 3. Reverse Linked List
/*
 **Problem:** Reverse singly linked list.
 **Time:** O(N) | **Space:** O(1)
*/
class ReverseLinkedList {
    static func solve(_ head: ListNode?) -> ListNode? {
        var prev: ListNode? = nil
        var curr = head
        while curr != nil {
            let nextTemp = curr?.next
            curr?.next = prev
            prev = curr
            curr = nextTemp
        }
        return prev
    }
}

// MARK: - 4. Merge Two Sorted Lists
/*
 **Problem:** Merge two sorted linked lists into one sorted list.
 **Time:** O(N + M) | **Space:** O(1)
*/
class MergeTwoLists {
    static func solve(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        let dummy = ListNode(0)
        var tail = dummy
        var p1 = l1
        var p2 = l2
        
        while let n1 = p1, let n2 = p2 {
            if n1.val <= n2.val {
                tail.next = n1
                p1 = n1.next
            } else {
                tail.next = n2
                p2 = n2.next
            }
            tail = tail.next!
        }
        tail.next = p1 ?? p2
        return dummy.next
    }
}

// MARK: - 5. Linked List Cycle
/*
 **Problem:** Detect cycle in linked list using Floyd's Tortoise and Hare.
 **Time:** O(N) | **Space:** O(1)
*/
class LinkedListCycle {
    static func hasCycle(_ head: ListNode?) -> Bool {
        var slow = head
        var fast = head
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
            if slow === fast { return true }
        }
        return false
    }
}

// MARK: - 6. Remove Nth Node From End of List
/*
 **Problem:** Remove the nth node from the end of list in one pass.
 **Time:** O(N) | **Space:** O(1)
*/
class RemoveNthFromEnd {
    static func solve(_ head: ListNode?, _ n: Int) -> ListNode? {
        let dummy = ListNode(0, head)
        var first: ListNode? = dummy
        var second: ListNode? = dummy
        
        // Advance first pointer by n + 1 steps to create gap of n nodes
        for _ in 0...n {
            first = first?.next
        }
        
        // Move both pointers until first reaches the end
        while first != nil {
            first = first?.next
            second = second?.next
        }
        
        // Unlink target node
        second?.next = second?.next?.next
        return dummy.next
    }
}

// MARK: - 7. Min Stack
/*
 **Problem:** Stack supporting push, pop, top, and retrieve minimum in O(1) time.
 **Time:** O(1) per operation | **Space:** O(N)
*/
class MinStack {
    private var mainStack = [Int]()
    private var minStack = [Int]()
    
    func push(_ val: Int) {
        mainStack.append(val)
        let currentMin = minStack.last ?? Int.max
        minStack.append(min(val, currentMin))
    }
    
    func pop() {
        _ = mainStack.popLast()
        _ = minStack.popLast()
    }
    
    func top() -> Int {
        return mainStack.last ?? -1
    }
    
    func getMin() -> Int {
        return minStack.last ?? -1
    }
}

// MARK: - Test Cases Execution
assert(ValidAnagram.solve("anagram", "nagaram") == true, "Valid Anagram Failed")
assert(ValidParentheses.solve("()[]{}") == true, "Valid Parentheses Failed")
assert(ReverseLinkedList.solve(ListNode.fromArray([1, 2, 3]))?.toArray() == [3, 2, 1], "Reverse Linked List Failed")

let l1 = ListNode.fromArray([1, 2, 4])
let l2 = ListNode.fromArray([1, 3, 4])
assert(MergeTwoLists.solve(l1, l2)?.toArray() == [1, 1, 2, 3, 4, 4], "Merge Two Lists Failed")

let cycleHead = ListNode(1)
let node2 = ListNode(2)
cycleHead.next = node2
node2.next = cycleHead
assert(LinkedListCycle.hasCycle(cycleHead) == true, "Linked List Cycle Failed")

assert(RemoveNthFromEnd.solve(ListNode.fromArray([1, 2, 3, 4, 5]), 2)?.toArray() == [1, 2, 3, 5], "Remove Nth Failed")

let minStack = MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-3)
assert(minStack.getMin() == -3, "MinStack getMin Failed")
minStack.pop()
assert(minStack.top() == 0, "MinStack top Failed")
assert(minStack.getMin() == -2, "MinStack getMin After Pop Failed")

print("✅ Day 2 — Strings, Linked Lists & Stack: All 7 Tests Passed!")
