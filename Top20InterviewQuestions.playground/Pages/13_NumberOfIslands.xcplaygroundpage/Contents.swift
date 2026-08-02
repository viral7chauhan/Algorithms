//: [Previous](@previous) | [Next](@next)
/*:
 # 13. Number of Islands
 **Difficulty:** Medium
 
 **Problem Statement:**
 Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water),
 return the number of islands.
 An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
 You may assume all four edges of the grid are all surrounded by water.
 
 **Time Complexity:** O(M * N) - Every cell in the grid of size M x N is visited at most a constant number of times.
 **Space Complexity:** O(M * N) - In worst case of all land cells, recursion stack depth reaches M * N.
*/

import Foundation

class NumberOfIslands {
    /// Counts number of connected islands in grid.
    /// - Parameter grid: 2D array of Characters ('1' or '0').
    /// - Returns: Count of islands.
    static func numIslands(_ grid: [[Character]]) -> Int {
        guard !grid.isEmpty else { return 0 }
        var gridCopy = grid
        let rows = gridCopy.count
        let cols = gridCopy[0].count
        var islandCount = 0
        
        for r in 0..<rows {
            for c in 0..<cols {
                if gridCopy[r][c] == "1" {
                    islandCount += 1
                    // Sink the island using DFS
                    dfs(&gridCopy, r, c, rows, cols)
                }
            }
        }
        
        return islandCount
    }
    
    /// Depth First Search helper to sink visited land cells.
    private static func dfs(_ grid: inout [[Character]], _ r: Int, _ c: Int, _ rows: Int, _ cols: Int) {
        // Boundary checks and water/visited cell check
        if r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == "0" {
            return
        }
        
        // Sink current land cell by setting to '0'
        grid[r][c] = "0"
        
        // Explore 4 directional neighbors
        dfs(&grid, r - 1, c, rows, cols) // Up
        dfs(&grid, r + 1, c, rows, cols) // Down
        dfs(&grid, r, c - 1, rows, cols) // Left
        dfs(&grid, r, c + 1, rows, cols) // Right
    }
}

// MARK: - Verification / Test Cases
let grid1: [[Character]] = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
assert(NumberOfIslands.numIslands(grid1) == 1, "Test Case 1 Failed")

let grid2: [[Character]] = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
assert(NumberOfIslands.numIslands(grid2) == 3, "Test Case 2 Failed")

print("✅ Page 13: Number of Islands - All Test Cases Passed!")
