//: [Previous](@previous) | [Next](@next)
/*:
 # 4. Longest Substring Without Repeating Characters
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given a string `s`, find the length of the longest substring without repeating characters.
 
 **Time Complexity:** O(N) - Each character is processed at most twice by expanding and shrinking sliding window bounds.
 **Space Complexity:** O(min(N, M)) - Space for sliding window hash map, where M is the size of the character alphabet.
*/

import Foundation

class LongestSubstringWithoutRepeatingCharacters {
    /// Calculates length of longest substring with unique characters.
    /// - Parameter s: The input string.
    /// - Returns: Length of the longest substring with no duplicate characters.
    static func lengthOfLongestSubstring(_ s: String) -> Int {
        // Convert string to array of Character for O(1) indexed iteration
        let chars = Array(s)
        var charMap: [Character: Int] = [:]
        var maxLen = 0
        var left = 0
        
        for (right, char) in chars.enumerated() {
            // If character was seen inside current window, jump left boundary past its last seen location
            if let lastSeen = charMap[char], lastSeen >= left {
                left = lastSeen + 1
            }
            
            // Record / update character's most recent index position
            charMap[char] = right
            
            // Update maximum substring length found so far
            maxLen = max(maxLen, right - left + 1)
        }
        
        return maxLen
    }
}

// MARK: - Verification / Test Cases
assert(LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("abcabcbb") == 3, "Test Case 1 Failed (abc)")
assert(LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("bbbbb") == 1, "Test Case 2 Failed (b)")
assert(LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("pwwkew") == 3, "Test Case 3 Failed (wke)")
assert(LongestSubstringWithoutRepeatingCharacters.lengthOfLongestSubstring("") == 0, "Test Case 4 Failed (empty)")

print("✅ Page 04: Longest Substring Without Repeating Characters - All Test Cases Passed!")
