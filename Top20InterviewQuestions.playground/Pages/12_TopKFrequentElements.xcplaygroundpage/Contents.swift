//: [Previous](@previous) | [Next](@next)
/*:
 # 12. Top K Frequent Elements
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
 You may return the answer in **any order**. Your algorithm's time complexity must be better than O(N log N).
 
 **Time Complexity:** O(N) - Linear time using Bucket Sort where bucket index represents element frequency count.
 **Space Complexity:** O(N) - Space for frequency dictionary and bucket arrays.
*/

import Foundation

class TopKFrequentElements {
    /// Returns the k most frequent elements in nums.
    /// - Parameters:
    ///   - nums: Array of integers.
    ///   - k: Number of top elements to return.
    /// - Returns: Array of length k containing the most frequent elements.
    static func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
        // Step 1: Count frequency of each number
        var frequencyMap: [Int: Int] = [:]
        for num in nums {
            frequencyMap[num, default: 0] += 1
        }
        
        // Step 2: Create buckets where index = frequency count
        // Max frequency is nums.count
        var buckets: [[Int]] = Array(repeating: [], count: nums.count + 1)
        for (num, count) in frequencyMap {
            buckets[count].append(num)
        }
        
        // Step 3: Iterate buckets from highest frequency to lowest to collect top k elements
        var result: [Int] = []
        for i in (0...nums.count).reversed() {
            for num in buckets[i] {
                result.append(num)
                if result.count == k {
                    return result
                }
            }
        }
        
        return result
    }
}

// MARK: - Verification / Test Cases
let res1 = TopKFrequentElements.topKFrequent([1, 1, 1, 2, 2, 3], 2)
assert(Set(res1) == Set([1, 2]), "Test Case 1 Failed: Got \(res1)")

let res2 = TopKFrequentElements.topKFrequent([1], 1)
assert(res2 == [1], "Test Case 2 Failed")

print("✅ Page 12: Top K Frequent Elements - All Test Cases Passed!")
