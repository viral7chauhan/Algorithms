//: [Previous](@previous) | [Next](@next)
/*:
 # 15. Word Break
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a
 space-separated sequence of one or more dictionary words.
 Note that the same word in the dictionary may be reused multiple times in the segmentation.
 
 **Time Complexity:** O(N^2 * L) - Where N is length of string s, and L is max length of words (due to substring slicing and comparison).
 **Space Complexity:** O(N + D) - For DP array of size N + 1 and Hash Set of dictionary words D.
*/

import Foundation

class WordBreak {
    /// Determines if string s can be segmented into words from wordDict.
    /// - Parameters:
    ///   - s: Target string.
    ///   - wordDict: Array of allowed dictionary words.
    /// - Returns: Bool indicating if valid segmentation exists.
    static func wordBreak(_ s: String, _ wordDict: [String]) -> Bool {
        let dict = Set(wordDict)
        let n = s.count
        let chars = Array(s)
        
        // dp[i] represents whether substring s[0..<i] can be segmented
        var dp = Array(repeating: false, count: n + 1)
        
        // Base case: empty string prefix is valid
        dp[0] = true
        
        for i in 1...n {
            for j in 0..<i {
                // If prefix s[0..<j] is valid AND remaining substring s[j..<i] is in dict
                if dp[j] {
                    let sub = String(chars[j..<i])
                    if dict.contains(sub) {
                        dp[i] = true
                        break // Found valid partition for prefix of length i
                    }
                }
            }
        }
        
        return dp[n]
    }
}

// MARK: - Verification / Test Cases
assert(WordBreak.wordBreak("leetcode", ["leet", "code"]) == true, "Test Case 1 Failed")
assert(WordBreak.wordBreak("applepenapple", ["apple", "pen"]) == true, "Test Case 2 Failed")
assert(WordBreak.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]) == false, "Test Case 3 Failed")

print("✅ Page 15: Word Break - All Test Cases Passed!")
