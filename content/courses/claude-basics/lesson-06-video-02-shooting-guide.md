# Video 2 Shooting Guide: Data Analysis for Non-Analysts

**Target Duration:** 13 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "You have data. Maybe it's survey responses from potential users. Maybe it's a spreadsheet of analytics. Maybe it's a pile of customer feedback emails. Whatever it is, you know it holds answers -- you just don't know how to find them. In this video, I'm going to show you how to turn raw data into clear insights using Claude, even if you've never taken a statistics course in your life. No formulas. No pivot tables. No experience required."

**Keypoints:**
- Hook with the relatable problem: "I have data but don't know what it means"
- Immediately remove the intimidation factor -- no stats background needed
- Promise: clear, actionable insights from their data
- Set expectations: this is about asking the right questions, not learning math

**Visual suggestions:**
- Show yourself on camera (approachable, confident)
- On-screen text: "Data Analysis Without the Math"
- Brief flash of a messy spreadsheet transforming into a clean summary

---

## Section 1: Two Types of Data You'll Encounter (1:00 - 2:30)

### Quantitative vs. Qualitative

**SCRIPT:**
> "Before we jump into Claude, let me quickly explain the two types of data you'll work with. Don't worry -- this is simpler than it sounds."

#### Quantitative Data (45 seconds)

**SCRIPT:**
> "First: quantitative data. That just means numbers. Page views, sign-up counts, conversion rates, survey ratings on a 1-to-5 scale, revenue, time spent on page. Anything you can count or measure is quantitative. When I look at 02Ship's analytics, the number of course views per lesson, the average time on page, the bounce rate -- that's all quantitative data."

**Keypoints:**
- Quantitative = numbers (counts, measurements, ratings)
- Examples: page views, sign-up rates, survey scores, revenue
- Use the 02Ship analytics example to make it concrete
- On-screen text: "Quantitative = Numbers"

#### Qualitative Data (45 seconds)

**SCRIPT:**
> "Second: qualitative data. That's everything that's not a number -- text, opinions, feedback, comments, interview transcripts, support tickets. When someone writes in our Discord, 'I love the course but I wish there were more exercises,' that's qualitative data. It tells you how people feel and what they think, in their own words."

**Keypoints:**
- Qualitative = words and opinions (text, feedback, comments)
- Examples: user feedback, reviews, interview notes, support tickets
- Use the 02Ship Discord feedback example
- On-screen text: "Qualitative = Words & Opinions"

**SCRIPT (continued):**
> "Here's the beautiful thing: Claude is excellent at both. It can spot trends in numbers and themes in text. And you don't need different tools -- just different questions."

**Visual suggestions:**
- Simple two-column graphic: Quantitative (numbers icon) vs. Qualitative (speech bubble icon)
- Show real-world examples under each column
- Keep it visual and easy to understand at a glance

---

## Section 2: How to Get Your Data Into Claude (2:30 - 4:00)

### Pasting Data in the Right Format

**SCRIPT:**
> "Before Claude can analyze anything, you need to get your data into the conversation. There are a few ways to do this, and some work better than others."

#### CSV Format -- The Gold Standard (45 seconds)

**SCRIPT:**
> "The best format for numerical data is CSV -- comma-separated values. If you have a spreadsheet in Google Sheets or Excel, you can export it as a CSV file, then copy and paste the contents right into Claude. CSV looks like this: headers on the first line, then data on each following line, with commas separating each value. Claude reads it perfectly."

**What to show on screen:**
- Open a simple spreadsheet (Google Sheets or Excel)
- Show how to export/copy as CSV
- Paste into Claude
- On-screen text showing example CSV format:
  ```
  Name, Score, Feedback
  User1, 4, "Loved the videos"
  User2, 3, "Need more exercises"
  User3, 5, "Best course ever"
  ```

#### Tables and Text (30 seconds)

**SCRIPT:**
> "If CSV feels too technical, you can also just paste a table directly. Copy a table from a Google Sheet or a webpage and paste it in. Claude handles it well. You can also type data out as plain text: 'I have 50 survey responses. The average satisfaction score is 4.2 out of 5. Here are the open-ended responses:' and then paste them."

**Keypoints:**
- Copy-paste tables directly from spreadsheets
- Plain text descriptions work too for smaller datasets
- Tell Claude what the data represents -- give it context

#### Handling Large Datasets (30 seconds)

**SCRIPT:**
> "What if you have thousands of rows? Claude has limits on how much text it can process at once. For large datasets, use a representative sample. Paste the first 100 rows and tell Claude: 'This is a sample of 100 rows from a dataset of 5,000. Analyze this sample and tell me what patterns you see.' Claude will work with what you give it and note any caveats about the sample size."

**Keypoints:**
- For large datasets, paste a representative sample (50-100 rows)
- Tell Claude the total dataset size so it can account for sampling
- Claude will note limitations -- that is actually a good sign of reliability

**Visual suggestions:**
- Show the copy-paste workflow from a spreadsheet to Claude
- Keep it step-by-step so beginners can follow along
- On-screen text: "CSV = Best Format for Data"

---

## Section 3: Asking the Right Analysis Questions (4:00 - 6:00)

### The Questions That Unlock Insights

**SCRIPT:**
> "Here's where most people go wrong. They paste data into Claude and ask: 'Analyze this.' That's like handing someone a book and saying 'read this' -- they'll read it, but they won't know what you're looking for. The secret to good data analysis is asking specific questions."

#### Pattern Questions (30 seconds)

**SCRIPT:**
> "Start with pattern questions: 'What patterns do you see in this data?' 'What's the most common response?' 'How do the numbers change over time?' Pattern questions help you understand what's normal and what's typical."

**Keypoints:**
- "What patterns do you see?"
- "What's the most common theme in this feedback?"
- "How have these numbers changed over time?"
- Patterns reveal what is normal and recurring

#### Trend Questions (30 seconds)

**SCRIPT:**
> "Next, trend questions: 'Are these numbers going up or down over the past six months?' 'Is satisfaction improving or declining?' 'Which feature gets more mentions over time?' Trends tell you the direction things are heading."

**Keypoints:**
- "Are numbers trending up or down?"
- "Is satisfaction improving or declining?"
- Trends reveal direction and momentum

#### Outlier Questions (30 seconds)

**SCRIPT:**
> "Then, outlier questions: 'What's unusual in this data?' 'Are there any responses that stand out from the rest?' 'Which data points don't fit the pattern?' Outliers are often the most interesting part of your data -- they can reveal hidden problems or unexpected opportunities."

**Keypoints:**
- "What's unusual or unexpected?"
- "Which responses stand out?"
- Outliers often point to problems or opportunities

#### Recommendation Questions (30 seconds)

**SCRIPT:**
> "Finally -- and this is the most powerful one -- recommendation questions: 'Based on this data, what should I prioritize?' 'If I can only fix one thing, what should it be?' 'What does this data suggest I should do next?' You're not just asking Claude to describe the data. You're asking it to help you make decisions."

**Keypoints:**
- "Based on this data, what should I prioritize?"
- "What's the most important thing this data tells me?"
- Recommendation questions turn analysis into action
- This is where Claude becomes a decision-support tool

**Visual suggestions:**
- Show four question types as labeled cards on screen: Patterns, Trends, Outliers, Recommendations
- Display example prompts under each card
- On-screen text: "Don't just say 'analyze this' -- ask specific questions"

---

## Section 4: Live Demo -- Analyzing User Survey Results (6:00 - 10:00)

### Real-Time Data Analysis

**SCRIPT:**
> "Let's see this in action. I've got a set of user survey results -- imagine these are from 02Ship learners who completed Lesson 5 and gave feedback. I'll paste the data into Claude and walk you through the analysis step by step."

#### Step 1: Setting Up Context (6:00 - 6:30)

**SCRIPT:**
> "First, I give Claude context. I'll type: 'I run a learning platform called 02Ship that teaches non-programmers to build apps with AI. Here are survey results from 30 learners who completed our first five lessons. Please analyze this data and help me understand what's working and what needs improvement.' Context matters. Claude gives much better analysis when it understands what the data represents."

**What to show on screen:**
- Open Claude interface
- Type the context prompt
- Paste in pre-prepared survey data (CSV or table format)
- Survey data should include: satisfaction ratings, difficulty ratings, open-ended feedback, completion status

#### Step 2: Pattern Analysis (6:30 - 7:15)

**SCRIPT:**
> "Now I'll ask: 'What patterns do you see in the satisfaction and difficulty ratings? Group the open-ended feedback into themes.'"

**What to show on screen:**
- Send the pattern analysis prompt
- Show Claude identifying themes in the feedback
- Highlight how Claude groups similar feedback together
- Point out patterns: "Look -- Claude noticed that most people who rated difficulty as 'hard' also mentioned wanting more examples"

#### Step 3: Digging Deeper (7:15 - 8:15)

**SCRIPT:**
> "Claude gave me a good overview. Now I want to dig deeper. I'll ask: 'What are the top three pain points mentioned in the feedback? Quote specific responses that illustrate each one.' Asking Claude to quote specific responses is a great technique -- it shows you the evidence behind its analysis, not just its conclusions."

**What to show on screen:**
- Send the deeper analysis prompt
- Show Claude pulling out specific quotes from the data
- Read a few quotes aloud
- React naturally: "That's really useful feedback -- I wouldn't have noticed that pattern myself"

**Keypoints:**
- Ask Claude to quote specific data points as evidence
- This prevents Claude from making unsupported generalizations
- Quoting responses shows you the "why" behind patterns

#### Step 4: Getting Recommendations (8:15 - 9:00)

**SCRIPT:**
> "Now the big question: 'Based on this analysis, what are the three most impactful changes I should make to the course? Prioritize by: how many learners are affected and how much it would improve their experience.'"

**What to show on screen:**
- Send the recommendation prompt
- Show Claude's prioritized recommendations
- Read through the top three recommendations
- Point out how Claude justifies each recommendation with data

**SCRIPT (continued):**
> "Notice what just happened. I went from a spreadsheet of raw survey data to three specific, prioritized improvements I should make -- with evidence backing each one. This would have taken me hours to do manually. With Claude, it took about five minutes."

#### Step 5: Sense-Checking (9:00 - 10:00)

**SCRIPT:**
> "Now, one more step that a lot of people skip: the sense-check. I always review Claude's analysis with my own judgment. Does this match what I'm hearing from learners in Discord? Do these recommendations make sense given what I know about the platform? Claude is incredibly good at finding patterns, but it doesn't know everything about my context. I'm the one who talks to learners every day. So I use Claude's analysis as a strong starting point and then apply my own understanding on top of it."

**Keypoints:**
- Always sense-check Claude's analysis with your own knowledge
- Claude sees patterns in data; you see the full context
- Blend AI analysis with human judgment for the best decisions
- Claude is a tool, not gospel

**Visual suggestions:**
- Full-screen Claude interface throughout the demo
- Zoom in on key insights and recommendations
- Pace the demo so viewers can follow along
- Show a brief "sense-check" moment where you compare Claude's output to your own knowledge

---

## Section 5: When Claude Is Enough vs. When You Need a Human Expert (10:00 - 11:30)

### Knowing the Limits

**SCRIPT:**
> "Let me be upfront about something: Claude's data analysis is incredibly useful, but it's not always enough. So when is Claude sufficient, and when should you bring in a human expert?"

#### Claude Is Enough For... (45 seconds)

**SCRIPT:**
> "Claude is great for: identifying themes in user feedback, spotting general trends in your metrics, creating comparison tables, getting a quick read on survey results, and generating hypotheses to test. For most product decisions at the early stage -- 'what feature should I build next?' or 'what are my users struggling with?' -- Claude gives you more than enough insight to make a smart call."

**Keypoints:**
- Theme identification in qualitative data
- General trend spotting in metrics
- Quick survey analysis
- Early-stage product decisions
- Generating hypotheses

#### Bring in a Human Expert When... (45 seconds)

**SCRIPT:**
> "But consider bringing in a human expert when: you're making a high-stakes financial decision based on data, you need statistically rigorous analysis (like a proper A/B test evaluation), you're working with regulated data (medical, financial, legal), or when the data patterns don't make sense and you need someone to investigate deeper. For most of us building products as beginners? Claude handles ninety percent of what we need."

**Keypoints:**
- High-stakes financial decisions
- Statistically rigorous analysis requirements
- Regulated industries (medical, financial, legal data)
- When patterns are confusing or contradictory
- For most beginners building products, Claude covers 90% of needs

**Visual suggestions:**
- Split screen: "Claude Is Enough" (green) vs. "Get Expert Help" (yellow)
- Show clear, simple criteria under each column
- On-screen text: "90% of early-stage product analysis? Claude's got you."

---

## Section 6: Your Data Analysis Prompt Toolkit (11:30 - 12:00)

### Quick Reference Prompts

**SCRIPT:**
> "Before we wrap up, let me give you a quick toolkit of prompts you can use right away for any data you have."

**What to show on screen (display as a list):**
- For survey data: "Analyze this user feedback and group into themes"
- For metrics: "What trends do you see in this time-series data?"
- For funnel data: "Where are people dropping off and why?"
- For feedback: "What are the top three pain points mentioned?"
- General purpose: "Analyze this data and tell me: what are the key patterns, what's surprising, what's most important, and what should I do about it?"

**SCRIPT (continued):**
> "That last one -- the general-purpose prompt -- is your Swiss Army knife. It works for almost any data. Paste your data, ask those four questions, and you'll get useful insights every time. I've put all of these prompts on the lesson page so you can copy and paste them."

**Keypoints:**
- Give viewers a reusable toolkit they can apply immediately
- The general-purpose prompt covers most situations
- Prompts are available on the lesson page for easy access

**Visual suggestions:**
- Show prompts as a clean, readable list
- Highlight the general-purpose prompt as the go-to option
- On-screen text: "Your Data Analysis Toolkit"

---

## Closing (12:00 - 13:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's bring it all together. You now know the two types of data -- quantitative and qualitative -- and that Claude handles both beautifully. You know how to get your data into Claude: CSV works best, but tables and text work fine too. You know the four types of questions to ask: patterns, trends, outliers, and recommendations. And most importantly, you saw a live demo where raw survey data turned into three clear, prioritized action items in about five minutes.
>
> The key takeaway: you don't need to understand statistics to understand your data. You just need to ask the right questions.
>
> In the next video, we're switching gears to something really fun: brainstorming and ideation. I'll show you how to use Claude as a tireless brainstorming partner -- someone who generates ideas until you say stop, plays different roles to challenge your thinking, and helps you pick the best ideas from the pile.
>
> See you there!"

**Keypoints:**
- Recap: two data types, how to paste data, four question types
- Reinforce: you do not need statistics -- you need the right questions
- Tease Video 3: brainstorming and ideation (a change of pace -- fun and creative)
- Keep energy high and encouraging

**Visual suggestions:**
- Show your face (proud of the viewer, encouraging)
- On-screen text: "Right Questions > Statistics Knowledge"
- End card with link to next video and the prompt toolkit on the lesson page

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **You don't need statistics** (the right questions matter more than math skills)
2. **CSV is the best format** (but tables and text work too)
3. **Ask specific questions, not 'analyze this'** (patterns, trends, outliers, recommendations)
4. **Ask Claude to quote evidence** (prevents unsupported generalizations)
5. **Always sense-check** (blend Claude's analysis with your own judgment)
6. **Claude covers 90% of early-stage needs** (know when to bring in an expert for the other 10%)

---

## Production Notes

### Tone & Style
- Accessible and encouraging -- remove all intimidation around data
- Practical and hands-on -- the live demo is the core of this video
- Empowering -- viewers should feel like "I can actually do this"
- Honest about limitations -- Claude is powerful but not infallible

### Common Beginner Concerns to Address
- "I'm not a numbers person" --> You don't need to be. Claude translates data into plain English
- "My data is messy" --> That's normal. Paste what you have; Claude is flexible
- "How do I know if Claude's analysis is right?" --> Sense-check it against what you already know. Does it match your experience?
- "I don't have any data yet" --> Start collecting now. Even five survey responses are enough to practice with

### Things to Avoid
- Using statistical jargon without explanation (no "standard deviation" or "p-value" talk)
- Making data analysis sound like something only experts can do
- Skipping the sense-check step -- this is critical for responsible AI use
- Rushing through the live demo (viewers need to see each step clearly)
- Implying that Claude's analysis replaces professional data science for complex problems

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle

**Screen recording:**
- Full Claude.ai interface for the live demo
- Pre-prepare survey data so the demo flows smoothly
- Keep font size large enough to read prompts and responses
- Zoom in on key parts of Claude's analysis output
- Consider showing the spreadsheet briefly before pasting into Claude

**Editing notes:**
- Add on-screen text for the four question types (patterns, trends, outliers, recommendations)
- Include timestamps in YouTube description
- Add chapter markers for easy navigation
- Include the prompt toolkit in the video description
- Add visual callouts during the demo to highlight key insights

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Brainstorming and Ideation Techniques" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Download the data analysis prompt toolkit: [link to Lesson 6 page]"
- "Share your analysis results in Discord!"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "What data are you sitting on that you haven't analyzed yet? Tell us in the comments!"
- "Try the general-purpose analysis prompt on your own data -- what surprised you? Share in Discord!"
- "What's the most interesting insight Claude found in your data?"

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy, especially data-related terms
- **Transcript:** Post full transcript in lesson page
- **Pace:** Speak clearly and slowly, especially when explaining data concepts and during the live demo
- **Visuals:** Read aloud all prompts, data excerpts, and key parts of Claude's responses -- do not assume viewers can read the screen

---

## Post-Production Checklist

- [ ] Video length: 13-15 minutes
- [ ] All key points covered
- [ ] Live demo is clear and paced for beginners
- [ ] Data types explanation is simple and non-intimidating
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Data Analysis Without the Math")
- [ ] YouTube title: "Data Analysis for Non-Analysts | 02Ship Claude Basics"
- [ ] Description includes: timestamps, prompt toolkit, Discord link, next video link
- [ ] Tags: Claude AI data analysis, analyze data with AI, data analysis for beginners, Claude tutorial, no-code data analysis
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 6"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**Data analysis sounds intimidating, but it's really just asking good questions. This video proves that anyone can extract insights from their data -- no spreadsheet wizardry required. Make viewers feel capable and eager to dig into their own data.**
