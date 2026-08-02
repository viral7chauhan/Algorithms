# 🚀 Swift 6 Data Structures & Algorithms (DSA) & NeetCode 150 Master Guide

A comprehensive, publication-grade collection of **150 NeetCode Problems** and **40 Curated Technical Interview Problems** implemented in **Swift 6**.

This open repository includes:
- 📱 **Xcode Playgrounds** with unit test assertions and line-by-line logical comments.
- 🌐 **Interactive Web Visualizer Studios** (`index.html` & `neetcode_visualizer.html`) featuring 3D spring animations, step-by-step playback controls, and Swift 6 code inspection.
- 📄 **Xcode Light Theme PDF Reference Manuals** with high-contrast code containers, running headers/footers (`Page X of Y`), and 100% clickable LeetCode problem URLs.

---

## 🌟 Key Features

1. **Complete Swift 6 Implementations**: Production-ready, idiomatic Swift code for all 150 NeetCode problems and 40 core interview problems.
2. **Interactive Animation Studio**:
   - Web application with 3D spring physics animations for Array pointers, Linked List node chains, SVG Binary Trees, 2D Grid BFS/DFS waves, and Dynamic Programming tables.
   - Speed control slider, play/pause controls, step forward/backward, and custom array input execution.
3. **High-Contrast PDF Study Guides**:
   - Xcode Light theme syntax highlighting (`#AD3DA4` keywords, `#1C6B89` types, `#2E5AAC` numbers).
   - Clickable LeetCode URLs (`[🔗 Open LeetCode Problem]`) embedded on every problem header.
   - Defer-rendered running header lines and `Page X of Y` page numbering.
4. **Sequenced Easy ➔ Medium ➔ Hard (#1 to #150)**: Structured ordering for systematic interview preparation.

---

## 📂 Repository Contents

```
DSA/
├── neetcode_visualizer.html    # 🌐 Interactive Web Visualizer for NeetCode 150
├── neetcode_style.css          # 🎨 Glassmorphism & 3D CSS animation styling
├── neetcode_app.js             # ⚡ Complete 150-problem visualizer state engine
│
├── index.html                  # 🌐 7-Day Curriculum Interactive Visualizer
├── index.css                   # 🎨 Design system & layout styles
├── app.js                      # ⚡ 40-problem visualizer state engine
│
├── NeetCode_150_Complete_Master_Guide.pdf   # 📄 Full 150-problem PDF Master Guide
├── NeetCode_150_Part1_Problems_1_to_75.pdf  # 📄 Part 1 PDF (Problems #1 to #75)
├── NeetCode_150_Part2_Problems_76_to_150.pdf # 📄 Part 2 PDF (Problems #76 to #150)
├── WarnerBrosDiscovery_7Day_DSA_Preparation_Guide.pdf # 📄 7-Day Prep Guide PDF
│
├── Top20InterviewQuestions.playground       # 📱 Xcode Playground (Top 20 Problems)
├── WBD_7Day_DSAPrep.playground              # 📱 Xcode Playground (40 Curriculum Problems)
│
├── generate_all_150_pdfs.py     # 🐍 ReportLab PDF generator script (NeetCode 150)
├── generate_pdf_guide.py        # 🐍 ReportLab PDF generator script (40 Prep Problems)
└── README.md                    # 📖 Project documentation
```

---

## 💻 Getting Started

### 1. View Interactive Web Visualizer
Simply open `neetcode_visualizer.html` or `index.html` in any web browser:
```bash
open neetcode_visualizer.html
```

### 2. Open Xcode Playgrounds
Open `WBD_7Day_DSAPrep.playground` or `Top20InterviewQuestions.playground` in Xcode to run interactive test assertions:
```bash
open WBD_7Day_DSAPrep.playground
```

### 3. Generate PDF Manuals
Re-build the high-contrast PDF manuals using Python 3 and ReportLab:
```bash
pip install reportlab
python3 generate_all_150_pdfs.py
```

---

## 📊 NeetCode 150 Topic Roadmap

- **Arrays & Hashing**: Contains Duplicate, Valid Anagram, Two Sum, Group Anagrams, Top K Frequent, Product Except Self, Valid Sudoku, Encode/Decode Strings, Longest Consecutive Sequence.
- **Two Pointers**: Valid Palindrome, Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water.
- **Sliding Window**: Buy/Sell Stock, Longest Substring Without Repeating, Character Replacement, Permutation in String, Min Window Substring, Sliding Window Maximum.
- **Stack**: Valid Parentheses, Min Stack, Evaluate RPN, Generate Parentheses, Daily Temperatures, Car Fleet, Largest Rectangle in Histogram.
- **Binary Search**: Binary Search, Search 2D Matrix, Koko Eating Bananas, Find Min in Rotated Array, Search in Rotated Array, Time Map, Median of Two Sorted Arrays.
- **Linked List**: Reverse List, Merge Two Lists, Reorder List, Remove Nth Node, Copy List with Random Pointer, Add Two Numbers, Linked List Cycle, Find Duplicate, LRU Cache, Merge K Sorted Lists, Reverse Nodes in K-Group.
- **Trees**: Invert Tree, Max Depth, Diameter, Balanced Tree, Same Tree, Subtree, LCA of BST, Level Order Traversal, Right Side View, Count Good Nodes, Validate BST, Kth Smallest BST, Construct Tree, Max Path Sum, Serialize & Deserialize Tree.
- **Tries**: Implement Trie, Add/Search Word, Word Search II.
- **Heap / Priority Queue**: Kth Largest Stream, Last Stone Weight, K Closest Points, Kth Largest Element, Task Scheduler, Design Twitter, Find Median from Data Stream.
- **Backtracking**: Subsets, Combination Sum, Permutations, Subsets II, Combination Sum II, Word Search, Palindrome Partitioning, Letter Combinations, N-Queens.
- **Graphs**: Number of Islands, Max Area of Island, Clone Graph, Walls & Gates, Rotting Oranges, Pacific Atlantic, Surrounded Regions, Course Schedule I & II, Graph Valid Tree, Connected Components, Redundant Connection, Word Ladder.
- **Advanced Graphs**: Reconstruct Itinerary, Min Cost Connect Points, Swim in Rising Water, Alien Dictionary, Cheapest Flights, Network Delay Time.
- **1D Dynamic Programming**: Climbing Stairs, Min Cost Climbing Stairs, House Robber I & II, Longest Palindromic Substring, Palindromic Substrings, Decode Ways, Coin Change, Max Product Subarray, Word Break, LIS, Partition Equal Subset Sum.
- **2D Dynamic Programming**: Unique Paths, LCS, Stock Cooldown, Coin Change II, Target Sum, Interleaving String, Longest Increasing Path, Distinct Subsequences, Edit Distance, Burst Balloons, Regular Expression Matching.
- **Greedy**: Max Subarray, Jump Game I & II, Gas Station, Hand of Straights, Merge Triplets, Partition Labels, Valid Parenthesis String.
- **Intervals**: Insert Interval, Merge Intervals, Non-Overlapping Intervals, Meeting Rooms I & II, Min Interval for Query.
- **Math & Geometry**: Rotate Image, Spiral Matrix, Set Matrix Zeroes, Happy Number, Pow(x,n), Multiply Strings, Detect Squares.
- **Bit Manipulation**: Single Number, Number of 1 Bits, Counting Bits, Reverse Bits, Missing Number, Sum of Two Integers, Reverse Integer, Bitwise AND of Numbers Range.

---

## 📜 License

This project is licensed under the **MIT License** — free to use for study, interview preparation, and personal projects.
