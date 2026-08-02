//: [Previous](@previous) | [Next](@next)
/*:
 # 1. Binary Search
 **Difficulty:** Easy
 
 **Problem Statement:**
 Given an array of integers `nums` which is sorted in ascending order, and an integer `target`,
 write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.
 
 **Time Complexity:** O(log N) - Halves search space each iteration.
 **Space Complexity:** O(1) - Iterative search uses constant extra space.
*/

import Foundation

class BinarySearch {
    /// Performs standard binary search on a sorted integer array.
    /// - Parameters:
    ///   - nums: A sorted array of integers in ascending order.
    ///   - target: The integer value to search for.
    /// - Returns: The 0-based index of `target` if found; otherwise `-1`.
    static func search(_ nums: [Int], _ target: Int) -> Int {
        // Initialize left and right bounds of the search range
        var left = 0
        var right = nums.count - 1
        
        // Loop while the search range is valid
        while left <= right {
            // Prevent integer overflow when computing mid-point
            let mid = left + (right - left) / 2
            
            if nums[mid] == target {
                // Target found at mid index
                return mid
            } else if nums[mid] < target {
                // Target must lie in the right half; shift left boundary
                left = mid + 1
            } else {
                // Target must lie in the left half; shift right boundary
                right = mid - 1
            }
        }
        
        // Target was not found in the array
        return -1
    }
}

// MARK: - Verification / Test Cases
let testNums1 = [-1, 0, 3, 5, 9, 12]
assert(BinarySearch.search(testNums1, 9) == 4, "Test Case 1 Failed")
assert(BinarySearch.search(testNums1, 2) == -1, "Test Case 2 Failed")

let testNums2 = [5]
assert(BinarySearch.search(testNums2, 5) == 0, "Test Case 3 Failed")
assert(BinarySearch.search(testNums2, 1) == -1, "Test Case 4 Failed")

print("✅ Page 01: Binary Search - All Test Cases Passed!")
