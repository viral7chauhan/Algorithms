//: [Previous](@previous) | [Next](@next)
/*:
 # Day 1 — Arrays & Hashing
 **Core Focus:** HashMap, HashSet, Two Pointers, Sliding Window, Prefix Sums
 
 **Problems Covered:**
 1. Two Sum (Easy)
 2. Contains Duplicate (Easy)
 3. Best Time to Buy and Sell Stock (Easy)
 4. Maximum Subarray (Medium)
 5. Longest Substring Without Repeating Characters (Medium)
 6. Product of Array Except Self (Medium)
*/

import Foundation

// MARK: - 1. Two Sum
/*
 **Problem:** Find indices of two numbers that add up to target.
 **Time:** O(N) | **Space:** O(N)
*/
class TwoSum {
    static func solve(_ nums: [Int], _ target: Int) -> [Int] {
        var map = [Int: Int]() // Stores value -> index mapping
        for (i, num) in nums.enumerated() {
            let complement = target - num
            if let complementIndex = map[complement] {
                return [complementIndex, i] // Found match in O(1) time
            }
            map[num] = i
        }
        return []
    }
}

// MARK: - 2. Contains Duplicate
/*
 **Problem:** Return true if any value appears at least twice in the array.
 **Time:** O(N) | **Space:** O(N)
*/
class ContainsDuplicate {
    static func solve(_ nums: [Int]) -> Bool {
        var seen = Set<Int>() // Hash set for O(1) lookup
        for num in nums {
            if seen.contains(num) { return true }
            seen.insert(num)
        }
        return false
    }
}

// MARK: - 3. Best Time to Buy and Sell Stock
/*
 **Problem:** Maximize profit by choosing a single day to buy and a future day to sell.
 **Time:** O(N) | **Space:** O(1)
*/
class BuySellStock {
    static func solve(_ prices: [Int]) -> Int {
        var minPrice = Int.max
        var maxProfit = 0
        
        for price in prices {
            minPrice = min(minPrice, price) // Track lowest purchase price seen so far
            let currentProfit = price - minPrice
            maxProfit = max(maxProfit, currentProfit) // Track maximum profit possible
        }
        return maxProfit
    }
}

// MARK: - 4. Maximum Subarray (Kadane's Algorithm)
/*
 **Problem:** Find contiguous subarray with largest sum.
 **Time:** O(N) | **Space:** O(1)
*/
class MaxSubarray {
    static func solve(_ nums: [Int]) -> Int {
        guard !nums.isEmpty else { return 0 }
        var maxSoFar = nums[0]
        var currentSum = nums[0]
        
        for num in nums.dropFirst() {
            // Decide whether to add num to existing subarray or start fresh from num
            currentSum = max(num, currentSum + num)
            maxSoFar = max(maxSoFar, currentSum)
        }
        return maxSoFar
    }
}

// MARK: - 5. Longest Substring Without Repeating Characters
/*
 **Problem:** Length of longest substring with distinct characters.
 **Time:** O(N) | **Space:** O(min(N, M))
*/
class LongestSubstringWithoutRepeating {
    static func solve(_ s: String) -> Int {
        let chars = Array(s)
        var map = [Character: Int]() // Stores char -> last seen index
        var left = 0
        var maxLen = 0
        
        for (right, char) in chars.enumerated() {
            if let lastPos = map[char], lastPos >= left {
                left = lastPos + 1 // Shift left boundary past duplicate character
            }
            map[char] = right
            maxLen = max(maxLen, right - left + 1)
        }
        return maxLen
    }
}

// MARK: - 6. Product of Array Except Self
/*
 **Problem:** Product of elements except self without using division.
 **Time:** O(N) | **Space:** O(1) auxiliary space
*/
class ProductExceptSelf {
    static func solve(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var result = Array(repeating: 1, count: n)
        
        var leftProd = 1
        for i in 0..<n {
            result[i] = leftProd
            leftProd *= nums[i]
        }
        
        var rightProd = 1
        for i in (0..<n).reversed() {
            result[i] *= rightProd
            rightProd *= nums[i]
        }
        return result
    }
}

// MARK: - Test Cases Execution
assert(TwoSum.solve([2, 7, 11, 15], 9) == [0, 1], "Two Sum Failed")
assert(ContainsDuplicate.solve([1, 2, 3, 1]) == true, "Contains Duplicate Failed")
assert(BuySellStock.solve([7, 1, 5, 3, 6, 4]) == 5, "Buy Sell Stock Failed")
assert(MaxSubarray.solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6, "Max Subarray Failed")
assert(LongestSubstringWithoutRepeating.solve("abcabcbb") == 3, "Longest Substring Failed")
assert(ProductExceptSelf.solve([1, 2, 3, 4]) == [24, 12, 8, 6], "Product Except Self Failed")

print("✅ Day 1 — Arrays & Hashing: All 6 Tests Passed!")
