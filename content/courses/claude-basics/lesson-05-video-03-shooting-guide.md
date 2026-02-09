# Video 3 Shooting Guide: Multi-Session Workflows: Building Across Days

**Target Duration:** 13 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 0:45)

### Hook & Introduction

**SCRIPT:**
> "You've set up your Project. Claude knows your tech stack, your goals, your coding style. Now comes the real magic: building something across days, not just minutes. Most real projects aren't built in a single sitting. They're built over days, weeks, sometimes months. And the biggest challenge isn't the coding, it's keeping everything organized and picking up exactly where you left off. In this video, I'm going to show you how to use your Project to build features across multiple sessions, reference previous work, and keep your workspace clean as your project grows."

**Keypoints:**
- Real projects are built over many sessions, not one
- The challenge is continuity and organization
- Projects make multi-day building seamless
- This video shows real workflows, not just theory

**Visual suggestions:**
- Show yourself on camera (calm, experienced tone)
- On-screen text: "Building Across Days"
- Brief flash of a Project with multiple organized conversations

---

## Section 1: Conversation Organization (0:45 - 2:30)

### One Feature, One Conversation

**SCRIPT:**
> "The first principle of multi-session building is this: one feature, one conversation. When you're working inside a Project, think of each conversation as a work session focused on a single task. Adding a contact form? That's one conversation. Redesigning the navigation? That's another conversation. Fixing a bug in the course player? A third conversation. This keeps things organized and makes it easy to find previous work later."

**Keypoints:**
- Each conversation should focus on a single feature or task
- This keeps conversations focused and manageable
- Makes it easy to find and reference specific work later
- Prevents long, tangled conversations that are hard to follow

**Visual suggestions:**
- Show a Project sidebar with well-named conversations
- On-screen text: "1 feature = 1 conversation"
- Show example conversation names: "Add Contact Form," "Redesign Nav," "Fix Course Player Bug"

### Naming Your Conversations

**SCRIPT:**
> "Give your conversations clear, descriptive names. Not 'Chat 1' or 'Untitled,' but something like 'Add blog search feature' or 'Fix mobile navigation.' When you have twenty conversations in a Project, good names are the difference between finding what you need in two seconds and scrolling through everything trying to remember which chat had the code for that header you built last Tuesday."

**Keypoints:**
- Use descriptive names that describe the task or feature
- Good names save time when you need to reference past work
- Rename conversations after starting them if the default name is unclear
- Think of conversation names like file names: clear and specific

**What to show on screen:**
- Show renaming a conversation in the Claude interface
- Show a list of well-named conversations
- Contrast with poorly named conversations ("Chat 1," "Help," "Code")
- On-screen text: "Good names = easy navigation"

---

## Section 2: Referencing Previous Work (2:30 - 4:30)

### Claude Remembers Within a Project

**SCRIPT:**
> "Here's where Projects get really powerful. Claude remembers everything within a Project. That means you can reference work from previous conversations naturally. You can say things like: 'Improve the header component we built last week' or 'The contact form from our previous conversation needs validation.' Claude knows what you're talking about because it has access to your Project's conversation history."

**Keypoints:**
- Claude has access to all conversations within the Project
- You can reference previous work by describing it naturally
- No need to copy-paste code from old conversations
- Claude can recall components, decisions, and patterns from past sessions

**What to show on screen:**
- Start a new conversation in the Project
- Type a prompt that references previous work
- Show Claude responding with awareness of the previous context
- On-screen text: "Reference past work naturally"

### How to Reference Effectively

**SCRIPT:**
> "The key to good references is being descriptive enough that Claude can find the right conversation. 'The auth system we built' is good if you only have one auth conversation. But if you've had several, be more specific: 'The login form with email validation from our conversation about user authentication.' The more specific your reference, the more accurately Claude retrieves the right context."

**Keypoints:**
- Be specific when referencing past work
- Mention the feature, the component, or the conversation topic
- If you have many conversations, add distinguishing details
- Claude matches your reference to the most relevant conversation

**Visual suggestions:**
- Show example reference prompts on screen
- Show a vague reference vs. a specific reference side by side
- On-screen text: "Be specific when referencing past work"

---

## Section 3: Picking Up Where You Left Off (4:30 - 7:00)

### The Power of Persistent Context

**SCRIPT:**
> "One of the best things about Projects is picking up where you left off. Let's say you're building a feature on Monday. You get the basic structure working, but you run out of time. You close your laptop and come back on Wednesday. In a regular chat, you'd have to start over, re-explain everything, and hope you remember where you were. In a Project, you just open the same conversation and type: 'Let's continue. Where were we?' Claude picks right back up."

**Keypoints:**
- You can leave a conversation and return days later
- Claude remembers the full conversation history
- No need to re-explain or re-set context
- Just continue the conversation naturally

**What to show on screen:**
- Show closing a conversation
- Reopen it (simulate coming back later)
- Type "Let's continue where we left off"
- Show Claude's response demonstrating full context awareness

### When to Continue vs. Start New

**SCRIPT:**
> "An important decision you'll face: should I continue an existing conversation or start a new one? Here's my rule of thumb. Continue the same conversation if you're working on the same feature and the conversation is still manageable in length. Start a new conversation if you're moving to a different feature, the current conversation has gotten really long, or you want a clean slate for a new approach. Think of it like chapters in a book. Each chapter should have a clear focus, and when the topic changes, you start a new chapter."

**Keypoints:**
- Continue if: same feature, manageable conversation length
- Start new if: different feature, very long conversation, want a fresh approach
- Long conversations can degrade Claude's response quality
- Each conversation should have a clear, focused scope
- When in doubt, start a new conversation and reference the old one

**Visual suggestions:**
- Decision tree graphic: continue vs. start new
- On-screen text listing the rules of thumb
- Book chapter analogy: each conversation is a chapter

---

## Section 4: Real Workflow Demo (7:00 - 11:00)

### Three Features Across Three Days

**SCRIPT:**
> "Let me show you a real workflow. I'm going to walk through adding three features to a project across three different sessions, the way you'd actually do it in real life. This isn't staged or simplified. This is the actual workflow I used when building parts of 02Ship."

**Keypoints:**
- Demonstrate a realistic multi-day workflow
- Show the full cycle: start, build, pause, return, continue
- Use practical features that beginners can relate to
- Keep it concrete and followable

#### Day 1: Adding a Newsletter Signup

**SCRIPT:**
> "Day one. I want to add a newsletter signup form to the footer of 02Ship. I open my Project and start a new conversation. I name it 'Add Newsletter Signup to Footer.' My prompt is simple: 'I want to add an email newsletter signup form to the site footer. It should have an email input field, a subscribe button, and a brief message explaining what subscribers get. Match our existing Tailwind styling.' Notice how short the prompt is. I don't need to explain what 02Ship is, what tech stack we use, or what our styling looks like. The Project already knows all of that."

**What to show on screen:**
- Create a new conversation named "Add Newsletter Signup to Footer"
- Type the prompt
- Show Claude's response with code
- Highlight how Claude automatically uses the correct tech stack and styling
- On-screen text: "Day 1: Newsletter Signup"

#### Day 2: Adding Social Sharing to Blog Posts

**SCRIPT:**
> "Day two. New feature, new conversation. I create one called 'Add Social Sharing to Blog Posts.' My prompt: 'Add social media sharing buttons to blog posts. Include Twitter, LinkedIn, and a copy-link button. Place them at the bottom of each post.' Again, Claude already knows our blog uses MDX, it knows our component structure, and it knows our styling conventions. All from the Project context."

**What to show on screen:**
- Start a new conversation with the appropriate name
- Type the prompt
- Show Claude generating code that fits the existing project
- On-screen text: "Day 2: Social Sharing"

#### Day 3: Connecting the Features

**SCRIPT:**
> "Day three. Now here's where it gets interesting. I want to make sure the newsletter signup and the social sharing buttons have a consistent look. I start a new conversation called 'Unify Newsletter and Social Sharing Styles.' My prompt: 'The newsletter signup form we built and the social sharing buttons from our blog posts need consistent styling. Can you review both components and suggest updates so they feel like they belong to the same design system?' See what happened? I referenced work from two different conversations. Claude pulls context from both, understands the components, and gives me a unified approach."

**What to show on screen:**
- Create a third conversation
- Type the prompt referencing both previous features
- Show Claude responding with awareness of both previous conversations
- Highlight the cross-conversation reference
- On-screen text: "Day 3: Connecting the dots"

**SCRIPT (continued):**
> "This is the real power of Projects. Each conversation is focused, but they all share the same context. You can build independently and then bring things together. It's like having a team where everyone shares the same knowledge base."

**Keypoints:**
- Each feature gets its own focused conversation
- You can reference work across conversations
- Projects make it natural to build incrementally across days
- Cross-conversation references let you connect features
- The shared context ensures consistency

**Visual suggestions:**
- Show the Project sidebar with all three conversations
- On-screen text: "3 features, 3 days, 1 workspace"
- Show the progression visually

---

## Section 5: Archiving and Managing Conversations (11:00 - 12:15)

### Keeping Your Workspace Clean

**SCRIPT:**
> "As you build more features, your Project will accumulate conversations. This is normal and healthy, but you want to keep things tidy. When a feature is done and shipped, consider archiving the conversation. Archiving removes it from your active view but doesn't delete it. You can always find it again if you need to reference it later."

**Keypoints:**
- Archive completed conversations to reduce clutter
- Archived conversations are not deleted; they can be retrieved
- Keep active conversations visible for ongoing work
- A clean workspace helps you focus

**What to show on screen:**
- Show how to archive a conversation in the Claude interface
- Show the difference between active and archived views
- On-screen text: "Archive completed work to stay organized"

### When to Archive

**SCRIPT:**
> "My rule is simple. If the feature is built, tested, and working, and I haven't needed to reference that conversation in a week, I archive it. If I'm still actively working on something or might need to revisit it soon, I keep it active. Don't overthink this. You can always un-archive if you need to."

**Keypoints:**
- Archive when the feature is complete and stable
- Keep conversations active if you might need them soon
- Un-archiving is always possible
- Don't overthink the decision; it is about keeping things tidy, not permanent

**Visual suggestions:**
- Show a clean Project sidebar with a few active conversations
- On-screen text: "Built, tested, shipped = archive"

---

## Closing (12:15 - 13:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's wrap up everything you've learned in Lesson 5. You started by understanding the context problem: without Projects, you waste time re-explaining your project in every conversation. You set up a Project with custom instructions and a knowledge base, so Claude permanently understands your work. And now you've seen how to build across multiple sessions: organizing conversations by feature, referencing previous work naturally, picking up where you left off, and keeping your workspace clean.
>
> This is a workflow that professional developers use every day, and now you have it too. Projects eliminate 90% of the overhead that slows people down when building with AI. You set up the context once, and then you just build.
>
> In Lesson 6, we'll shift gears to Analysis and Research, where I'll show you how to use Claude for market research, competitive analysis, and planning. But for now, go set up a Project for your app idea, test it with the 'describe this project' prompt, and start building across sessions. The more you use Projects, the more natural it becomes.
>
> See you in Lesson 6!"

**Keypoints:**
- Recap the three videos: why Projects matter, setting them up, multi-session workflows
- Reinforce the 90% overhead reduction
- Tease Lesson 6: Analysis and Research
- Encourage immediate action: set up their own Project
- End on a confident, empowering note

**Visual suggestions:**
- Show your face (warm, confident, proud of the viewer)
- On-screen text: "Lesson 5 Complete!"
- End card: "Next: Lesson 6 - Analysis & Research"

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Claude remembers everything within a Project** (the core benefit of multi-session workflows)
2. **One feature per conversation keeps things organized** (focused conversations produce better results)
3. **You can reference previous work naturally** (just describe it; Claude finds the context)
4. **Continue conversations for the same feature, start new ones for new features** (the golden rule)
5. **Projects eliminate 90% of context-setting overhead** (concrete, memorable statistic)
6. **Archive completed work to keep your workspace clean** (practical workspace management)

---

## Production Notes

### Tone & Style
- **Experienced and practical** (this is a workflow video, show real patterns)
- **Calm and methodical** (multi-session work requires patience and organization)
- **Empowering** (they're learning professional-level workflows)
- **Show, don't tell** (the three-day demo is the centerpiece of this video)

### Common Beginner Concerns to Address
- "What if Claude forgets something from a past conversation?" → It shouldn't, but if responses seem off, remind it by referencing the conversation topic
- "How many conversations can a Project have?" → Plenty for any typical project; organize and archive to keep things manageable
- "When does a conversation get 'too long'?" → If Claude's responses start feeling less accurate or relevant, it's time to start a new one
- "Can I use the same Project for multiple apps?" → One Project per app is recommended for clarity

### Things to Avoid
- Making multi-session work seem complicated (it is actually simpler than the manual alternative)
- Glossing over the three-day demo (it is the most valuable part; give it time)
- Assuming viewers understand version control or development workflows
- Using jargon like "sprint," "deployment pipeline," or "CI/CD" without explanation
- Skipping the archiving section (workspace management is important for beginners)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle

**Screen recording:**
- Full Claude interface showing the Project sidebar with conversations
- Show conversation creation, naming, and navigation
- Demonstrate referencing previous work across conversations
- Show archiving flow
- Keep font size large for readability

**Editing notes:**
- Add on-screen text for each "day" in the three-day demo
- Include timestamps in YouTube description
- Add chapter markers for each section
- Use visual transitions between Day 1, Day 2, and Day 3
- Consider a split-screen showing the conversation list alongside the active conversation

---

## Call-to-Action (End Card)

**Include:**
- "Next Lesson: Analysis & Research" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Share your multi-session workflow in our Discord"
- "Try the three-day workflow with your own project!"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "What feature are you building across multiple sessions? Share your progress in the comments!" (comment prompt)
- "Do you prefer long conversations or many short ones? Let me know your style below" (engagement)
- "Share a screenshot of your organized Project sidebar in our Discord!" (community)

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy; ensure conversation names and prompts are captioned correctly
- **Transcript:** Post full transcript in lesson page
- **Pace:** Speak clearly during the three-day demo; pause between each "day" to let the structure sink in
- **Visuals:** Narrate every action in the Claude interface; describe the conversation sidebar layout for audio-only listeners

---

## Post-Production Checklist

- [ ] Video length: 13-15 minutes
- [ ] All key points covered
- [ ] Three-day demo is clear and realistic
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Build Across Days")
- [ ] YouTube title: "Multi-Session Workflows: Building Across Days | 02Ship Claude Basics"
- [ ] Description includes: timestamps, links to 02Ship, next lesson, Discord
- [ ] Tags: Claude Projects, multi-session workflow, AI coding, Claude tutorial, persistent context, project management, build with AI
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 5"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the payoff video for Lesson 5. Viewers have learned why Projects matter and how to set them up. Now they see Projects in action with a real, multi-day workflow. Make the three-day demo feel natural and achievable. By the end, they should feel confident that they can build anything, one session at a time.**
