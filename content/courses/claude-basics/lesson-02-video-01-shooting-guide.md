# Video 1 Shooting Guide: The 4 Cs of Effective Prompting

**Target Duration:** 12 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:15)

### Hook & Introduction

**SCRIPT:**
> "In the last lesson, you wrote your first prompt to Claude and watched it build something real. But let me ask you this: have you ever given someone directions and they went to the completely wrong place? That's what happens with bad prompts. The difference between a prompt that gets you 'close enough' and one that nails it on the first try isn't luck -- it's a learnable skill. Today, I'm going to teach you a simple four-part framework that will transform the way you talk to Claude. I call it the 4 Cs, and by the end of this video, every prompt you write will be dramatically better."

**Keypoints:**
- Reference Lesson 1 to build continuity
- Use a relatable everyday analogy (giving directions)
- Reframe prompting as a skill, not a talent or magic trick
- Promise a concrete, memorable framework

**Visual suggestions:**
- Show yourself on camera, relaxed and confident
- Brief flash of a "bad prompt" vs "good prompt" side by side
- On-screen text: "Prompting is a skill, not magic"

---

## Section 1: Why Prompting Is a Skill, Not Magic (1:15 - 3:00)

### The Skill Mindset

**SCRIPT:**
> "Before we jump into the framework, I want to clear up a huge misconception. A lot of people think prompting is some mysterious art -- like you either 'get it' or you don't. That's completely wrong. Prompting is a skill, just like writing a good email or giving clear instructions to a colleague. And like any skill, it improves with practice and the right techniques."

**Keypoints:**
- Prompting is not mysterious or innate
- Compare to everyday skills people already have (writing emails, giving instructions, ordering food)
- Everyone starts with vague prompts -- that's normal
- The 4 Cs framework gives structure to something that feels fuzzy

**What to show on screen:**
- A vague prompt example: "Make me a website"
- Claude's generic, unfocused response to that vague prompt
- On-screen text: "Skill, not magic"

**Visual suggestions:**
- Brief screen recording showing a vague prompt and a mediocre result
- Transition to you on camera explaining the mindset shift
- Consider a simple graphic: "Vague Input = Vague Output"

---

## Section 2: The 4 Cs Framework Overview (3:00 - 4:30)

### Introducing the Framework

**SCRIPT:**
> "So here's the framework. Every great prompt has four ingredients -- I call them the 4 Cs: Clear, Contextual, Constrained, and Examples. Think of it like ordering food at a restaurant. 'Give me food' is vague -- you might get anything. But 'I'd like a medium-rare burger with no onions, on a brioche bun, and a side of fries' -- that's Clear, Contextual, Constrained, and you just gave an Example of what you want. Let's break down each C."

**Keypoints:**
- Introduce all four Cs together first so viewers see the big picture
- Use a simple, relatable analogy (ordering food)
- Keep the overview high-level before diving into each one
- Make the framework feel simple and memorable

**What to show on screen:**
- Animated or static graphic showing the 4 Cs in a grid or list
- The restaurant analogy as text on screen
- On-screen text: "Clear | Contextual | Constrained | Examples"

**Visual suggestions:**
- Use a clean visual layout showing all 4 Cs
- Color-code each C for reference throughout the rest of the video
- Keep the graphic simple enough to screenshot and save

---

## Section 3: C1 -- Clear (Specificity) (4:30 - 6:00)

### Be Specific About What You Want

**SCRIPT:**
> "The first C is Clear. This means being specific about what you actually want. Instead of 'make a website,' say 'create a single-page portfolio website with a hero section that has my name and tagline, an about-me section, and a contact form at the bottom.' See the difference? The first prompt could mean literally anything. The second one tells Claude exactly what to build.
>
> Here's a trick: after you write a prompt, read it back and ask yourself, 'Could someone misunderstand this?' If the answer is yes, add more detail. You don't need to be technical -- just be specific about what you want to see, what it should do, and what it should look like."

**Keypoints:**
- Specificity does not require technical knowledge
- Show a before/after prompt transformation
- The "misunderstand test" -- if someone could interpret it differently, clarify
- Being specific about outcome, not implementation

**What to show on screen:**
- Side-by-side: vague prompt vs. clear prompt
- Highlight the specific details added in the clear version
- Claude's response to each prompt (brief glimpse showing quality difference)

**Visual suggestions:**
- Screen recording: type the vague prompt, show result, then type the clear prompt, show improved result
- On-screen text highlighting: "Could someone misunderstand this?"
- Color highlight the "Clear" portions of the improved prompt

---

## Section 4: C2 -- Contextual (Background) (6:00 - 7:30)

### Give Claude the Bigger Picture

**SCRIPT:**
> "The second C is Contextual. Context is king when working with Claude. Think about it: if someone walked up to you and said 'write a function to process payments,' you'd have a dozen questions. What kind of app? What payment provider? What language? Claude has the same questions -- it just tries to guess the answers if you don't provide them.
>
> So always tell Claude the bigger picture. Instead of 'write a function to process payments,' say 'I'm building an e-commerce checkout page for a Next.js app. I'm using Stripe for payments. Write a server-side function to handle the payment process.' Now Claude knows exactly where this fits."

**Keypoints:**
- Claude performs dramatically better when it understands the "why" and "where"
- Context includes: project type, tech stack, who the users are, what already exists
- You don't need to give a novel -- two or three sentences of context go a long way
- Think of context as answering the questions Claude would ask if it could

**What to show on screen:**
- Example prompt without context and Claude's generic response
- Same prompt with context added and Claude's focused, specific response
- Highlight the context sentences in the improved prompt

**Visual suggestions:**
- Split screen comparing responses with and without context
- On-screen text: "Context is king"
- Brief callout graphic listing what context to include: project, audience, tech stack, purpose

---

## Section 5: C3 -- Constrained (Boundaries) (7:30 - 9:00)

### Set Boundaries That Guide, Not Limit

**SCRIPT:**
> "The third C is Constrained, and this one surprises a lot of people. Constraints aren't limitations -- they're guidance. When you tell Claude 'keep it under 50 lines of code' or 'make it mobile-friendly' or 'use only beginner-level concepts,' you're actually helping Claude give you a better answer.
>
> Think of it like guardrails on a bowling lane. Without them, the ball can go anywhere -- including the gutter. Constraints keep Claude focused on what matters to you. Some of my favorites are: 'keep it simple,' 'under 500 words,' 'no external libraries,' and 'make it accessible.' When I was building 02Ship, I often told Claude, 'Use TypeScript and Tailwind CSS, keep components under 100 lines, and make everything mobile-responsive.' Those constraints shaped every response."

**Keypoints:**
- Constraints help, not hinder -- reframe the concept
- Common useful constraints: length, complexity level, tech choices, style
- Real example from building 02Ship
- Bowling guardrail analogy to make it intuitive

**What to show on screen:**
- A prompt with no constraints and Claude's sprawling, complex response
- Same prompt with constraints and Claude's focused, appropriate response
- List of useful constraint phrases

**Visual suggestions:**
- On-screen text: "Constraints = Guidance, not limits"
- Show a visual list of "constraint phrases you can steal"
- Brief 02Ship screen recording showing a constrained prompt in action

---

## Section 6: C4 -- Examples (Patterns) (9:00 - 10:30)

### Show Claude What Good Looks Like

**SCRIPT:**
> "The fourth C is Examples, and honestly, this might be the most powerful one. Instead of explaining what you want in abstract terms, show Claude what good looks like. If you want a friendly tone, don't just say 'be friendly' -- give an example: 'Write in a friendly tone. Good example: Hey! Let's build this together. Bad example: Greetings, user. Construction shall proceed.'
>
> Examples teach Claude your style faster than any amount of explanation. When I built the course pages for 02Ship, I showed Claude a Udemy course card and said, 'Style it like this -- clean, minimal, lots of whitespace.' That one example was worth a paragraph of description."

**Keypoints:**
- Examples are faster and more effective than explanations
- You can give "good" examples and "bad" examples (both are useful)
- Examples can be visual references, text snippets, or style descriptions
- Real-world example from building 02Ship

**What to show on screen:**
- A prompt that says "be friendly" vs. one that provides good/bad tone examples
- Claude's responses showing the style difference
- The 02Ship course card as a real example of using visual references

**Visual suggestions:**
- Side-by-side: vague style instruction vs. concrete example
- Highlight how the example shapes Claude's output
- On-screen text: "Show, don't just tell"

---

## Section 7: Putting It All Together -- Before and After (10:30 - 11:30)

### The Full Transformation

**SCRIPT:**
> "Now let's put all 4 Cs together and watch the transformation happen live. Here's a prompt most beginners would write: 'Make me a landing page.' That's it. Now let's apply the 4 Cs.
>
> Clear: 'Create a landing page with a hero section, three feature cards, a testimonials section, and a call-to-action button.'
> Contextual: 'This is for a learning platform that teaches non-programmers to build with AI.'
> Constrained: 'Use React and Tailwind CSS. Keep it mobile-responsive. Under 200 lines total.'
> Examples: 'Style it like the Vercel homepage -- minimal, clean, lots of whitespace, dark mode.'
>
> Watch the difference in what Claude gives us."

**Keypoints:**
- Walk through a complete before-and-after transformation
- Label each C as you add it so viewers can follow the framework
- Show Claude's actual responses to both prompts
- Emphasize how much better the output is with all 4 Cs

**What to show on screen:**
- Live screen recording: paste the vague prompt, show response
- Then paste the 4 Cs prompt, show the dramatically better response
- Highlight/label each C in the improved prompt with color or annotations

**Visual suggestions:**
- Full-screen recording of Claude in action
- Pause and annotate each C with on-screen text
- Maybe a reaction shot showing genuine enthusiasm about the quality difference

---

## Section 8: When to Use Short Prompts vs. Detailed Prompts (11:30 - 12:00)

### Knowing When Less Is More

**SCRIPT:**
> "One last thing: you don't always need all 4 Cs. If you're asking a quick question like 'What does TypeScript do?' -- a short prompt is perfectly fine. Save the full 4 Cs framework for when you're building something, creating content, or tackling a complex task. Think of it this way: quick questions get quick prompts, big tasks get the full 4 Cs treatment.
>
> In the next video, we'll explore how to adjust your prompting style based on what you're trying to accomplish -- code generation, explanations, brainstorming, and more. See you there!"

**Keypoints:**
- Not every interaction needs a detailed prompt
- Quick questions vs. complex tasks need different approaches
- The 4 Cs are most valuable for building and creating
- Tease the next video on prompting for different goals

**What to show on screen:**
- Simple graphic: "Quick question = short prompt" and "Big task = 4 Cs"
- On-screen text: "Next: Prompting for Different Goals"

**Visual suggestions:**
- Return to camera for a warm, friendly close
- End card preview of Video 2
- Keep this section brief and energetic

---

## Closing (12:00 - 12:30)

### Recap & Next Steps

**SCRIPT:**
> "Let's do a quick recap. The 4 Cs of effective prompting: Clear -- be specific about what you want. Contextual -- give Claude the bigger picture. Constrained -- set boundaries that guide the response. Examples -- show Claude what good looks like. Practice these with your very next prompt, and I promise you'll see the difference immediately.
>
> Head over to the lesson page on 02Ship to try the 4 Cs Practice exercise, and drop your before-and-after prompts in our Discord -- I'd love to see your transformations. See you in Video 2!"

**Keypoints:**
- Rapid-fire recap of all 4 Cs
- Encourage immediate practice
- Direct viewers to the exercise and community
- Tease Video 2

**Visual suggestions:**
- Show the 4 Cs graphic one final time
- On-screen text: each C with its one-word description
- End card with links to lesson page, Discord, and next video

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Prompting is a learnable skill** (not magic, not talent -- it improves with practice and frameworks)
2. **Clear means specific** (if someone could misunderstand your prompt, add more detail)
3. **Context is king** (Claude performs dramatically better when it understands the bigger picture)
4. **Constraints are guidance, not limits** (guardrails keep Claude focused)
5. **Examples teach faster than explanations** (show Claude what good looks like)
6. **Not every prompt needs all 4 Cs** (match prompt effort to task complexity)
7. **02Ship was built using these principles** (real-world proof the framework works)

---

## Production Notes

### Tone & Style
- Conversational and encouraging -- like a friend sharing a useful hack
- Use everyday analogies (ordering food, giving directions, bowling guardrails)
- Show genuine excitement when demonstrating the before/after transformation
- Assume intelligence, just lack of technical vocabulary
- Keep energy up but don't rush -- let concepts land

### Common Beginner Concerns to Address
- "Do I need to memorize the 4 Cs?" --> No, just keep them in mind. They'll become second nature with practice.
- "What if my prompt is still bad even with the 4 Cs?" --> That's totally normal -- you'll learn to iterate in Lesson 3.
- "Do I need all 4 Cs every time?" --> No. Quick questions need quick prompts. The 4 Cs are for bigger tasks.
- "Will this work with ChatGPT too?" --> Yes! The 4 Cs are universal prompting principles that work across AI tools.

### Things to Avoid
- Making it sound like there's one "right" way to prompt
- Over-explaining technical details (this is about prompting, not coding)
- Using jargon like "tokens," "context window," or "temperature" without explanation
- Making beginners feel bad about writing vague prompts -- everyone starts there
- Spending too long on any single C -- keep balanced pacing

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light from a window)
- Clean, uncluttered background (or tastefully blurred)
- Eye-level camera angle, looking directly into the lens
- Consistent framing with Lesson 1 videos

**Screen recording:**
- Show Claude.ai interface for live demonstrations
- Use a clean browser with no distracting tabs or bookmarks
- Increase font size so text is readable on mobile screens
- Use split-screen for before/after comparisons

**Editing notes:**
- Add on-screen text for each C as it's introduced (with consistent color coding)
- Include timestamps in YouTube description for each section
- Add chapter markers: Intro, Why It's a Skill, Overview, Clear, Contextual, Constrained, Examples, Before/After, Short vs. Detailed
- Use zoom-ins on key parts of prompts during screen recordings
- Add subtle sound effects or transitions between sections

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Prompting for Different Goals" (clickable link)
- "Try the 4 Cs Practice exercise on 02Ship" (link to lesson page)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Share your before-and-after prompts in the comments"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "Which of the 4 Cs do you think will change your prompts the most? Drop it in the comments."
- "Try the 4 Cs on a prompt you've used before -- did the results improve? Let us know!"
- "What's the worst prompt you've ever written? We've all been there -- share yours so we can transform it together."

---

## Accessibility Notes

- **Captions:** Auto-generate and manually review for accuracy, especially technical terms
- **Transcript:** Post full transcript on the lesson page for screen readers and search indexing
- **Pace:** Speak clearly and at a measured pace; pause briefly after introducing each C
- **Visuals:** Narrate everything shown on screen -- don't rely solely on visual demonstrations

---

## Post-Production Checklist

- [ ] Video length: 12-15 minutes
- [ ] All key points covered
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "The 4 Cs of Prompting")
- [ ] YouTube title: "The 4 Cs of Effective Prompting | 02Ship Claude Basics"
- [ ] Description includes: timestamps, links to 02Ship lesson page, Discord, next video
- [ ] Tags: Claude AI, prompting, prompt engineering, 4 Cs, AI prompting tips, beginner AI, 02Ship
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 2"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**You've got this! The 4 Cs framework is genuinely powerful, and your enthusiasm for it will be contagious. Show the transformation, let the results speak, and your viewers will walk away feeling like they leveled up.**
