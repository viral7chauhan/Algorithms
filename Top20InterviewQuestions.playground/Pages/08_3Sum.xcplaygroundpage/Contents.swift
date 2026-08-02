//: [Previous](@previous) | [Next](@next)
/*:
 # 8. 3Sum
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]`
 such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
 Notice that the solution set must not contain duplicate triplets.
 
 **Time Complexity:** O(N^2) - Sorting takes O(N log N), followed by outer loop (N) and inner two-pointer sweep (N).
 **Space Complexity:** O(1) auxiliary space (excluding space required for sorting and output array).
*/

import Foundation

class ThreeSum {
    /// Finds all unique triplets that sum to zero.
    /// - Parameter nums: Input integer array.
    /// - Returns: List of unique triplets `[Int]`.
    static func threeSum(_ nums: [Int]) -> [[Int]] {
        guard nums.count >= 3 else { return [] }
        
        // Sort array to enable two-pointer strategy and duplicate detection
        let sorted = nums.sorted()
        var result: [[Int]] = []
        let n = sorted.count
        
        for i in 0..<(n - 2) {
            // Early break: if minimum element is positive, no sum can equal 0
            if sorted[i] > 0 { break }
            
            // Skip duplicate fixed elements
            if i > 0 && sorted[i] == sorted[i - 1] { continue }
            
            var left = i + 1
            var right = n - 1
            
            while left < right {
                let sum = sorted[i] + sorted[left] + sorted[right]
                
                if sum == 0 {
                    result.append([sorted[i], sorted[left], sorted[right]])
                    
                    // Skip duplicates for left pointer
                    while left < right && sorted[left] == sorted[left + 1] {
                        left += 1
                    }
                    // Skip duplicates for right pointer
                    while left < right && sorted[right] == sorted[right - 1] {
                        right -= 1
                    }
                    
                    left += 1
                    right -= 1
                } else if sum < 0 {
                    left += 1
                } else {
                    right -= 1
                }
            }
        }
        
        return result
    }
}

// MARK: - Verification / Test Cases
let res1 = ThreeSum.threeSum([-1, 0, 1, 2, -1, -4])
assert(res1.count == 2, "Test Case 1 Failed: Triplet count mismatch")
assert(res1.contains([-1, -1, 2]) && res1.contains([-1, 0, 1]), "Test Case 1 Failed: Content mismatch")

let res2 = ThreeSum.threeSum([0, 1, 1])
assert(res2.isEmpty, "Test Case 2 Failed")

let res3 = ThreeSum.threeSum([0, 0, 0])
assert(res3 == [[0, 0, 0]], "Test Case 3 Failed")

print("✅ Page 08: 3Sum - All Test Cases Passed!")
