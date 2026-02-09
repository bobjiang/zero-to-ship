# Video 3 Shooting Guide: Conversation Flow: Building on Previous Responses

**Target Duration:** 13 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 0:45)

### Hook & Introduction

**SCRIPT:**
> "You now know why iteration matters, and you've got eight techniques in your toolkit. But there's one more piece that ties it all together: understanding how conversations flow with Claude. In this video, I'm going to show you how Claude's memory works, how to build on previous responses like a pro, and how to know when you're done iterating. And then we'll do a live demo where I take a rough code snippet and refine it to production quality in just four steps. Let's dive in."

**Keypoints:**
- Connect to Videos 1 and 2: why + how, now the flow
- Preview the three big topics: memory, the refinement cycle, knowing when to stop
- Tease the live demo: rough code to polished result in four steps
- Set the tone: this is the capstone video of Lesson 3

**Visual suggestions:**
- Show yourself on camera, confident and ready
- On-screen text: "Conversation Flow: Building on Previous Responses"
- Brief graphic: a conversation thread flowing downward with progressive improvement

---

## Section 1: Claude's Memory - Within vs. Across Conversations (0:45 - 3:00)

### Within a Conversation: Claude Remembers Everything

**SCRIPT:**
> "Let's start with something really important: how Claude's memory works. Within a single conversation, Claude remembers everything. Every prompt you've sent, every response it's given, every detail you've shared. This is why iteration works so well. When you say 'Make that last part simpler,' Claude knows exactly which part you mean because it remembers the entire conversation."

**Keypoints:**
- Within one conversation, Claude has full memory of everything said
- This is why follow-ups work: Claude has the complete context
- You can reference specific parts of earlier responses: "In your second answer, you mentioned..."
- The conversation builds like a shared document that both of you can see

**Visual suggestions:**
- Show a Claude conversation with multiple exchanges
- Highlight that Claude references earlier context in its responses
- On-screen text: "One conversation = Full memory"
- Graphic: a scrolling conversation with a highlighted "context window" encompassing all of it

### Across Conversations: Claude Starts Fresh

**SCRIPT:**
> "But here's the important distinction: when you start a new conversation, Claude starts with a blank slate. It doesn't remember what you talked about yesterday or last week. Each new conversation is like meeting Claude for the first time. This is why I mentioned in Lesson 2 the importance of including context in your prompts. And it's also why, when you have a good conversation going, you should keep building on it rather than starting over unnecessarily."

**Keypoints:**
- New conversation = no memory of previous conversations
- Claude does not carry context between separate chats
- This means: stay in the same conversation when iterating on a task
- If you must start a new conversation, re-provide relevant context
- Save particularly good conversations so you can reference them later

**What to show on screen:**
- Two separate conversations: one with rich context, one starting blank
- On-screen text: "New conversation = Fresh start"
- Visual comparison: same question asked mid-conversation vs. in a new conversation

### Practical Tip: When to Stay vs. Start New

**SCRIPT:**
> "So when should you start a new conversation? Two main reasons. First: if your current conversation has gotten so long and messy that Claude seems confused. Sometimes conversations go sideways, and a fresh start with a clearer prompt works better. Second: if you're switching to a completely different topic. Don't try to build a website and plan a birthday party in the same conversation. Keep conversations focused on one project or task."

**Keypoints:**
- Stay in the conversation when iterating on the same task
- Start fresh when the conversation is confused or off-track
- Start fresh when switching to a completely unrelated topic
- Keep conversations focused: one project, one conversation
- When starting fresh, incorporate lessons learned from the previous attempt

**Visual suggestions:**
- Decision tree graphic: "Stay or start fresh?"
- On-screen text: "One project = One conversation"

---

## Section 2: Referencing Previous Responses (3:00 - 4:30)

### How to Point Claude Back

**SCRIPT:**
> "One of the most useful skills you can develop is referencing Claude's previous responses in your follow-ups. Instead of repeating yourself, you can say things like: 'In your last answer, you mentioned three options. Can you expand on option two?' or 'The code you wrote for the header section looks great, but can you update the footer to match the same style?' or 'Earlier you said we should use a simple file structure. Can you show me what that looks like?'"

**Keypoints:**
- Use phrases like "In your last answer," "The code you wrote for," "Earlier you said"
- Be specific about WHICH part of the response you're referencing
- You can reference any point in the conversation, not just the most recent response
- This saves time: no need to repeat context Claude already has

**Visual suggestions:**
- Show a Claude conversation with arrows pointing back to earlier responses
- Highlight the referencing phrases in the follow-up prompts
- On-screen text: "Point Claude to what you mean"

### Example Phrases

**SCRIPT:**
> "Here are some phrases you can keep in your back pocket. 'Based on what you suggested above...' 'Using the same approach as before...' 'Can you apply that same logic to this new section?' 'You mentioned X earlier, can you go deeper on that?' These phrases tell Claude exactly where to look and what to build on. It's like telling a colleague: 'Remember that idea you had in our meeting? Let's develop that one.'"

**Keypoints:**
- "Based on what you suggested above..."
- "Using the same approach as before..."
- "Can you apply that same logic to..."
- "You mentioned X earlier, can you go deeper on that?"
- These phrases maintain continuity and build progressively

**Visual suggestions:**
- On-screen text showing each phrase as a reusable template
- On-screen text: "Your conversation shortcuts"

---

## Section 3: The Refinement Cycle (4:30 - 6:30)

### The Five-Step Cycle

**SCRIPT:**
> "Now let's talk about the big picture: the refinement cycle. Every interaction with Claude follows the same loop: Prompt, Evaluate, Refine, Evaluate, Done. You send a prompt. You evaluate the response: is this what I needed? If not, you refine it using one of the eight techniques. Then you evaluate again. And you keep going until you're satisfied. That's the cycle."

**Keypoints:**
- The cycle: Prompt, Evaluate, Refine, Evaluate, Done
- Evaluation is the critical step: always pause to assess before moving on
- Refinement uses the techniques from Video 2 (Simplify, Expand, etc.)
- The cycle is the same whether you're writing code, creating content, or planning a project

**Visual suggestions:**
- Circular diagram: Prompt -> Evaluate -> Refine -> Evaluate -> Done
- Animate the cycle flowing
- On-screen text: "The Refinement Cycle"

### How to Evaluate Claude's Response

**SCRIPT:**
> "The evaluate step deserves extra attention because it's the step most beginners skip. When Claude gives you a response, pause for ten seconds and ask yourself four questions. One: does this answer my question? Two: is it the right level of detail? Three: is the format useful for what I need? Four: would I use this as-is, or does it need work? If the answer to all four is yes, you're done. If any answer is no, that tells you which technique to use next."

**Keypoints:**
- Four evaluation questions:
  1. Does this answer my question?
  2. Is it the right level of detail?
  3. Is the format useful?
  4. Would I use this as-is?
- A "no" to question 1 -> might need to rephrase or start fresh
- A "no" to question 2 -> Expand or Constrain
- A "no" to question 3 -> Restructure
- A "no" to question 4 -> use any appropriate technique
- The evaluation step takes 10 seconds but saves minutes of aimless iteration

**Visual suggestions:**
- Four questions shown as a checklist on screen
- Connect each "no" answer to the relevant technique
- On-screen text: "Pause. Evaluate. Then refine."

---

## Section 4: Knowing When to Stop (6:30 - 8:00)

### Diminishing Returns of Over-Iteration

**SCRIPT:**
> "Here's something nobody talks about enough: knowing when to stop. Iteration is powerful, but there's a point where more iterations stop making things better. I call this the point of diminishing returns. The first iteration usually makes a huge improvement. The second iteration polishes it further. The third iteration fine-tunes details. But by iteration four or five, you're often making changes that don't meaningfully improve the result. You're rearranging deck chairs."

**Keypoints:**
- Iteration 1: big improvement (rough to good)
- Iteration 2: meaningful polish (good to great)
- Iteration 3: fine details (great to excellent)
- Iteration 4+: diminishing returns (changes that don't add real value)
- Most tasks are done in 2-3 iterations
- Over-iteration wastes time and can actually make things worse

**Visual suggestions:**
- Graph showing improvement vs. number of iterations (curve that flattens)
- On-screen text: "Most tasks: done in 2-3 iterations"
- On-screen text: "Know when good enough is great"

### Three Signs You're Done

**SCRIPT:**
> "So how do you know you're done? Three signs. First: the next change you'd make is cosmetic, not substantive. You're tweaking word choices, not fixing real problems. Second: you find yourself going back and forth. You change something, then change it back. That's a sign you were happy two iterations ago. Third: you read the response and think 'Yeah, I'd use this.' Trust that feeling. If it answers your question, is at the right level, and you'd use it, stop iterating and start using."

**Keypoints:**
- Sign 1: changes are cosmetic, not substantive
- Sign 2: you're going back and forth (changing and un-changing)
- Sign 3: you read it and think "I'd use this"
- Trust your judgment: if it feels done, it probably is
- Save the final version before closing the conversation

**Visual suggestions:**
- Three signs shown as a checklist
- On-screen text: "If you'd use it, it's done."

### When to Start Fresh Instead

**SCRIPT:**
> "And remember from Video 1: if you're on iteration five and still not happy, the problem usually isn't the iteration. It's the original prompt. That's your cue to start a new conversation with a better, clearer prompt that incorporates what you've learned from the failed attempt. There's no shame in starting over. In fact, your second attempt will almost always be better because now you know what you actually need."

**Keypoints:**
- 5+ iterations with no progress = start fresh
- The issue is usually the original prompt, not the refinement
- Starting fresh with lessons learned is smart, not wasteful
- Your second attempt benefits from everything you learned in the first

**Visual suggestions:**
- On-screen text: "5+ iterations? Start fresh with a better prompt."
- Graphic: old conversation arrow to new, improved conversation

---

## Section 5: Live Demo - Rough to Production-Ready in 4 Steps (8:00 - 12:00)

### Setting Up the Demo

**SCRIPT:**
> "Alright, let's put everything from this lesson together in a live demo. I'm going to ask Claude to help me create a simple feature for 02Ship: a 'lesson complete' button that students can click when they finish watching a video. We'll start with a rough first draft and refine it through four iterations, using the techniques and the conversation flow you've learned. Watch how each iteration builds on the last."

**Keypoints:**
- Real, practical example: a "lesson complete" button for 02Ship
- Four iterations from rough to polished
- Will use multiple techniques from Video 2
- Focus on the conversation flow, not the code itself

**Visual suggestions:**
- Show yourself on camera briefly, then switch to full-screen Claude interface
- On-screen text: "Live Demo: 4 Steps to Production-Ready"

### Step 1: The Initial Prompt

**SCRIPT:**
> "Step one. I'll type: 'I need a lesson completion button for my learning platform. When a student finishes a video, they click it and it changes to show the lesson is complete. Write this as a React component with Tailwind CSS styling.' Let's see what Claude gives us."

**What to show on screen:**
- Type the prompt into Claude
- Show Claude's response: a basic, functional component
- Read through the key parts briefly

**SCRIPT (continued):**
> "Okay, Claude gave us a working button component. It changes color when clicked. It's functional but pretty basic. The styling is minimal, there's no animation, and it doesn't save the completion state. Let's evaluate: does it answer my question? Yes. Is it the right level of detail? Not quite. Would I use this as-is? Not yet. Time to refine."

**Keypoints:**
- Walk through the evaluation questions out loud
- Identify what's good (it works) and what's missing (polish, persistence, animation)
- Demonstrate the evaluation mindset in real time

### Step 2: Expand + Exemplify

**SCRIPT:**
> "Step two. I'm going to use Expand and Exemplify together. I'll say: 'This is a good start. Can you expand it to include a smooth animation when the button transitions from incomplete to complete? Also, show me an example of how the button would look in both states: before clicking and after clicking.' Let's see the improvement."

**What to show on screen:**
- Type the follow-up prompt
- Show Claude's updated response with animations and visual state examples
- Highlight the specific improvements

**SCRIPT (continued):**
> "Look at that. Now we have a smooth transition animation, clear visual states, and Claude even showed us what each state looks like. One follow-up, two techniques, big improvement. Let's keep going."

### Step 3: Critique

**SCRIPT:**
> "Step three. Let's use Critique. I'll say: 'This looks great. Now critique your own code. What's missing? What could go wrong? What would a professional developer want to add?' This is where Claude's self-evaluation shines."

**What to show on screen:**
- Type the critique prompt
- Show Claude identifying issues (maybe: no persistence, no accessibility attributes, no loading state)
- Read through the key critiques

**SCRIPT (continued):**
> "Claude just identified several things we missed: the completion doesn't persist when you refresh the page, there are no accessibility attributes for screen readers, and there's no loading state for when it's saving. These are the kinds of things a professional would catch in a code review. And Claude caught them for us."

### Step 4: Constrain + Restructure

**SCRIPT:**
> "Final step. I'll take Claude's own critique and say: 'Great catches. Can you update the component to address the first two issues you identified: add localStorage persistence so completion survives page refresh, and add proper accessibility attributes? Keep the code concise and well-commented so a beginner can understand it.' I'm using Constrain to keep it focused on two specific improvements, and asking for a Restructured output with beginner-friendly comments."

**What to show on screen:**
- Type the final follow-up prompt
- Show Claude's polished final version
- Scroll through the code highlighting the improvements
- Side-by-side comparison: Step 1 code vs. Step 4 code

**SCRIPT (continued):**
> "And there it is. Four steps. The first version was a basic button that changed color. The final version has smooth animations, visual state indicators, localStorage persistence, accessibility attributes, and clean comments explaining every part. Same conversation, same topic, four iterations. This is the refinement cycle in action."

**Keypoints:**
- Walk through each step's technique choice and reasoning out loud
- Emphasize the conversation flow: each response builds on everything before it
- Show the dramatic before/after contrast
- Reinforce: four iterations, a few minutes, professional-quality result

**Visual suggestions:**
- Full Claude interface for the entire demo
- Side-by-side comparison at the end: Step 1 vs. Step 4
- On-screen labels for each technique used
- On-screen text: "4 steps. Rough to production-ready."

---

## Section 6: Saving Good Conversations (12:00 - 12:30)

### Preserving Your Best Work

**SCRIPT:**
> "One last tip before we wrap up. When you have a great conversation like the one we just did, save it. Copy the final result to your outputs folder. Save the prompts you used. If you're on Claude Pro, you can bookmark conversations. Why? Because the next time you need to do something similar, you have a reference. You can even paste a previous result into a new conversation and say: 'I built something like this before. Now I need a similar component for a different feature.' Your past conversations become your personal playbook."

**Keypoints:**
- Save the final output to your outputs folder (from Lesson 1 setup)
- Save the prompts that worked well
- Past conversations become templates for future work
- Reference old work in new conversations to maintain consistency

**Visual suggestions:**
- Show saving the conversation output to a file
- On-screen text: "Save your best conversations"

---

## Closing (12:30 - 13:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's bring Lesson 3 full circle. In Video 1, you learned that iteration is normal, expected, and actually faster than trying to be perfect. In Video 2, you got eight specific techniques for making any Claude response better. And in this video, you learned how conversation flow works: Claude's memory, the refinement cycle, knowing when to stop, and you saw it all come together in a live demo.
>
> You've now completed Lesson 3, and you have a genuine skill: the ability to take any Claude response and systematically improve it until it's exactly what you need. That's not a beginner skill. That's what professionals do every day.
>
> In Lesson 4, we're going to level up again. You'll learn about Claude's Artifacts feature and start working with real code outputs. The building is about to get very real.
>
> Save your work, share your progress in our Discord, and I'll see you in Lesson 4!"

**Keypoints:**
- Recap all three videos in Lesson 3 briefly
- Celebrate completing the lesson: this is a real, professional-level skill
- Tease Lesson 4: Artifacts and working with real code
- Encourage sharing progress in the community
- End on a high, motivating note

**Visual suggestions:**
- Show yourself on camera, proud and encouraging
- On-screen text recap: "Lesson 3 Complete: Iteration & Refinement"
- On-screen text: "Next: Lesson 4 - Artifacts & Code"
- End card with links to Lesson 4, Discord, and GitHub Discussions

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Claude remembers everything within one conversation** (use this to your advantage by building incrementally)
2. **New conversations start fresh** (keep one project in one conversation)
3. **Reference previous responses explicitly** ("In your last answer...", "Using the same approach...")
4. **The refinement cycle: Prompt, Evaluate, Refine, Evaluate, Done** (this is your workflow for everything)
5. **Know when to stop** (2-3 iterations is typical; cosmetic changes mean you're done)
6. **Save good conversations** (they become your personal playbook for future projects)

---

## Production Notes

### Tone & Style
- **Confident and capstone-like** (this wraps up the lesson; viewers should feel accomplished)
- **Demo-driven** (the live demo is the centerpiece; let it breathe)
- **Practical and immediately applicable** (everything taught can be used today)
- **Celebratory at the end** (completing Lesson 3 is a milestone worth acknowledging)

### Common Beginner Concerns to Address
- "What if I iterate too much and make it worse?" → That's why you save intermediate versions; you can always go back
- "How do I know which technique to use during the live demo?" → Watch the evaluation step; the problem tells you the technique
- "Does Claude really remember everything in a conversation?" → Yes, within the same conversation; demonstrate this explicitly
- "What if my conversation gets too long?" → If it feels cluttered, start fresh with a better prompt and paste in key context

### Things to Avoid
- Rushing the live demo (this is the payoff moment; give it space)
- Making the code in the demo too complex for beginners to follow conceptually
- Skipping the evaluation steps during the demo (model the thinking process out loud)
- Ending abruptly without celebrating Lesson 3 completion
- Forgetting to show the before/after comparison at the end of the demo

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle
- Especially important for the closing: warm, encouraging presence on camera

**Screen recording:**
- Full Claude.ai interface for the live demo (majority of the video)
- Side-by-side comparisons: Step 1 vs. Step 4 code
- Clear, readable font size for all code and conversation text
- Annotations or highlights showing which techniques are being used at each step

**Editing notes:**
- Add on-screen labels for each demo step (Step 1/4, Step 2/4, etc.)
- Add technique labels during the demo (e.g., "Technique: Expand + Exemplify")
- Include timestamps in YouTube description for each major section
- Add chapter markers for the memory section, refinement cycle, and live demo
- Side-by-side comparison at the end should linger on screen for a few seconds
- Consider a brief "Lesson 3 Complete" celebration graphic at the end

---

## Call-to-Action (End Card)

**Include:**
- "Next: Lesson 4 - Artifacts & Code" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Share your iteration results in Discord!"
- "Try the Iteration Challenge exercise on the lesson page"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "How many iterations did your best conversation take? Share in the comments!" (comment prompt)
- "Try the four-step demo yourself with a different component and tell us how it went!" (engagement)
- "What's the best improvement you've gotten from a single follow-up? We'd love to hear!" (community)

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy; code in the live demo needs careful captioning
- **Transcript:** Post full transcript on the lesson page, including the demo prompts and key responses
- **Pace:** Speak clearly; during the live demo, narrate what's happening on screen for audio-only listeners
- **Visuals:** Read aloud all prompts, Claude responses, and code changes so the content is accessible without visuals

---

## Post-Production Checklist

- [ ] Video length: 13-15 minutes
- [ ] All key points covered
- [ ] Live demo is clear, well-paced, and easy to follow
- [ ] Before/after comparison shown at end of demo
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Conversation Flow & Live Demo")
- [ ] YouTube title: "Conversation Flow: Building on Previous Responses | 02Ship Claude Basics"
- [ ] Description includes: timestamps, links to 02Ship, next lesson, Discord, exercise links
- [ ] Tags: Claude conversation, AI iteration demo, Claude memory, refine code Claude, Claude tutorial, beginner AI
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 3"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the capstone video of Lesson 3. The live demo is your chance to show, not just tell, how iteration transforms output. Let the before/after speak for itself, celebrate the viewer's progress, and send them into Lesson 4 feeling like they've genuinely leveled up.**
