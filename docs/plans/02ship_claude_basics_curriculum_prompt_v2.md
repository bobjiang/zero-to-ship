# 02ship Claude Basics Curriculum Prompt

**Role:** Experienced IT and AI Trainer specializing in teaching non-technical learners to build products with AI tools.

**Objective:** Create a structured curriculum for the **"02ship Claude Basics"** course — a foundational bootcamp teaching non-programmers how to ship a product from scratch (0→1) using Claude.

---

## Course Context

### About 02ship
- **Program Type:** Bootcamp program based in Sydney + online course series brand
- **Brand Mission:** Teaching people to ship products with AI
- **Course Position:** Beginner/foundational course (advanced courses planned for future)
- **Branding:** Keep simple and professional; no specific naming conventions required

### Target Audience
- **Primary Learners:**
  - Non-technical founders/entrepreneurs
  - Product managers
  - Students
- **Key Characteristic:** Non-programmers who want to build a product from scratch (0→1)
- **Prerequisites:**
  - Basic computer literacy only
  - Claude account (or similar: ChatGPT Go or Google Gemini)
  - No prior AI/LLM knowledge required
  - No coding experience required

### Learning Goals
By the end of this course, learners will be able to:
1. **Build a working app/MVP** using Claude (even without coding skills)
2. **Improve general productivity** with Claude (writing, research, analysis)
3. Have a **complete project plan + generated codebase** ready to deploy

### Claude Capabilities to Cover
The curriculum must cover these four core capabilities:
1. Basic prompting fundamentals
2. Prompt iteration and refinement techniques
3. Working with code/artifacts (Claude generating code)
4. Projects (persistent context across conversations)

---

## Instructional Design Requirements

### Lesson Structure
- **Total Lessons:** 7 lessons, delivered in any order (fully modular)
- **Duration:** 2-3 hours per lesson
- **Dependencies:** None — each lesson must be fully standalone
- **Delivery Formats:** Designed to work flexibly for:
  - Self-paced online
  - Instructor-led live (online)
  - Instructor-led in-person (Sydney bootcamp)
- **Platform:** No LMS — simple tools (Google Docs, Notion, etc.)

### Time Allocation Per Lesson (Practice-Heavy)
| Component | Duration |
|-----------|----------|
| Videos (watching) | ~45 minutes |
| Hands-on exercises | ~90 minutes |
| Reading/text sections | ~15 minutes |
| Reflection | ~10 minutes |
| **Total** | **~2 hours 40 minutes** |

### Lesson Flexibility
- Designed for one sitting but can be broken up across multiple sessions
- No sequential dependencies — learners can start with any lesson

---

## Content Requirements

### Videos
- **Source:** New videos to be produced (not existing content, so generate video outlines first, will produce video later)
- **Quantity:** 2-3 videos per lesson
- **Maximum Length:** 15 minutes per video
- Each video must include:
  - `videoTitle` (string)
  - `videoDescription` (string)
  - `videoLink` (use `[Link placeholder]`)
  - `videoMaxLength` (must be "15 minutes")
  - `scriptOutline` (list of key points to cover)
  - `talkingPoints` (bullet list of what to say)
  - `estimatedDuration` (estimated actual length, e.g., "12 minutes")

### Required Lesson Components
Each lesson must include ALL of the following:

| Component | Description |
|-----------|-------------|
| `lessonNumber` | Integer 1-7 |
| `lessonTitle` | Descriptive title |
| `lessonDurationHours` | Must be "2-3 hours" |
| **Learning Objectives** | List of 3-5 measurable objectives |
| **Videos** | 2-3 videos with full specifications |
| **Text Sections** | Optional explanatory content (can be empty but must be present) |
| **Common Mistakes & Pitfalls** | What learners should avoid |
| **Lesson Reflection** | 2-3 reflection questions |
| **Exercises** | Participant-produced outputs |
| **Resources & Further Reading** | Links for deeper learning (include docs.anthropic.com where relevant) |
| **Instructor Notes** | Tips for facilitating this lesson |

### Exercise Requirements
- Every lesson must have practical exercises producing tangible outputs
- **Assessment Type:** Completion-based (did they do it? Yes/No)
- **Criteria Approach:** Mix of:
  - Structured criteria (for technical/building exercises)
  - Exploratory/open-ended (for creative exercises)
- Exercises should result in artifacts that contribute toward the final capstone goal

### Final Outcome (Capstone)
By completing the course, learners should have:
1. A **working app/MVP** (deployed or runnable)
2. A **complete project plan + generated codebase** (ready to deploy)

---

## Reference Materials
- **Primary Reference:** https://www.anthropic.com/learn (general reference for understanding Claude)
- **Documentation:** Include links to https://platform.claude.com/docs/en/get-started where relevant
- **Note:** Curriculum content is independent; references are supplementary

---

## Output Format

Output must be **Markdown** with this exact structure:

### Course Header
```markdown
# 02ship Claude Basics

- **Course Name:** 02ship Claude Basics
- **Reference Link:** https://www.anthropic.com/learn
- **Documentation:** https://platform.claude.com/docs/en/get-started
- **Target Audience:** Non-programmers (founders, PMs, students) wanting to build products from 0→1
- **Prerequisites:** Basic computer literacy, Claude/ChatGPT account, no coding or AI knowledge required
- **Course Duration:** 7 lessons × 2-3 hours = 14-21 hours total
- **Final Outcome:** Working app/MVP + complete project plan & codebase
```

### Lesson Template
Use this exact structure for each of the 7 lessons:

```markdown
---

## Lesson {lessonNumber}: {lessonTitle}

- **Lesson Number:** {lessonNumber}
- **Lesson Title:** {lessonTitle}
- **Duration:** 2-3 hours

### Learning Objectives
By the end of this lesson, learners will be able to:
- [Objective 1]
- [Objective 2]
- [Objective 3]

### Videos

#### Video 1: {videoTitle}
- **Description:** {videoDescription}
- **Link:** [Link placeholder]
- **Max Length:** 15 minutes
- **Estimated Duration:** {estimatedDuration}
- **Script Outline:**
  1. [Key point 1]
  2. [Key point 2]
  3. [Key point 3]
- **Talking Points:**
  - [Talking point 1]
  - [Talking point 2]
  - [Talking point 3]

#### Video 2: {videoTitle}
[Same structure as Video 1]

[Additional videos as needed]

### Text Sections
- [Optional explanatory content]
- [Can be empty but section must be present]

### Common Mistakes & Pitfalls
- [Mistake 1 and how to avoid it]
- [Mistake 2 and how to avoid it]
- [Mistake 3 and how to avoid it]

### Lesson Reflection
- [Reflection question 1]
- [Reflection question 2]

### Exercises
**Exercise 1: {exerciseTitle}**
- **Description:** [What learners will do]
- **Output:** [What they will produce]
- **Success Criteria:** [If structured] or **Open-ended exploration** [If exploratory]
- **Estimated Time:** [X minutes]

**Exercise 2: {exerciseTitle}**
[Same structure]

### Resources & Further Reading
- [Resource 1 with link]
- [Resource 2 with link]
- Anthropic Documentation: [relevant docs.anthropic.com link]

### Instructor Notes
- [Tip for facilitating this lesson]
- [Common questions to expect]
- [Suggestions for live vs. self-paced delivery]

---
```

---

## Lesson Topic Guidance

Design 7 lessons that progressively teach non-programmers to ship a product from 0→1 with Claude. Cover these capabilities across the lessons:
- Basic prompting fundamentals
- Prompt iteration and refinement
- Working with artifacts and code
- Using Projects for persistent context

**Suggested arc (adjust as needed for modularity):**
1. Introduction & first prompt
2. Prompting fundamentals
3. Iteration & refinement
4. Working with artifacts/code
5. Projects & context management
6. Building your MVP
7. Deploying & shipping

**Important:** Each lesson must be fully standalone (no dependencies). A learner should be able to complete any single lesson without having done the others.

---

## Validation Requirements

After generating the curriculum, include a **Validation Checklist** confirming:

- [ ] Exactly 7 lessons exist (Lesson 1-7)
- [ ] Every lesson includes ALL required components:
  - lessonNumber, lessonTitle, lessonDurationHours
  - Learning Objectives (3-5 items)
  - Videos (2+ items with full specs)
  - Text Sections (present, even if empty)
  - Common Mistakes & Pitfalls
  - Lesson Reflection
  - Exercises (with outputs specified)
  - Resources & Further Reading
  - Instructor Notes
- [ ] Every video includes: title, description, link, maxLength, scriptOutline, talkingPoints, estimatedDuration
- [ ] All videos are ≤15 minutes
- [ ] Each lesson is fully standalone (no cross-lesson dependencies)
- [ ] Exercises produce tangible outputs contributing to final capstone
- [ ] Unknown fields use `[To be defined]` or `[Link placeholder]`
- [ ] Lessons can be completed in any order
- [ ] Time allocation per lesson matches practice-heavy distribution (~45m videos, ~90m exercises)

**If validation fails, self-correct and output the corrected version.**

---

## Additional Notes

- **Checklist for AI:** Before generating, create an internal checklist of high-level steps (do not include in output)
- **Tone:** Professional but approachable; encouraging for non-technical learners
- **Verbosity:** Clear and concise; use placeholders where details are unknown
- **Focus:** Practical, hands-on learning — learners should be building from Lesson 1

---

## Example Lesson (For Reference Only)

Below is a complete example of Lesson 1. Use this as a model for formatting and depth, then create original content for all 7 lessons.

---

## Lesson 1: Getting Started with Claude for Building Apps

- **Lesson Number:** 1
- **Lesson Title:** Getting Started with Claude for Building Apps
- **Duration:** 2-3 hours

### Learning Objectives
By the end of this lesson, learners will be able to:
- Understand what Claude is and what "AI-assisted product building" means for non-programmers
- Set up the minimum environment required to follow the course (accounts/tools)
- Write and refine a first "app-building prompt" that produces a runnable starter project

### Videos

#### Video 1: What Claude Is (and Isn't) for Building Products
- **Description:** Clarifies Claude's strengths and limitations, and how to think about it as a building partner for non-programmers.
- **Link:** [Link placeholder]
- **Max Length:** 15 minutes
- **Estimated Duration:** 10 minutes
- **Script Outline:**
  1. What is Claude? (AI assistant by Anthropic)
  2. What Claude can do: generate code, explain concepts, iterate on ideas
  3. What Claude can't do: run code for you, deploy apps, access the internet (without tools)
  4. Mindset shift: Claude as a collaborator, not a magic button
- **Talking Points:**
  - "Think of Claude as a very smart intern who can code — you provide direction, it executes"
  - "You don't need to understand the code; you need to understand what you want"
  - "Iteration is key: your first prompt won't be perfect, and that's okay"

#### Video 2: Setup Checklist: Accounts, Workspace, and Safety Basics
- **Description:** Walks through required accounts/tools and safe practices for working with AI-generated code.
- **Link:** [Link placeholder]
- **Max Length:** 15 minutes
- **Estimated Duration:** 8 minutes
- **Script Outline:**
  1. Create Claude account (or verify existing)
  2. Recommended: Claude Pro for extended usage
  3. Basic workspace setup: where to save prompts and outputs
  4. Safety basics: don't share API keys, verify code before running
- **Talking Points:**
  - "You only need a Claude account to get started — nothing else required today"
  - "Create a simple folder structure: /prompts, /outputs, /projects"
  - "Golden rule: always read what Claude generates before running it"

#### Video 3: Your First Build Prompt: From Idea → Starter App Plan
- **Description:** Demonstrates a prompt structure that yields a project plan, file list, and step-by-step build instructions.
- **Link:** [Link placeholder]
- **Max Length:** 15 minutes
- **Estimated Duration:** 14 minutes
- **Script Outline:**
  1. Anatomy of a good "build prompt": goal, constraints, tech preference, success criteria
  2. Live demo: writing a prompt for a simple app idea
  3. Reviewing Claude's response: what to look for
  4. Quick iteration: making one improvement to the prompt
- **Talking Points:**
  - "A good prompt has four parts: what you want, what constraints exist, what tech to use, and how you'll know it worked"
  - "Always ask Claude to 'ask clarifying questions first' — this improves output quality"
  - "Don't accept the first response; one round of iteration makes a big difference"

### Text Sections
- **Prompt Skeleton for Beginners:**
  ```
  I want to build [app type] that helps [user] to [solve problem].
  
  Constraints:
  - [Constraint 1]
  - [Constraint 2]
  
  Tech preference: [e.g., "something simple I can run in a browser" or "no preference"]
  
  Success criteria:
  - [Criterion 1]
  - [Criterion 2]
  
  Before generating anything, please ask me clarifying questions.
  ```
- **Definition Box:**
  - *Prompt:* The instructions you give to Claude
  - *Iteration:* Refining your prompt or Claude's output through multiple rounds
  - *Artifact:* A file or piece of code Claude generates for you

### Common Mistakes & Pitfalls
- **Being too vague:** "Make me an app" gives poor results. Be specific about the problem and user.
- **Accepting the first response:** Always iterate at least once; ask Claude to improve or clarify.
- **Not reading outputs:** Running code without understanding what it does can cause problems.
- **Overcomplicating the first project:** Start with something tiny (1-2 features max).

### Lesson Reflection
- What part of using Claude felt most unclear: setup, prompting, or understanding outputs?
- What's one thing you'd change about your first prompt now that you've seen Claude's response?

### Exercises

**Exercise 1: Create Your Project Brief**
- **Description:** Write a one-page brief for a tiny app idea you want to build.
- **Output:** Document containing: problem statement, target user, 3 features max, success criteria
- **Success Criteria:**
  - Problem is specific (not "help people")
  - Target user is defined (not "everyone")
  - Features are limited to 3 or fewer
  - Success criteria are measurable
- **Estimated Time:** 20 minutes

**Exercise 2: Write Your First Claude Build Prompt**
- **Description:** Using the prompt skeleton provided, write a complete prompt for your app idea.
- **Output:** A saved prompt document ready to paste into Claude
- **Success Criteria:**
  - All four sections filled in (goal, constraints, tech, success criteria)
  - Includes "ask clarifying questions first"
  - Specific enough that another person could understand your app idea
- **Estimated Time:** 25 minutes

**Exercise 3: Run Your Prompt and Capture Outputs**
- **Description:** Paste your prompt into Claude, answer any clarifying questions, and capture the results.
- **Output:** Document containing: Claude's clarifying questions + your answers, project plan, file list, first-step instructions
- **Open-ended exploration:** Reflect on what surprised you about Claude's response.
- **Estimated Time:** 45 minutes

### Resources & Further Reading
- [Anthropic Learn - Getting Started](https://www.anthropic.com/learn)
- [Claude Documentation - Prompting Basics](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Anthropic Documentation Home](https://docs.anthropic.com)

### Instructor Notes
- **For live sessions:** Have learners share their app ideas with a partner before writing prompts — peer feedback improves prompt quality.
- **Common questions:** "Can Claude actually make my app work?" — Reassure that this lesson is about planning; running code comes later.
- **Self-paced tip:** Encourage learners to screenshot their Claude conversation for later reference.
- **Time check:** Exercise 3 often takes longer than expected; consider making it optional homework for time-constrained sessions.

---

*End of Example Lesson*

---

## Final Instruction

Generate the complete 7-lesson curriculum following all specifications above. Ensure each lesson is:
1. Fully standalone (modular, no dependencies)
2. Contributes to the final capstone (working MVP + project plan)
3. Follows the exact template structure
4. Includes all required components with full detail

Begin generation now.
