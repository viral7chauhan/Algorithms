//: [Previous](@previous) | [Next](@next)
/*:
 # 17. LRU Cache
 **Difficulty:** Hard / Medium-Hard
 
 **Problem Statement:**
 Design a data structure that follows the constraints of a **Least Recently Used (LRU) Cache**.
 Implement the `LRUCache` class:
 - `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.
 - `int get(int key)` Return the value of the key if the key exists, otherwise return `-1`.
 - `void put(int key, int value)` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache.
   If the number of keys exceeds the capacity from this operation, **evict** the least recently used key.
 The functions `get` and `put` must each run in **O(1)** average time complexity.
 
 **Time Complexity:** O(1) for both `get` and `put` operations.
 **Space Complexity:** O(Capacity) space stored in Hash Map and Doubly Linked List nodes.
*/

import Foundation

// MARK: - Doubly Linked List Node Definition
private class CacheNode {
    var key: Int
    var val: Int
    var prev: CacheNode?
    var next: CacheNode?
    
    init(_ key: Int, _ val: Int) {
        self.key = key
        self.val = val
    }
}

public class LRUCache {
    private let capacity: Int
    private var dict: [Int: CacheNode] = [:]
    
    // Sentinel dummy head and tail nodes to simplify pointer adjustments
    private let head = CacheNode(-1, -1)
    private let tail = CacheNode(-1, -1)
    
    public init(_ capacity: Int) {
        self.capacity = capacity
        head.next = tail
        tail.prev = head
    }
    
    public func get(_ key: Int) -> Int {
        guard let node = dict[key] else { return -1 }
        // Move accessed node to most recently used position (head)
        moveToHead(node)
        return node.val
    }
    
    public func put(_ key: Int, _ value: Int) {
        if let existingNode = dict[key] {
            // Update existing value and move to head
            existingNode.val = value
            moveToHead(existingNode)
        } else {
            // Add new node
            let newNode = CacheNode(key, value)
            dict[key] = newNode
            addNodeToHead(newNode)
            
            // Check capacity limit and evict LRU item (tail.prev) if needed
            if dict.count > capacity {
                if let lruNode = tail.prev {
                    removeNode(lruNode)
                    dict.removeValue(forKey: lruNode.key)
                }
            }
        }
    }
    
    // MARK: - Helper Methods for Doubly Linked List
    private func addNodeToHead(_ node: CacheNode) {
        node.prev = head
        node.next = head.next
        head.next?.prev = node
        head.next = node
    }
    
    private func removeNode(_ node: CacheNode) {
        let prevNode = node.prev
        let nextNode = node.next
        prevNode?.next = nextNode
        nextNode?.prev = prevNode
    }
    
    private func moveToHead(_ node: CacheNode) {
        removeNode(node)
        addNodeToHead(node)
    }
}

// MARK: - Verification / Test Cases
let lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
assert(lru.get(1) == 1, "Test Case 1 Failed")

lru.put(3, 3) // Evicts key 2
assert(lru.get(2) == -1, "Test Case 2 Failed: Key 2 should have been evicted")

lru.put(4, 4) // Evicts key 1
assert(lru.get(1) == -1, "Test Case 3 Failed: Key 1 should have been evicted")
assert(lru.get(3) == 3, "Test Case 4 Failed")
assert(lru.get(4) == 4, "Test Case 5 Failed")

print("✅ Page 17: LRU Cache - All Test Cases Passed!")
