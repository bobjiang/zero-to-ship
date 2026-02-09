# Video 3 Shooting Guide: Reading Code for Non-Programmers

**Target Duration:** 13 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "Here's something that surprises most people: you don't need to understand code to use it, but you can learn to read it enough to make changes, spot problems, and feel confident working with what Claude gives you. Code is just text. Seriously --- it's words, numbers, and symbols arranged in a specific way. And today, I'm going to teach you how to look at code the way a non-programmer can: finding the parts you can safely change, understanding the basic structure, and knowing when to ask Claude for help. By the end of this video, you'll change text and colors in a real React component with your own hands."

**Keypoints:**
- Reframe code: it's just text, not magic runes
- Set the goal: read code well enough to make changes and troubleshoot
- You're NOT becoming a programmer --- you're becoming a confident user of code
- Promise: hands-on changes by the end

**Visual suggestions:**
- Show yourself on camera (relaxed, confident energy)
- On-screen text: "Code Is Just Text"
- Brief flash of a code file in VS Code --- make it look approachable, not intimidating

---

## Section 1: Understanding File Structure (1:00 - 3:00)

### Folders Are Like Filing Cabinets

**SCRIPT:**
> "Before we look at any actual code, let's talk about how code is organized. When Claude generates a project, it creates a folder structure. This might look overwhelming at first, but it follows a logical pattern --- just like how you'd organize physical files in a cabinet. Let me show you the most common folders you'll see."

#### The src/ Folder

**SCRIPT:**
> "First, the src folder. 'src' stands for 'source' --- as in, this is where the source code lives. Think of it as the main drawer in your filing cabinet. Almost everything you'll want to look at or change is in here."

**Keypoints:**
- src = source code = the main code folder
- This is where you'll spend most of your time
- Everything important lives here or in its subfolders

#### The components/ Folder

**SCRIPT:**
> "Inside src, you'll often find a components folder. Components are reusable building blocks --- like LEGO pieces. A button is a component. A navigation bar is a component. A footer is a component. Each component is usually in its own file, and each file handles one piece of the interface."

**Keypoints:**
- Components = reusable building blocks of the interface
- Each component = usually one file
- Named descriptively: Button.tsx, Header.tsx, Footer.tsx
- You can usually guess what a component does from its filename

#### The pages/ or app/ Folder

**SCRIPT:**
> "Then there's pages or app --- these represent the actual pages of your website. If you see a file called about.tsx in the pages folder, that's your About page. A file called page.tsx inside a folder called blog is your blog page. The folder structure mirrors your website's URL structure."

**Keypoints:**
- pages/ or app/ = the actual pages of your website
- Folder names often match URL paths
- about/ = /about on your website
- blog/ = /blog on your website
- This naming convention makes navigation intuitive

**What to show on screen:**
- Open a project in VS Code and expand the file tree
- Point to src/, components/, pages/ or app/
- Draw lines connecting folder names to website URLs
- On-screen text: "src = Source | components = Building Blocks | pages = Website Pages"

---

## Section 2: Reading Code Top-to-Bottom (3:00 - 5:30)

### The Three Parts of Every Code File

**SCRIPT:**
> "Now let's open an actual code file and read it together. Don't worry --- I'll go slow. Every code file has roughly three parts, and once you know what they are, the structure makes a lot more sense."

#### Part 1: Imports (Top of the File)

**SCRIPT:**
> "At the very top of the file, you'll see lines that start with the word 'import.' These are like ingredient lists at the top of a recipe. They tell the computer: 'Before I do anything, I need these tools and these other building blocks.' You'll see things like 'import React from react' or 'import Button from components/Button.' You generally don't need to touch these. If you delete one, the file might stop working because it's missing a required ingredient."

**Keypoints:**
- Imports = ingredient list at the top
- They pull in tools and other components
- Do NOT delete or modify imports unless Claude tells you to
- If something breaks and you recently touched an import, that's probably why

**What to show on screen:**
- Open a React component file
- Highlight the import section at the top
- On-screen text: "Imports = Ingredients (Don't remove!)"

#### Part 2: Logic (Middle of the File)

**SCRIPT:**
> "The middle section is the logic --- the actual instructions. This is where functions are defined, data is processed, and decisions are made. For beginners, you don't need to understand every line here. But you'll notice patterns: the word 'function' or 'const' followed by a name, curly braces grouping things together, and 'return' statements that define what gets displayed. The return statement is usually the most useful part for you --- it contains the actual content that appears on screen."

**Keypoints:**
- Logic section contains the working instructions
- Look for 'function' and 'const' --- they define named blocks of behavior
- Curly braces { } group things together
- The 'return' statement contains what appears on screen
- You don't need to understand every line of logic

**What to show on screen:**
- Scroll down past imports to the function/logic section
- Point out function definitions
- Highlight the return statement
- On-screen text: "return = What you see on screen"

#### Part 3: Export (Bottom of the File)

**SCRIPT:**
> "At the bottom, you'll typically see an 'export' statement. This is like putting a label on a shipping box: it tells other files that this component exists and is available to use. Like imports, you generally leave exports alone."

**Keypoints:**
- Export = making this component available to other files
- Usually at the very bottom of the file
- Leave it alone --- it's infrastructure
- If you see 'export default' followed by the component name, that's standard

**Visual suggestions:**
- Show the export line at the bottom of the file
- On-screen text: "Import (top) --> Logic (middle) --> Export (bottom)"
- On-screen summary graphic showing the three parts stacked

---

## Section 3: What You Can Safely Change (5:30 - 7:30)

### The Safe Zones

**SCRIPT:**
> "Now for the part you've been waiting for: what can you actually change without breaking things? There are four safe zones in any code file, and they're easier to spot than you might think."

#### Text in Quotes

**SCRIPT:**
> "First, anything in quotes. Whether it's single quotes, double quotes, or backticks --- the text inside them is usually content that appears on screen. If you see 'Welcome to our website' in quotes, you can change it to 'Hello, World' and the page will show your new text. Quotes are your best friend."

**Keypoints:**
- Text in quotes = content displayed to users
- Single quotes (''), double quotes (""), and backticks (``) all work the same way here
- Change the text inside, but never delete the quotes themselves
- This is the safest and most common edit

**What to show on screen:**
- Highlight several strings in quotes in the code
- Change one of them live
- Show the result in the browser
- On-screen text: "In quotes? You can change it!"

#### Numbers

**SCRIPT:**
> "Second, numbers. Numbers in code usually control size, spacing, timing, or quantity. If you see 'width: 300', try changing it to 400 and see what happens. If you see 'padding: 20', try 10 or 30. Numbers are great for experimenting because the changes are visible and easy to undo."

**Keypoints:**
- Numbers control size, spacing, timing, delays, quantities
- Safe to experiment with --- just note the original value
- Changes are immediately visible after saving and refreshing
- Common number properties: width, height, padding, margin, fontSize, gap

#### Colors

**SCRIPT:**
> "Third, colors. You'll see colors written as hex codes --- those are the hash-sign followed by six characters, like hashtag 3498db --- or as named colors like 'blue', 'red', 'white.' You can swap any of these out. If you're not sure what hex code to use, search 'color picker' online or ask Claude: 'What's the hex code for a soft teal?'"

**Keypoints:**
- Hex codes: #3498db, #ffffff, #000000
- Named colors: "blue", "red", "white", "gray"
- Tailwind classes: "bg-blue-500", "text-red-600" (colors are in the class name)
- Google "color picker" or ask Claude for hex codes

#### URLs and Paths

**SCRIPT:**
> "Fourth, URLs and file paths. If you see a link to an image, a website, or an API, you can change it to point somewhere else. Want to swap an image? Change the URL to your new image's address. Want to link to a different page? Change the URL."

**Keypoints:**
- Image URLs: change the src to your own image
- Links: change href to your own URL
- File paths: point to your own files
- Make sure the new URL or path actually exists

**Visual suggestions:**
- Show a code file with highlighted safe zones (quotes, numbers, colors, URLs)
- Use color-coding or boxes to visually distinguish safe vs. unsafe areas
- On-screen text: "Safe Zones: Quotes, Numbers, Colors, URLs"

---

## Section 4: What NOT to Change (7:30 - 9:00)

### The Danger Zones

**SCRIPT:**
> "Now, just as important: what should you leave alone? There are three things that, if you change them without knowing what you're doing, can break your code."

#### Syntax and Brackets

**SCRIPT:**
> "First, syntax and brackets. The curly braces, parentheses, angle brackets, and semicolons are the grammar of code. If you delete a closing bracket or add an extra semicolon, the file will stop working. Think of them like punctuation in a sentence --- remove a period and the sentence runs on forever. The good news: VS Code highlights matching brackets, so if you accidentally delete one, you'll see a red warning."

**Keypoints:**
- Brackets, braces, parentheses: { } ( ) [ ] < / >
- Deleting one breaks the file
- VS Code shows red squiggly lines when something is wrong
- If you see red squigglies after making a change, undo (Cmd+Z / Ctrl+Z)

#### Imports

**SCRIPT:**
> "Second, imports. We covered these earlier. If you delete or modify an import line, the file loses access to a tool it needs. It's like removing a recipe ingredient --- the dish won't come out right. Leave imports alone unless Claude specifically tells you to change one."

#### Variable Names

**SCRIPT:**
> "Third, variable names. If you see something like 'const userName' and you change it to 'const name,' you'll break every other place in the code that references 'userName.' Variable names are like addresses --- if you rename your street, your mail stops arriving. Only change variable names if Claude tells you to and shows you all the places that need updating."

**Keypoints:**
- Variable names are referenced throughout the code
- Changing one name means changing it everywhere it's used
- Let Claude handle renaming if needed
- When in doubt, don't change the name, change what's in quotes next to it

**Visual suggestions:**
- Show code with danger zones highlighted in red/orange
- On-screen text: "Don't touch: Brackets, Imports, Variable Names"
- Quick comparison: safe edit (changing text in quotes) vs. unsafe edit (deleting a bracket)

---

## Section 5: Using Claude to Explain Code (9:00 - 10:00)

### Your Built-In Code Tutor

**SCRIPT:**
> "Here's the strategy that ties everything together: when you don't understand something, ask Claude. You can copy any piece of code and say: 'What does this function do?' or 'Explain this code in simple terms.' Claude will break it down for you. You can even be more specific: 'How do I change the heading text in this component?' or 'What would happen if I changed this number to 500?' This is the biggest advantage you have. Professional developers Google things constantly. You have something even better --- a tutor who knows your exact code and can explain it in plain language."

**Keypoints:**
- Copy any code snippet into Claude and ask "What does this do?"
- Ask "How do I change X in this code?" for specific guidance
- Ask "What would happen if I changed Y?" before making risky changes
- Claude understands the full context of code it generated
- Even professional developers look things up constantly --- this is normal

**What to show on screen:**
- Copy a section of code from VS Code
- Paste it into Claude with the question "What does this code do?"
- Show Claude's plain-language explanation
- On-screen text: "When in doubt, ask Claude"

**Visual suggestions:**
- Split screen: code on left, Claude explanation on right
- Highlight how Claude's explanation maps to specific lines of code
- Make this feel empowering, not like a crutch

---

## Section 6: Live Demo --- Changing Text and Colors in a React Component (10:00 - 12:30)

### Setting Up the Demo

**SCRIPT:**
> "Alright, time to get your hands dirty. I have a React component open in VS Code --- it's a simple landing page section with a heading, some text, and a button. I'm going to make five changes to it: change the heading text, change the paragraph text, change the background color, change the button color, and change the font size. And the golden rule: save after every change, test after every change."

**Keypoints:**
- Demonstrate five real changes in real code
- Follow the workflow: change, save, check browser, repeat
- Narrate every step for beginners following along
- Reinforce the safe zones: quotes, colors, numbers

### Change 1: Heading Text

**SCRIPT:**
> "First, the heading. I can see it says 'Welcome to Our App' inside quotes. I'll change that to 'Hello from 02Ship.' Save with Command-S. Check the browser --- there it is. The heading changed."

**What to show on screen:**
- Find the heading text in quotes
- Change it
- Save (Cmd+S / Ctrl+S)
- Show browser auto-refreshing with the new text

### Change 2: Paragraph Text

**SCRIPT:**
> "Next, the paragraph. It says 'Get started by editing this page.' I'll change it to 'Build your ideas with Claude AI.' Save. Check. Done."

**What to show on screen:**
- Find the paragraph text in quotes
- Change it
- Save and verify in browser

### Change 3: Background Color

**SCRIPT:**
> "Now let's change a color. I see the background is set to a blue --- hashtag 3498db. I want a warm orange. I'll ask Claude for a hex code... or I'll just type 'orange' if it's using named colors. Let me change it to hashtag e67e22. Save. Check. There --- the whole background shifted to orange."

**What to show on screen:**
- Find the color value (hex code or Tailwind class)
- Change it to a new value
- Save and verify in browser
- Show the visual difference clearly

### Change 4: Button Color

**SCRIPT:**
> "The button has its own color. Let me change that too --- from green to a deep purple, hashtag 8e44ad. Save. Check. The button is now purple. I'm customizing this component through simple text changes."

**What to show on screen:**
- Find the button's color property
- Change the hex code
- Save and verify

### Change 5: Font Size

**SCRIPT:**
> "Finally, let's make the heading bigger. I see fontSize is 24. Let me crank it up to 36. Save. Check. Bigger heading. And just like that, I've made five changes to a React component without understanding React. I changed what's in quotes and what's in numbers. That's it."

**What to show on screen:**
- Find the fontSize number
- Change 24 to 36
- Save and verify
- Show all five changes together in the final result

### Before and After

**SCRIPT:**
> "Let me show you the before and after side by side. The original component on the left, my customized version on the right. Different text, different colors, different size --- same structure. I didn't write a single line of new code. I just edited what Claude gave me."

**Visual suggestions:**
- Side-by-side comparison: original vs. customized
- Highlight each of the five changes
- On-screen text: "5 changes. Zero code written. 100% yours."
- Let this moment feel satisfying and empowering

---

## Closing (12:30 - 13:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap. Code files have three sections: imports at the top, logic in the middle, and exports at the bottom. You can safely change text in quotes, numbers, colors, and URLs. You should leave brackets, imports, and variable names alone. And whenever you're unsure, ask Claude to explain or guide you.
>
> That wraps up Lesson 4: Working with Code and Artifacts. You've learned what artifacts are, set up your development environment, and now you can read and modify code without being a programmer. That's a huge step. You're not just directing Claude anymore --- you're working alongside it.
>
> In Lesson 5, we're going to level up: managing projects, keeping context across conversations, and building something more complex. The foundation is set. Let's keep building.
>
> See you in Lesson 5!"

**Keypoints:**
- Recap the three file sections (imports, logic, exports)
- Recap safe zones vs. danger zones
- Celebrate completing Lesson 4 --- this was the most technical lesson
- Tease Lesson 5: project management and multi-conversation workflows
- Remind them: they're now working alongside Claude, not just talking to it

**Visual suggestions:**
- Show your face (proud, excited for the viewer)
- On-screen text: "Lesson 4 Complete! Next: Projects & Context"
- End card with links to Lesson 5 and the course page

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Code is just text** (not magic, not scary, just words and symbols)
2. **Three-part structure** (imports, logic, exports --- know the pattern)
3. **Safe zones** (quotes, numbers, colors, URLs --- change freely)
4. **Danger zones** (brackets, imports, variable names --- leave alone)
5. **Ask Claude** (your built-in code tutor is always available)
6. **Save before, test after** (the golden workflow for making changes)

---

## Production Notes

### Tone & Style
- **Empowering and confidence-building** (this video fights the "I can't do this" voice)
- **Methodical but not boring** (clear structure, real examples, hands-on demo)
- **Celebratory** (every change they make is a win)
- **Patient** (this is the most technical lesson --- give extra time for concepts to land)

### Common Beginner Concerns to Address
- "I'm afraid I'll break something" --> You can always undo (Cmd+Z / Ctrl+Z), and Claude can fix anything you break
- "I don't understand what half of this means" --> You don't need to. Focus on the safe zones
- "Real programmers would judge my approach" --> Real programmers Google things constantly. Using Claude is a legitimate approach
- "What if I can't find the right thing to change?" --> Ask Claude: "Where do I change the heading text in this file?"

### Things to Avoid
- Teaching programming concepts beyond what's needed (no deep dives into JavaScript)
- Making the code look intimidating (use simple, clean examples)
- Rushing through the live demo (each change should feel like a small victory)
- Using terms without explaining them (JSX, props, state --- skip or define briefly)
- Implying they should eventually learn to code "properly" (what they're learning IS proper)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle
- Consider picture-in-picture during the live demo (face in corner, code on screen)

**Screen recording:**
- VS Code with a clean, readable theme (light or dark, but consistent)
- Large font size in the editor (16px minimum for readability on YouTube)
- File tree visible on the left side
- Browser open beside VS Code or on a second monitor
- Zoom in on specific code sections when explaining imports, logic, exports
- Show before/after side by side at the end of the demo

**Editing notes:**
- Add on-screen text labels for each file section (imports, logic, exports)
- Color-code safe zones (green) vs. danger zones (red) with overlays
- Include timestamps in YouTube description for each section
- Add chapter markers: File Structure, Reading Code, Safe Changes, Danger Zones, Demo
- Consider adding a downloadable "Code Reading Cheat Sheet" linked in description

---

## Call-to-Action (End Card)

**Include:**
- "Next Lesson: Projects & Context" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Try the exercise: Customize a Claude artifact with 5 changes!"
- "Share your before/after screenshots in our Discord community!"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "What was the first thing you changed in your code? Drop a comment below!"
- "Which safe zone are you most excited to experiment with --- text, colors, numbers, or URLs?"
- "Did this video make code feel less intimidating? Let us know --- we love hearing that!"

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy; technical terms and code syntax must be captioned precisely
- **Transcript:** Post full transcript on the lesson page, including all code examples shown on screen
- **Pace:** Speak clearly and pause after each concept; this video has the highest information density in Lesson 4
- **Visuals:** Read code aloud as you highlight it on screen; never point at code silently; describe color changes verbally ("the background changed from blue to orange")

---

## Post-Production Checklist

- [ ] Video length: 13-15 minutes
- [ ] All key points covered
- [ ] File structure explanation is clear and visual
- [ ] Safe zones and danger zones clearly distinguished
- [ ] Live demo shows 5 distinct, visible changes
- [ ] Before/after comparison included
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Reading Code for Non-Programmers")
- [ ] YouTube title: "Reading Code for Non-Programmers | 02Ship Claude Basics"
- [ ] Description includes: timestamps, links to 02Ship, next lesson, Discord, code reading cheat sheet
- [ ] Tags: reading code, non-programmer coding, understand code, Claude AI, beginner code tutorial, code for beginners
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 4"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the video that turns "I can't touch code" into "I just customized a React component." Every change they make is proof that code is not off-limits to them. Make that transformation feel real, earned, and exciting.**
