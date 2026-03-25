# Slide Layout Patterns

Each layout below includes the CSS class and an HTML example. Add layout-specific CSS to the `<style>` block in the output file.

## Quick Reference

| Use Case | Layout | Class |
|---|---|---|
| Opening | 1. Title | `.slide-title` |
| Outline with timing | 2. Agenda | `.slide-agenda` |
| Section divider | 3. Centered | `.slide-centered` |
| Feature + visual | 4. Two-Column | `.two-col` |
| Compare 3 options | 5. Three-Card Grid | `.three-grid` |
| Feature matrix | 6. Comparison Table | `.comparison-table` |
| Demo placeholder | 7. Live Demo | `.slide-demo` |
| Conversation example | 8. Chat Mock | `.chat-container` |
| Key takeaways | 9. Recap Grid | `.recap-grid` |
| Thank you / links | 10. Closing | `.slide-closing` |
| Process / steps | 11. Decision Flow | `.decision-flow` |
| Product tiers | 12. Model Cards | `.model-grid` |

---

## 1. Title Slide — `.slide-title`

Opening slide with event branding, gradient title, and metadata pills.

```css
.slide-title {
    background: linear-gradient(135deg, #0a1628 0%, #0f0f14 50%, #0a1628 100%);
    text-align: center;
}
.slide-title .event-branding {
    font-size: 1rem; color: var(--accent-teal);
    text-transform: uppercase; letter-spacing: 3px; font-weight: 600; margin-bottom: 1.5rem;
}
.slide-title h1 {
    font-size: 3rem; font-weight: 700; margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--accent-coral) 0%, var(--accent-gold) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.slide-title .subtitle { font-size: 1.4rem; color: var(--text-secondary); margin-bottom: 2rem; }
.slide-title .meta { display: flex; justify-content: center; gap: 2rem; font-size: 0.95rem; color: var(--text-secondary); }
.slide-title .meta span {
    background: rgba(255,255,255,0.06); padding: 0.5rem 1.2rem;
    border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
}
```

```html
<section class="slide slide-title" data-slide-number="1">
    <div class="event-branding">02Ship &bull; Event Name</div>
    <h1>Presentation Title</h1>
    <p class="subtitle">Subtitle or tagline</p>
    <div class="meta">
        <span>45 min</span>
        <span>Location 2026</span>
        <span>02ship.com</span>
    </div>
</section>
```

---

## 2. Agenda — `.slide-agenda`

Numbered list with time allocations.

```css
.slide-agenda { text-align: left; padding: 3rem 4rem; }
.slide-agenda h2 { font-size: 2.2rem; margin-bottom: 2rem; }
.agenda-list { display: flex; flex-direction: column; gap: 1rem; max-width: 700px; }
.agenda-item {
    display: flex; align-items: center; gap: 1.25rem;
    padding: 0.9rem 1.25rem; background: rgba(255,255,255,0.04);
    border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);
}
.agenda-item .num {
    width: 36px; height: 36px; background: var(--accent-teal); color: var(--bg-dark);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 700; flex-shrink: 0; font-size: 0.95rem;
}
.agenda-item .label { font-size: 1.1rem; font-weight: 500; }
.agenda-item .time { margin-left: auto; font-size: 0.85rem; color: var(--text-secondary); white-space: nowrap; }
```

```html
<section class="slide slide-agenda" data-slide-number="2">
    <span class="slide-section">Overview</span>
    <h2>Agenda</h2>
    <div class="agenda-list">
        <div class="agenda-item">
            <div class="num">1</div>
            <span class="label">Section Title</span>
            <span class="time">10 min</span>
        </div>
        <!-- repeat for each section -->
    </div>
</section>
```

---

## 3. Centered — `.slide-centered`

Simple centered text with tagline. Good for section dividers.

```css
.slide-centered { text-align: center; }
.slide-centered h2 { font-size: 2.4rem; margin-bottom: 1rem; }
.slide-centered .tagline {
    font-size: 1.25rem; color: var(--text-secondary);
    max-width: 650px; margin: 0 auto 2rem;
}
```

```html
<section class="slide slide-centered" data-slide-number="3">
    <span class="slide-section">Section Name</span>
    <h2>Section <span class="highlight-text">Highlight</span></h2>
    <p class="tagline">A brief description of what this section covers.</p>
</section>
```

---

## 4. Two-Column — `.two-col`

Feature overview with text left, visual panel right.

```css
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
.two-col h2 { font-size: 2.2rem; margin-bottom: 0.75rem; }
.two-col .lead { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem; }
```

```html
<section class="slide" data-slide-number="4">
    <span class="slide-section">Section &bull; Topic</span>
    <div class="two-col">
        <div>
            <h2>Feature <span class="highlight-text">Name</span></h2>
            <p class="lead">Brief description of the feature.</p>
            <ul class="feature-list">
                <li><span class="check">&#x2713;</span> Feature point one</li>
                <li><span class="check">&#x2713;</span> Feature point two</li>
            </ul>
        </div>
        <div class="visual-panel">
            <h4>Example</h4>
            <!-- Code block, chat mock, or other visual content -->
        </div>
    </div>
</section>
```

---

## 5. Three-Card Grid — `.three-grid`

Compare 3 options, features, or products. Use `.highlight-coral`, `.highlight-teal`, `.highlight-gold` on cards for color coding.

```css
.three-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; max-width: 900px; margin: 0 auto;
}
.card {
    background: rgba(255,255,255,0.05); padding: 1.75rem; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.1); text-align: center;
    transition: transform 0.3s, border-color 0.3s;
}
.card:hover { transform: translateY(-4px); border-color: var(--accent-teal); }
.card .icon { font-size: 2.4rem; margin-bottom: 0.75rem; }
.card h3 { font-size: 1.15rem; margin-bottom: 0.5rem; }
.card p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; }
.card.highlight-coral { border-color: rgba(255, 107, 107, 0.4); background: rgba(255, 107, 107, 0.08); }
.card.highlight-teal  { border-color: rgba(78, 205, 196, 0.4); background: rgba(78, 205, 196, 0.08); }
.card.highlight-gold  { border-color: rgba(255, 217, 61, 0.4); background: rgba(255, 217, 61, 0.08); }
```

```html
<section class="slide slide-centered" data-slide-number="5">
    <span class="slide-section">Section &bull; Comparison</span>
    <h2>Three <span class="highlight-text">Options</span></h2>
    <div class="three-grid">
        <div class="card highlight-coral">
            <div class="icon">&#x1F680;</div>
            <h3>Option A</h3>
            <p>Description of option A.</p>
        </div>
        <div class="card highlight-teal">
            <div class="icon">&#x1F4A1;</div>
            <h3>Option B</h3>
            <p>Description of option B.</p>
        </div>
        <div class="card highlight-gold">
            <div class="icon">&#x2B50;</div>
            <h3>Option C</h3>
            <p>Description of option C.</p>
        </div>
    </div>
</section>
```

---

## 6. Comparison Table — `.comparison-table`

Side-by-side feature comparison with colored headers and `.best` highlights.

```css
.comparison-table {
    width: 100%; max-width: 920px; margin: 0 auto;
    border-collapse: separate; border-spacing: 0; font-size: 0.95rem;
}
.comparison-table th, .comparison-table td {
    padding: 0.9rem 1rem; text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}
.comparison-table thead th { font-weight: 700; font-size: 1rem; padding-bottom: 1rem; }
.comparison-table thead th:nth-child(2) { color: var(--accent-coral); }
.comparison-table thead th:nth-child(3) { color: var(--accent-teal); }
.comparison-table thead th:nth-child(4) { color: var(--accent-gold); }
.comparison-table td:first-child { color: var(--text-secondary); font-weight: 500; }
.comparison-table .best { color: var(--success); font-weight: 600; }
```

```html
<section class="slide" data-slide-number="6">
    <span class="slide-section">Section &bull; Comparison</span>
    <h2 style="text-align:center; margin-bottom:1.5rem;">When to Use <span class="highlight-text">Each</span></h2>
    <table class="comparison-table">
        <thead>
            <tr><th>Scenario</th><th>Option A</th><th>Option B</th><th>Option C</th></tr>
        </thead>
        <tbody>
            <tr><td>Use case 1</td><td class="best">Best fit</td><td>OK</td><td>OK</td></tr>
            <tr><td>Use case 2</td><td>OK</td><td class="best">Best fit</td><td>OK</td></tr>
        </tbody>
    </table>
</section>
```

---

## 7. Live Demo — `.slide-demo`

Demo placeholder with badge and numbered steps.

```css
.slide-demo {
    text-align: center;
    background: linear-gradient(135deg, #1a1a24 0%, var(--bg-slide) 100%);
}
.slide-demo h2 { font-size: 2.5rem; margin-bottom: 1rem; }
.slide-demo .demo-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--accent-coral), var(--accent-gold));
    color: var(--bg-dark); padding: 0.75rem 2rem; border-radius: 50px;
    font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;
}
.slide-demo .demo-agenda { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.slide-demo .demo-step {
    background: rgba(255,255,255,0.06); padding: 1rem 1.5rem;
    border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); min-width: 160px;
}
.slide-demo .demo-step .step-num { font-size: 0.8rem; color: var(--accent-teal); font-weight: 600; margin-bottom: 0.25rem; }
.slide-demo .demo-step p { font-size: 0.95rem; }
```

```html
<section class="slide slide-demo" data-slide-number="7">
    <span class="slide-section">Live Demo</span>
    <div class="demo-badge">LIVE DEMO</div>
    <h2>Demo Title</h2>
    <div class="demo-agenda">
        <div class="demo-step"><div class="step-num">Step 1</div><p>Do this</p></div>
        <div class="demo-step"><div class="step-num">Step 2</div><p>Then this</p></div>
        <div class="demo-step"><div class="step-num">Step 3</div><p>Finally this</p></div>
    </div>
</section>
```

---

## 8. Chat Mock — `.chat-container`

Simulated conversation between user and assistant.

```css
.chat-container {
    max-width: 600px; margin: 0 auto;
    display: flex; flex-direction: column; gap: 0.75rem;
}
.chat-message { display: flex; gap: 0.75rem; align-items: flex-start; }
.chat-message.user { flex-direction: row-reverse; }
.chat-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 600; font-size: 0.8rem; flex-shrink: 0;
}
.chat-message.user .chat-avatar { background: var(--accent-coral); }
.chat-message.assistant .chat-avatar { background: var(--accent-teal); }
.chat-bubble {
    background: rgba(255,255,255,0.08); padding: 0.85rem 1.1rem;
    border-radius: 14px; max-width: 75%; font-size: 0.95rem; line-height: 1.5;
}
.chat-message.user .chat-bubble { background: rgba(255, 107, 107, 0.15); border: 1px solid rgba(255, 107, 107, 0.3); }
.chat-message.assistant .chat-bubble { background: rgba(78, 205, 196, 0.15); border: 1px solid rgba(78, 205, 196, 0.3); }
```

```html
<!-- Use inside a .visual-panel or standalone -->
<div class="chat-container">
    <div class="chat-message user">
        <div class="chat-avatar">You</div>
        <div class="chat-bubble">User's question here</div>
    </div>
    <div class="chat-message assistant">
        <div class="chat-avatar">C</div>
        <div class="chat-bubble">Claude's response here</div>
    </div>
</div>
```

---

## 9. Recap Grid — `.recap-grid`

Key takeaways in numbered boxes (2-column grid).

```css
.recap-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem; max-width: 800px; margin: 0 auto;
}
.recap-item {
    background: rgba(255,255,255,0.05); padding: 1.25rem 1.5rem;
    border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
    text-align: left; display: flex; gap: 1rem; align-items: flex-start;
}
.recap-item .number {
    width: 32px; height: 32px; background: var(--accent-teal); color: var(--bg-dark);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 700; flex-shrink: 0;
}
.recap-item p { font-size: 1rem; }
```

```html
<section class="slide slide-centered" data-slide-number="N">
    <span class="slide-section">Recap</span>
    <h2>Key <span class="highlight-text">Takeaways</span></h2>
    <div class="recap-grid">
        <div class="recap-item">
            <div class="number">1</div>
            <p>First takeaway point</p>
        </div>
        <div class="recap-item">
            <div class="number">2</div>
            <p>Second takeaway point</p>
        </div>
        <!-- 3, 4, etc. -->
    </div>
</section>
```

---

## 10. Closing — `.slide-closing`

Thank-you slide with gradient background and resource links.

```css
.slide-closing {
    text-align: center;
    background: linear-gradient(135deg, var(--accent-coral) 0%, var(--accent-teal) 100%);
}
.slide-closing h2 { font-size: 2.5rem; margin-bottom: 0.75rem; }
.slide-closing p { font-size: 1.2rem; margin-bottom: 1.5rem; opacity: 0.9; }
.slide-closing .links { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; }
.slide-closing .link-item {
    background: rgba(255,255,255,0.2); padding: 1.25rem 2rem;
    border-radius: 12px; min-width: 180px;
}
.slide-closing .link-item .icon { font-size: 1.8rem; margin-bottom: 0.4rem; }
.slide-closing .link-item p { font-size: 0.95rem; margin: 0; }
```

```html
<section class="slide slide-closing" data-slide-number="N">
    <h2>Thank You!</h2>
    <p>Questions? Let's connect.</p>
    <div class="links">
        <div class="link-item">
            <div class="icon">&#x1F310;</div>
            <p>02ship.com</p>
        </div>
        <div class="link-item">
            <div class="icon">&#x1F4AC;</div>
            <p>Discord</p>
        </div>
        <div class="link-item">
            <div class="icon">&#x1F4BB;</div>
            <p>GitHub</p>
        </div>
    </div>
</section>
```

---

## 11. Decision Flow — `.decision-flow`

Horizontal flow diagram with arrows connecting decision nodes.

```css
.decision-flow {
    display: flex; justify-content: center; align-items: center;
    gap: 1rem; flex-wrap: wrap; margin-top: 1rem;
}
.decision-node {
    background: rgba(255,255,255,0.06); padding: 1rem 1.5rem;
    border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
    text-align: center; min-width: 130px;
}
.decision-node .label { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.25rem; }
.decision-node .value { font-size: 1rem; font-weight: 600; }
.decision-arrow { font-size: 1.4rem; color: var(--accent-teal); }
```

```html
<div class="decision-flow">
    <div class="decision-node">
        <div class="label">Step 1</div>
        <div class="value">Start Here</div>
    </div>
    <span class="decision-arrow">&#x2192;</span>
    <div class="decision-node">
        <div class="label">Step 2</div>
        <div class="value">Then This</div>
    </div>
    <span class="decision-arrow">&#x2192;</span>
    <div class="decision-node">
        <div class="label">Step 3</div>
        <div class="value">Result</div>
    </div>
</div>
```

---

## 12. Model/Product Cards — `.model-grid`

Three-column grid with colored top borders. Use `.haiku`, `.sonnet`, `.opus` (or custom) for color coding.

```css
.model-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; max-width: 900px; margin: 0 auto;
}
.model-card {
    background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.1); text-align: center;
}
.model-card h3 { font-size: 1.3rem; margin-bottom: 0.35rem; }
.model-card .model-tag { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
.model-card p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; }
.model-card.haiku  { border-top: 3px solid var(--accent-teal); }
.model-card.sonnet { border-top: 3px solid var(--accent-coral); }
.model-card.opus   { border-top: 3px solid var(--accent-gold); }
```

```html
<section class="slide slide-centered" data-slide-number="N">
    <span class="slide-section">Models</span>
    <h2>Choose Your <span class="highlight-text">Model</span></h2>
    <div class="model-grid">
        <div class="model-card haiku">
            <h3>Haiku</h3>
            <p class="model-tag">Fast &amp; Lightweight</p>
            <p>Best for simple tasks.</p>
        </div>
        <div class="model-card sonnet">
            <h3>Sonnet</h3>
            <p class="model-tag">Balanced</p>
            <p>Best for most tasks.</p>
        </div>
        <div class="model-card opus">
            <h3>Opus</h3>
            <p class="model-tag">Most Capable</p>
            <p>Best for complex tasks.</p>
        </div>
    </div>
</section>
```
