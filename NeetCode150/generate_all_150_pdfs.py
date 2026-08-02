import os
import sys
import html
import re
import json
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from build_full_neetcode150_dataset import dataset

def esc(text):
    return html.escape(str(text))

def highlight_swift(code_str):
    keywords = {
        "class", "struct", "func", "var", "let", "guard", "else", "return", "if", "for", "in", "while",
        "static", "private", "public", "nil", "true", "false", "inout", "default", "break", "continue",
        "switch", "case", "import", "dropFirst", "reversed", "enumerated", "append", "min", "max",
        "swapAt", "removeFirst", "removeLast", "filter"
    }
    types = {
        "Int", "String", "Bool", "Character", "ListNode", "TreeNode", "Node", "Set", "Array",
        "TrieNode", "Trie", "MedianFinder", "LRUCache", "MinStack", "GraphNode"
    }
    
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
        out_tokens = []
        for token in tokens:
            if not token:
                continue
            esc_token = html.escape(token)
            if token in keywords:
                out_tokens.append(f'<font color="#AD3DA4"><b>{esc_token}</b></font>')
            elif token in types:
                out_tokens.append(f'<font color="#1C6B89"><b>{esc_token}</b></font>')
            elif token.isdigit() or (token.startswith('-') and token[1:].isdigit()):
                out_tokens.append(f'<font color="#2E5AAC"><b>{esc_token}</b></font>')
            else:
                out_tokens.append(esc_token)
                
        line_html = indent + "".join(out_tokens)
        if comment_part:
            esc_comment = html.escape(comment_part)
            line_html += f' <font color="#5D6C79"><i>{esc_comment}</i></font>'
            
        highlighted_lines.append(line_html)
        
    return "<br/>".join(highlighted_lines)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, doc_title, *args, **kwargs):
        self.doc_title = doc_title
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
            return
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        self.drawString(54, 750, f"NEETCODE 150 — {self.doc_title.upper()}")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(54, 742, 558, 742)
        
        self.setFont("Helvetica", 8)
        self.drawString(54, 36, f"NeetCode 150 | {self.doc_title} | Swift 6 Solutions")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_str)
        self.line(54, 48, 558, 48)
        self.restoreState()

def generate_pdf(filename, subtitle, prob_list):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=64
    )
    
    styles = getSampleStyleSheet()
    PRIMARY = colors.HexColor("#0F172A")
    SECONDARY = colors.HexColor("#0369A1")
    ACCENT = colors.HexColor("#0284C7")
    TEXT_COLOR = colors.HexColor("#1E293B")
    
    styles.add(ParagraphStyle('CoverTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, leading=28, textColor=PRIMARY, spaceAfter=10))
    styles.add(ParagraphStyle('CoverSubtitle', parent=styles['Normal'], fontName='Helvetica', fontSize=12, leading=16, textColor=SECONDARY, spaceAfter=16))
    styles.add(ParagraphStyle('SectionHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=PRIMARY, spaceBefore=12, spaceAfter=6, keepWithNext=True))
    styles.add(ParagraphStyle('ProblemHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=13.5, textColor=SECONDARY, spaceBefore=8, spaceAfter=3, keepWithNext=True))

    styles['BodyText'].fontName = 'Helvetica'
    styles['BodyText'].fontSize = 8.5
    styles['BodyText'].leading = 12
    styles['BodyText'].textColor = TEXT_COLOR
    styles['BodyText'].spaceAfter = 3

    styles.add(ParagraphStyle('LogicText', parent=styles['BodyText'], fontName='Helvetica-Oblique', textColor=colors.HexColor("#334155"), spaceAfter=3))
    styles.add(ParagraphStyle('SwiftCodeBox', parent=styles['Normal'], fontName='Courier', fontSize=7.5, leading=9.5, textColor=colors.HexColor("#0F172A"), backColor=colors.HexColor("#F8FAFC"), borderColor=colors.HexColor("#CBD5E1"), borderWidth=0.75, borderPadding=5, spaceBefore=3, spaceAfter=5))

    story = []

    # Cover Page
    story.append(Spacer(1, 20))
    story.append(Paragraph("NEETCODE 150 CURRICULUM", ParagraphStyle('Tag', fontName='Helvetica-Bold', fontSize=11, textColor=ACCENT, spaceAfter=4)))
    story.append(Paragraph(f"Swift 6 Master Manual<br/>{esc(subtitle)}", styles['CoverTitle']))
    story.append(Paragraph("Complete Swift 6 Code Solutions with Xcode Syntax Highlighting & Clickable LeetCode Problem URLs", styles['CoverSubtitle']))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=0, spaceAfter=12))
    
    meta_data = [
        [Paragraph(f"<b>Volume:</b> {esc(subtitle)}", styles['BodyText']), Paragraph(f"<b>Problems Count:</b> {len(prob_list)} Solved Problems", styles['BodyText'])],
        [Paragraph("<b>Language:</b> Swift 6 Idiomatic Code", styles['BodyText']), Paragraph("<b>Hyperlinks:</b> 100% Direct LeetCode URLs", styles['BodyText'])]
    ]
    t_meta = Table(meta_data, colWidths=[250, 254])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1"))
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 12))

    # 📋 Problem Index & Quick Reference Catalog Page
    story.append(Paragraph("📋 Problem Index & Quick Reference Catalog", styles['SectionHeader']))
    story.append(HRFlowable(width="100%", thickness=1, color=SECONDARY, spaceBefore=2, spaceAfter=8))
    
    idx_styles = ParagraphStyle('IdxText', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=9.5, textColor=TEXT_COLOR)
    idx_header_style = ParagraphStyle('IdxHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor("#FFFFFF"))

    idx_data = [[
        Paragraph("<b>#</b>", idx_header_style),
        Paragraph("<b>Problem Title</b>", idx_header_style),
        Paragraph("<b>Category</b>", idx_header_style),
        Paragraph("<b>Difficulty</b>", idx_header_style)
    ]]

    for prob in prob_list:
        seq, title, cat, diff, url, logic, code, time_c, space_c = prob
        diff_color = "#16A34A" if diff == "Easy" else ("#D97706" if diff == "Medium" else "#DC2626")
        title_p = Paragraph(f"<a href=\"{url}\"><font color=\"#0284C7\"><b>{esc(title)}</b></font></a>", idx_styles)
        diff_p = Paragraph(f"<font color=\"{diff_color}\"><b>{esc(diff)}</b></font>", idx_styles)
        idx_data.append([
            Paragraph(f"<b>#{seq}</b>", idx_styles),
            title_p,
            Paragraph(esc(cat), idx_styles),
            diff_p
        ])

    t_idx = Table(idx_data, colWidths=[28, 226, 180, 70], repeatRows=1)
    t_idx_style = [
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('PADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1"))
    ]
    for i in range(1, len(idx_data)):
        if i % 2 == 0:
            t_idx_style.append(('BACKGROUND', (0, i), (-1, i), colors.HexColor("#F8FAFC")))
    t_idx.setStyle(TableStyle(t_idx_style))
    story.append(t_idx)
    story.append(PageBreak())

    current_diff = ""
    current_cat = ""
    for prob in prob_list:
        seq, title, cat, diff, url, logic, code, time_c, space_c = prob
        
        # Difficulty Tier Section Header
        if diff != current_diff:
            current_diff = diff
            current_cat = ""
            diff_icon = "🟢" if diff == "Easy" else ("🟡" if diff == "Medium" else "🔴")
            diff_banner = f"{diff_icon} {diff.upper()} LEVEL PROBLEMS"
            story.append(Spacer(1, 10))
            story.append(Paragraph(diff_banner, styles['SectionHeader']))
            story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=8))

        # Category Sub-header
        if cat != current_cat:
            current_cat = cat
            story.append(Paragraph(f"• {esc(cat)}", ParagraphStyle('SubCatHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=SECONDARY, spaceBefore=8, spaceAfter=4, keepWithNext=True)))
            
        p_elem = []
        title_html = f"<b>#{seq}. {esc(title)} ({esc(diff)})</b> &nbsp;&nbsp;&nbsp; <a href=\"{url}\"><font color=\"#0284C7\"><u>[🔗 Open LeetCode Problem]</u></font></a>"
        p_elem.append(Paragraph(title_html, styles['ProblemHeader']))
        p_elem.append(Paragraph(f"<b>Logic:</b> {esc(logic)}", styles['LogicText']))
        
        highlighted_code = highlight_swift(code)
        p_elem.append(Paragraph(highlighted_code, styles['SwiftCodeBox']))
        
        comp_table = Table([[
            Paragraph(f"<b>Time Complexity:</b> {esc(time_c)}", styles['BodyText']),
            Paragraph(f"<b>Space Complexity:</b> {esc(space_c)}", styles['BodyText'])
        ]], colWidths=[250, 254])
        comp_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
            ('PADDING', (0,0), (-1,-1), 3),
            ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1"))
        ]))
        p_elem.append(comp_table)
        p_elem.append(Spacer(1, 6))
        
        story.append(KeepTogether(p_elem))

    canvas_factory = lambda *args, **kwargs: NumberedCanvas(subtitle, *args, **kwargs)
    doc.build(story, canvasmaker=canvas_factory)
    print(f"Successfully generated: {filename}")

if __name__ == "__main__":
    diff_order = {"Easy": 0, "Medium": 1, "Hard": 2}
    
    # Sort dataset by Easy -> Medium -> Hard, preserving relative sequence
    sequenced_dataset = sorted(dataset, key=lambda p: (diff_order.get(p[3], 99), p[0]))
    
    # Re-number sequence from #1 to #150
    renumbered_dataset = []
    for idx, item in enumerate(sequenced_dataset, 1):
        _, title, cat, diff, url, logic, code, time_c, space_c = item
        renumbered_dataset.append((idx, title, cat, diff, url, logic, code, time_c, space_c))

    # Generate Part 1: Easy & core Mediums (#1 to #75)
    generate_pdf("NeetCode_150_Part1_Problems_1_to_75.pdf", "Part 1 — Easy to Core Medium (#1 to #75)", renumbered_dataset[:75])
    
    # Generate Part 2: Mediums & Hards (#76 to #150)
    generate_pdf("NeetCode_150_Part2_Problems_76_to_150.pdf", "Part 2 — Advanced Medium to Hard (#76 to #150)", renumbered_dataset[75:])
    
    # Generate Complete Easy-to-Hard Sequenced Master PDF (#1 to #150)
    generate_pdf("NeetCode_150_Complete_Master_Guide.pdf", "Easy-to-Hard Sequenced Master Guide (#1 to #150)", renumbered_dataset)

