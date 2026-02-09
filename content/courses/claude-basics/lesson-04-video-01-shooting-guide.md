# Video 1 Shooting Guide: Artifacts Explained: Your Code Workspace

**Target Duration:** 12 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "Have you ever asked someone to help you with something, and instead of just explaining it, they actually made the thing for you? That's what artifacts are in Claude. When you ask Claude to build something --- a web page, a diagram, a document --- it doesn't just describe it in text. It creates a finished, usable file in a separate panel, ready for you to download, copy, or preview. Today, I'm going to show you exactly how artifacts work, the different types you'll encounter, and how to use them to bring your ideas to life --- even if you've never touched a line of code."

**Keypoints:**
- Immediately demystify the word "artifact" --- it's just a finished output
- Set expectations: this video covers understanding artifacts, not writing code
- Connect to the journey: they've already learned prompting and iteration, now they see results
- Promise: by the end, they'll generate and open their first artifact

**Visual suggestions:**
- Show yourself on camera (warm, casual, approachable)
- On-screen text: "Artifacts = Finished Products from Claude"
- Brief flash of the Claude interface showing an artifact panel open with code

---

## Section 1: What Are Artifacts? (1:00 - 3:00)

### The Core Concept

**SCRIPT:**
> "Let's start with the basics. When you have a conversation with Claude, most of the time it responds in text --- explanations, ideas, suggestions. But sometimes, what you need isn't an explanation. You need an actual file. A web page. A document. A diagram. That's where artifacts come in. An artifact is a separate panel that appears alongside the conversation. Think of the conversation as your workspace where you discuss ideas, and the artifact panel as your workbench where the finished product appears."

**Keypoints:**
- Text responses = explanations, ideas, discussion
- Artifacts = finished, usable outputs in a separate panel
- The artifact panel appears automatically when Claude generates one
- You can view, copy, download, and iterate on artifacts

**Visual suggestions:**
- Show the Claude interface with a conversation on the left and an artifact on the right
- Draw attention to the separation between chat and artifact
- On-screen text: "Chat = Discussion | Artifact = Product"

### The IKEA Analogy

**SCRIPT:**
> "Here's how I like to think about it. Artifacts are like IKEA furniture. Claude gives you the finished parts --- the code, the structure, the content --- and you just need to know how to assemble them. You don't need to know how to manufacture a table to put one together. Same thing here: you don't need to understand every line of code to use what Claude gives you. You just need to know where to put it and how to open it."

**Keypoints:**
- You don't build from raw materials --- Claude does that
- Your job: take the artifact and use it (save, run, deploy)
- Understanding every detail is not required
- Focus on the end result, not the internals

**Visual suggestions:**
- On-screen graphic: IKEA box analogy (parts inside, instructions included)
- Keep it light and humorous if possible
- On-screen text: "You assemble. Claude manufactures."

---

## Section 2: Types of Artifacts (3:00 - 5:30)

### Overview of Artifact Types

**SCRIPT:**
> "Now, not all artifacts are the same. Claude can create several different types depending on what you ask for. Let me walk you through the most common ones you'll encounter."

#### Code Artifacts (HTML, JavaScript, React)

**SCRIPT:**
> "First, code artifacts. These are the most common. When you ask Claude to build a web page, a calculator, a to-do list, or any interactive element, it generates code in an artifact. This could be plain HTML that you can save and open directly in your browser, or it could be a React component that's part of a larger project. The key thing is: code artifacts are functional. They actually work."

**Keypoints:**
- Most common artifact type
- Can be HTML (simple, open in browser) or React/JavaScript (needs a project setup)
- Claude often provides a live preview within the artifact panel
- You can copy the code, download it, or iterate on it

**What to show on screen:**
- Example of an HTML artifact in Claude (maybe a simple styled page)
- Show the preview/render mode if available
- Point out the copy and download buttons

#### Document Artifacts (Markdown)

**SCRIPT:**
> "Second, documents. If you ask Claude to write a README file, a project plan, or any structured text, it creates a Markdown document artifact. Markdown is just a simple way of formatting text --- headings, bullet points, bold text. You've probably seen it without knowing what it's called."

**Keypoints:**
- Used for documentation, guides, plans, formatted text
- Markdown is simple formatting (no coding required to read)
- Can be saved as .md files
- Great for project documentation, instructions, notes

#### Diagram Artifacts (SVG, Mermaid)

**SCRIPT:**
> "Third, diagrams. You can ask Claude to create flowcharts, process diagrams, architecture overviews --- all sorts of visual representations. These come as SVG images or Mermaid diagrams. SVGs are image files you can download. Mermaid is a simple text format that renders into visual diagrams."

**Keypoints:**
- Flowcharts, process diagrams, org charts, architecture diagrams
- SVG = downloadable image file
- Mermaid = text-based diagram format (renders visually)
- Great for planning and visualizing your project structure

#### When to Use Each Type

**SCRIPT:**
> "So how do you know which type to ask for? Here's the simple rule: if you want something interactive --- a web page, an app, a tool --- ask for code. If you want to document something --- a guide, a plan, a list --- ask for a document. If you want to visualize something --- a process, a structure, a flow --- ask for a diagram. And honestly, if you're not sure, just describe what you want and Claude will pick the right type for you."

**Keypoints:**
- Interactive = code artifact
- Documentation = document artifact
- Visual/structural = diagram artifact
- When in doubt, let Claude decide --- it usually gets it right

**Visual suggestions:**
- Show a simple comparison chart of the three types
- On-screen text: "Interactive? Code. Document? Markdown. Visual? Diagram."
- Quick flash of an example of each type

---

## Section 3: Working with Artifacts (5:30 - 8:00)

### Downloading and Copying

**SCRIPT:**
> "Once Claude generates an artifact, you have a few options for what to do with it. The two most common are copying and downloading. Copying puts the content on your clipboard --- you can then paste it into a text editor, a code file, or wherever you need it. Downloading saves it as an actual file on your computer. For code, you'll usually want to copy and paste into a file with the right name. For diagrams, downloading the SVG is often easier."

**Keypoints:**
- Copy: puts content on clipboard, paste wherever you need
- Download: saves as a file on your computer
- For code: copy into your text editor and save with the right file extension
- For diagrams/images: download directly

**What to show on screen:**
- Click the copy button on an artifact, paste into VS Code
- Click the download button, show the file appearing in your downloads folder
- Show saving a file with the correct extension (.html, .md, .svg)

### Versioning: How Artifacts Update

**SCRIPT:**
> "Here's something really powerful: artifacts are versioned. That means when you ask Claude to make changes to something it already built, it doesn't start from scratch. It updates the existing artifact. You can see version 1, version 2, version 3 --- and you can go back to any previous version if the latest change wasn't what you wanted. Think of it like undo on steroids."

**Keypoints:**
- Claude updates existing artifacts instead of creating new ones
- You can see the version history
- You can navigate back to previous versions
- This connects to the iteration skills from Lesson 3
- It's safe to experiment --- you can always go back

**What to show on screen:**
- Show an artifact being updated after a follow-up prompt
- Point out the version indicator/navigation
- Show going back to a previous version
- On-screen text: "Versioned = Safe to Experiment"

### Previewing Artifacts

**SCRIPT:**
> "For code artifacts, Claude often gives you a live preview right in the panel. This means you can see what your web page or component looks like without ever leaving the conversation. It's incredibly useful for quick checks --- does the layout look right? Are the colors what I expected? Is the text correct? If something's off, you can tell Claude right away and iterate."

**Keypoints:**
- Code artifacts often render a visual preview
- Check layout, colors, text, and structure without leaving Claude
- Use the preview to give Claude specific feedback
- Not all code types support preview (some need local setup --- covered in Video 2)

**Visual suggestions:**
- Show a code artifact with its live preview
- Point out specific elements in the preview
- Show giving feedback based on what the preview looks like

---

## Section 4: Live Demo --- Generating Your First Artifact (8:00 - 11:00)

### Setting Up the Demo

**SCRIPT:**
> "Alright, let's do this together. I'm going to generate a simple artifact right now, step by step, so you can see exactly how it works. We're going to ask Claude to create a simple HTML page --- a personal greeting card. Nothing fancy, but it'll show you the full workflow."

**Keypoints:**
- Use a simple, relatable example (greeting card / personal page)
- Walk through every step slowly
- Narrate everything happening on screen
- Keep the prompt simple and clear

### Writing the Prompt

**SCRIPT:**
> "Here's my prompt: 'Create a simple HTML greeting card page with a nice background color, a heading that says Welcome to My First Web Page, a short paragraph introducing myself, and a button that says Click Me that shows an alert when clicked.' Notice how I'm being specific about what I want --- heading text, a paragraph, a button with behavior. The more specific, the better the artifact."

**What to show on screen:**
- Type or paste the prompt into Claude
- Read it aloud as you type
- On-screen text highlighting the prompt

### Reviewing the Artifact

**SCRIPT:**
> "And there it is --- Claude generated an HTML artifact. Look at the panel on the right: there's the code, and if I click the preview tab, I can see exactly what this page looks like. The heading is there, the paragraph, the background color, and that button. Let me click it --- there's the alert. It works. I just created a web page through a conversation."

**What to show on screen:**
- Show the artifact appearing in the panel
- Switch between code view and preview
- Click the button to demonstrate it works
- Point out each element matching the original prompt

### Iterating on the Artifact

**SCRIPT:**
> "Now let's make it better. I'll say: 'Can you change the background to a gradient, make the heading larger, and add an emoji to the button text?' Watch what happens to the artifact."

**What to show on screen:**
- Type the iteration prompt
- Show the artifact updating (version 2)
- Compare before and after in the preview
- Point out the version indicator

**SCRIPT (continued):**
> "See that? The artifact updated. We're now on version 2. The gradient is there, the heading is bigger, and the button has an emoji. If I didn't like this change, I could go back to version 1. But this looks great. And that's the whole workflow: prompt, review, iterate."

### Saving the Artifact

**SCRIPT:**
> "Now let me show you how to actually use this outside of Claude. I'll click the copy button, open a text editor, paste it in, and save it as 'greeting.html'. Then I double-click the file, and --- there it is in my browser. My web page, created through a conversation, running on my computer."

**What to show on screen:**
- Copy the artifact code
- Paste into a text editor (VS Code or any simple editor)
- Save as greeting.html
- Double-click to open in browser
- Show the page working in the browser

**Visual suggestions:**
- Make this moment feel satisfying --- this is a milestone for beginners
- On-screen text: "Your first web page --- built through conversation!"
- Pause briefly to let the moment land

---

## Closing (11:00 - 12:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap what we covered. Artifacts are Claude's way of giving you finished products --- ready-to-use files that appear in a separate panel. There are different types: code for interactive things, documents for text, and diagrams for visuals. You can copy, download, preview, and version them. And as we just saw, you can go from a conversation to a working web page in minutes.
>
> But here's the thing: for simple HTML files, you can just save and open them. For more complex projects --- React apps, Next.js projects, anything with multiple files --- you need a proper setup. And that's exactly what we cover in the next video: setting up your development environment. Don't worry, it's simpler than it sounds.
>
> See you in the next one!"

**Keypoints:**
- Recap the three artifact types and how to work with them
- Celebrate the milestone: they created and opened their first artifact
- Tease Video 2: dev environment setup for more complex projects
- Reassure: the setup is approachable

**Visual suggestions:**
- Show your face (encouraging, proud of the viewer)
- On-screen text: "Next: Setting Up Your Dev Environment"
- End card with links to the next video and the course page

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Artifacts are finished products** (not explanations --- actual usable files)
2. **You don't need to understand every line** (you need to know how to use the output)
3. **IKEA analogy** (Claude manufactures, you assemble)
4. **Three types** (code, documents, diagrams --- each for different needs)
5. **Versioning makes experimentation safe** (you can always go back)
6. **From conversation to working page** (the demo proves it's real and accessible)

---

## Production Notes

### Tone & Style
- **Demystifying and reassuring** (artifacts sound technical but are actually simple)
- **Show-don't-tell** (the live demo is the heart of this video)
- **Celebratory** (their first artifact is a genuine milestone)
- **Patient** (spend extra time on the demo; don't rush the moment)

### Common Beginner Concerns to Address
- "What does 'artifact' even mean?" --> It's just a fancy word for a finished file Claude creates for you
- "Do I need to understand the code?" --> Not to use it, just to modify it (covered in Video 3)
- "What if the artifact doesn't work?" --> Preview it first, iterate with Claude, or ask for help
- "Is this real coding?" --> You're directing Claude to code for you --- that's a legitimate way to build things

### Things to Avoid
- Deep technical explanations of HTML, React, or SVG internals
- Making the artifact types feel like a quiz they need to memorize
- Rushing through the live demo (this is the payoff moment)
- Assuming viewers know what file extensions mean (.html, .md, .svg) --- explain briefly

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle
- Warm, approachable framing

**Screen recording:**
- Full Claude.ai interface showing both conversation and artifact panel
- Zoom in on artifact panel when demonstrating features (copy, download, version)
- Show the preview rendering clearly
- Keep font size large enough for viewers to read code and text
- Show file saving and browser opening at a slow, clear pace

**Editing notes:**
- Add on-screen text for key concepts (artifact types, IKEA analogy)
- Include timestamps in YouTube description
- Add chapter markers for each section
- Use zoom/highlight effects to draw attention to UI elements in Claude
- Consider a brief animated graphic for the three artifact types

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Setting Up Your Dev Environment" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Try generating your own artifact: ask Claude to build a simple web page!"
- "Share your first artifact in our Discord community"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "What kind of artifact are you most excited to try? Code, document, or diagram? Let me know in the comments!"
- "What would your first web page be about? Drop your idea below!"
- "Were you surprised how simple it was? Tell us your reaction in the comments!"

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy, especially technical terms like "artifact," "HTML," "SVG"
- **Transcript:** Post full transcript on the lesson page for reference
- **Pace:** Speak clearly and at a moderate pace; pause after introducing new concepts
- **Visuals:** Narrate everything on screen --- never silently click through the interface; describe what the artifact looks like in the preview

---

## Post-Production Checklist

- [ ] Video length: 12-15 minutes
- [ ] All key points covered
- [ ] Live demo is clear, slow, and easy to follow
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Artifacts Explained")
- [ ] YouTube title: "Artifacts Explained: Your Code Workspace | 02Ship Claude Basics"
- [ ] Description includes: timestamps, links to 02Ship, next video, Discord, artifact type summary
- [ ] Tags: Claude artifacts, Claude AI code, AI coding tutorial, beginner AI, Claude tutorial, artifacts explained
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 4"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This video transforms "artifact" from a scary technical term into something empowering. The live demo is the star --- when viewers see a web page appear from a conversation, that's the moment everything clicks. Let that moment breathe.**
