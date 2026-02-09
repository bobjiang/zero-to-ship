# Video 2 Shooting Guide: Setting Up Your Project: Instructions and Knowledge

**Target Duration:** 14 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 0:45)

### Hook & Introduction

**SCRIPT:**
> "In the last video, I showed you the problem: without Projects, you waste time repeating yourself in every conversation. Now let's fix it. In this video, I'm going to walk you through setting up a Claude Project from scratch. By the end, you'll have a fully configured workspace where Claude already knows your tech stack, your project goals, and your coding style, before you even type your first question. Let's set it up."

**Keypoints:**
- Connect directly to the pain point established in Video 1
- Promise: a fully configured workspace by the end
- This is a hands-on, follow-along video
- Encourage viewers to do this alongside the video

**Visual suggestions:**
- Show yourself on camera (ready to build, hands-on energy)
- On-screen text: "Setting Up Your Project"
- Brief flash of the Claude Projects interface

---

## Section 1: Creating a New Project (0:45 - 2:30)

### UI Walkthrough

**SCRIPT:**
> "First, let's create a new Project. Log into Claude at claude.ai, and look for the Projects section in the left sidebar. Click 'New Project,' and give it a name. I'm going to call mine '02Ship' because that's the app we're setting up. You should name yours after whatever you're building. If you're not building anything specific yet, call it 'My First Project' or 'Practice Project.' The name is just for you, so pick whatever makes sense."

**Keypoints:**
- Log into Claude at claude.ai
- Find the Projects section in the sidebar
- Click "New Project"
- Give it a clear, descriptive name
- The name is for your own organization; it can be changed later

**What to show on screen:**
- Navigate to claude.ai and log in
- Show the sidebar with the Projects option
- Click through the creation flow step by step
- Type the Project name
- On-screen text: "Step 1: Create your Project"

### Project Description

**SCRIPT:**
> "You'll also see a field for a project description. This is optional but helpful. Write one or two sentences about what the project is. Something like: 'A learning portal for non-programmers to build apps with AI tools.' This helps you remember what each Project is for, especially when you have several."

**Keypoints:**
- Project description is optional but recommended
- One to two sentences is enough
- Helps you stay organized across multiple Projects
- Can be updated anytime

**Visual suggestions:**
- Show typing the description
- On-screen text showing the example description
- Keep this section brief; do not overthink the description

---

## Section 2: Writing Custom Instructions (2:30 - 7:00)

### What Custom Instructions Are

**SCRIPT:**
> "Now we get to the most important part: custom instructions. Think of custom instructions as a briefing document you hand to Claude before every conversation. It's like hiring a new team member and giving them a one-page summary of the project: what you're building, what technologies you're using, what your standards are, and what the current status is. Except you only write it once, and Claude reads it automatically every time."

**Keypoints:**
- Custom instructions are permanent context applied to every conversation in the Project
- Think of them as a briefing document or a contract with Claude
- You write them once; Claude reads them every time
- They dramatically improve the quality and consistency of Claude's responses

**Visual suggestions:**
- On-screen text: "Custom Instructions = Your briefing document"
- Show the custom instructions editor in the Claude interface

### The Template

**SCRIPT:**
> "I'm going to give you a template for writing effective custom instructions. You don't have to memorize this. I'll link it in the description below, and it's also on the 02Ship lesson page. The template has five sections: Project Overview, Tech Stack, Coding Conventions, Current Status, and Important Rules."

**Keypoints:**
- Five sections: Project Overview, Tech Stack, Coding Conventions, Current Status, Important Rules
- Template will be linked in the description and on the lesson page
- Walk through each section with a concrete example

**What to show on screen:**
- Display the template structure clearly on screen
- On-screen text listing the five sections

#### Section 1: Project Overview

**SCRIPT:**
> "The Project Overview is two to three sentences describing what you're building and who it's for. Be specific. Here's what I wrote for 02Ship: '02Ship is a learning portal for non-programmers to build and ship their ideas using Claude Code and AI coding tools. Target audience is absolute beginners with no coding experience. The platform provides courses with video lessons, a blog, and community links.'"

**Keypoints:**
- What are you building?
- Who is the target audience?
- What is the core purpose?
- Keep it to two to three sentences

#### Section 2: Tech Stack

**SCRIPT:**
> "The Tech Stack section lists every technology your project uses. Be specific about versions when possible. For 02Ship, it looks like this: 'Next.js 14 with App Router, TypeScript in strict mode, Tailwind CSS for styling, MDX for blog content, JSON files for course data, deployed on Vercel.' Claude uses this to write code that actually fits your project, instead of guessing."

**Keypoints:**
- List every technology and framework
- Include version numbers when you know them
- Include hosting and deployment platform
- If you are a beginner and unsure, write what you know; Claude can help fill in gaps

#### Section 3: Coding Conventions

**SCRIPT:**
> "Coding Conventions tell Claude how you want the code to look. Even as a beginner, you can set preferences here. For 02Ship, I specified things like: 'Use named exports, not default exports. Use the cn() utility for conditional Tailwind classes. Components go in src/components organized by feature. Mobile-first responsive design.' You might not know what all of that means yet, and that's okay. The point is: once Claude gives you code you like, you capture those patterns here so every future conversation matches."

**Keypoints:**
- Define how code should be written and organized
- Include naming conventions, file structure preferences, style patterns
- Even beginners can add preferences as they learn them
- Update this section as you discover patterns you like

#### Section 4: Current Status

**SCRIPT:**
> "The Current Status section is one that changes over time. It tells Claude where you are in the project right now. Something like: 'Landing page is complete. Course system is working with 3 lessons. Blog is functional but needs search. Currently working on: adding community links to navigation.' This is incredibly powerful because Claude can pick up exactly where you left off."

**Keypoints:**
- What is already built and working?
- What is currently in progress?
- What is planned next?
- Update this regularly as your project evolves

#### Section 5: Important Rules

**SCRIPT:**
> "Finally, Important Rules. These are hard constraints that Claude should never violate. Things like: 'All content is public, no authentication required yet. Do not modify the content file structure without asking. Always use TypeScript strict mode. Never remove existing functionality when adding new features.' Think of these as guardrails. They prevent Claude from making decisions that break your project."

**Keypoints:**
- Hard constraints Claude must always follow
- Things Claude should never do without asking
- Boundaries and non-negotiable requirements
- These protect your project from unintended changes

**Visual suggestions:**
- Show typing each section into the custom instructions editor
- On-screen text for each section header as you write it
- Use a clean, readable font size
- Show the complete instructions at the end for a full overview

### Be Specific

**SCRIPT:**
> "One important principle: be specific. 'Use TypeScript' is okay. 'Use TypeScript in strict mode with named exports' is much better. The more specific your instructions, the less Claude has to guess, and the more consistent your results will be. Vague instructions lead to inconsistent code. Specific instructions lead to code that feels like it was all written by the same person."

**Keypoints:**
- Specificity improves consistency
- Vague instructions force Claude to guess
- Specific instructions reduce back-and-forth corrections
- You can always add more detail over time

**Visual suggestions:**
- Side-by-side comparison: vague vs. specific instruction
- On-screen text: "Specific > Vague"

---

## Section 3: Uploading Knowledge Files (7:00 - 9:30)

### What to Upload

**SCRIPT:**
> "Now let's talk about the knowledge base. This is where you upload files that Claude can reference during conversations. Think of it as putting documents on Claude's desk so it can look things up when needed. But here's the key: upload your key documents, not everything. Claude works best when the knowledge base is focused and relevant."

**Keypoints:**
- Knowledge base = files Claude can reference in conversations
- Upload key documents, not your entire codebase
- Quality over quantity
- Claude reads these files to understand your project deeply

**What to show on screen:**
- Show the knowledge base upload area in the Claude interface
- On-screen text: "Upload key docs, not everything"

### Recommended Files to Upload

**SCRIPT:**
> "Here's what I recommend uploading. First, your README file, if you have one. This gives Claude an overview of your project. Second, any requirements documents that describe what you're building. Third, important code samples: maybe your main layout file, your key components, or your data models. And fourth, any style guides or design references you're following. For 02Ship, I uploaded the README, the project structure, sample lesson JSON files, and the TypeScript type definitions."

**Keypoints:**
- README or project overview document
- Requirements or specification documents
- Key code samples (layout files, components, data models)
- Style guides or design references
- For 02Ship: README, project structure, sample data, type definitions

**What to show on screen:**
- Upload 3-4 files live on camera
- Show each file briefly before uploading
- On-screen text listing recommended file types

### What NOT to Upload

**SCRIPT:**
> "A quick note on what not to upload. Don't upload your entire codebase. Claude doesn't need every file to be helpful. Don't upload files with sensitive information like API keys or passwords. And don't upload massive log files or generated files. Keep the knowledge base focused on documents that describe your project and its key patterns."

**Keypoints:**
- Do not upload entire codebases (too much noise)
- Do not upload sensitive files (API keys, passwords, environment files)
- Do not upload generated or temporary files
- Focus on descriptive and structural documents

**Visual suggestions:**
- On-screen checklist: what to upload vs. what to skip
- Use green checkmarks and red X marks for visual clarity
- On-screen text: "Key docs only"

---

## Section 4: Testing Your Project (9:30 - 12:00)

### The Verification Test

**SCRIPT:**
> "Alright, your Project is set up. But how do you know it's actually working? Here's my favorite test. Start a new conversation inside the Project and type: 'Describe this project in your own words.' That's it. If your custom instructions and knowledge files are set up correctly, Claude should be able to describe your project accurately without you telling it anything."

**Keypoints:**
- Start a new conversation inside the Project
- Ask Claude: "Describe this project in your own words"
- Claude should accurately describe your app, tech stack, and goals
- If it's vague or wrong, your instructions need more detail

**What to show on screen:**
- Open a new conversation inside the Project
- Type the test prompt
- Show Claude's response
- Highlight where Claude references your custom instructions and uploaded files

### Live Demo: Testing the 02Ship Project

**SCRIPT:**
> "Let me show you this with the 02Ship Project I just set up. I'll type 'Describe this project in your own words' and let's see what Claude says."

**What to show on screen:**
- Type the prompt and wait for Claude's response
- Read through the response, pointing out accurate details
- Highlight mentions of: tech stack, target audience, project purpose, current status
- Show genuine reaction to how well Claude understood the context

**SCRIPT (continued):**
> "See that? Without me saying anything, Claude knows it's a Next.js learning portal for beginners, it knows we use TypeScript and Tailwind, it knows about the course structure with video lessons, and it even mentions the blog and community links. All of that came from the custom instructions and knowledge files. This is the power of Projects."

**Keypoints:**
- Claude should reference your tech stack, audience, and goals
- This proves the context is working
- If anything is missing or wrong, update your instructions
- This test takes 30 seconds but gives you confidence the setup is solid

### Follow-Up Tests

**SCRIPT:**
> "Here are a few more test prompts you can try. Ask Claude: 'What tech stack are we using?' It should list your exact technologies. Ask: 'What coding conventions should I follow?' It should reference your style preferences. Ask: 'What's the current status of the project?' It should know what's done and what's in progress. If any of these answers are wrong or incomplete, go back and update your custom instructions."

**Keypoints:**
- Test multiple aspects of your context
- Tech stack, conventions, and status are the three key tests
- Incorrect answers mean instructions need updating
- This iterative refinement makes your Project stronger over time

**Visual suggestions:**
- Show 2-3 quick test prompts and Claude's responses
- On-screen text: "Test your setup!"
- Highlight correct information in Claude's responses

---

## Section 5: Evolving Your Instructions (12:00 - 13:15)

### Instructions Are Living Documents

**SCRIPT:**
> "One last thing that's really important: your custom instructions are not set in stone. They should evolve as your project evolves. When you finish building a feature, update the Current Status section. When you discover a coding pattern you like, add it to Conventions. When you make a technology decision, add it to Tech Stack. I update my 02Ship Project instructions about once a week. It takes two minutes and keeps Claude perfectly in sync with where the project actually is."

**Keypoints:**
- Custom instructions should be updated regularly
- Update Current Status after completing features
- Add new conventions as you discover patterns you like
- A two-minute update saves hours of re-explaining later
- Think of instructions as a living document, not a one-time setup

**Visual suggestions:**
- Show editing the custom instructions to update the Current Status
- On-screen text: "Update instructions as your project grows"
- Show a before/after of the Current Status section

---

## Closing (13:15 - 14:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap what you just did. You created a Claude Project, wrote custom instructions covering your project overview, tech stack, conventions, status, and rules. You uploaded key knowledge files. And you tested everything to make sure Claude actually understands your project. That's a fully configured workspace.
>
> In the next video, we're going to put this to work. I'll show you how to build across multiple days and multiple conversations using your Project. You'll see how to pick up where you left off, reference previous work, and manage your conversations as your project grows. This is where Projects really start to shine.
>
> See you in Video 3!"

**Keypoints:**
- Recap the complete setup: Project creation, instructions, knowledge files, testing
- Celebrate their accomplishment: they have a real workspace now
- Tease Video 3: multi-session workflows and real building
- Keep energy high and forward-looking

**Visual suggestions:**
- Show your face (proud, encouraging)
- On-screen text: "Your Project is ready!"
- End card with link to Video 3

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Custom instructions are like a contract with Claude** (permanent, automatic context)
2. **Be specific in your instructions** (specificity reduces guessing and improves consistency)
3. **Upload key documents, not everything** (focused knowledge base beats a cluttered one)
4. **Test your setup by asking Claude to describe the project** (verification in 30 seconds)
5. **Update instructions as your project evolves** (living document, not a one-time setup)
6. **The five-section template covers everything Claude needs** (overview, tech, conventions, status, rules)

---

## Production Notes

### Tone & Style
- **Step-by-step and hands-on** (viewers should follow along in real time)
- **Practical and actionable** (every section ends with something they can do)
- **Encouraging but honest** (setting up instructions takes thought, but it's worth it)
- **Show, don't just tell** (live demo of the complete setup process)

### Common Beginner Concerns to Address
- "I don't know my tech stack yet" → Write what you know; Claude can help you decide the rest
- "My instructions don't seem detailed enough" → Start simple and add detail over time; they're a living document
- "What if I upload the wrong files?" → You can remove and re-upload files anytime
- "How often should I update instructions?" → After every significant milestone or new feature

### Things to Avoid
- Rushing through the custom instructions template (this is the most valuable part of the video)
- Making the setup feel overwhelming (five sections is manageable, not excessive)
- Skipping the testing step (verification builds confidence)
- Using overly technical examples in the instructions demo
- Assuming viewers know what a README or type definition is (explain briefly)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle

**Screen recording:**
- Full Claude interface showing Project creation flow
- Custom instructions editor at readable font size
- File upload dialog and knowledge base panel
- Test conversations showing Claude's contextual responses
- Keep pace slow enough for viewers to follow along

**Editing notes:**
- Add on-screen text for each section of the template
- Include timestamps in YouTube description
- Add chapter markers for each setup step
- Include the custom instructions template in the video description
- Consider a downloadable template file linked on the lesson page

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Multi-Session Workflows" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Download the custom instructions template: [link to Lesson 5 page]"
- "Share your Project setup in our Discord!"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "What did Claude say when you asked it to describe your project? Share the best response in the comments!" (comment prompt)
- "What's the most useful section of the custom instructions template for you? Let me know below" (engagement)
- "If you set up a Project for your app idea, share the name in our Discord!" (community)

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy; pay attention to technical terms like "TypeScript," "custom instructions," and "knowledge base"
- **Transcript:** Post full transcript in lesson page
- **Pace:** Speak clearly and slowly during the live demo; pause when switching between interface elements
- **Visuals:** Narrate every click and every text entry; do not rely on viewers reading the screen independently

---

## Post-Production Checklist

- [ ] Video length: 14-15 minutes
- [ ] All key points covered
- [ ] Live demo is clear and easy to follow
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Project Setup Guide")
- [ ] YouTube title: "Setting Up Your Project: Instructions and Knowledge | 02Ship Claude Basics"
- [ ] Description includes: timestamps, custom instructions template, links to 02Ship, next video, Discord
- [ ] Tags: Claude Projects, custom instructions, Claude AI, project setup, knowledge base, Claude Pro, AI coding tutorial
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 5"
- [ ] Update lesson JSON with YouTube ID once uploaded
- [ ] Custom instructions template available for download on lesson page

---

**This is the most hands-on video in Lesson 5. Viewers should end with a working Project, not just an understanding of one. Slow down, show every step, and make them feel confident that their workspace is ready for real building.**
