//: [Previous](@previous) | [Next](@next)
/*:
 # 16. Course Schedule
 **Difficulty:** Medium
 
 **Problem Statement:**
 There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`.
 You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.
 Return `true` if you can finish all courses. Otherwise, return `false`.
 
 **Time Complexity:** O(V + E) - Where V is numCourses and E is prerequisites count (Kahn's Algorithm BFS).
 **Space Complexity:** O(V + E) - Adjacency list and in-degree array.
*/

import Foundation

class CourseSchedule {
    /// Determines if all courses can be completed using Topological Sort (Kahn's Algorithm).
    /// - Parameters:
    ///   - numCourses: Total course count.
    ///   - prerequisites: Array of prerequisite pairs `[course, prerequisite]`.
    /// - Returns: True if no cycle exists, else False.
    static func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
        var inDegree = Array(repeating: 0, count: numCourses)
        var adjList: [Int: [Int]] = [:]
        
        // Build graph adjacency list and calculate in-degree of each node
        for pre in prerequisites {
            let course = pre[0]
            let prereq = pre[1]
            adjList[prereq, default: []].append(course)
            inDegree[course] += 1
        }
        
        // Queue containing courses with 0 prerequisites (in-degree == 0)
        var queue: [Int] = []
        for i in 0..<numCourses {
            if inDegree[i] == 0 {
                queue.append(i)
            }
        }
        
        var processedCount = 0
        
        // Process queue
        while !queue.isEmpty {
            let current = queue.removeFirst()
            processedCount += 1
            
            // Reduce in-degree for all neighboring courses
            if let neighbors = adjList[current] {
                for neighbor in neighbors {
                    inDegree[neighbor] -= 1
                    if inDegree[neighbor] == 0 {
                        queue.append(neighbor)
                    }
                }
            }
        }
        
        // If all courses were processed, there was no cycle
        return processedCount == numCourses
    }
}

// MARK: - Verification / Test Cases
assert(CourseSchedule.canFinish(2, [[1, 0]]) == true, "Test Case 1 Failed")
assert(CourseSchedule.canFinish(2, [[1, 0], [0, 1]]) == false, "Test Case 2 Failed: Cycle should return false")
assert(CourseSchedule.canFinish(4, [[1, 0], [2, 1], [3, 2]]) == true, "Test Case 3 Failed")

print("✅ Page 16: Course Schedule - All Test Cases Passed!")
