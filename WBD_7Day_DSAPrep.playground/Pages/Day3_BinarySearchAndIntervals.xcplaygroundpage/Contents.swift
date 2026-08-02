//: [Previous](@previous) | [Next](@next)
/*:
 # Day 3 — Binary Search, Sorting & Intervals
 **Core Focus:** Binary search templates, Rotated array boundaries, Interval merging
 
 **Problems Covered:**
 1. Binary Search (Easy)
 2. Search in Rotated Sorted Array (Medium)
 3. Find Minimum in Rotated Sorted Array (Medium)
 4. Koko Eating Bananas (Medium)
 5. Merge Intervals (Medium)
 6. Insert Interval (Medium)
 7. Non-Overlapping Intervals / Meeting Rooms (Medium)
*/

import Foundation

// MARK: - 1. Binary Search
/*
 **Problem:** Standard O(log N) binary search.
 **Time:** O(log N) | **Space:** O(1)
*/
class BinarySearch {
    static func solve(_ nums: [Int], _ target: Int) -> Int {
        var left = 0, right = nums.count - 1
        while left <= right {
            let mid = left + (right - left) / 2
            if nums[mid] == target { return mid }
            else if nums[mid] < target { left = mid + 1 }
            else { right = mid - 1 }
        }
        return -1
    }
}

// MARK: - 2. Search in Rotated Sorted Array
/*
 **Problem:** Search target in rotated sorted array of distinct integers.
 **Time:** O(log N) | **Space:** O(1)
*/
class SearchRotated {
    static func solve(_ nums: [Int], _ target: Int) -> Int {
        var left = 0, right = nums.count - 1
        while left <= right {
            let mid = left + (right - left) / 2
            if nums[mid] == target { return mid }
            
            if nums[left] <= nums[mid] { // Left half sorted
                if nums[left] <= target && target < nums[mid] { right = mid - 1 }
                else { left = mid + 1 }
            } else { // Right half sorted
                if nums[mid] < target && target <= nums[right] { left = mid + 1 }
                else { right = mid - 1 }
            }
        }
        return -1
    }
}

// MARK: - 3. Find Minimum in Rotated Sorted Array
/*
 **Problem:** Find minimum element in rotated sorted array.
 **Time:** O(log N) | **Space:** O(1)
*/
class FindMinRotated {
    static func solve(_ nums: [Int]) -> Int {
        var left = 0, right = nums.count - 1
        while left < right {
            let mid = left + (right - left) / 2
            if nums[mid] > nums[right] {
                left = mid + 1 // Minimum is in the right unsorted portion
            } else {
                right = mid // Minimum is at mid or in left half
            }
        }
        return nums[left]
    }
}

// MARK: - 4. Koko Eating Bananas
/*
 **Problem:** Find minimum integer speed k to eat all bananas within h hours.
 **Time:** O(N log(MaxPiles)) | **Space:** O(1)
*/
class KokoEatingBananas {
    static func minEatingSpeed(_ piles: [Int], _ h: Int) -> Int {
        var left = 1
        var right = piles.max() ?? 1
        var result = right
        
        while left <= right {
            let k = left + (right - left) / 2
            var hoursSpent = 0
            for pile in piles {
                hoursSpent += (pile + k - 1) / k // Ceiling division (pile / k)
            }
            
            if hoursSpent <= h {
                result = k // k is fast enough, try smaller speed
                right = k - 1
            } else {
                left = k + 1 // k is too slow, increase speed
            }
        }
        return result
    }
}

// MARK: - 5. Merge Intervals
/*
 **Problem:** Merge overlapping intervals.
 **Time:** O(N log N) | **Space:** O(N)
*/
class MergeIntervals {
    static func solve(_ intervals: [[Int]]) -> [[Int]] {
        guard intervals.count > 1 else { return intervals }
        let sorted = intervals.sorted { $0[0] < $1[0] }
        var result = [[Int]]()
        var current = sorted[0]
        
        for next in sorted.dropFirst() {
            if next[0] <= current[1] {
                current[1] = max(current[1], next[1])
            } else {
                result.append(current)
                current = next
            }
        }
        result.append(current)
        return result
    }
}

// MARK: - 6. Insert Interval
/*
 **Problem:** Insert newInterval into sorted non-overlapping intervals and merge if necessary.
 **Time:** O(N) | **Space:** O(N)
*/
class InsertInterval {
    static func solve(_ intervals: [[Int]], _ newInterval: [Int]) -> [[Int]] {
        var result = [[Int]]()
        var newInt = newInterval
        var i = 0
        let n = intervals.count
        
        // Step 1: Add all intervals ending before newInterval starts
        while i < n && intervals[i][1] < newInt[0] {
            result.append(intervals[i])
            i += 1
        }
        
        // Step 2: Merge overlapping intervals with newInterval
        while i < n && intervals[i][0] <= newInt[1] {
            newInt[0] = min(newInt[0], intervals[i][0])
            newInt[1] = max(newInt[1], intervals[i][1])
            i += 1
        }
        result.append(newInt)
        
        // Step 3: Add remaining intervals starting after merged newInterval ends
        while i < n {
            result.append(intervals[i])
            i += 1
        }
        return result
    }
}

// MARK: - 7. Non-Overlapping Intervals (Meeting Rooms Pattern)
/*
 **Problem:** Find minimum number of intervals to remove to make remaining non-overlapping.
 **Time:** O(N log N) | **Space:** O(1)
*/
class NonOverlappingIntervals {
    static func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        guard !intervals.isEmpty else { return 0 }
        // Greedy choice: sort by end times
        let sorted = intervals.sorted { $0[1] < $1[1] }
        var removals = 0
        var lastEnd = sorted[0][1]
        
        for interval in sorted.dropFirst() {
            if interval[0] < lastEnd {
                removals += 1 // Overlap detected; erase current interval
            } else {
                lastEnd = interval[1]
            }
        }
        return removals
    }
}

// MARK: - Test Cases Execution
assert(BinarySearch.solve([-1, 0, 3, 5, 9, 12], 9) == 4, "Binary Search Failed")
assert(SearchRotated.solve([4, 5, 6, 7, 0, 1, 2], 0) == 4, "Search Rotated Failed")
assert(FindMinRotated.solve([3, 4, 5, 1, 2]) == 1, "Find Min Rotated Failed")
assert(KokoEatingBananas.minEatingSpeed([3, 6, 7, 11], 8) == 4, "Koko Bananas Failed")
assert(MergeIntervals.solve([[1, 3], [2, 6], [8, 10]]) == [[1, 6], [8, 10]], "Merge Intervals Failed")
assert(InsertInterval.solve([[1, 3], [6, 9]], [2, 5]) == [[1, 5], [6, 9]], "Insert Interval Failed")
assert(NonOverlappingIntervals.eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]) == 1, "Non Overlapping Failed")

print("✅ Day 3 — Binary Search, Sorting & Intervals: All 7 Tests Passed!")
