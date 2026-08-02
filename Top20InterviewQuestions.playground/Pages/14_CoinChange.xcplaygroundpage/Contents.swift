//: [Previous](@previous) | [Next](@next)
/*:
 # 14. Coin Change
 **Difficulty:** Medium
 
 **Problem Statement:**
 You are given an integer array `coins` representing coins of different denominations and an integer `amount`
 representing a total amount of money.
 Return the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up
 by any combination of the coins, return `-1`.
 You may assume that you have an infinite number of each kind of coin.
 
 **Time Complexity:** O(Amount * Coins.count) - For each amount from 1 to Amount, we iterate over all available coin denominations.
 **Space Complexity:** O(Amount) - 1D Dynamic Programming array `dp` of size `amount + 1`.
*/

import Foundation

class CoinChange {
    /// Computes minimum coins needed to achieve target amount.
    /// - Parameters:
    ///   - coins: Available coin values.
    ///   - amount: Target amount.
    /// - Returns: Minimum count of coins, or -1 if impossible.
    static func coinChange(_ coins: [Int], _ amount: Int) -> Int {
        guard amount > 0 else { return 0 }
        
        // Sentinel value for unreachable amounts (amount + 1 is effectively infinity)
        let maxVal = amount + 1
        var dp = Array(repeating: maxVal, count: amount + 1)
        
        // Base case: 0 amount requires 0 coins
        dp[0] = 0
        
        // Build DP table bottom-up from 1 to amount
        for i in 1...amount {
            for coin in coins {
                if i - coin >= 0 {
                    dp[i] = min(dp[i], dp[i - coin] + 1)
                }
            }
        }
        
        // Return result if amount was reachable, else -1
        return dp[amount] > amount ? -1 : dp[amount]
    }
}

// MARK: - Verification / Test Cases
assert(CoinChange.coinChange([1, 2, 5], 11) == 3, "Test Case 1 Failed: Expected 3 (5 + 5 + 1)")
assert(CoinChange.coinChange([2], 3) == -1, "Test Case 2 Failed: Expected -1")
assert(CoinChange.coinChange([1], 0) == 0, "Test Case 3 Failed: Expected 0")

print("✅ Page 14: Coin Change - All Test Cases Passed!")
