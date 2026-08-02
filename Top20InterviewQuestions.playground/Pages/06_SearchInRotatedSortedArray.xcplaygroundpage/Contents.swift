//: [Previous](@previous) | [Next](@next)
/*:
 # 6. Search in Rotated Sorted Array
 **Difficulty:** Medium
 
 **Problem Statement:**
 There is an integer array `nums` sorted in ascending order (with distinct values).
 Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index.
 Given the array `nums` after rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.
 You must write an algorithm with **O(log N)** runtime complexity.
 
 **Time Complexity:** O(log N) - Modified binary search halves search space in every iteration.
 **Space Complexity:** O(1) - Constant space required.
*/

import Foundation

class SearchInRotatedSortedArray {
    /// Searches for target in a rotated sorted array.
    /// - Parameters:
    ///   - nums: Rotated sorted array of integers.
    ///   - target: Value to find.
    /// - Returns: Index of target if found, else -1.
    static func search(_ nums: [Int], _ target: Int) -> Int {
        var left = 0
        var right = nums.count - 1
        
        while left <= right {
            let mid = left + (right - left) / 2
            
            if nums[mid] == target {
                return mid
            }
            
            // Determine which half is sorted
            if nums[left] <= nums[mid] {
                // Left half is sorted
                if nums[left] <= target && target < nums[mid] {
                    // Target lies strictly within the left sorted range
                    right = mid - 1
                } else {
                    // Target lies in the right unsorted portion
                    left = mid + 1
                }
            } else {
                // Right half is sorted
                if nums[mid] < target && target <= nums[right] {
                    // Target lies strictly within the right sorted range
                    left = mid + 1
                } else {
                    // Target lies in the left portion
                    right = mid - 1
                }
            }
        }
        
        return -1
    }
}

// MARK: - Verification / Test Cases
assert(SearchInRotatedSortedArray.search([4, 5, 6, 7, 0, 1, 2], 0) == 4, "Test Case 1 Failed")
assert(SearchInRotatedSortedArray.search([4, 5, 6, 7, 0, 1, 2], 3) == -1, "Test Case 2 Failed")
assert(SearchInRotatedSortedArray.search([1], 0) == -1, "Test Case 3 Failed")
assert(SearchInRotatedSortedArray.search([1, 3], 3) == 1, "Test Case 4 Failed")

print("✅ Page 06: Search in Rotated Sorted Array - All Test Cases Passed!")
