# 🚀 Swift 6 Data Structures & Algorithms (DSA) Preparation Guide

A comprehensive, publication-grade collection of **NeetCode 150 Problems** and **40 Core Technical Interview Problems** implemented in **Swift 6**.

This repository is organized into dedicated curriculum modules:
- 📘 **`NeetCode150/`**: Complete 150-problem NeetCode study guide, ReportLab PDF manuals, DOCX field guide, and interactive web visualizer studio.
- 🎓 **`Swift7DayDSA/`**: 40-problem 7-Day DSA curriculum, Easy-to-Hard ReportLab PDF manual, generator script, and interactive web visualizer studio.
- 📱 **Xcode Playgrounds**: Interactive test assertions and line-by-line logical comments (`WBD_7Day_DSAPrep.playground` & `Top20InterviewQuestions.playground`).

---

## 🌟 Key Features

1. **Complete Swift 6 Implementations**: Production-ready, idiomatic Swift code for all data structures and interview algorithm patterns.
2. **Interactive Animation Studios**:
   - Web applications featuring 3D spring physics animations for Array pointers, Linked List node chains, SVG Binary Trees, 2D Grid BFS/DFS waves, and Dynamic Programming tables.
   - Speed control slider, play/pause controls, step forward/backward, and custom input execution.
3. **High-Contrast PDF Study Guides**:
   - Xcode Light theme syntax highlighting (`#AD3DA4` keywords, `#1C6B89` types, `#2E5AAC` numbers).
   - Clickable LeetCode URLs (`[🔗 Open LeetCode Problem]`) embedded on every problem header.
   - Defer-rendered running header lines and `Page X of Y` page numbering.
4. **Sequenced Easy ➔ Medium ➔ Hard**: Structured ordering for systematic interview preparation.

---

## 📂 Repository Contents

```
DSA/
├── Swift7DayDSA/                        # 🎓 7-Day Curriculum (40 Core Solved Problems)
│   ├── Swift_7Day_DSA_Preparation_Guide.pdf # 📄 Easy-to-Hard Sequenced PDF Reference Guide
│   ├── generate_pdf_guide.py            # 🐍 ReportLab PDF generator script (40 Problems)
│   ├── index.html                       # 🌐 Interactive Web Visualizer Studio
│   ├── index.css                        # 🎨 Visualizer CSS design system
│   └── app.js                           # ⚡ 40-problem visualizer state engine
│
├── NeetCode150/                         # 📘 NeetCode 150 Swift Field Guide & Visualizer
│   ├── NeetCode_150_Complete_Master_Guide.pdf   # 📄 Full 150-problem ReportLab PDF Master Guide
│   ├── NeetCode_150_Part1_Problems_1_to_75.pdf  # 📄 Part 1 ReportLab PDF (Problems #1 to #75)
│   ├── NeetCode_150_Part2_Problems_76_to_150.pdf # 📄 Part 2 ReportLab PDF (Problems #76 to #150)
│   ├── NeetCode150-Swift-FieldGuide-Complete.docx
│   ├── NeetCode150-Swift-FieldGuide-Complete.pdf
│   ├── generate_all_150_pdfs.py        # 🐍 ReportLab PDF generator script (NeetCode 150)
│   └── index.html                       # 🌐 NeetCode 150 Web Visualizer Studio
│
├── Top20InterviewQuestions.playground  # 📱 Xcode Playground (Top 20 Interview Problems)
├── WBD_7Day_DSAPrep.playground         # 📱 Xcode Playground (40 Curriculum Problems)
└── README.md                            # 📖 Project documentation
```

---

## 💻 Getting Started

### 1. View Interactive Web Visualizers
- **7-Day DSA 40-Problem Visualizer**:
  ```bash
  open Swift7DayDSA/index.html
  ```
- **NeetCode 150 Visualizer**:
  ```bash
  open NeetCode150/index.html
  ```

### 2. Open Xcode Playgrounds
Open `WBD_7Day_DSAPrep.playground` or `Top20InterviewQuestions.playground` in Xcode to run interactive test assertions:
```bash
open WBD_7Day_DSAPrep.playground
```

### 3. Generate PDF Manuals
Re-build high-contrast PDF manuals using Python 3 and ReportLab:
- **7-Day DSA PDF**:
  ```bash
  cd Swift7DayDSA && python3 generate_pdf_guide.py
  ```
- **NeetCode 150 PDFs**:
  ```bash
  cd NeetCode150 && python3 generate_all_150_pdfs.py
  ```

---

## 📜 License

This project is licensed under the **MIT License** — free to use for study, interview preparation, and personal projects.
