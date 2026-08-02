//: [Previous](@previous) | [Next](@next)
/*:
 # Day 5 — Graphs
 **Core Focus:** BFS/DFS graph traversals, Visited tracking, Multi-source BFS, Topological sort
 
 **Problems Covered:**
 1. Number of Islands (Medium)
 2. Clone Graph (Medium)
 3. Course Schedule (Medium)
 4. Rotting Oranges (Medium)
 5. Pacific Atlantic Water Flow (Medium)
 6. Graph Valid Tree (Medium)
*/

import Foundation

// MARK: - Graph Node Definition for Clone Graph
public class Node {
    public var val: Int
    public var neighbors: [Node]
    public init(_ val: Int) {
        self.val = val
        self.neighbors = []
    }
}

// MARK: - 1. Number of Islands
/*
 **Problem:** Count connected components of 1s in 2D binary grid.
 **Time:** O(M * N) | **Space:** O(M * N)
*/
class NumberOfIslands {
    static func numIslands(_ grid: [[Character]]) -> Int {
        guard !grid.isEmpty else { return 0 }
        var gridCopy = grid
        let rows = gridCopy.count, cols = gridCopy[0].count
        var count = 0
        
        for r in 0..<rows {
            for c in 0..<cols {
                if gridCopy[r][c] == "1" {
                    count += 1
                    dfs(&gridCopy, r, c, rows, cols)
                }
            }
        }
        return count
    }
    
    private static func dfs(_ grid: inout [[Character]], _ r: Int, _ c: Int, _ rows: Int, _ cols: Int) {
        if r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == "0" { return }
        grid[r][c] = "0" // Sink visited land
        dfs(&grid, r + 1, c, rows, cols)
        dfs(&grid, r - 1, c, rows, cols)
        dfs(&grid, r, c + 1, rows, cols)
        dfs(&grid, r, c - 1, rows, cols)
    }
}

// MARK: - 2. Clone Graph
/*
 **Problem:** Deep copy connected undirected graph.
 **Time:** O(V + E) | **Space:** O(V)
*/
class CloneGraph {
    static func clone(_ node: Node?) -> Node? {
        guard let node = node else { return nil }
        var visited = [Int: Node]()
        
        func dfs(_ curr: Node) -> Node {
            if let cloned = visited[curr.val] { return cloned }
            let copy = Node(curr.val)
            visited[curr.val] = copy
            for neighbor in curr.neighbors {
                copy.neighbors.append(dfs(neighbor))
            }
            return copy
        }
        return dfs(node)
    }
}

// MARK: - 3. Course Schedule
/*
 **Problem:** Detect cycles in directed prerequisite graph (Topological Sort / Kahn's algorithm).
 **Time:** O(V + E) | **Space:** O(V + E)
*/
class CourseSchedule {
    static func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
        var inDegree = Array(repeating: 0, count: numCourses)
        var adj = [Int: [Int]]()
        for p in prerequisites {
            adj[p[1], default: []].append(p[0])
            inDegree[p[0]] += 1
        }
        var queue = [Int]()
        for i in 0..<numCourses where inDegree[i] == 0 { queue.append(i) }
        
        var count = 0
        while !queue.isEmpty {
            let curr = queue.removeFirst()
            count += 1
            if let neighbors = adj[curr] {
                for neighbor in neighbors {
                    inDegree[neighbor] -= 1
                    if inDegree[neighbor] == 0 { queue.append(neighbor) }
                }
            }
        }
        return count == numCourses
    }
}

// MARK: - 4. Rotting Oranges
/*
 **Problem:** Minimum minutes until no fresh orange remains (Multi-Source BFS).
 **Time:** O(M * N) | **Space:** O(M * N)
*/
class RottingOranges {
    static func orangesRotting(_ grid: [[Int]]) -> Int {
        var gridCopy = grid
        let rows = gridCopy.count, cols = gridCopy[0].count
        var queue = [(Int, Int)]()
        var freshCount = 0
        
        for r in 0..<rows {
            for c in 0..<cols {
                if gridCopy[r][c] == 2 { queue.append((r, c)) }
                else if gridCopy[r][c] == 1 { freshCount += 1 }
            }
        }
        
        if freshCount == 0 { return 0 }
        var minutes = 0
        let directions = [(1,0), (-1,0), (0,1), (0,-1)]
        
        while !queue.isEmpty && freshCount > 0 {
            minutes += 1
            let levelSize = queue.count
            for _ in 0..<levelSize {
                let (r, c) = queue.removeFirst()
                for (dr, dc) in directions {
                    let nr = r + dr, nc = c + dc
                    if nr >= 0 && nc >= 0 && nr < rows && nc < cols && gridCopy[nr][nc] == 1 {
                        gridCopy[nr][nc] = 2
                        freshCount -= 1
                        queue.append((nr, nc))
                    }
                }
            }
        }
        return freshCount == 0 ? minutes : -1
    }
}

// MARK: - 5. Pacific Atlantic Water Flow
/*
 **Problem:** Find grid cells where water can flow to both Pacific and Atlantic oceans.
 **Time:** O(M * N) | **Space:** O(M * N)
*/
class PacificAtlantic {
    static func solve(_ heights: [[Int]]) -> [[Int]] {
        guard !heights.isEmpty else { return [] }
        let rows = heights.count, cols = heights[0].count
        var pacific = Array(repeating: Array(repeating: false, count: cols), count: rows)
        var atlantic = Array(repeating: Array(repeating: false, count: cols), count: rows)
        
        func dfs(_ r: Int, _ c: Int, _ visited: inout [[Bool]], _ prevHeight: Int) {
            if r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || heights[r][c] < prevHeight { return }
            visited[r][c] = true
            dfs(r + 1, c, &visited, heights[r][c])
            dfs(r - 1, c, &visited, heights[r][c])
            dfs(r, c + 1, &visited, heights[r][c])
            dfs(r, c - 1, &visited, heights[r][c])
        }
        
        for c in 0..<cols {
            dfs(0, c, &pacific, heights[0][c])
            dfs(rows - 1, c, &atlantic, heights[rows - 1][c])
        }
        for r in 0..<rows {
            dfs(r, 0, &pacific, heights[r][0])
            dfs(r, cols - 1, &atlantic, heights[r][cols - 1])
        }
        
        var res = [[Int]]()
        for r in 0..<rows {
            for c in 0..<cols {
                if pacific[r][c] && atlantic[r][c] { res.append([r, c]) }
            }
        }
        return res
    }
}

// MARK: - 6. Graph Valid Tree
/*
 **Problem:** Determine if n nodes with edges form a valid tree (connected, no cycles).
 **Time:** O(V + E) | **Space:** O(V + E)
*/
class GraphValidTree {
    static func validTree(_ n: Int, _ edges: [[Int]]) -> Bool {
        // A valid tree with n nodes must have exactly n - 1 edges
        if edges.count != n - 1 { return false }
        
        var adj = [Int: [Int]]()
        for e in edges {
            adj[e[0], default: []].append(e[1])
            adj[e[1], default: []].append(e[0])
        }
        
        var visited = Set<Int>()
        func dfs(_ curr: Int, _ parent: Int) -> Bool {
            if visited.contains(curr) { return false }
            visited.insert(curr)
            if let neighbors = adj[curr] {
                for neighbor in neighbors {
                    if neighbor == parent { continue }
                    if !dfs(neighbor, curr) { return false }
                }
            }
            return true
        }
        
        return dfs(0, -1) && visited.count == n
    }
}

// MARK: - Test Cases Execution
let islandGrid: [[Character]] = [["1","1","0"],["1","1","0"],["0","0","1"]]
assert(NumberOfIslands.numIslands(islandGrid) == 2, "Num Islands Failed")

let g1 = Node(1)
let g2 = Node(2)
g1.neighbors.append(g2)
g2.neighbors.append(g1)
let cloned = CloneGraph.clone(g1)
assert(cloned?.val == 1 && cloned?.neighbors.first?.val == 2, "Clone Graph Failed")

assert(CourseSchedule.canFinish(2, [[1, 0]]) == true, "Course Schedule Failed")

let oranges = [[2,1,1],[1,1,0],[0,1,1]]
assert(RottingOranges.orangesRotting(oranges) == 4, "Rotting Oranges Failed")

let heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
assert(PacificAtlantic.solve(heights).count > 0, "Pacific Atlantic Failed")

assert(GraphValidTree.validTree(5, [[0,1],[0,2],[0,3],[1,4]]) == true, "Graph Valid Tree Failed")

print("✅ Day 5 — Graphs: All 6 Tests Passed!")
