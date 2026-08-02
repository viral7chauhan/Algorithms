//: [Previous](@previous) | [Next](@next)
/*:
 # 2. Two Sum
 **Difficulty:** Easy
 
 **Problem Statement:**
 Given an array of integers `nums` and an integer `target`, return indices of the two numbers
 such that they add up to `target`. You may assume that each input would have exactly one solution,
 and you may not use the same element twice.
 
 **Time Complexity:** O(N) - Traversing array of length N once. Map operations are O(1) on average.
 **Space Complexity:** O(N) - Extra space required for the hash map storing at most N elements.
*/

import Foundation

class TwoSum {
    /// Finds two numbers in `nums` that add up to `target`.
    /// - Parameters:
    ///   - nums: Array of integers.
    ///   - target: Target sum value.
    /// - Returns: An array containing the two 0-based indices.
    static func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        // Hash map mapping value -> original array index
        var dict: [Int: Int] = [:]
        
        for (index, num) in nums.enumerated() {
            // Calculate the required complement to reach the target sum
            let complement = target - num
            
            // Check if complement already exists in the dictionary
            if let complementIndex = dict[complement] {
                // Found pair! Return matching indices
                return [complementIndex, index]
            }
            
            // Store current number with its index in the hash map
            dict[num] = index
        }
        
        return []
    }
}

// MARK: - Verification / Test Cases
let res1 = TwoSum.twoSum([2, 7, 11, 15], 9)
assert(res1 == [0, 1], "Test Case 1 Failed: Expected [0, 1], got \(res1)")

let res2 = TwoSum.twoSum([3, 2, 4], 6)
assert(res2 == [1, 2], "Test Case 2 Failed: Expected [1, 2], got \(res2)")

let res3 = TwoSum.twoSum([3, 3], 6)
assert(res3 == [0, 1], "Test Case 3 Failed: Expected [0, 1], got \(res3)")

print("✅ Page 02: Two Sum - All Test Cases Passed!")
