# Video 3 Shooting Guide: Deployment and Launch: Ship It to the World

**Target Duration:** 12 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "This is it. The final video. Not just of Lesson 7, but of the entire course. When you started, you didn't know what Claude was. Now you're about to deploy a real product to the real internet. In the next twelve minutes, I'm going to show you how to take your MVP, put it online with a custom domain, launch it to real users, and handle what comes next. You've done the hard work. Now let's ship it to the world."

**Keypoints:**
- This is the culmination of the entire 7-lesson course
- Acknowledge the journey: from not knowing Claude to deploying a real product
- Set the emotional tone: this is a graduation moment
- Preview the video: deploy, launch, post-launch, celebrate
- Energy should be at its highest -- this is the payoff

**Visual suggestions:**
- Show yourself on camera with maximum energy and warmth
- On-screen text: "Ship It to the World"
- Consider a brief "journey so far" montage (Lessons 1 through 7, 2-3 seconds total)
- Show the MVP from Video 2 ready to go in the browser

---

## Section 1: Deployment Options (1:00 - 3:00)

### Getting Your MVP on the Internet

**SCRIPT:**
> "Deployment means taking the code that runs on your computer and putting it on the internet so anyone in the world can access it. And here's the part that surprises most beginners: deployment used to be incredibly complicated. Servers, configurations, command-line wizardry. Today? It can be literally one click. Let me show you your options."

**Keypoints:**
- Deployment = putting your code on the internet for the world to access
- It used to be hard; modern tools have made it remarkably simple
- Three main options for beginners, with a clear recommendation

#### Option 1: Vercel (Recommended)

**SCRIPT:**
> "My top recommendation is Vercel. It's what 02Ship is deployed on, it's free for personal projects, and it's designed to work perfectly with Next.js -- which is what we've been building with. Deployment is as simple as connecting your GitHub repository and clicking deploy. Vercel handles everything else: hosting, SSL certificates, global distribution. You don't need to understand any of those terms. Just know it's fast, free, and reliable."

**Keypoints:**
- Free for personal and hobby projects
- Built by the same team that makes Next.js
- One-click deployment from GitHub
- Automatic HTTPS (secure connection)
- Automatic deploys when you push code updates
- 02Ship runs on Vercel -- proof it works

#### Option 2: Netlify

**SCRIPT:**
> "Your second option is Netlify. Very similar to Vercel -- free tier, easy deployment, works well with most frameworks. If for any reason Vercel doesn't work for you, Netlify is an excellent alternative."

#### Option 3: Render

**SCRIPT:**
> "And there's Render, which is good if you eventually need a database or backend services. For a simple MVP, though, Vercel or Netlify is the way to go."

**Visual suggestions:**
- Show comparison table: Vercel (recommended), Netlify, Render
- On-screen text: "Vercel = Recommended for beginners"
- Briefly show the Vercel homepage
- On-screen text: "Free for personal projects"

---

## Section 2: Live Deployment with Vercel (3:00 - 5:30)

### Step-by-Step Deployment Demo

**SCRIPT:**
> "Let me deploy a project live, right now. I'm going to take the landing page we built in Video 2 and put it on the internet. This is deployment scary the first time, but I promise -- routine the tenth time."

**What to show on screen (step by step):**

**Step 1: Push to GitHub (1 minute)**
- Show your code in the terminal
- Run: `git add .`, `git commit -m "Ready to deploy"`, `git push`
- Explain briefly: "GitHub is where your code lives online. Vercel reads from it."

**Step 2: Connect to Vercel (1 minute)**
- Go to vercel.com and sign up (or log in)
- Click "New Project"
- Import from GitHub -- select your repository
- Show Vercel auto-detecting the framework (Next.js)
- Click "Deploy"

**Step 3: Watch It Deploy (30 seconds)**
- Show the deployment progress bar
- Narrate what's happening: "Vercel is building your project and putting it on their servers"
- Show the deployment completing
- Click the live URL -- your site is live!

**SCRIPT (continued):**
> "And just like that... your MVP is live. On the internet. Anyone with this URL can see it right now. That took about two minutes. Let me click the link... and there it is. Our landing page, live on the web. If this is your first time deploying something, take a moment to appreciate this. You just shipped."

**Keypoints:**
- Three steps: push to GitHub, connect to Vercel, click deploy
- Vercel auto-detects Next.js and configures everything
- Deployment takes about 1-2 minutes
- You get a free URL immediately (something.vercel.app)
- Celebrate the moment when the live URL loads

**Visual suggestions:**
- Full-screen for the deployment walkthrough
- Slow down at key moments (clicking deploy, seeing the live URL)
- Show genuine excitement when the site goes live
- On-screen text: "Your MVP is LIVE"
- Consider a small celebration animation or sound effect

---

## Section 3: Connecting a Custom Domain (5:30 - 7:00)

### Making It Feel Real

**SCRIPT:**
> "Your site is live, but it's on a something-dot-vercel-dot-app URL. That works, but let me tell you -- connecting a custom domain makes it feel real. When I connected 02ship.com for the first time and typed it into my browser and saw my platform load... that was the moment it stopped being a project and started being a product."

**Keypoints:**
- Custom domain = your own .com (or .io, .co, etc.)
- Where to buy: Namecheap, Google Domains, Cloudflare
- Typical cost: $10-15 per year
- Optional but highly recommended for credibility

**SCRIPT (continued):**
> "Here's how to connect a custom domain on Vercel. Go to your project settings, click Domains, type in your domain name, and Vercel gives you DNS records to add at your domain registrar. It sounds technical, but it's really just copying and pasting two values. Claude can walk you through it step by step if you get stuck -- just ask: 'How do I connect my domain from Namecheap to Vercel?'"

**What to show on screen:**
- Vercel project settings, Domains section
- Adding a custom domain
- Show the DNS configuration screen
- Emphasize: "It's just copying and pasting two values"

**Visual suggestions:**
- On-screen text: "Custom domain = feels real"
- Show the domain configuration screen
- Highlight the "copy these values" step
- On-screen text: "Stuck? Ask Claude: 'How do I connect my domain to Vercel?'"

---

## Section 4: Pre-Launch Checklist (7:00 - 8:30)

### Before You Tell the World

**SCRIPT:**
> "Before you start sharing your MVP with people, let's run through a quick pre-launch checklist. These are the small things that make the difference between looking like a side project and looking like a real product."

**Keypoints -- Pre-Launch Checklist:**

1. **Analytics (30 seconds)**
   - Add Vercel Analytics (free, built-in) or Google Analytics
   - You want to know how many people visit and what they click
   - Ask Claude: "How do I add Vercel Analytics to my Next.js project?"

2. **Error Tracking (20 seconds)**
   - Helps you know when something breaks
   - Sentry has a free tier that works well
   - Optional for MVP but nice to have

3. **Basic SEO (30 seconds)**
   - Page title and description (so it shows up nicely in Google)
   - Open Graph image (so it looks good when shared on social media)
   - Ask Claude: "Can you add SEO metadata to my pages?"

4. **Final Test (20 seconds)**
   - Open your live URL on your phone
   - Test the core user flow one more time
   - Check that the page loads quickly

**SCRIPT (continued):**
> "Don't let this checklist hold you up. If you've got analytics and basic SEO, you're good to go. Remember: ship before you feel ready. Feedback from five real users beats theory from five hundred imaginary ones."

**Visual suggestions:**
- Show the checklist as a clean graphic
- Check items off as they're covered
- On-screen text: "Ship before you feel ready"
- Keep this section brisk -- it should not slow momentum

---

## Section 5: Simple Launch Strategy (8:30 - 10:00)

### Tell the World

**SCRIPT:**
> "Your MVP is live, your domain is connected, your checklist is done. Now -- tell people about it. Here's a simple launch strategy that any beginner can execute."

**Keypoints -- where to share:**

1. **Your personal network first**
   - Text five friends or family members the link directly
   - Ask them: "Can you try this and tell me what you think?"
   - Personal outreach gets the most honest feedback

2. **Twitter / X**
   - Write a short thread: what you built, why, and the link
   - Tag relevant communities and people in your space
   - Use the "build in public" hashtag

3. **LinkedIn**
   - Share your story: "I went from zero coding experience to shipping a product"
   - Professional network often provides supportive first engagement
   - Great for professional tools or B2B ideas

4. **Reddit**
   - Find the relevant subreddit for your topic
   - Follow the community rules (no spam)
   - Be genuine: "I built this to solve a problem I had"

5. **Product Hunt (when ready)**
   - Not for your first day, but a great goal for a polished version
   - Free to launch on

**SCRIPT (continued):**
> "The key insight about launching: your first users will be forgiving. They know this is new. They're not expecting perfection -- they're rooting for you. The people who try your MVP early are the most valuable users you'll ever have, because their feedback shapes everything that comes next."

**Visual suggestions:**
- Show each platform briefly (Twitter, LinkedIn, Reddit)
- On-screen text: "Your first users will be forgiving"
- Show an example launch tweet or post
- On-screen text: "Feedback from 5 real users > theory from 500 imaginary ones"

---

## Section 6: Post-Launch -- Responding to Feedback and Monitoring (10:00 - 11:00)

### What Happens After You Ship

**SCRIPT:**
> "You launched. People are using your MVP. Now what? Two things: respond to feedback and monitor your metrics."

**Keypoints:**

#### Responding to Feedback
- Read every piece of feedback carefully
- Thank everyone who takes the time to respond
- Look for patterns: if three people say the same thing, prioritize that fix
- Don't try to implement every suggestion -- filter through your MVP scope
- Use Claude to help you implement the most important improvements

#### Monitoring Metrics
- Check your analytics daily for the first week
- Look at: number of visitors, where they come from, what they click
- Don't obsess over numbers -- look for trends and patterns
- If nobody is signing up but people are visiting, the messaging might need work
- If nobody is visiting, you need to share more widely

**Visual suggestions:**
- Show a simple analytics dashboard
- On-screen text: "Read every piece of feedback"
- Show a cycle: Ship, Feedback, Improve, Ship again
- Keep this section brief -- it's a preview of ongoing work, not a deep dive

---

## Section 7: The 02Ship Story (11:00 - 11:30)

### How This Platform Launched

**SCRIPT:**
> "Let me share a quick story. When I launched 02Ship, it wasn't this polished. The first version had fewer lessons, rougher design, and honestly some things that didn't work perfectly. But I shipped it. And the feedback from those early users -- some of you watching right now -- shaped every improvement since. The platform you're learning on today exists because someone shipped an imperfect MVP and kept iterating. That's the entire lesson of this course in one story."

**Keypoints:**
- 02Ship was built using exactly this process
- First version was imperfect and that was fine
- Early user feedback shaped everything
- The platform viewers are using is proof the process works
- Full circle moment: they learned the process on a product built by the process

**Visual suggestions:**
- Show yourself on camera (authentic, reflective)
- Brief flash of 02Ship as it looks today
- On-screen text: "You're looking at the proof"

---

## Closing (11:30 - 12:00)

### Graduation Moment

**SCRIPT:**
> "And with that... you did it. You completed the entire 02Ship Claude Basics course. Seven lessons. From 'what is Claude?' to deploying your own MVP to the internet. Think about that for a second. You went from zero to shipping a real product. Not a tutorial project that lives on your hard drive. A real thing on the real internet that real people can use.
>
> You are now a builder who ships. That's not a motivational phrase -- it's a statement of fact. You have the skills, the tools, and the process to take any idea and turn it into a working product. And every time you do it, you'll get faster and better.
>
> If you want to keep building with this community, join us on Discord. Share what you've shipped. Help the next person who's where you were seven lessons ago. And most importantly -- keep shipping.
>
> Congratulations. I'm genuinely proud of you. Now go build something amazing."

**Keypoints:**
- Celebrate completion of the entire course
- Acknowledge the transformation: from total beginner to someone who ships
- "Builder who ships" is an identity, not just a skill
- Invite them into the ongoing community
- Encourage them to help others (paying it forward)
- End with genuine pride and warmth

**Visual suggestions:**
- Show yourself on camera (warm, proud, genuine emotion)
- On-screen text: "You are now a builder who ships"
- Show community links (Discord, GitHub Discussions)
- On-screen text: "Keep shipping"
- End card with community links, course playlist, and a thank you
- Consider a brief celebratory moment (confetti animation, or simply a smile and nod)

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Deployment is scary the first time, routine the tenth** (normalize the fear, promise it gets easier)
2. **Vercel makes it nearly one-click** (technology has removed the barriers)
3. **Custom domain makes it feel real** (small investment, huge psychological impact)
4. **Ship before you feel ready** (perfectionism kills more MVPs than bad code)
5. **Your first users will be forgiving** (they're rooting for you)
6. **Feedback from 5 real users beats theory from 500 imaginary ones** (real-world validation is everything)
7. **02Ship is the proof** (built, launched, and iterated using this exact process)
8. **Today you become a builder who ships** (identity transformation, not just skill acquisition)

---

## Production Notes

### Tone & Style
- **Celebratory and empowering** (this is graduation day)
- **Practical during deployment** (step-by-step, clear instructions)
- **Emotional during closing** (genuine pride, warmth, encouragement)
- **Fast-paced during launch strategy** (energy and momentum)
- **Reflective during 02Ship story** (authentic and personal)
- **This video should feel like a crescendo** -- building energy from start to finish

### Common Beginner Concerns to Address
- "Deployment sounds scary and technical" → It's literally one click on Vercel
- "What if my MVP isn't good enough to share?" → Ship before you feel ready; early users are forgiving
- "What if nobody cares?" → Five people giving feedback is a massive win at this stage
- "I don't have a custom domain" → The free Vercel URL works fine to start
- "What do I do after launching?" → Read feedback, improve, ship again -- it's a cycle

### Things to Avoid
- Making deployment sound more complicated than it is
- Spending too long on advanced topics (error tracking, SEO optimization)
- Underselling the accomplishment (completing this course is genuinely impressive)
- Rushing the closing (let the graduation moment breathe)
- Being preachy or condescending (celebrate with them, not at them)

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle
- Best lighting and audio quality for this video -- it's the finale

**Screen recording:**
- Full Vercel deployment walkthrough (every click shown)
- Browser showing the live site for the first time
- Mobile view test (resizing browser or using phone)
- Analytics dashboard briefly
- Keep font sizes large and readable

**Editing notes:**
- Add on-screen text for each major section
- Include timestamps in YouTube description
- Add chapter markers for easy navigation
- The deployment moment (site going live) should feel special -- consider music or a brief pause
- The closing should have slightly different energy (warmer lighting, closer camera) if possible
- Consider a montage of the entire course journey during the closing
- Add community links as persistent on-screen graphics during the final minute

---

## Call-to-Action (End Card)

**Include:**
- "Join our Discord community: https://discord.gg/btqaA3hzKp"
- "Share what you built in GitHub Discussions"
- "Watch the full course playlist: 02Ship Claude Basics"
- "Subscribe for more building tutorials"
- "Help the next person: share this course with someone who has an idea"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "You just shipped! Drop the link to your MVP in the comments -- let's celebrate!" (comment prompt)
- "What was the hardest part of the course? What was the most fun? Tell us below!" (engagement)
- "Who are you going to share this course with? Tag them!" (growth)
- "What will you build next? Drop your next idea in the comments!" (future engagement)

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy, especially domain names and URLs
- **Transcript:** Post full transcript in lesson page
- **Pace:** Speak clearly; slow down during deployment steps and the emotional closing
- **Visuals:** Narrate every action during deployment demo; don't rely solely on screen content

---

## Post-Production Checklist

- [ ] Video length: 12-15 minutes
- [ ] All key points covered
- [ ] Deployment demo is clear and complete
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Ship It!")
- [ ] YouTube title: "Deployment & Launch: Ship It to the World | 02Ship Claude Basics"
- [ ] Description includes: timestamps, Vercel link, deployment checklist, Discord link, course playlist
- [ ] Tags: deploy with Vercel, ship your MVP, Claude AI, beginner deployment, launch strategy, 02Ship
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 7"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the most important video in the entire course. Not because of the technical content -- but because of how it makes viewers feel. They walked in as someone who had an idea. They're walking out as someone who shipped. Honor that transformation. Make them feel it. And send them into the world believing they can build anything -- because after this course, they can.**
