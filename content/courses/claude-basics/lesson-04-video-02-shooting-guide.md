# Video 2 Shooting Guide: Setting Up Your Dev Environment (The Minimum)

**Target Duration:** 14 minutes
**Max Duration:** 15 minutes
**Target Audience:** Absolute beginners with no coding experience

---

## Opening (0:00 - 1:00)

### Hook & Introduction

**SCRIPT:**
> "In the last video, we created a simple HTML page and opened it right in the browser. That worked because it was one file --- no setup needed. But what happens when Claude gives you a full project with multiple files, dependencies, and a real framework? You need a kitchen to cook in. Today, I'm going to walk you through the minimum setup you need to run Claude's code on your computer. And I mean minimum --- we're not becoming developers here. We're setting up just enough to bring Claude's work to life."

**Keypoints:**
- Connect back to Video 1: simple HTML worked without setup
- Motivate: real projects need a bit more infrastructure
- Reassure: this is the minimum, not a computer science course
- Analogy preview: setting up a kitchen, following a recipe

**Visual suggestions:**
- Show yourself on camera (calm, reassuring energy)
- On-screen text: "The Minimum Dev Setup"
- Brief flash of VS Code, a terminal, and a browser side by side

---

## Section 1: The Three Tools You Need (1:00 - 3:00)

### Overview: Text Editor + Terminal + Browser

**SCRIPT:**
> "You need exactly three things: a text editor to read and edit code, a terminal to run commands, and a browser to see the results. That's it. Let me walk you through each one."

**Keypoints:**
- Only three tools required
- All free
- Most people already have a browser
- Text editor and terminal are one-time installs

**Visual suggestions:**
- On-screen graphic showing three icons: editor, terminal, browser
- On-screen text: "Text Editor + Terminal + Browser = Ready"

### VS Code (Text Editor)

**SCRIPT:**
> "For your text editor, I recommend VS Code --- Visual Studio Code. It's free, it's made by Microsoft, and it's what most developers use. But here's the important part for you: it's beginner-friendly. It color-codes your files so they're easier to read, it has a built-in terminal so you don't need a separate app, and it catches common mistakes with little red underlines. Go to code.visualstudio.com, download it, and install. That's step one."

**Keypoints:**
- VS Code is free and widely used
- Beginner-friendly features: syntax highlighting, built-in terminal, error indicators
- Download from code.visualstudio.com
- Works on Mac, Windows, and Linux
- No special configuration needed to start

**What to show on screen:**
- Navigate to code.visualstudio.com
- Click download
- Show the install process (briefly --- don't belabor it)
- Open VS Code and point out the key areas: file explorer, editor pane, terminal

### Terminal (Command Line)

**SCRIPT:**
> "Next, the terminal. The terminal is a text-based way to talk to your computer. Instead of clicking buttons, you type commands. It sounds old-school, but it's how you run code. The good news: VS Code has a terminal built right in. Go to View, then Terminal, and there it is --- right inside your editor. On Mac, it's called Terminal. On Windows, it's PowerShell. Either way, it works the same for our purposes."

**Keypoints:**
- Terminal = text-based interface for running commands
- VS Code has one built in (View > Terminal)
- Mac: Terminal app (also built into the system)
- Windows: PowerShell or Command Prompt
- You only need to know a handful of commands

**What to show on screen:**
- Open the terminal inside VS Code (View > Terminal)
- Show the terminal prompt (the blinking cursor waiting for input)
- Type a simple command like `pwd` (Mac) or `cd` (Windows) to show it works
- On-screen text: "Terminal = Typing commands instead of clicking buttons"

### Browser

**SCRIPT:**
> "And third, your browser. Chrome, Firefox, Safari, Edge --- any modern browser works. You already have one. When you run a project locally, you'll open it in your browser at an address like localhost:3000. We'll see that in action in a few minutes."

**Keypoints:**
- Any modern browser works (Chrome, Firefox, Safari, Edge)
- No special setup required
- localhost:3000 is the address for local projects

**Visual suggestions:**
- Briefly show a browser with localhost:3000 in the address bar
- On-screen text: "localhost:3000 = Your computer's private website"

---

## Section 2: Installing Node.js (3:00 - 5:30)

### What Is Node.js and Why Do You Need It?

**SCRIPT:**
> "Now, there's one more thing to install: Node.js. I know --- another thing. But this is the last one, I promise. Node.js is what makes modern web projects run on your computer. Think of it like a power outlet. Your project is the lamp, but without the outlet, it can't turn on. Node.js is the outlet that powers JavaScript-based projects --- which is what most of Claude's web projects use."

**Keypoints:**
- Node.js powers modern JavaScript/web projects
- Without it, most projects Claude generates won't run
- One-time install, then you never think about it again
- Analogy: Node.js is the power outlet, your project is the lamp

**Visual suggestions:**
- On-screen graphic: lamp (project) plugging into outlet (Node.js)
- On-screen text: "Node.js = The power outlet for web projects"

### Installing Node.js

**SCRIPT:**
> "Go to nodejs.org. You'll see two download options. Always pick the one labeled LTS --- that stands for Long-Term Support. It means it's the stable, tested version. Click download, run the installer, and follow the prompts. Accept the defaults --- you don't need to change any settings."

**What to show on screen:**
- Navigate to nodejs.org
- Point out the LTS version (highlight it)
- Download and run the installer
- Show the install wizard --- click through with defaults
- On-screen text: "Always choose LTS (Long-Term Support)"

### Verifying the Installation

**SCRIPT:**
> "Once it's installed, let's make sure it worked. Open your terminal --- remember, that's View, Terminal in VS Code --- and type: node dash v. Then press Enter. If you see a version number, like v20 something, you're good. Now type: npm dash v. That checks if npm --- the package manager --- is installed too. If both show version numbers, you're set."

**What to show on screen:**
- Open terminal in VS Code
- Type `node -v` and show the version output
- Type `npm -v` and show the version output
- On-screen text: "node -v and npm -v = Proof it's installed"

**Keypoints:**
- `node -v` verifies Node.js is installed
- `npm -v` verifies npm (comes with Node.js) is installed
- If either fails, Node.js may not be properly installed --- revisit the install
- npm = Node Package Manager (handles project dependencies)

---

## Section 3: Understanding package.json and npm install (5:30 - 8:00)

### What Is package.json?

**SCRIPT:**
> "When Claude generates a project, you'll notice a file called package.json in the project folder. Think of this as a recipe card. It lists everything your project needs to run: the name of the project, the commands available, and most importantly, the dependencies --- the external libraries your project relies on. You don't need to write this file. Claude creates it for you. You just need to know it exists and what it's for."

**Keypoints:**
- package.json = recipe card for your project
- Lists project name, commands, and dependencies
- Claude generates this file for you
- You don't need to edit it (usually)
- It tells npm what to download

**What to show on screen:**
- Open a package.json file in VS Code
- Point out the "name" field
- Point out the "scripts" section (especially "dev" and "start")
- Point out the "dependencies" section
- On-screen text: "package.json = Your project's recipe card"

### Running npm install

**SCRIPT:**
> "Here's the most important command you'll learn today: npm install. When you get a new project from Claude, the first thing you always do is open the terminal in that project's folder and type npm install. This reads the package.json recipe card and downloads everything the project needs. Think of it like going to the grocery store before you cook. The recipe tells you what ingredients you need, and npm install goes and gets them."

**Keypoints:**
- `npm install` downloads all project dependencies
- Always run this first when you get a new project
- It creates a `node_modules` folder (can be large --- that's normal)
- May take 1-2 minutes depending on the project
- Analogy: grocery shopping before cooking

**What to show on screen:**
- Type `npm install` in the terminal
- Show the progress as packages download
- Point out the `node_modules` folder appearing in the file explorer
- On-screen text: "npm install = Download the ingredients"

### Running the Project

**SCRIPT:**
> "Once npm install finishes, you're ready to run the project. The command is usually npm run dev or npm start --- Claude will tell you which one. Type it, press Enter, and watch the terminal. It'll say something like 'Ready on localhost:3000' or 'Server started on port 3000.' That means your computer is now hosting a website --- a private website that only you can see."

**Keypoints:**
- `npm run dev` or `npm start` launches the project
- Terminal will show a message when it's ready
- Open your browser and go to `http://localhost:3000`
- localhost = your computer, 3000 = the port (think of it as a door number)
- Only you can see it --- it's not on the internet

**What to show on screen:**
- Type `npm run dev` in the terminal
- Show the "ready" message appearing
- Open browser, navigate to localhost:3000
- Show the project running in the browser
- On-screen text: "localhost:3000 = Your private preview"

---

## Section 4: When You Don't Need All This Setup (8:00 - 9:30)

### Simple Files That Just Work

**SCRIPT:**
> "Now, here's an important distinction. Not everything Claude generates needs this full setup. Remember the HTML greeting card from Video 1? That was a single HTML file. You saved it, double-clicked it, and it opened in your browser. No Node.js, no npm install, no terminal commands. Simple HTML files, basic CSS files, and standalone JavaScript files can often run directly in the browser."

**Keypoints:**
- Single HTML files: just save and open in browser
- Simple CSS + HTML combinations: same --- just save and open
- Standalone JavaScript: can run with `node filename.js` in terminal
- The full setup (npm, Node.js) is for multi-file projects with frameworks
- Claude will tell you what kind of project it's giving you

### How to Know Which Type You Have

**SCRIPT:**
> "So how do you know? Simple rule: if Claude gives you one or two files and says 'save this as something-dot-html,' you probably just need to save and open it. If Claude gives you a folder structure with package.json, multiple files, and mentions npm install, you need the full setup. When in doubt, ask Claude: 'Do I need to run npm install for this, or can I just open it in my browser?'"

**Keypoints:**
- One or two files + .html extension = just open in browser
- Folder structure + package.json = need npm install + npm run dev
- Claude usually tells you how to run it
- When in doubt: ask Claude

**Visual suggestions:**
- Side-by-side comparison: simple HTML file vs. full project structure
- On-screen text: "One file? Open it. Multiple files + package.json? npm install first."
- Decision tree graphic: "Does it have package.json? Yes = npm install. No = just open it."

---

## Section 5: Live Demo --- Running a Next.js Project (9:30 - 13:00)

### Setting the Scene

**SCRIPT:**
> "Let's put this all together with a real demo. I'm going to take a Next.js project that Claude generated and run it from scratch on my computer. Next.js is the same framework used to build the 02Ship platform you're learning on. This is what a real project setup looks like."

**Keypoints:**
- Real-world example using Next.js (same as 02Ship)
- Walk through every step at a beginner-friendly pace
- Show what success looks like and what to do if things go wrong

### Step-by-Step Walkthrough

**SCRIPT:**
> "Step one: I have the project files Claude gave me in a folder. I open that folder in VS Code. Step two: I open the terminal inside VS Code --- View, Terminal. Step three: I type npm install and press Enter. Now I wait. You can see the packages downloading. This might take a minute or two --- that's completely normal. Don't panic if it looks like a lot is happening."

**What to show on screen:**
- Open project folder in VS Code (File > Open Folder)
- Show the file structure briefly (point out package.json, src folder, etc.)
- Open terminal (View > Terminal)
- Type `npm install`
- Show the installation progress
- Wait for it to complete (don't fast-forward --- let beginners see the real pace)

**SCRIPT (continued):**
> "npm install is done. See the node_modules folder that appeared? That's all the downloaded dependencies. Now, step four: I type npm run dev and press Enter. The terminal says 'Ready on localhost:3000.' Step five: I open my browser, type localhost:3000, and... there it is. A full Next.js web application running right on my computer."

**What to show on screen:**
- Type `npm run dev`
- Show the "ready" message in terminal
- Open browser to localhost:3000
- Show the running application
- Navigate around the application to prove it works
- On-screen text: "Five steps: Open folder, Open terminal, npm install, npm run dev, Open browser"

### What If Something Goes Wrong?

**SCRIPT:**
> "Now, what happens if something doesn't work? Don't worry --- error messages are your friends, not your enemies. They tell you exactly what's wrong. For example, if you see 'node is not recognized,' that means Node.js isn't installed properly. If you see 'port 3000 already in use,' it means something else is using that port --- you can either close it or use a different port. And here's the best trick: if you get an error, copy the entire error message and paste it to Claude. Say: 'I got this error when trying to run my project. How do I fix it?' Claude is excellent at debugging."

**Keypoints:**
- Error messages are helpful, not scary
- Common errors: "node not recognized" = reinstall Node.js
- Common errors: "port in use" = close other servers or use different port
- Common errors: "module not found" = run `npm install` again
- Best debugging strategy: copy error, paste to Claude, ask for fix

**What to show on screen:**
- Show an example error message (if possible, trigger one deliberately)
- Show copying the error and pasting it into Claude
- Show Claude's debugging response
- On-screen text: "Error? Copy it. Paste it to Claude. Get the fix."

**Visual suggestions:**
- Keep this section encouraging --- errors are normal, not failures
- On-screen text: "Errors = Clues, not dead ends"

---

## Closing (13:00 - 14:00)

### Recap & Next Steps

**SCRIPT:**
> "Let's recap your new setup. You've got VS Code for editing code, a terminal for running commands, Node.js for powering web projects, and your browser for seeing the results. The workflow is: open the project, run npm install, run npm run dev, and check localhost:3000. And for simple HTML files, you can skip all of that and just double-click to open.
>
> Your development environment is ready. You've got the kitchen set up. Now in the next video, we're going to learn something that will make you feel much more comfortable with all of this: how to read code as a non-programmer. You don't need to become a coder --- but knowing how to look at code and understand the basics will give you the confidence to make changes and troubleshoot issues on your own.
>
> See you in the next video!"

**Keypoints:**
- Recap the four tools: VS Code, terminal, Node.js, browser
- Recap the workflow: open, npm install, npm run dev, browser
- Celebrate: their environment is ready
- Tease Video 3: reading code for non-programmers

**Visual suggestions:**
- Show your face (encouraging, celebratory)
- On-screen text: "Setup Complete! Next: Reading Code"
- End card with links to the next video and resources

---

## Key Talking Points Summary

**Essential messages to hit:**

1. **Only three tools needed** (text editor, terminal, browser --- plus Node.js as the "power outlet")
2. **You don't need to be a developer to run code** (just follow the recipe)
3. **npm install first, always** (download the ingredients before cooking)
4. **localhost:3000 is your private preview** (only you can see it)
5. **Not everything needs full setup** (simple HTML files just open in the browser)
6. **Error messages are clues, not failures** (copy, paste to Claude, get the fix)

---

## Production Notes

### Tone & Style
- **Calm, patient, and methodical** (setup videos can feel overwhelming --- be the antidote)
- **Step-by-step with no skips** (show every click, every keystroke)
- **Use analogies liberally** (kitchen, recipe, grocery store, power outlet)
- **Normalize errors** (they happen to everyone, even experienced developers)

### Common Beginner Concerns to Address
- "This feels really technical" --> It's just four things to install, and then you repeat the same steps every time
- "What if I break something?" --> You can't break your computer with npm install --- the worst case is you delete the folder and start over
- "Do I need to memorize these commands?" --> No, you'll look them up every time at first, and eventually they become muscle memory
- "I'm on Windows / Mac / Linux --- does it work the same?" --> Yes, with very minor differences (we'll note them as we go)

### Things to Avoid
- Skipping any installation step (beginners need to see every click)
- Using terminal commands without explaining what they do
- Fast-forwarding through npm install (let viewers see the real timing)
- Assuming viewers know what "terminal," "command line," or "dependencies" mean without explaining
- Making errors feel like the viewer did something wrong

---

## Visual Equipment & Setup Recommendations

**Camera setup:**
- Well-lit face (ring light or natural light)
- Clean background (or blurred)
- Eye level camera angle
- Consider picture-in-picture (your face in corner while screen recording)

**Screen recording:**
- Full screen showing VS Code with terminal open
- Large font size in both editor and terminal (viewers need to read every character)
- Zoom in on important UI elements (download buttons, version numbers)
- Show both Mac and Windows steps if possible, or note differences verbally
- Browser with localhost:3000 clearly visible in the address bar

**Editing notes:**
- Add on-screen text for every new command introduced
- Include timestamps in YouTube description for each tool section
- Add chapter markers for: VS Code, Terminal, Node.js, npm install, Live Demo
- Consider a downloadable "Setup Checklist" PDF linked in description
- Add callout annotations for common Windows vs. Mac differences

---

## Call-to-Action (End Card)

**Include:**
- "Next Video: Reading Code for Non-Programmers" (clickable link)
- "Join our Discord: https://discord.gg/btqaA3hzKp"
- "Download the setup checklist: [link to Lesson 4 page]"
- "Having install issues? Post in our Discord #setup-help channel!"

---

## Engagement Opportunities

**Questions to pose to viewers:**
- "Did everything install smoothly, or did you hit a snag? Let us know in the comments --- we might be able to help!"
- "Are you on Mac, Windows, or Linux? Drop your OS below so we can see what our community uses!"
- "What was the most surprising part of the setup process? Tell us in the comments!"

---

## Accessibility Notes

- **Captions:** Auto-generate and review for accuracy; technical terms like "npm," "localhost," and "Node.js" must be captioned correctly
- **Transcript:** Post full transcript on the lesson page, including all terminal commands
- **Pace:** Speak slowly and deliberately, especially when typing commands; pause after each step
- **Visuals:** Narrate every action on screen --- read terminal output aloud, describe what appears in the browser, explain each click

---

## Post-Production Checklist

- [ ] Video length: 14-15 minutes
- [ ] All key points covered
- [ ] Installation steps shown clearly (VS Code, Node.js)
- [ ] Live demo is slow and thorough
- [ ] Both simple (HTML) and full (Next.js) workflows demonstrated
- [ ] Error handling section included
- [ ] Captions added and reviewed
- [ ] Thumbnail created (text overlay: "Dev Setup Made Simple")
- [ ] YouTube title: "Setting Up Your Dev Environment (The Minimum) | 02Ship Claude Basics"
- [ ] Description includes: timestamps, download links (VS Code, Node.js), next video, Discord, setup checklist
- [ ] Tags: VS Code setup, Node.js install, beginner dev environment, run Claude code, npm tutorial, localhost explained
- [ ] Add to playlist: "02Ship Claude Basics - Lesson 4"
- [ ] Update lesson JSON with YouTube ID once uploaded

---

**This is the video that removes the biggest barrier for non-programmers: the setup. Go painfully slow. Show every click. Normalize every error. When they see their first project running at localhost:3000, they'll realize they can actually do this.**
