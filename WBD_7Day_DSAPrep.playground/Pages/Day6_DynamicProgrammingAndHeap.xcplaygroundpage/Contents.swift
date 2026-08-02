//: [Previous](@previous) | [Next](@next)
/*:
 # Day 6 — Dynamic Programming & Heap
 **Core Focus:** 1D/2D DP state transitions, Bottom-up tabulation, Min/Max Heap patterns, Bucket Sort
 
 **Problems Covered:**
 1. Climbing Stairs (Easy)
 2. House Robber (Medium)
 3. Coin Change (Medium)
 4. Longest Increasing Subsequence (Medium)
 5. Word Break (Medium)
 6. Kth Largest Element in an Array (Medium)
 7. Top K Frequent Elements (Medium)
*/

import Foundation

// MARK: - 1. Climbing Stairs
/*
 **Problem:** Number of distinct ways to climb n stairs taking 1 or 2 steps.
 **Time:** O(N) | **Space:** O(1)
*/
class ClimbingStairs {
    static func climbStairs(_ n: Int) -> Int {
        if n <= 2 { return n }
        var first = 1, second = 2
        for _ in 3...n {
            let third = first + second
            first = second
            second = third
        }
        return second
    }
}

// MARK: - 2. House Robber
/*
 **Problem:** Max money that can be robbed without alerting police (no 2 adjacent houses).
 **Time:** O(N) | **Space:** O(1)
*/
class HouseRobber {
    static func rob(_ nums: [Int]) -> Int {
        var prev1 = 0 // Represents max money up to i-1
        var prev2 = 0 // Represents max money up to i-2
        for num in nums {
            let current = max(prev1, prev2 + num)
            prev2 = prev1
            prev1 = current
        }
        return prev1
    }
}

// MARK: - 3. Coin Change
/*
 **Problem:** Fewest coins to make up target amount.
 **Time:** O(Amount * Coins) | **Space:** O(Amount)
*/
class CoinChange {
    static func solve(_ coins: [Int], _ amount: Int) -> Int {
        guard amount > 0 else { return 0 }
        var dp = Array(repeating: amount + 1, count: amount + 1)
        dp[0] = 0
        for i in 1...amount {
            for coin in coins {
                if i - coin >= 0 {
                    dp[i] = min(dp[i], dp[i - coin] + 1)
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount]
    }
}

// MARK: - 4. Longest Increasing Subsequence (LIS)
/*
 **Problem:** Length of longest strictly increasing subsequence (Patience sorting / Binary Search).
 **Time:** O(N log N) | **Space:** O(N)
*/
class LongestIncreasingSubsequence {
    static func lengthOfLIS(_ nums: [Int]) -> Int {
        var tails = [Int]() // Stores smallest tail of all increasing subsequences of length i+1
        for num in nums {
            var left = 0, right = tails.count
            while left < right {
                let mid = left + (right - left) / 2
                if tails[mid] < num { left = mid + 1 }
                else { right = mid }
            }
            if left == tails.count { tails.append(num) }
            else { tails[left] = num }
        }
        return tails.count
    }
}

// MARK: - 5. Word Break
/*
 **Problem:** Check if string s can be segmented into words from wordDict.
 **Time:** O(N^2 * L) | **Space:** O(N + D)
*/
class WordBreak {
    static func solve(_ s: String, _ wordDict: [String]) -> Bool {
        let dict = Set(wordDict)
        let n = s.count
        let chars = Array(s)
        var dp = Array(repeating: false, count: n + 1)
        dp[0] = true
        
        for i in 1...n {
            for j in 0..<i {
                if dp[j] && dict.contains(String(chars[j..<i])) {
                    dp[i] = true
                    break
                }
            }
        }
        return dp[n]
    }
}

// MARK: - 6. Kth Largest Element in an Array
/*
 **Problem:** Find kth largest element using QuickSelect.
 **Time:** O(N) average | **Space:** O(1)
*/
class KthLargestElement {
    static func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
        var numsCopy = nums
        let targetIndex = numsCopy.count - k
        
        func quickSelect(_ left: Int, _ right: Int) -> Int {
            if left == right { return numsCopy[left] }
            let pivotIndex = partition(&numsCopy, left, right)
            if pivotIndex == targetIndex { return numsCopy[pivotIndex] }
            else if pivotIndex < targetIndex { return quickSelect(pivotIndex + 1, right) }
            else { return quickSelect(left, pivotIndex - 1) }
        }
        return quickSelect(0, numsCopy.count - 1)
    }
    
    private static func partition(_ nums: inout [Int], _ left: Int, _ right: Int) -> Int {
        let pivot = nums[right]
        var i = left
        for j in left..<right {
            if nums[j] <= pivot {
                nums.swapAt(i, j)
                i += 1
            }
        }
        nums.swapAt(i, right)
        return i
    }
}

// MARK: - 7. Top K Frequent Elements
/*
 **Problem:** Find top k frequent elements using Bucket Sort.
 **Time:** O(N) | **Space:** O(N)
*/
class TopKFrequent {
    static func solve(_ nums: [Int], _ k: Int) -> [Int] {
        var counts = [Int: Int]()
        for num in nums { counts[num, default: 0] += 1 }
        
        var buckets = Array(repeating: [Int](), count: nums.count + 1)
        for (num, freq) in counts { buckets[freq].append(num) }
        
        var res = [Int]()
        for i in (0...nums.count).reversed() {
            for num in buckets[i] {
                res.append(num)
                if res.count == k { return res }
            }
        }
        return res
    }
}

// MARK: - Test Cases Execution
assert(ClimbingStairs.climbStairs(3) == 3, "Climbing Stairs Failed")
assert(HouseRobber.rob([1, 2, 3, 1]) == 4, "House Robber Failed")
assert(CoinChange.solve([1, 2, 5], 11) == 3, "Coin Change Failed")
assert(LongestIncreasingSubsequence.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) == 4, "LIS Failed")
assert(WordBreak.solve("leetcode", ["leet", "code"]) == true, "Word Break Failed")
assert(KthLargestElement.findKthLargest([3, 2, 1, 5, 6, 4], 2) == 5, "Kth Largest Failed")
assert(Set(TopKFrequent.solve([1, 1, 1, 2, 2, 3], 2)) == Set([1, 2]), "Top K Frequent Failed")

print("✅ Day 6 — Dynamic Programming & Heap: All 7 Tests Passed!")
