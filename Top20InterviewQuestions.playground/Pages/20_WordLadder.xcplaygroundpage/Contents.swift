//: [Previous](@previous)
/*:
 # 20. Word Ladder
 **Difficulty:** Hard
 
 **Problem Statement:**
 A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList`
 is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
 - Every adjacent pair of words differs by exactly one letter.
 - Every `si` for `1 <= i <= k` is in `wordList`. (Note `beginWord` does not need to be in `wordList`).
 - `sk == endWord`.
 Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words**
 in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no such sequence exists.
 
 **Time Complexity:** O(M^2 * N) - Where M is word length and N is total words in wordList.
 **Space Complexity:** O(M^2 * N) - Storage for intermediate generic word patterns in adjacency list dictionary.
*/

import Foundation

class WordLadder {
    /// Computes length of shortest transformation sequence using BFS.
    /// - Parameters:
    ///   - beginWord: Starting word.
    ///   - endWord: Target word.
    ///   - wordList: List of valid transformation dictionary words.
    /// - Returns: Number of words in shortest path (including start and end), or 0 if unreachable.
    static func ladderLength(_ beginWord: String, _ endWord: String, _ wordList: [String]) -> Int {
        var wordSet = Set(wordList)
        guard wordSet.contains(endWord) else { return 0 }
        
        let wordLength = beginWord.count
        let alphabet = Array("abcdefghijklmnopqrstuvwxyz")
        
        // Queue for BFS storing (currentWord, pathLength)
        var queue: [(String, Int)] = [(beginWord, 1)]
        
        // Remove beginWord if it exists in wordSet to prevent cycles
        wordSet.remove(beginWord)
        
        while !queue.isEmpty {
            let (currentWord, stepCount) = queue.removeFirst()
            
            if currentWord == endWord {
                return stepCount
            }
            
            var wordChars = Array(currentWord)
            
            // Try mutating each character position to a-z
            for i in 0..<wordLength {
                let originalChar = wordChars[i]
                
                for char in alphabet {
                    if char == originalChar { continue }
                    
                    wordChars[i] = char
                    let nextWord = String(wordChars)
                    
                    // If nextWord is present in remaining wordSet
                    if wordSet.contains(nextWord) {
                        wordSet.remove(nextWord) // Mark visited by removing from set
                        queue.append((nextWord, stepCount + 1))
                    }
                }
                
                // Revert character back to original before testing next position
                wordChars[i] = originalChar
            }
        }
        
        return 0
    }
}

// MARK: - Verification / Test Cases
let res1 = WordLadder.ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
assert(res1 == 5, "Test Case 1 Failed: Expected 5 (hit -> hot -> dot -> dog -> cog), got \(res1)")

let res2 = WordLadder.ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log"])
assert(res2 == 0, "Test Case 2 Failed: endWord 'cog' not in wordList should return 0")

print("✅ Page 20: Word Ladder - All Test Cases Passed!")
