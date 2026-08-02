---
name: pdf-guide-generator
description: Generate professional PDF reference manuals and study guides using ReportLab in Python with Xcode-inspired Swift syntax highlighting, high-contrast code boxes, clickable LeetCode hyperlinks, running header/footer canvas page numbering, and structured tables. Use whenever the user requests PDF documents, DSA study guides, or Swift code manuals.
metadata:
  model: inherit
---

## Purpose
Create publication-grade PDF documents for Swift codebases, Data Structures & Algorithms (DSA) study guides, and technical reference manuals using Python and `reportlab`.

## Core Capabilities & Architectural Patterns

### 1. Two-Pass Running Canvas for Page Numbers ("Page X of Y")
Use a custom `canvas.Canvas` subclass to defer rendering top headers and bottom footers until all document pages are processed:

```python
from reportlab.pdfgen import canvas
from reportlab.lib import colors

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Suppress headers/footers on title cover page
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#475569"))
        self.drawString(54, 750, "DOCUMENT TITLE — RUNNING HEADER")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(54, 742, 558, 742)
        
        self.setFont("Helvetica", 8)
        self.drawString(54, 36, "Swift 6 | Technical Reference Manual")
        self.drawRightString(558, 36, f"Page {self._pageNumber} of {page_count}")
        self.line(54, 48, 558, 48)
        self.restoreState()
```

### 2. Swift 6 Syntax Highlighting Engine
Format Swift code tokens with exact Xcode Light editor colors in ReportLab HTML Paragraphs:

- **Keywords** (`func`, `var`, `let`, `class`, `guard`, `else`, `return`, `if`, `for`, `in`, `while`, `static`, `private`): `#AD3DA4` (Xcode Pink/Purple)
- **Data Types** (`Int`, `String`, `Bool`, `Character`, `ListNode`, `TreeNode`, `Node`, `Set`, `Array`): `#1C6B89` (Xcode Teal)
- **Comments** (`// comment text`): `#5D6C79` (Muted Slate Green)
- **Numbers / Range Literals** (`0`, `1`, `-1`): `#2E5AAC` (Xcode Blue)

```python
import html, re

def highlight_swift(code_str):
    keywords = {"class", "struct", "func", "var", "let", "guard", "else", "return", "if", "for", "in", "while", "static", "private", "nil", "true", "false"}
    types = {"Int", "String", "Bool", "Character", "ListNode", "TreeNode", "Node", "Set", "Array"}
    
    lines = code_str.split("\n")
    highlighted_lines = []
    for line in lines:
        leading_spaces = len(line) - len(line.lstrip(' '))
        indent = "&nbsp;" * leading_spaces
        content = line.strip()
        if not content:
            highlighted_lines.append("")
            continue
        comment_part = ""
        if "//" in content:
            idx = content.find("//")
            comment_part = content[idx:]
            content = content[:idx]
        tokens = re.split(r'(\W+)', content)
        out = []
        for tok in tokens:
            if not tok: continue
            esc_tok = html.escape(tok)
            if tok in keywords: out.append(f'<font color="#AD3DA4"><b>{esc_tok}</b></font>')
            elif tok in types: out.append(f'<font color="#1C6B89"><b>{esc_tok}</b></font>')
            elif tok.isdigit() or (tok.startswith('-') and tok[1:].isdigit()): out.append(f'<font color="#2E5AAC"><b>{esc_tok}</b></font>')
            else: out.append(esc_tok)
        line_html = indent + "".join(out)
        if comment_part: line_html += f' <font color="#5D6C79"><i>{html.escape(comment_part)}</i></font>'
        highlighted_lines.append(line_html)
    return "<br/>".join(highlighted_lines)
```

### 3. Clickable LeetCode Problem Hyperlinks
Render clickable problem links inside section headers:
```python
title_html = f"<b>{esc(title)}</b> &nbsp;&nbsp; <a href=\"{url}\"><font color=\"#2563EB\"><u>[🔗 Open LeetCode Problem]</u></font></a>"
story.append(Paragraph(title_html, styles['ProblemHeader']))
```

### 4. High-Contrast Xcode Light Theme Container
Always use light high-contrast backgrounds (`#F8FAFC`) with crisp slate borders (`#CBD5E1`) so code is 100% visible and sharp on all PDF readers:

```python
styles.add(ParagraphStyle(
    'SwiftCodeBox',
    parent=styles['Normal'],
    fontName='Courier',
    fontSize=8,
    leading=10.5,
    textColor=colors.HexColor("#0F172A"),
    backColor=colors.HexColor("#F8FAFC"),
    borderColor=colors.HexColor("#CBD5E1"),
    borderWidth=0.75,
    borderPadding=6,
    spaceBefore=4,
    spaceAfter=6
))
```

### 5. Page Break Protection
Wrap multi-element problem sections inside `KeepTogether(element_list)` to prevent orphan titles or code blocks split across page breaks.
