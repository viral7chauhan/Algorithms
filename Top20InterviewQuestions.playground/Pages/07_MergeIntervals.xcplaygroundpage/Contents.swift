//: [Previous](@previous) | [Next](@next)
/*:
 # 7. Merge Intervals
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals,
 and return an array of the non-overlapping intervals that cover all the intervals in the input.
 
 **Time Complexity:** O(N log N) - Dominated by sorting the array of N intervals.
 **Space Complexity:** O(N) - Storage space for output and Swift sort algorithm.
*/

import Foundation

class MergeIntervals {
    /// Merges overlapping interval pairs.
    /// - Parameter intervals: Array of intervals `[[start, end]]`.
    /// - Returns: Array of merged non-overlapping intervals.
    static func merge(_ intervals: [[Int]]) -> [[Int]] {
        guard intervals.count > 1 else { return intervals }
        
        // Sort intervals by their starting times
        let sortedIntervals = intervals.sorted { $0[0] < $1[0] }
        var result: [[Int]] = []
        
        // Initialize current interval with the first sorted interval
        var currentInterval = sortedIntervals[0]
        
        for nextInterval in sortedIntervals.dropFirst() {
            // Check for overlap: next start is <= current end
            if nextInterval[0] <= currentInterval[1] {
                // Overlap exists; extend current end to maximum of both ends
                currentInterval[1] = max(currentInterval[1], nextInterval[1])
            } else {
                // No overlap; save current interval and move to next
                result.append(currentInterval)
                currentInterval = nextInterval
            }
        }
        
        // Append the last accumulated interval
        result.append(currentInterval)
        
        return result
    }
}

// MARK: - Verification / Test Cases
let res1 = MergeIntervals.merge([[1, 3], [2, 6], [8, 10], [15, 18]])
assert(res1 == [[1, 6], [8, 10], [15, 18]], "Test Case 1 Failed: Got \(res1)")

let res2 = MergeIntervals.merge([[1, 4], [4, 5]])
assert(res2 == [[1, 5]], "Test Case 2 Failed: Got \(res2)")

print("✅ Page 07: Merge Intervals - All Test Cases Passed!")
