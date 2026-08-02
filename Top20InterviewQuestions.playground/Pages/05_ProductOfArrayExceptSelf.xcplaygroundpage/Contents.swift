//: [Previous](@previous) | [Next](@next)
/*:
 # 5. Product of Array Except Self
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the
 product of all the elements of `nums` except `nums[i]`.
 You must write an algorithm that runs in **O(N)** time and **without using the division operator**.
 
 **Time Complexity:** O(N) - Two passes over array of length N.
 **Space Complexity:** O(1) - Extra auxiliary space (the returned array does not count as extra space per problem spec).
*/

import Foundation

class ProductOfArrayExceptSelf {
    /// Computes array of products except self.
    /// - Parameter nums: Input array of integers.
    /// - Returns: Array where element i is product of all elements except nums[i].
    static func productExceptSelf(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var result = Array(repeating: 1, count: n)
        
        // Pass 1: Accumulate prefix products from left to right
        var leftProduct = 1
        for i in 0..<n {
            result[i] = leftProduct
            leftProduct *= nums[i]
        }
        
        // Pass 2: Accumulate suffix products from right to left while multiplying into result
        var rightProduct = 1
        for i in (0..<n).reversed() {
            result[i] *= rightProduct
            rightProduct *= nums[i]
        }
        
        return result
    }
}

// MARK: - Verification / Test Cases
let res1 = ProductOfArrayExceptSelf.productExceptSelf([1, 2, 3, 4])
assert(res1 == [24, 12, 8, 6], "Test Case 1 Failed: Got \(res1)")

let res2 = ProductOfArrayExceptSelf.productExceptSelf([-1, 1, 0, -3, 3])
assert(res2 == [0, 0, 9, 0, 0], "Test Case 2 Failed: Got \(res2)")

print("✅ Page 05: Product of Array Except Self - All Test Cases Passed!")
