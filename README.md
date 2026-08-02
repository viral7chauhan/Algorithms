# 🚀 Swift 6 Data Structures & Algorithms (DSA) Preparation Guide

A comprehensive, publication-grade collection of **40 Curated Technical Interview Problems** implemented in **Swift 6**.

This open repository includes:
- 📱 **Xcode Playgrounds** with unit test assertions and line-by-line logical comments (`WBD_7Day_DSAPrep.playground` & `Top20InterviewQuestions.playground`).
- 🌐 **Interactive Web Visualizer Studio** (`index.html`) featuring 3D spring animations, step-by-step playback controls, and Swift 6 code inspection.
- 📄 **Xcode Light Theme PDF Reference Manual** (`Swift_7Day_DSA_Preparation_Guide.pdf`) with high-contrast code containers, running headers/footers (`Page X of Y`), and 100% clickable LeetCode problem URLs.

---

## 🌟 Key Features

1. **Complete Swift 6 Implementations**: Production-ready, idiomatic Swift code for core data structures and interview algorithm patterns.
2. **Interactive Animation Studio**:
   - Web application with 3D spring physics animations for Array pointers, Linked List node chains, SVG Binary Trees, 2D Grid BFS/DFS waves, and Dynamic Programming tables.
   - Speed control slider, play/pause controls, step forward/backward, and custom input execution.
3. **High-Contrast PDF Study Guide**:
   - Xcode Light theme syntax highlighting (`#AD3DA4` keywords, `#1C6B89` types, `#2E5AAC` numbers).
   - Clickable LeetCode URLs (`[🔗 Open LeetCode Problem]`) embedded on every problem header.
   - Defer-rendered running header lines and `Page X of Y` page numbering.
4. **Structured 7-Day Curriculum**: Sequenced progression through fundamental DSA concepts.

---

## 📂 Repository Contents

```
DSA/
├── NeetCode150/                         # 📘 NeetCode 150 Swift Field Guide & Visualizer
│   ├── NeetCode150-Swift-FieldGuide-Complete.docx
│   └── index.html
│
├── index.html                           # 🌐 Interactive Web Visualizer Studio (7-Day DSA)
├── index.css                            # 🎨 Design system & layout styles
├── app.js                               # ⚡ 40-problem visualizer state engine
│
├── Swift_7Day_DSA_Preparation_Guide.pdf # 📄 Full 7-Day Curriculum PDF Reference Guide
│
├── Top20InterviewQuestions.playground  # 📱 Xcode Playground (Top 20 Interview Problems)
├── WBD_7Day_DSAPrep.playground         # 📱 Xcode Playground (40 Curriculum Problems)
│
├── generate_pdf_guide.py                # 🐍 ReportLab PDF generator script
└── README.md                            # 📖 Project documentation
```

---

## 💻 Getting Started

### 1. View Interactive Web Visualizer
Simply open `index.html` in any web browser:
```bash
open index.html
```

### 2. Open Xcode Playgrounds
Open `WBD_7Day_DSAPrep.playground` or `Top20InterviewQuestions.playground` in Xcode to run interactive test assertions:
```bash
open WBD_7Day_DSAPrep.playground
```

### 3. Generate PDF Manual
Re-build the high-contrast PDF manual using Python 3 and ReportLab:
```bash
pip install reportlab
python3 generate_pdf_guide.py
```

---

## 📜 License

This project is licensed under the **MIT License** — free to use for study, interview preparation, and personal projects.
