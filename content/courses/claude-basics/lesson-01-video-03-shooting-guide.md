# Video 3 Shooting Guide: Your First Build Prompt: From Idea → Starter App Plan

**Target Duration:** 14 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "This is the video where everything comes together. You've got your Claude account, your workspace is set up, and now it's time to write your first real build prompt—the kind of prompt that turns an idea into a starter app plan. And to make this as practical as possible, I'm going to show you exactly how it was done for the platform you're using right now: 02Ship."

**Keypoints:**
- This is the hands-on video viewers have been waiting for
- Connect back to previous videos (account + workspace ready)
- Use 02Ship as the real-world example throughout
- Promise: by the end, they'll have written and tested their own prompt

**Visual suggestions:**
- Show yourself on camera (energized, ready to build)
- On-screen text: "From Idea → App Plan"
- Brief flash of the Claude.ai interface ready for input

---

## Section 1: Anatomy of a Good Build Prompt (1:00 - 3:30)

### The Four-Part Prompt Structure

**SCRIPT:**
> "Before we jump into Claude, let me show you the structure of a good build prompt. Every effective prompt I've ever written has four parts: the goal, the constraints, the tech preference, and the success criteria. Let me break each one down."

#### Part 1: The Goal (30 seconds)

**SCRIPT:**
> "First, the goal. This is one or two sentences that describe what you want to build and who it's for. Be specific. 'Build me an app' is too vague. 'Build a learning portal that helps non-programmers learn AI coding' — that gives Claude something to work with."

**Keypoints:**
- What are you building?
- Who is it for?
- What problem does it solve?
- One to two sentences is enough

**Example to show on screen:**
> "I want to build a learning portal that helps non-programmers to learn AI coding and ship their ideas using Claude."

#### Part 2: The Constraints (30 seconds)

**SCRIPT:**
> "Second, constraints. These are the boundaries and requirements. What must be included? What's the target audience? Any limitations? Constraints help Claude make better decisions instead of guessing."

**Keypoints:**
- What must be included (features, pages, components)
- Who is the target audience
- Any limitations (budget, complexity, timeline)
- What should NOT be included (keeps scope focused)

**Example to show on screen:**
> "Constraints:
> - Target audience: absolute beginners with no coding experience
> - Must include: landing page, blog, video courses, Discord + forum links
> - Should display course series on the home page
> - Content managed through simple files (no complex CMS needed initially)"

#### Part 3: Tech Preference (30 seconds)

**SCRIPT:**
> "Third, tech preference. Now, if you're a complete beginner, it's totally fine to say 'no preference' or 'something simple.' But if you know you want a specific technology—maybe because someone recommended it or because a hosting service requires it—include it here."

**Keypoints:**
- It's okay to say "no preference" or "something simple I can run in a browser"
- If you have a preference, state it
- Claude will suggest technologies if you don't specify
- For 02Ship, we chose Next.js + TypeScript + Tailwind CSS

**Example to show on screen:**
> "Tech preference: Next.js with TypeScript, Tailwind CSS for styling, deployed on Vercel"

#### Part 4: Success Criteria (30 seconds)

**SCRIPT:**
> "Finally, success criteria. How will you know the project worked? This is your checklist for 'done.' It helps Claude understand the quality bar you're aiming for."

**Keypoints:**
- Measurable outcomes (users can do X, page loads Y)
- Keeps both you and Claude focused
- Prevents scope creep
- Gives you a way to evaluate Claude's output

**Example to show on screen:**
> "Success criteria:
> - Users can browse and watch course videos
> - Users can navigate between lessons easily
> - Site loads fast and looks professional
> - Easy to add new courses and lessons"

**Visual suggestions:**
- Show each part appearing on screen as you explain it
- Use a consistent visual template (four colored blocks or cards)
- On-screen text: "Goal → Constraints → Tech → Success Criteria"

---

## Section 2: The Secret Weapon (3:30 - 4:30)

### "Ask Me Clarifying Questions First"

**SCRIPT:**
> "Now here's the secret weapon—one line that dramatically improves Claude's output. At the end of your prompt, add this: 'Before generating anything, please ask me clarifying questions.' This single line changes everything. Instead of Claude guessing about things it's unsure about, it will ask you smart questions first. And your answers to those questions make the final output much better."

**Keypoints:**
- This one line improves output quality significantly
- Claude will ask about things you forgot to mention
- Your answers become additional context for better results
- It's like a mini consultation before the work begins

**What to emphasize:**
> "When I used this for 02Ship, Claude asked me things like: 'Do you need user authentication?' and 'How should courses be organized—by difficulty or by topic?' Questions I hadn't even thought about yet. My answers shaped the entire project."

**Visual suggestions:**
- Show the line highlighted or animated on screen
- On-screen text (large): "Before generating anything, please ask me clarifying questions."
- Show this as the "secret sauce" moment

---

## Section 3: Real Example — The 02Ship Prompt (4:30 - 7:00)

### Showing the Complete Prompt

**SCRIPT:**
> "Let's put it all together with a real example. Here's the kind of prompt that started the 02Ship platform—the very platform you're learning on right now."

**Show the complete prompt on screen:**
> "I want to build a learning portal that helps non-programmers to learn AI coding and ship their ideas using Claude.
>
> Constraints:
> - Target audience: absolute beginners with no coding experience
> - Must include: landing page, blog, video courses (YouTube embeds), Discord + forum links
> - Should display course series on the home page
> - Content managed through simple files (no complex CMS needed initially)
>
> Tech preference: Next.js with TypeScript, Tailwind CSS for styling, deployed on Vercel
>
> Success criteria:
> - Users can browse and watch course videos
> - Users can navigate between lessons easily
> - Site loads fast and looks professional
> - Easy to add new courses and lessons
>
> Before generating anything, please ask me clarifying questions."

**Keypoints:**
- Walk through each section of the prompt
- Point out how each part maps to the four-part structure
- Emphasize the clarity and specificity
- Note the "ask clarifying questions" line at the end

### Live Demo: Sending the Prompt (5:30 - 7:00)

**SCRIPT:**
> "Now let me show you what happens when we send this to Claude."

**What to show on screen:**
- Paste the prompt into Claude
- Show Claude's clarifying questions appearing
- Read through a few of the questions aloud
- Answer 2-3 of the questions on camera

**Claude's likely clarifying questions to expect:**
- How many courses will there be initially?
- Do you need user authentication or accounts?
- Should the blog support categories or tags?
- Do you want a search feature?
- What kind of navigation structure? (sidebar, top nav, etc.)
- Should it support dark mode?

**SCRIPT (continued):**
> "See how Claude is thinking about things I didn't mention? This is the power of asking for clarifying questions. Each answer I give makes the final result better. Let me answer a few of these..."

**Visual suggestions:**
- Full-screen Claude interface
- Highlight Claude's questions as they appear
- Show yourself answering naturally (not scripted-feeling)

---

## Section 4: Reviewing Claude's Response (7:00 - 10:00)

### What Claude Generates

**SCRIPT:**
> "After I answer the clarifying questions, Claude generates a project plan. Let me show you what to look for in the response."

**Keypoints — what to review:**
1. **Project structure** — Does Claude suggest a logical file/folder organization?
2. **Feature list** — Does it match what you asked for?
3. **Technology choices** — Do they align with your tech preference?
4. **Step-by-step plan** — Is there a clear order of operations?
5. **Missing pieces** — Did Claude forget anything from your requirements?

**SCRIPT (continued):**
> "When I review Claude's output, I'm not checking the code line by line—remember, I don't need to understand every technical detail. I'm checking: does this match what I asked for? Did it include everything I mentioned? Is there anything surprising or unexpected? And most importantly: is there anything missing?"

**What to show on screen:**
- Scroll through Claude's response
- Highlight key sections (project plan, file structure, feature breakdown)
- Point out where Claude nailed it and where it might need adjustment

**Analogy to use:**
> "Think of it like reviewing a blueprint for a house. You don't need to be an architect to say, 'Wait, where's the bathroom?' or 'I wanted three bedrooms, not two.' You're reviewing the plan, not the engineering."

**Visual suggestions:**
- Split screen: your requirements on one side, Claude's plan on the other
- Check marks next to items Claude covered
- Question marks next to anything missing or unclear

---

## Section 5: Quick Iteration (10:00 - 12:30)

### Making One Improvement

**SCRIPT:**
> "Here's where iteration comes in. No first response is perfect—and it doesn't need to be. Let me show you how to improve Claude's output with one round of feedback."

**What to demonstrate:**
- Pick one thing to improve from Claude's response
- Write a follow-up prompt that addresses it
- Show Claude's updated response

**Example iteration prompts:**

> "This looks great, but I'd like the landing page to have a stronger hero section with a clear call-to-action. Can you also add learning objectives to each lesson page?"

> "Can you add a section for community links (Discord and GitHub Discussions) to the navigation and the footer?"

**SCRIPT (continued):**
> "Notice how I'm being specific about what I want changed. I'm not saying 'make it better'—that's too vague. I'm saying exactly what to add or adjust. This is the skill of iteration: clear, specific feedback that gives Claude direction."

**Keypoints:**
- Be specific about what to change (not just "make it better")
- Reference what's already good ("This looks great, but...")
- Focus on one or two changes per iteration
- You can iterate as many times as you want

### Before and After

**SCRIPT:**
> "Look at the difference between the first version and the updated version. The hero section is now more compelling, lessons have learning objectives, and the community links are integrated. One round of feedback—that's all it took."

**Visual suggestions:**
- Side-by-side comparison: before and after iteration
- Highlight the specific changes
- On-screen text: "One round of feedback → Much better result"

---

## Section 6: Now It's Your Turn (12:30 - 13:30)

### The Exercise

**SCRIPT:**
> "Now it's your turn. I want you to write your own build prompt using the four-part structure we just covered. You have two options:"

**Option A: Your Own Idea**
> "If you already have an app idea—even a rough one—write a prompt for it. Use the template: goal, constraints, tech preference, success criteria. And don't forget the magic line: 'ask me clarifying questions first.'"

**Option B: Practice with 02Ship**
> "If you don't have an idea yet, that's totally fine. Try rewriting the 02Ship prompt in your own words. Change some details—maybe it's a cooking course platform or a fitness tutorial site. The structure stays the same; only the content changes."

**Show the prompt skeleton on screen:**
> "I want to build [app type] that helps [user] to [solve problem].
>
> Constraints:
> - [Constraint 1]
> - [Constraint 2]
>
> Tech preference: [e.g., 'something simple I can run in a browser' or 'no preference']
>
> Success criteria:
> - [Criterion 1]
> - [Criterion 2]
>
> Before generating anything, please ask me clarifying questions."

**Keypoints:**
- Give viewers clear instructions
- Offer two paths (own idea or practice with 02Ship example)
- Encourage them to actually do it, not just watch
- Remind them to save their prompt in their `/prompts` folder

**Visual suggestions:**
- Show the prompt skeleton template
- On-screen text: "Pause the video and try it now!"
- Show the folder structure reminder (save to `/prompts`)

---

## Closing (13:30 - 14:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap what you just learned. A good build prompt has four parts: goal, constraints, tech preference, and success criteria. Always ask Claude for clarifying questions first—it's a game-changer. And remember, iteration is how you get from 'good enough' to 'exactly what I wanted.'
>
> You've now completed Lesson 1! You know what Claude is, your workspace is set up, and you've written your first build prompt. That's huge.
>
> In Lesson 2, we'll take the next step: actually building your first page with Claude. You'll go from a prompt to a real, visible web page. The ideas are about to become real.
>
> Great work today—see you in the next lesson!"

**Keypoints:**
- Recap the four-part prompt structure
- Celebrate completing Lesson 1
- Tease Lesson 2 (from prompt to real web page)
- End on a high, encouraging note

**Visual suggestions:**
- Show your face (excited, proud of the viewer)
- On-screen text: "Lesson 1 Complete!"
- End card: "Next: Lesson 2 — Building Your First Page"

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Four-part structure** (goal, constraints, tech, success criteria)
2. **"Ask clarifying questions first"** (the secret weapon)
3. **02Ship is the proof** (real example, real platform, real results)
4. **Review the plan, not the code** (blueprint analogy)
5. **Iteration is specific feedback** (not "make it better")
6. **They can do this** (they just proved it by writing their own prompt)

---

## Production Notes

### Tone & Style
- **Energized and hands-on** (this is the "doing" video)
- **Show-don't-tell** (live demo is the core of this video)
- **Empowering** (they're writing real prompts by the end)
- **Celebrate progress** (completing Lesson 1 is an achievement)

### Common Beginner Concerns to Address
- "What if I don't know what tech to use?" → Say "no preference" and Claude will suggest
- "What if Claude's response is wrong?" → That's what iteration is for
- "My idea feels too simple/too complex" → Start simple, you can always add features later
- "What if my prompt isn't good enough?" → There's no perfect prompt; iteration makes it better

### Things to Avoid
- Rushing through the live demo (viewers need to see and absorb)
- Using too much technical jargon in Claude's response review
- Making iteration seem like failure (it's the normal process)
- Skipping the exercise encouragement (getting viewers to actually do it matters)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle

**Screen recording:**
- Full Claude.ai interface for the live demo
- Side-by-side comparisons for before/after iteration
- Prompt template shown clearly and at readable size
- Keep font size large enough for viewers to read code/text

**Editing notes:**
- Add on-screen text for key points and the four-part structure
- Include timestamps in YouTube description
- Add chapter markers for each section
- Include the prompt template in the video description
- Consider adding a downloadable prompt template PDF

---

## Call-to-Action (End Card)

**Include:**
- "Next Lesson: Building Your First Page" (clickable link)
- "Join our Discord: [link]"
- "Download the prompt template: [link to Lesson 1 page]"
- "Share your first prompt in our Discord!"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "What's your app idea? Drop your goal statement in the comments!" (comment prompt)
- "Which part of the prompt structure was most helpful? Let me know below" (engagement)
- "Share your first prompt in our Discord—we'd love to see what you're building!" (community)

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy
- **Transcript:** Post full transcript in lesson page
- **Pace:** Speak clearly; pause after key concepts to let them sink in
- **Visuals:** Read aloud everything shown on screen (prompts, Claude responses)
- **Prompt template:** Make available as downloadable text (not just in the video)

---

## Post-Production Checklist

- [ ] Video length: 14-15 minutes
- [ ] All key points covered
- [ ] Live demo is clear and easy to follow
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Your First Prompt")
- [ ] YouTube title: "Your First Build Prompt: From Idea → App Plan | 02Ship Claude Basics"
- [ ] Description includes: timestamps, prompt template, links to 02Ship, next lesson, Discord
- [ ] Tags: Claude AI prompt, build with AI, first AI prompt, Claude tutorial, beginner AI coding
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 1"
- [ ] Update lesson JSON with YouTube ID once uploaded
- [ ] Prompt template available for download in lesson page

---

**This is the payoff video—viewers go from learning to doing. Make the live demo feel natural, celebrate their first prompt, and get them excited for Lesson 2 where ideas become real.**
