# Video 2 Shooting Guide: Build Workflow: From Prompt to Production Code

**Target Duration:** 14 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "In the last video, you made a plan. You've got your problem, your solution, your three features, and your success criteria. Now it's time to turn that plan into a real, working product. In this video, I'm going to walk you through the complete build workflow -- five phases from opening Claude to having production-ready code. And to make this as real as possible, I'm going to build a simple SaaS landing page live, from scratch, start to finish. By the end, you'll have the exact process to build your own MVP. Let's go."

**Keypoints:**
- Connect directly to Video 1 (the plan is done, now we build)
- Preview the five-phase workflow
- Announce the live demo: building a SaaS landing page from scratch
- Set the tone: hands-on, action-oriented, exciting
- Reassure viewers: they have all the skills from Lessons 1-6

**Visual suggestions:**
- Show yourself on camera (sleeves rolled up, ready-to-build energy)
- On-screen text: "From Prompt to Production Code"
- Brief flash of the MVP planning template from Video 1
- Show Claude interface ready and waiting

---

## Section 1: Phase 1 -- Planning Session with Claude (1:00 - 3:00)

### Turn Your Plan into a Claude Prompt

**SCRIPT:**
> "Phase 1 is the planning session. You already have your MVP plan from Video 1. Now you're going to turn it into a conversation with Claude. You're not just dumping your plan and saying 'build this.' You're having a back-and-forth to make sure Claude fully understands what you're building before a single line of code is written."

**Keypoints:**
- Take your MVP planning template and convert it into a Claude prompt
- Use the four-part prompt structure from Lesson 1: goal, constraints, tech preference, success criteria
- Always include "ask me clarifying questions first"
- This is a conversation, not a one-shot command

**SCRIPT (continued):**
> "Let me show you. Here's my plan for a SaaS landing page: 'I want to build a landing page for a productivity app called FocusFlow. It helps remote workers block distractions and track deep work sessions. I need a hero section, a features section, a pricing section, and an email signup form. Tech stack: Next.js with Tailwind CSS, deployed on Vercel. Before generating anything, ask me clarifying questions.' Watch what Claude does with this."

**What to show on screen:**
- Type the prompt into Claude live
- Show Claude's clarifying questions appearing
- Answer 3-4 questions on camera, naturally
- Point out how Claude's questions reveal things you hadn't considered

**Visual suggestions:**
- Full-screen Claude interface
- Highlight the prompt structure as you type it
- On-screen text: "Phase 1: Plan with Claude"

---

## Section 2: Phase 2 -- Generate Initial Codebase (3:00 - 5:30)

### From Conversation to Code

**SCRIPT:**
> "Phase 2: generate the initial codebase. After answering Claude's clarifying questions, you tell Claude to go ahead and generate the code. Now, here's what I want you to expect: the first version will be functional but rough. It won't look like a finished product. And that is completely fine. Remember from Lesson 1: iteration is the superpower. We're going to refine this in Phase 4."

**Keypoints:**
- After the planning conversation, ask Claude to generate the full project
- Expect a functional but rough first version
- Claude will typically generate file structure, component code, and setup instructions
- Don't panic if the first output isn't perfect -- that's normal and expected
- This is where all your prompt skills from the course pay off

**SCRIPT (continued):**
> "When Claude generates the code, pay attention to a few things. First: did it create a logical file structure? Second: does the code match what you discussed in the planning phase? Third: did Claude include instructions for how to set it up? If any of these are missing, just ask. Say 'Can you also give me the project structure?' or 'How do I run this locally?'"

**What to show on screen:**
- Show Claude generating the codebase for FocusFlow
- Scroll through the response -- point out the file structure, components, and setup instructions
- Show the project organization Claude suggests
- Highlight the setup instructions

**Visual suggestions:**
- Full-screen Claude output, scrolling through at a readable pace
- On-screen text: "Phase 2: Generate Code"
- Highlight or circle key parts of the output (file structure, main components)
- On-screen callout: "First version = functional, not perfect"

---

## Section 3: Phase 3 -- Run Locally and Test (5:30 - 7:30)

### See It in Your Browser

**SCRIPT:**
> "Phase 3: run it locally and test. This is where your MVP comes to life for the first time. You're going to take the code Claude generated, set it up on your computer, and see it in your browser. If you've been following this course, you've already done this in earlier lessons. Same process, bigger project."

**Keypoints:**
- Copy the code Claude generated into your project folder
- Follow Claude's setup instructions (typically: install dependencies, start dev server)
- Open your browser and see your MVP for the first time
- Test the basic functionality: do links work? Do sections display correctly?
- Test after every major change -- don't wait until everything is done

**SCRIPT (continued):**
> "Let me run the FocusFlow landing page locally. I'll follow Claude's instructions... install the dependencies... start the dev server... and there it is. My landing page is alive in the browser. Now, is it perfect? No. The spacing is a bit off, the hero section needs work, and the pricing cards don't look quite right. But it's real. It exists. And we're about to make it better."

**What to show on screen:**
- Terminal: running npm install and npm run dev
- Browser: the landing page appearing for the first time
- Click through the page, testing links and sections
- Point out what works and what needs improvement

**Visual suggestions:**
- Split screen: terminal on one side, browser on the other
- Show the moment the page first loads (make it feel like a "moment")
- On-screen text: "Phase 3: Run & Test"
- Circle or annotate the rough spots that need improvement

---

## Section 4: Phase 4 -- Iterate and Refine (7:30 - 10:30)

### The Heart of the Build Process

**SCRIPT:**
> "Phase 4 is where the magic happens: iterate and refine. This is the core of building with Claude. You look at what you have, identify what needs to change, and tell Claude specifically what to fix. Expect three to five iterations from first code to 'ready to deploy.' That's not a failure -- that's the process."

**Keypoints:**
- 3-5 iterations from first code to deploy-ready is normal and expected
- Be specific in your feedback (not "make it better" but "make the hero text larger and center the CTA button")
- Fix one category of issues per iteration (layout, then content, then styling, then polish)
- Test after every iteration before moving to the next
- Save each iteration as a Git commit so you can go back if needed

**SCRIPT (continued):**
> "Let me show you how iteration works in practice. I look at my FocusFlow landing page and I see three things to fix. The hero section needs a stronger headline. The features section needs better spacing. And the signup form needs a clearer call-to-action. Watch how I communicate this to Claude."

**What to show on screen (Live Iteration Demo):**

**Iteration 1 -- Layout and Structure:**
- Tell Claude: "The hero section needs more vertical padding and the headline should be larger. Can you also add a subtitle below the headline?"
- Show Claude's updated code
- Apply the changes and show the result in the browser

**Iteration 2 -- Content and Messaging:**
- Tell Claude: "The features section needs three feature cards in a grid layout. Each card should have an icon placeholder, a title, and a short description."
- Show the updated features section

**Iteration 3 -- Polish and Details:**
- Tell Claude: "The pricing section needs better visual hierarchy. Make the recommended plan stand out with a highlighted border and a 'Most Popular' badge."
- Show the polished pricing section

**SCRIPT (continued):**
> "See the pattern? Each round, I'm specific about what I want changed. I test after each change. And each version gets closer to what I envisioned. Three iterations, and we went from a rough layout to something that actually looks professional. This is how real products get built -- with or without AI."

**Keypoints:**
- Show the progression clearly: rough to refined
- Emphasize specificity in feedback
- Test after every change
- Save iterations in Git commits

**Visual suggestions:**
- Before/after comparisons for each iteration
- On-screen text: "Phase 4: Iterate & Refine"
- Side-by-side: your feedback prompt vs. the result
- Show a brief Git commit after each iteration (reinforcing the save habit)

---

## Section 5: Phase 5 -- Polish for Launch (10:30 - 12:00)

### The Final 10%

**SCRIPT:**
> "Phase 5: polish for launch. This is the final pass before your MVP goes live. You're not adding new features -- you're making sure everything that exists works cleanly. Think of it like proofreading before you hit publish."

**Keypoints -- polishing checklist:**
1. Check all links and navigation
2. Test on mobile (resize your browser window)
3. Check text for typos and placeholder content
4. Make sure images load properly
5. Test the core user flow from start to finish
6. Check page load speed (should feel snappy)

**SCRIPT (continued):**
> "Let me run through my polish checklist on FocusFlow. Links work? Yes. Mobile responsive? Let me resize... looks good. Any placeholder text I forgot to replace? Let me scan... found one, let me fix that. Images loading? Yes. Can someone land on the page, read about the product, and sign up? Let me test the full flow... perfect. This is ready to deploy."

**What to show on screen:**
- Run through the polish checklist live
- Resize the browser to test mobile responsiveness
- Find and fix a small issue (placeholder text, broken link, etc.)
- Show the complete user flow working end to end

**Visual suggestions:**
- On-screen text: "Phase 5: Polish for Launch"
- Show the polish checklist on screen as items are completed
- Check marks appearing as each item passes
- On-screen text: "Ready to deploy!"

---

## Section 6: Common Roadblocks and How to Overcome Them (12:00 - 13:30)

### When Things Go Wrong

**SCRIPT:**
> "Before we wrap up, let me address the roadblocks you will hit -- because you will hit them. Every builder does. Here are the most common ones and exactly how to handle them."

**Keypoints -- roadblocks and solutions:**

1. **Code doesn't run after copying from Claude**
   - Ask Claude: "I'm getting this error when I try to run the code: [paste the error]. Can you fix it?"
   - Nine times out of ten, Claude can fix it immediately

2. **The design doesn't look right**
   - Take a screenshot or describe specifically what looks wrong
   - Tell Claude: "The header overlaps the hero section" -- be visual and specific

3. **Stuck for more than 30 minutes on one problem**
   - Stop. Ask in the Discord community or GitHub Discussions
   - Or tell Claude: "Let's try a completely different approach"
   - Sometimes starting fresh on one component is faster than debugging

4. **Feature creep -- you keep wanting to add more**
   - Go back to your three-feature list from Video 1
   - If the new feature isn't on the list, it goes in version 2
   - Repeat the mantra: "Ship first, improve later"

**SCRIPT (continued):**
> "The most important thing to remember: getting stuck is part of the process. The difference between people who ship and people who don't isn't that shippers never hit problems. It's that they push through them. Ask Claude. Ask the community. Try a different approach. But don't give up."

**Visual suggestions:**
- Show each roadblock as a card or graphic
- On-screen text for each solution
- Community links (Discord, GitHub Discussions) shown on screen
- On-screen text: "Stuck > 30 min? Ask the community"

---

## Closing (13:30 - 14:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap the five-phase build workflow. Phase 1: plan with Claude. Phase 2: generate code. Phase 3: run and test. Phase 4: iterate and refine -- three to five rounds. Phase 5: polish for launch. You just watched me build a SaaS landing page from nothing to deploy-ready in one video. And you can do the same thing.
>
> In the next video -- the final video of this entire course -- we deploy. We take your MVP, put it on the internet, and ship it to the world. You're about to become a builder who ships. See you in Video 3!"

**Keypoints:**
- Recap all five phases clearly
- Celebrate the live demo accomplishment
- Build anticipation for the final video: deployment
- Keep energy at peak -- they're one video away from shipping

**Visual suggestions:**
- Show yourself on camera (pumped, proud)
- On-screen text: "Next: Ship It to the World"
- Quick graphic showing the five phases
- End card with links to the next video and Discord

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Five-phase workflow** (plan, generate, test, iterate, polish)
2. **3-5 iterations is normal** (not a failure, it's the process)
3. **Test after every change** (never batch up untested changes)
4. **Be specific in feedback** ("make the headline larger," not "make it better")
5. **Save iterations in Git** (you can always go back)
6. **Stuck for 30 minutes? Change tactics** (ask community, try a new approach)
7. **Feature creep is the enemy** (stick to your three features from the plan)
8. **02Ship was built this exact way** (the platform proves the process works)

---

## Production Notes

### Tone & Style
- **Hands-on and action-oriented** (this is the "building" video -- lots of screen time)
- **Fast-paced but clear** (speed up repetitive steps, slow down for key moments)
- **Encouraging during roadblocks** (normalize getting stuck)
- **Celebratory at each milestone** (first render, each iteration, final polish)
- **Coach energy** (you're guiding them through the build, not lecturing)

### Common Beginner Concerns to Address
- "What if Claude generates code that doesn't work?" → Paste the error back into Claude and ask it to fix it
- "How do I know when to stop iterating?" → When the polish checklist passes, you're ready
- "What if my MVP looks worse than the example?" → Every first version is rough; iteration fixes it
- "I don't understand the code Claude generated" → You don't need to understand all of it; focus on whether it works
- "What if I break something while iterating?" → That's what Git saves are for; you can always go back

### Things to Avoid
- Making the live demo look too easy (show real friction moments)
- Skipping error messages (beginners need to see how to handle them)
- Building too many features in the demo (stick to the MVP scope)
- Moving too fast during the iteration cycles (viewers need to follow along)
- Pretending the first output is perfect (honest about rough edges builds trust)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle
- Picture-in-picture format works well for this video (face in corner, screen recording main)

**Screen recording:**
- Full Claude interface for the planning and iteration phases
- Terminal visible when running commands
- Browser showing the live result after each change
- Font size large enough for viewers to read code
- Consider zooming into specific parts of the code when relevant

**Editing notes:**
- Speed up repetitive parts (npm install, waiting for builds) with a time-lapse effect
- Add on-screen text for each phase transition
- Include timestamps in YouTube description for each phase
- Before/after comparison graphics for iteration results
- Add the five-phase workflow graphic at the beginning and end
- Consider adding progress indicators: "Phase 2 of 5" throughout

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Deployment & Launch -- Ship It to the World" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Share your build progress in the community!"
- "Download the build workflow checklist: [link]"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "How many iterations did your MVP take? Drop the number in the comments!" (comment prompt)
- "What was the trickiest roadblock you hit? Let us know below -- someone else might have the answer!" (engagement)
- "Share a screenshot of your MVP in our Discord -- we want to celebrate with you!" (community)

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy, especially technical terms and terminal commands
- **Transcript:** Post full transcript in lesson page
- **Pace:** Narrate every action during screen recordings; don't silently type
- **Visuals:** Describe what's happening on screen for viewers who can't see the demo clearly

---

## Post-Production Checklist

- [ ] Video length: 14-15 minutes
- [ ] All five phases clearly demonstrated
- [ ] Live demo is clear and easy to follow
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Build Your MVP")
- [ ] YouTube title: "Build Workflow: From Prompt to Production Code | 02Ship Claude Basics"
- [ ] Description includes: timestamps, five-phase checklist, next video link, Discord link
- [ ] Tags: build with Claude, MVP tutorial, Claude AI coding, beginner coding, ship your product, 02Ship
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 7"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the most hands-on video in the entire course. Let viewers see the mess, the iteration, the real process. Authenticity builds trust and confidence. They need to believe they can do this -- and showing them the imperfect journey is more powerful than showing a polished final product.**
