# Video 2 Shooting Guide: Prompting for Different Goals

**Target Duration:** 13 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:15)

### Hook & Introduction

**SCRIPT:**
> "In the last video, you learned the 4 Cs of effective prompting -- Clear, Contextual, Constrained, and Examples. But here's the thing: not every task needs the same kind of prompt. Asking Claude to write code is very different from asking it to brainstorm ideas or explain a concept. If you use the same approach for everything, you're leaving a lot of Claude's power on the table. In this video, I'm going to show you exactly how to adjust your prompting style based on what you're trying to accomplish. We'll cover four major categories: code generation, explanations, brainstorming, and productivity. And yes -- I'll show you live examples of each one."

**Keypoints:**
- Connect back to Video 1 (4 Cs framework)
- Introduce the idea that different goals need different prompting approaches
- Preview the four categories to set expectations
- Promise live demonstrations to keep viewers engaged

**Visual suggestions:**
- Start on camera with a warm, energetic tone
- Brief on-screen graphic showing the four categories: Code, Explain, Brainstorm, Productivity
- On-screen text: "Different goals, different prompts"

---

## Section 1: Code Generation Prompts (1:15 - 4:00)

### What Makes Code Prompts Different

**SCRIPT:**
> "Let's start with the one most of you are here for: getting Claude to write code. Code prompts are where specificity matters most. Think of it like giving an architect blueprints vs. just saying 'build me a house.' The more precise your specifications, the less back-and-forth you'll need.
>
> When you're asking Claude to generate code, there are four things you should always specify: what language or framework to use, what the code should do, how it should be structured, and any constraints like 'keep it simple' or 'make it accessible.'
>
> Let me show you a real example. Watch the difference between these two prompts."

**Keypoints:**
- Code prompts need the most structure and specificity
- Four key elements: language/framework, functionality, structure, constraints
- The 02Ship platform was built using exactly these principles
- Code prompts benefit heavily from the "Constrained" and "Clear" Cs

**What to show on screen:**
- Bad code prompt: "Make a navigation bar"
- Good code prompt: "Create a responsive navigation bar using React and Tailwind CSS. It should have: a logo on the left, 4 navigation links in the center (Home, Courses, Blog, About), and a dark mode toggle button on the right. On mobile, collapse into a hamburger menu. Use TypeScript. Keep it under 60 lines."
- Claude's responses to both prompts side by side

**Visual suggestions:**
- Live screen recording showing both prompts and responses
- Highlight the specific elements in the good prompt (language, functionality, structure, constraints)
- On-screen annotation labeling each part of the good prompt
- On-screen text: "Code prompts need: language, function, structure, constraints"

---

### Specifying Technical Details (Even as a Beginner)

**SCRIPT:**
> "Now I know what you're thinking: 'I don't know what React or TypeScript are -- how am I supposed to specify technical details?' Great question. You don't need to know what these technologies are to use them in your prompts. If you're following along with 02Ship, just include 'Use React, TypeScript, and Tailwind CSS' in your code prompts. That's it. Claude knows what to do with that information, even if you don't fully understand it yet. You'll learn what these tools are naturally as you build."

**Keypoints:**
- Beginners can specify tech without understanding it deeply
- Copy the tech stack from the project they're working on
- Understanding comes through building, not studying first
- This is empowering, not intimidating

**What to show on screen:**
- Simple "cheat sheet" graphic: "Your 02Ship tech stack: React + TypeScript + Tailwind CSS + Next.js"
- On-screen text: "You don't need to understand it to use it"

**Visual suggestions:**
- Return to camera for reassurance
- Keep this segment brief and confidence-building

---

## Section 2: Explanation Prompts (4:00 - 6:30)

### Getting Claude to Teach You

**SCRIPT:**
> "Next up: explanation prompts. This is where Claude becomes your personal tutor. The key to getting great explanations is telling Claude your knowledge level. The same concept explained to a five-year-old sounds completely different than when explained to a product manager or a senior developer.
>
> My three favorite explanation formats are: 'Explain like I'm five,' 'Give me an analogy from everyday life,' and 'Walk me through this step by step.' Let me show you all three."

**Keypoints:**
- Specify your knowledge level for better explanations
- Three powerful formats: ELI5, analogy-based, step-by-step
- Claude adapts its language and depth based on how you ask
- Use explanation prompts when Claude generates code you don't understand

**What to show on screen:**
- Prompt 1: "Explain what an API is like I'm 5 years old"
- Prompt 2: "Explain how React components work using an analogy from cooking"
- Prompt 3: "Walk me through what this code does, step by step, assuming I've never programmed before: [paste code]"
- Claude's response to each, showing how the style adapts

**Visual suggestions:**
- Screen recording showing all three prompts and responses
- Spend a few seconds on each response so viewers can read along
- On-screen text: "Tell Claude your level"

---

### The "Explain What You Just Built" Pattern

**SCRIPT:**
> "Here's a pro tip that will accelerate your learning: every time Claude generates code for you, follow up with 'Now explain what each part of this code does, in plain English, like I'm a complete beginner.' This is one of the most powerful learning loops in AI-assisted building. You get working code AND you gradually understand what's happening under the hood. That's exactly how I learned while building 02Ship -- Claude was my coding partner and my teacher at the same time."

**Keypoints:**
- The build-then-explain loop is a powerful learning technique
- You don't need to understand code before using it, but understanding grows over time
- This is how the 02Ship creator learned
- Combine goals: "Generate code AND explain each function"

**What to show on screen:**
- Example: a code snippet from Claude followed by "Explain what each part does"
- Claude's line-by-line explanation

**Visual suggestions:**
- Screen recording of the follow-up explanation prompt
- On-screen text: "Build first, understand second"
- Brief return to camera for the personal 02Ship anecdote

---

## Section 3: Brainstorming Prompts (6:30 - 9:00)

### When You Need Ideas, Not Answers

**SCRIPT:**
> "Now let's talk about brainstorming. This is where you flip everything we said about code prompts on its head. Code prompts need tight constraints. Brainstorming prompts need freedom. When you're brainstorming, you want quantity over quality at first. You want divergent thinking -- ideas shooting in every direction.
>
> My go-to brainstorming prompt structure is: tell Claude the problem, set the context, then ask for a specific number of ideas. Watch this."

**Keypoints:**
- Brainstorming needs freedom and open-endedness -- the opposite of code prompts
- Ask for quantity first, then narrow down to quality
- Specify a number (e.g., "give me 10 ideas") to push Claude past the obvious answers
- The magic usually happens in ideas 7 through 10

**What to show on screen:**
- Brainstorming prompt: "I'm building a learning platform for non-programmers. I need creative ways to keep students engaged between lessons. Give me 15 ideas, ranging from conventional to wild and creative. Don't filter yourself -- quantity over quality."
- Claude's response showing a diverse range of ideas
- Highlight the unexpected ideas that appear later in the list

**Visual suggestions:**
- Screen recording of the brainstorming prompt and response
- On-screen annotation highlighting the surprising/creative ideas (especially later ones)
- On-screen text: "Quantity first, quality second"

---

### Narrowing Down: From Brainstorm to Action

**SCRIPT:**
> "Once you have your big list of ideas, here's the follow-up move: 'Pick the top 3 ideas from that list and explain the pros and cons of each. Then recommend one and tell me why.' This two-step approach -- diverge then converge -- is how professional product managers work. And now you can do it in two prompts."

**Keypoints:**
- Brainstorming is a two-step process: diverge, then converge
- Follow-up prompts refine the raw ideas into actionable plans
- This mirrors professional product development workflows
- Claude can evaluate its own ideas -- ask it to

**What to show on screen:**
- The follow-up prompt asking Claude to evaluate its top 3
- Claude's analysis with pros, cons, and recommendation
- Brief highlight of the recommended idea

**Visual suggestions:**
- Continue the screen recording from the brainstorm
- On-screen text: "Diverge, then converge"
- Consider a simple graphic showing a funnel: many ideas narrowing to top 3 to final 1

---

## Section 4: Productivity Prompts (9:00 - 11:30)

### Claude Beyond Code

**SCRIPT:**
> "Here's something a lot of people miss: Claude isn't just for building apps. It's a productivity powerhouse for your everyday work. Writing, research, analysis, planning -- Claude can help with all of it. And the best part? You already know how to prompt for these tasks because the 4 Cs apply to everything.
>
> Let me show you four real productivity use cases."

**Keypoints:**
- Claude's value extends far beyond code generation
- Productivity use cases make Claude useful from day one
- The 4 Cs framework applies to all of these
- This section helps viewers see immediate, practical value

**What to show on screen:**
- Title card: "Claude for Everyday Productivity"
- Brief glimpse of each use case category

**Visual suggestions:**
- Return to camera to introduce the section with enthusiasm
- Transition to screen recordings for each example

---

### Use Case 1: Writing (30 seconds)

**SCRIPT:**
> "Writing. Need to draft an email? 'Draft a professional but friendly email to my team announcing that our project deadline is moving to next Friday. Keep the tone positive and solution-oriented. Under 150 words.' Claude gives you a solid first draft in seconds."

**Keypoints:**
- Specify tone, audience, length, and purpose
- Claude drafts, you edit -- it's a starting point, not a final product

**What to show on screen:**
- The email prompt and Claude's response

**Visual suggestions:**
- Quick screen recording, keep it snappy

---

### Use Case 2: Research and Summarization (30 seconds)

**SCRIPT:**
> "Research. Got a long article you need to digest? Paste it in and say: 'Summarize this article in 5 bullet points. Focus on the key arguments and any data or statistics mentioned. Then tell me one thing the author might be wrong about.' Boom -- five-minute read turned into a 30-second scan."

**Keypoints:**
- Paste content directly into Claude for analysis
- Specify what you want extracted (key points, data, arguments)
- Ask for Claude's critical analysis to go beyond simple summarization

**What to show on screen:**
- The summarization prompt with a pasted article excerpt
- Claude's bullet-point summary and critical note

**Visual suggestions:**
- Screen recording showing the prompt and response
- On-screen text: "5 minutes to 30 seconds"

---

### Use Case 3: Analysis (30 seconds)

**SCRIPT:**
> "Analysis. Have a business idea? Try this: 'Do a SWOT analysis for an online learning platform that teaches non-programmers to build with AI tools. Be honest and critical -- I need to know the real risks.' Claude gives you a structured analysis that would take hours to research on your own."

**Keypoints:**
- Claude can perform structured analysis frameworks (SWOT, pros/cons, competitive analysis)
- Ask Claude to be honest and critical for more useful output
- This saves hours of manual research and thinking

**What to show on screen:**
- The SWOT analysis prompt and Claude's structured response
- Highlight the "be honest and critical" instruction

**Visual suggestions:**
- Screen recording of the SWOT analysis result
- Brief on-screen annotation of the SWOT quadrants

---

### Use Case 4: Planning and Organization (30 seconds)

**SCRIPT:**
> "Planning. Starting a new project? 'Create a 4-week plan for launching a personal blog. I can spend about 5 hours per week. Break it into weekly milestones with specific tasks. Include what tools I'll need.' Claude becomes your project manager."

**Keypoints:**
- Specify your time constraints and Claude creates realistic plans
- Ask for specific milestones and tasks, not just vague goals
- Claude can factor in realistic timelines and resources

**What to show on screen:**
- The planning prompt and Claude's weekly breakdown
- Highlight how Claude structures the plan with milestones

**Visual suggestions:**
- Screen recording of the planning response
- On-screen text: "Claude as your project manager"

---

## Section 5: Mixing Goals (11:30 - 12:15)

### Combining Prompt Types

**SCRIPT:**
> "One more powerful technique before we wrap up: you can mix these goal types in a single prompt. Try this: 'Generate a React component for a newsletter signup form AND explain what each part of the code does in plain English.' Or: 'Brainstorm 10 feature ideas for my app, then pick the top 3, and create a one-week implementation plan for the best one.' You're not limited to one type of prompt at a time. Mix and match to get exactly what you need."

**Keypoints:**
- Prompts can combine multiple goal types in one request
- Code + Explanation is a powerful learning combination
- Brainstorm + Analyze + Plan creates a complete workflow
- This is where Claude really starts to feel like a collaborator

**What to show on screen:**
- The combined "code + explain" prompt and Claude's dual response
- The "brainstorm + evaluate + plan" chain
- Highlight how the response covers multiple dimensions

**Visual suggestions:**
- Screen recording showing combined prompts
- On-screen text: "Mix and match"
- Brief annotation showing the different parts of the response

---

## Closing (12:15 - 13:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap what we covered today. Code generation prompts need specificity -- tell Claude the language, the function, the structure, and the constraints. Explanation prompts need your knowledge level -- 'explain like I'm five' gets very different results from 'explain for a developer.' Brainstorming prompts need freedom -- ask for quantity first, narrow down second. And productivity prompts can handle your writing, research, analysis, and planning.
>
> The real power is when you combine these and mix them together into one conversation.
>
> In the next video, I'm going to give you ready-to-use prompt templates -- recipes you can steal and customize for your own projects. These are the exact templates I used to build 02Ship, and you'll be able to copy, paste, and modify them immediately. See you there!
>
> And if you found this helpful, head to our Discord to share which prompt type surprised you the most. The link is in the description."

**Keypoints:**
- Rapid recap of all four prompt types
- Emphasize the "mix and match" power
- Strong tease for Video 3 (templates and recipes)
- Community call-to-action

**Visual suggestions:**
- Return to camera for warm, encouraging close
- On-screen recap graphic: Code / Explain / Brainstorm / Productivity
- End card with links to next video, lesson page, and Discord
- On-screen text: "Next: Prompt Recipes You Can Steal"

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Different goals need different prompting approaches** (one size does not fit all)
2. **Code prompts need specificity** (language, function, structure, constraints)
3. **Explanation prompts need your knowledge level** (Claude adapts its teaching style)
4. **Brainstorming prompts need freedom** (quantity first, then narrow down)
5. **Claude is a productivity tool, not just a code tool** (writing, research, analysis, planning)
6. **You can mix prompt types** (code + explain, brainstorm + plan)
7. **You don't need technical knowledge to specify tech details** (copy the tech stack, Claude handles the rest)

---

## Production Notes

### Tone & Style
- Energetic and practical -- this is a "show me" video, not just theory
- Live demonstrations should feel authentic, not scripted or rehearsed
- Show genuine reactions to Claude's responses
- Keep switching between camera and screen to maintain visual variety
- Use the word "you" frequently -- make it feel personal

### Common Beginner Concerns to Address
- "I don't know what language to specify for code prompts" --> Use whatever your project uses; for 02Ship, it's React + TypeScript + Tailwind
- "What if I don't know my knowledge level?" --> If you're in this course, say "explain for a complete beginner"
- "Can I really use Claude for work tasks?" --> Absolutely, as long as you don't share confidential or sensitive data
- "How do I know which prompt type to use?" --> Ask yourself: Am I building, learning, exploring, or getting things done?

### Things to Avoid
- Spending too long on any single demo (keep each under 60 seconds)
- Making code prompts feel intimidating (the tech stack is just a line you copy)
- Implying Claude replaces human judgment (it assists, you decide)
- Skipping the productivity section (it's the most immediately useful for many beginners)
- Using overly complex examples that distract from the prompting lesson

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Same setup as Video 1 for visual consistency
- Well-lit face, clean background, eye-level camera
- Consider a slightly different shirt/setting to signal "new video" while staying familiar

**Screen recording:**
- Claude.ai interface with a clean browser window
- Increase font size for mobile readability
- Pre-prepare the prompts in a text file so you can paste them smoothly
- Show the full Claude response, not just snippets (scroll through briefly)

**Editing notes:**
- Add on-screen labels for each prompt type (Code, Explain, Brainstorm, Productivity)
- Use consistent color coding: e.g., blue for code, green for explain, orange for brainstorm, purple for productivity
- Include timestamps in YouTube description for each section
- Add chapter markers for easy navigation
- Use picture-in-picture (your face in corner) during screen recordings

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Prompt Recipes You Can Steal" (clickable link)
- "Try all 4 prompt types today on 02Ship" (link to lesson page)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Which prompt type surprised you most? Tell us in the comments"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "Which of the four prompt types do you think you'll use most often? Code, Explain, Brainstorm, or Productivity?"
- "Have you tried using Claude for a non-coding task yet? What happened?"
- "What's one thing in your daily work that you could hand off to Claude right now?"

---

## Accessibility Notes

- **Captions:** Auto-generate and manually review, especially for code-related terms and prompt text
- **Transcript:** Post full transcript on the lesson page, including all example prompts so viewers can copy them
- **Pace:** Speak clearly; slow down when showing on-screen prompts so viewers can read along
- **Visuals:** Always narrate what's on screen -- describe the prompt and the key parts of Claude's response verbally

---

## Post-Production Checklist

- [ ] Video length: 13-15 minutes
- [ ] All key points covered
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Prompts for Every Goal")
- [ ] YouTube title: "Prompting for Different Goals | 02Ship Claude Basics"
- [ ] Description includes: timestamps, links to 02Ship lesson page, all example prompts, Discord, next video
- [ ] Tags: Claude AI, prompting, code generation, AI brainstorming, AI productivity, prompt types, 02Ship
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 2"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This video is where things click for most viewers -- when they see Claude adapt to different goals, the possibilities open up. Show that range with energy and enthusiasm, and your audience will leave this video ready to experiment on their own.**
