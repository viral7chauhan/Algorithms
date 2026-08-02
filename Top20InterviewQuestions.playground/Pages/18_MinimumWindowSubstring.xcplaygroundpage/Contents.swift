//: [Previous](@previous) | [Next](@next)
/*:
 # 18. Minimum Window Substring
 **Difficulty:** Hard
 
 **Problem Statement:**
 Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring**
 of `s` such that every character in `t` (including duplicates) is included in the window.
 If there is no such substring, return the empty string `""`.
 
 **Time Complexity:** O(|S| + |T|) - Right and left pointers advance at most |S| times.
 **Space Complexity:** O(|S| + |T|) - Hash maps storing character frequencies for ASCII alphabet.
*/

import Foundation

class MinimumWindowSubstring {
    /// Returns smallest substring in s that contains all characters in t.
    /// - Parameters:
    ///   - s: Source string.
    ///   - t: Target pattern string.
    /// - Returns: Smallest window substring or empty string.
    static func minWindow(_ s: String, _ t: String) -> String {
        guard !s.isEmpty && !t.isEmpty && s.count >= t.count else { return "" }
        
        // Count frequencies of characters required by string t
        var targetCounts: [Character: Int] = [:]
        for char in t {
            targetCounts[char, default: 0] += 1
        }
        
        let requiredUniqueCount = targetCounts.count
        var formedUniqueCount = 0
        
        var windowCounts: [Character: Int] = [:]
        
        let sChars = Array(s)
        var left = 0
        var right = 0
        
        // Output result tuple: (length, startIdx, endIdx)
        var minLen = Int.max
        var minLeft = 0
        var minRight = 0
        
        while right < sChars.count {
            let char = sChars[right]
            windowCounts[char, default: 0] += 1
            
            // Check if current character satisfies required count in target
            if let reqCount = targetCounts[char], windowCounts[char] == reqCount {
                formedUniqueCount += 1
            }
            
            // Try shrinking window from left while it remains valid
            while left <= right && formedUniqueCount == requiredUniqueCount {
                let currentWindowLen = right - left + 1
                
                // Update overall minimum window tracking
                if currentWindowLen < minLen {
                    minLen = currentWindowLen
                    minLeft = left
                    minRight = right
                }
                
                // Remove leftmost character from sliding window
                let leftChar = sChars[left]
                windowCounts[leftChar, default: 0] -= 1
                if let reqCount = targetCounts[leftChar], windowCounts[leftChar]! < reqCount {
                    formedUniqueCount -= 1
                }
                
                left += 1
            }
            
            right += 1
        }
        
        return minLen == Int.max ? "" : String(sChars[minLeft...minRight])
    }
}

// MARK: - Verification / Test Cases
assert(MinimumWindowSubstring.minWindow("ADOBECODEBANC", "ABC") == "BANC", "Test Case 1 Failed: Expected BANC")
assert(MinimumWindowSubstring.minWindow("a", "a") == "a", "Test Case 2 Failed")
assert(MinimumWindowSubstring.minWindow("a", "aa") == "", "Test Case 3 Failed: Should return empty string")

print("✅ Page 18: Minimum Window Substring - All Test Cases Passed!")
