# Video 3 Shooting Guide: Prompt Recipes: Templates You Can Steal

**Target Duration:** 14 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:30)

### Hook & Introduction

**SCRIPT:**
> "Professional chefs don't start from scratch every time they cook. They have recipes -- tested, reliable, repeatable recipes that they customize for the occasion. And that's exactly what we're going to build today for your prompting. In the last two videos, you learned the 4 Cs framework and how to adjust your prompting for different goals. Now I'm going to give you five ready-to-use prompt recipes that you can copy, paste, and customize for your own projects. These aren't hypothetical -- these are the exact templates I used to build the platform you're learning on right now. By the end of this video, you'll have a personal prompt library that makes every conversation with Claude faster and better."

**Keypoints:**
- Reference the progression: 4 Cs framework (Video 1) then different goals (Video 2) then reusable templates (Video 3)
- The chef/recipe analogy makes templates feel approachable, not rigid
- These are real, battle-tested templates from building 02Ship
- Promise immediate, practical value: copy, paste, customize

**Visual suggestions:**
- Start on camera with confident, friendly energy
- Brief flash of the five recipe titles as a preview list
- On-screen text: "5 Prompt Recipes You Can Steal"

---

## Section 1: Why Templates Matter (1:30 - 2:30)

### The Case for Reusable Prompts

**SCRIPT:**
> "Before we dive into the recipes, let me tell you why templates are a game-changer. When I started building 02Ship, I was writing every prompt from scratch. It took forever, and my results were inconsistent. Then I noticed something: my best prompts followed the same patterns. So I saved them as templates with blank spots I could fill in -- like a Mad Libs for AI. Suddenly, I was getting consistently great results in half the time.
>
> Good prompts are reusable. Save your best ones, change the specific details, keep the structure. That's the whole idea behind prompt recipes."

**Keypoints:**
- Templates save time and improve consistency
- The "Mad Libs" analogy makes the concept instantly clear
- Brackets indicate the parts you customize; the structure stays the same
- This is how professionals work with AI tools

**What to show on screen:**
- A template with [bracketed placeholders] highlighted
- Brief example of filling in the brackets for a specific use case
- On-screen text: "Same structure, different details"

**Visual suggestions:**
- Brief screen recording showing a template being filled in
- Highlight the brackets in a contrasting color
- Return to camera for the personal 02Ship anecdote

---

## Section 2: Recipe 1 -- Build a Feature (2:30 - 5:00)

### The Workhorse Template for Product Building

**SCRIPT:**
> "Recipe number one: Build a Feature. This is the prompt I used more than any other while creating 02Ship. It's your go-to template whenever you want to add something new to a project. Let me read it through, then we'll test it live.
>
> 'I'm working on [project description]. I want to add [feature name] that allows users to [action]. Tech stack: [languages and frameworks]. Constraints: [any limits like performance, accessibility, simplicity]. The feature should: one, [requirement], two, [requirement], three, [requirement]. Before coding, please ask clarifying questions about data structure, edge cases, and integration points.'
>
> That last line is gold. Asking Claude to ask YOU questions before coding means it fills in gaps you might have missed. Let me show you this in action."

**Keypoints:**
- This is the most frequently used recipe for building products
- The "ask clarifying questions" instruction is key -- it makes Claude a true collaborator
- Structure: context, feature, tech, constraints, requirements, then invite questions
- Show a live demonstration with a real 02Ship feature

**What to show on screen:**
- The full template displayed cleanly with brackets highlighted
- Fill in the template for a real example: "I'm working on a learning platform for non-programmers. I want to add a lesson progress tracker that allows users to mark lessons as complete. Tech stack: React, TypeScript, Tailwind CSS, Next.js. Constraints: No database yet -- use localStorage. Keep it simple. The feature should: 1. Show a progress bar on each course page, 2. Let users click to mark a lesson done, 3. Remember their progress when they come back. Before coding, please ask clarifying questions about data structure, edge cases, and integration points."
- Show Claude's clarifying questions, then the resulting code

**Visual suggestions:**
- Full screen recording of the template being filled in and submitted
- Show Claude asking smart clarifying questions (emphasize this moment)
- Show the final code output after answering Claude's questions
- On-screen annotation: "This line changes everything" pointing to the clarifying questions instruction

---

## Section 3: Recipe 2 -- Explain This Concept (5:00 - 7:00)

### The Learning Accelerator Template

**SCRIPT:**
> "Recipe two: Explain This Concept. Use this whenever you encounter something you don't understand -- whether it's a coding concept, a business term, or anything Claude generated that confused you.
>
> 'I'm learning about [concept] for [context or purpose]. My current knowledge level: [beginner, intermediate, or advanced in the relevant area]. Please explain [concept] by: one, using an analogy from everyday life, two, breaking it into three to five key points, three, showing a simple code example if applicable, and four, explaining one common mistake people make with this concept.'
>
> The magic here is the structure. You're not just asking 'what is X?' -- you're telling Claude exactly how you want to learn. The analogy makes it relatable, the key points make it organized, the code example makes it practical, and the common mistake keeps you from tripping up."

**Keypoints:**
- This template turns Claude into a structured, patient tutor
- Specifying knowledge level prevents explanations that are too simple or too advanced
- The four-part response format ensures comprehensive understanding
- The "common mistake" element is uniquely valuable for beginners

**What to show on screen:**
- The full template with brackets highlighted
- Filled-in example: "I'm learning about React components for building a web app. My current knowledge level: complete beginner in programming. Please explain React components by: 1. Using an analogy from everyday life, 2. Breaking it into 3-5 key points, 3. Showing a simple code example, 4. Explaining one common mistake people make with components."
- Claude's structured response showing all four parts

**Visual suggestions:**
- Screen recording showing the prompt and response
- Highlight each of the four response sections as Claude delivers them
- On-screen text: "Don't just ask 'what is X?' -- tell Claude HOW to explain it"
- Brief return to camera to emphasize the value of the "common mistake" element

---

## Section 4: Recipe 3 -- Review My Work (7:00 - 9:00)

### The Feedback Partner Template

**SCRIPT:**
> "Recipe three: Review My Work. This one is incredibly useful and most beginners never think to do it. After Claude generates something for you -- or after you've written something yourself -- you can ask Claude to review it and give you honest feedback.
>
> 'I wrote [code, a document, or a design] for [purpose]. Please review it and provide feedback on: one, [specific aspect like code quality or clarity], two, [specific aspect like performance or user experience], three, [specific aspect like edge cases or security]. My skill level: [beginner or intermediate]. Be honest but constructive -- I'm here to learn. [Then paste your work.]'
>
> Two things make this template powerful. First, you're telling Claude what to focus on, so you get relevant feedback instead of a generic code review. Second, the line 'be honest but constructive -- I'm here to learn' sets the perfect tone. Claude will point out real issues without being overwhelming."

**Keypoints:**
- Most beginners don't think to ask Claude for feedback -- but they should
- Specifying review criteria focuses the feedback on what matters to you
- Setting skill level helps Claude calibrate the depth and tone of feedback
- "Be honest but constructive" is a powerful instruction for getting useful critique

**What to show on screen:**
- The full template with brackets highlighted
- Filled-in example using a simple component: "I wrote a React component for a course card on my learning platform. Please review it and provide feedback on: 1. Code readability and organization, 2. Accessibility (can screen readers use it?), 3. Any obvious bugs or edge cases. My skill level: beginner. Be honest but constructive -- I'm here to learn. [paste a simple React component]"
- Claude's structured feedback highlighting strengths and areas to improve

**Visual suggestions:**
- Screen recording of the review prompt and Claude's feedback
- Highlight specific feedback items that would be genuinely helpful
- On-screen text: "Ask Claude to review, not just create"
- Show the "be honest but constructive" line with emphasis

---

## Section 5: Recipe 4 -- Brainstorm Solutions (9:00 - 11:00)

### The Creative Thinking Template

**SCRIPT:**
> "Recipe four: Brainstorm Solutions. Remember in Video 2 when we talked about brainstorming prompts needing freedom? This template gives Claude that freedom while still providing enough structure to get useful results.
>
> 'Problem: [describe the problem in one to two sentences]. Context: target users are [who], constraints are [time, budget, or technical limitations], what I've tried so far: [previous attempts, if any]. Please generate: one, ten creative solutions with quantity over quality, two, then pick the top three and explain the pros and cons of each, three, recommend one with your reasoning.'
>
> This is the diverge-then-converge pattern we talked about, baked right into one prompt. You get the creative explosion AND the structured evaluation in a single conversation turn. This is exactly how I decided which features to build first for 02Ship."

**Keypoints:**
- Combines divergent brainstorming and convergent evaluation in one prompt
- Specifying "quantity over quality" pushes Claude past obvious answers
- The three-step structure (generate, evaluate, recommend) mirrors professional decision-making
- Real-world application from 02Ship feature prioritization

**What to show on screen:**
- The full template with brackets highlighted
- Filled-in example: "Problem: Students on my learning platform finish watching videos but don't practice what they learned. Context: Target users are non-programmers, constraints are no budget for external tools, what I've tried: adding exercises at the end of each lesson. Please generate: 1. 10 creative solutions (quantity over quality), 2. Pick the top 3 and explain pros and cons of each, 3. Recommend one with your reasoning."
- Claude's response: the 10 ideas, top 3 analysis, and final recommendation

**Visual suggestions:**
- Screen recording showing the full prompt and response
- Highlight the creative/unexpected ideas in the list of 10
- Show the top 3 evaluation with pros and cons
- On-screen text: "Diverge, then converge -- in one prompt"

---

## Section 6: Recipe 5 -- Create a Plan (11:00 - 12:30)

### The Project Planner Template

**SCRIPT:**
> "Recipe five: Create a Plan. This is your secret weapon for getting started on any project. Instead of staring at a blank page wondering where to begin, hand the planning to Claude.
>
> 'Goal: [what you want to achieve]. Current state: [where you are now]. Desired state: [where you want to be]. Timeline: [how long you have]. Please create a step-by-step plan that: breaks the goal into weekly milestones, identifies potential roadblocks, suggests resources or learning needed, and keeps the scope realistic for [the timeline].'
>
> When I was planning 02Ship, I used this exact template. I told Claude my goal was to launch a learning platform in four weeks. Claude broke it down into weekly milestones: week one was content planning and site structure, week two was building the core pages, week three was course content and video integration, and week four was polishing and launching. It even warned me that video production would be the bottleneck. That roadblock prediction saved me days of frustration."

**Keypoints:**
- Eliminates the "where do I even start?" paralysis
- The current-state-to-desired-state format gives Claude clear direction
- Roadblock identification is proactive problem-solving
- Real 02Ship planning example provides proof and relatability

**What to show on screen:**
- The full template with brackets highlighted
- Filled-in example: "Goal: Launch a personal portfolio website to showcase my projects. Current state: I have no website and have never built one. Desired state: A live, professional-looking portfolio with 3 project pages, an about page, and a contact form. Timeline: 2 weeks, about 1 hour per day. Please create a step-by-step plan that breaks the goal into daily milestones, identifies potential roadblocks, suggests resources or learning needed, and keeps the scope realistic for 2 weeks."
- Claude's weekly/daily plan with milestones and roadblock warnings

**Visual suggestions:**
- Screen recording of the planning prompt and Claude's structured plan
- Highlight the roadblock predictions
- On-screen text: "From 'where do I start?' to a clear plan in 30 seconds"
- Brief return to camera for the 02Ship planning story

---

## Section 7: How to Adapt Recipes to Your Needs (12:30 - 13:15)

### Making Templates Your Own

**SCRIPT:**
> "These five recipes are starting points, not rigid rules. Here's how to make them your own. First, change the bracketed parts -- that's obvious. But also feel free to add or remove sections. If you don't need Claude to ask clarifying questions in the Build a Feature recipe, remove that line. If you want the Explain recipe to include a quiz at the end, add that.
>
> Second, save your best prompts. Every time Claude gives you an amazing response, save the prompt that generated it. Over time, you'll build your own personal recipe book that's perfectly tuned to your style and needs.
>
> Third -- and this is important -- these recipes aren't just for Claude. They work with ChatGPT, Gemini, and most other AI assistants. Good prompt structure is universal. So you're not just learning a Claude skill -- you're learning an AI skill."

**Keypoints:**
- Templates are flexible starting points, not rigid rules
- Add, remove, or modify sections based on your needs
- Save your best prompts to build a personal library
- These recipes work across AI tools -- the skill is transferable

**What to show on screen:**
- A modified version of one recipe showing how sections can be added or removed
- A "prompt library" concept -- a simple document with saved templates
- On-screen text: "Build your own recipe book"

**Visual suggestions:**
- Brief screen recording showing a template being modified
- Show a simple document (Notion, Google Doc, or plain text) with saved prompts
- On-screen text: "Works with Claude, ChatGPT, Gemini, and more"

---

## Closing (13:15 - 14:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap your five prompt recipes. Recipe 1: Build a Feature -- your workhorse for adding anything to a project. Recipe 2: Explain This Concept -- your personal AI tutor. Recipe 3: Review My Work -- your honest feedback partner. Recipe 4: Brainstorm Solutions -- your creative thinking engine. Recipe 5: Create a Plan -- your project planner that eliminates overwhelm.
>
> All five of these recipes are available on the lesson page at 02Ship, ready for you to copy and customize. And here's your homework: go to the lesson page and do the 'Build Your Prompt Recipe Book' exercise. Create five of your own templates for tasks you do regularly. Then share your best one in our Discord -- I'm building a community prompt library and your recipe might help someone else.
>
> That wraps up Lesson 2: Prompting Fundamentals. You now have the 4 Cs framework, you know how to prompt for different goals, and you have five reusable recipes in your toolkit. In Lesson 3, we're going to tackle something every builder needs to master: iteration and refinement -- how to take Claude's first response and make it exactly what you want through conversation. That's where the real magic happens. See you there!"

**Keypoints:**
- Quick recap naming all five recipes with their purpose
- Direct viewers to the lesson page for copyable templates
- Specific homework assignment (Build Your Prompt Recipe Book exercise)
- Community call-to-action (share in Discord)
- Strong tease for Lesson 3: Iteration and Refinement
- Close the loop on Lesson 2 as a complete unit

**Visual suggestions:**
- Return to camera for warm, encouraging close
- On-screen recap graphic listing all five recipes
- End card with links to lesson page, Discord, and Lesson 3
- On-screen text: "Next Lesson: Iteration & Refinement"

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Good prompts are reusable** (save your best ones as templates -- don't start from scratch every time)
2. **Change the brackets, keep the structure** (templates are Mad Libs for AI)
3. **"Ask clarifying questions" is a power move** (it makes Claude a collaborator, not just an executor)
4. **Review prompts are underused** (most beginners only ask Claude to create -- they should also ask it to critique)
5. **Brainstorming works best in two steps** (diverge with quantity, then converge with evaluation)
6. **Planning prompts eliminate overwhelm** (turn "where do I start?" into a clear roadmap)
7. **These recipes are cross-platform** (they work with Claude, ChatGPT, Gemini, and other AI tools)
8. **Build your own recipe book over time** (your personal prompt library becomes your most valuable AI tool)

---

## Production Notes

### Tone & Style
- Practical and generous -- this is a "here, take these" video
- Show genuine enthusiasm when demonstrating each recipe in action
- Use the "gift-giving" energy: "I'm handing you something valuable"
- Keep the pace steady but not rushed -- viewers need time to absorb each recipe
- Make templates feel empowering, not constraining

### Common Beginner Concerns to Address
- "Do I have to memorize all these templates?" --> No! Save them somewhere and copy-paste when you need them. The lesson page has all five ready to go.
- "What if the recipe doesn't work perfectly?" --> Tweak it! These are starting points. You'll refine them with practice.
- "Can I use these at work?" --> Absolutely. Just be mindful of confidential or sensitive information.
- "Do these really work with other AI tools?" --> Yes! Good prompt structure is universal across large language models.

### Things to Avoid
- Rushing through any recipe without a live demo (each one deserves a real example)
- Making templates feel like rigid formulas (emphasize flexibility and customization)
- Overwhelming with too many variations (stick to the five core recipes, mention adaptation)
- Skipping the "why this works" for each recipe (structure without understanding feels hollow)
- Making it feel like you must use templates for everything (quick questions still get quick prompts)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Same consistent setup as Videos 1 and 2 (lighting, background, framing)
- Well-lit face, clean background, eye-level camera
- Wear something slightly different to visually distinguish from previous videos

**Screen recording:**
- Claude.ai interface with a clean browser window
- Pre-prepare all five filled-in templates in a text file for smooth copy-paste during demos
- Increase font size for mobile readability
- Show the full Claude response for each recipe (scroll through at a readable pace)
- Consider using a text editor briefly to show the "prompt library" concept

**Editing notes:**
- Add on-screen "Recipe #" labels for each section (Recipe 1, Recipe 2, etc.)
- Use consistent visual treatment for all five recipes (same border, same font, same highlight color)
- Include timestamps in YouTube description for each recipe
- Add chapter markers: Intro, Why Templates, Recipe 1-5, Adapting Recipes, Closing
- Use zoom-ins when highlighting key parts of templates (e.g., the "ask clarifying questions" line)
- Consider a brief montage showing all five templates at the end during the recap

---

## Call-to-Action (End Card)

**Include:**
- "Lesson 3: Iteration & Refinement" (clickable link to next lesson)
- "Copy all 5 recipes on 02Ship" (link to lesson page)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Share your best prompt recipe in the comments"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "Which recipe do you think you'll use the most? Drop the number in the comments: 1, 2, 3, 4, or 5."
- "Have you created your own prompt template for something? Share it -- it might help someone else."
- "What's a task you do every week that you could create a prompt recipe for?"

---

## Accessibility Notes

- **Captions:** Auto-generate and manually review for accuracy; pay special attention to the template text and bracket placeholders
- **Transcript:** Post full transcript on the lesson page, including all five complete recipe templates in copy-paste-ready format
- **Pace:** Speak clearly; pause after reading each recipe to let it sink in; consider reading templates slightly slower than normal speech
- **Visuals:** Always read the template text aloud -- don't just show it on screen. Narrate each bracket placeholder and explain what goes there.

---

## Post-Production Checklist

- [ ] Video length: 14-15 minutes
- [ ] All key points covered
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Prompt Recipes You Can Steal")
- [ ] YouTube title: "Prompt Recipes: Templates You Can Steal | 02Ship Claude Basics"
- [ ] Description includes: timestamps, all 5 recipe templates in text, links to 02Ship lesson page, Discord, next lesson
- [ ] Tags: Claude AI, prompt templates, prompt recipes, AI templates, reusable prompts, prompt engineering, 02Ship
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 2"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the video where viewers walk away with tangible tools they can use immediately. Your energy should reflect that -- you're handing them something genuinely valuable. Let the templates speak for themselves through the live demos, and your viewers will be saving prompts before the video is even over.**
