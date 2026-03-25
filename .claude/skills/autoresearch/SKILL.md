---
name: autoresearch
description: "Autonomously optimize any Claude Code skill by running it repeatedly, scoring outputs against binary evals, mutating the prompt, and keeping improvements. Based on Karpathy's autoresearch methodology. Use when: optimize this skill, improve this skill, run autoresearch on, make this skill better, self-improve skill, benchmark skill, eval my skill, run evals on. Outputs: an improved SKILL.md, a results log, and a changelog of every mutation tried."
user-invocable: true
---

# Autoresearch for Skills

Autonomous experimentation loop that optimizes skill prompts. Run a skill repeatedly, score outputs against binary evals, mutate the prompt, keep improvements, discard the rest.

## Before Starting: Gather Context

**STOP. Confirm all fields with the user before running any experiments.**

1. **Target skill** — Exact path to SKILL.md
2. **Test inputs** — 3-5 prompts/scenarios covering different use cases (avoid overfitting)
3. **Eval criteria** — 3-6 binary yes/no checks. See [references/eval-guide.md](references/eval-guide.md)
4. **Runs per experiment** — Default: 5
5. **Budget cap** — Optional max experiment cycles. Default: no cap

## Step 1: Read the Skill

Read the full SKILL.md and any linked `references/` files. Understand the skill's core job, process, output format, and existing quality checks.

## Step 2: Build the Eval Suite

Format each eval from the user's criteria:

```
EVAL [N]: [Short name]
Question: [Yes/no question]
Pass: [What "yes" looks like]
Fail: [What triggers "no"]
```

Max score = `[number of evals] x [runs per experiment]`.

For guidance on writing effective evals, see [references/eval-guide.md](references/eval-guide.md).

## Step 3: Set Up Working Directory

Create `autoresearch-[skill-name]/` inside the skill's folder with:

```
autoresearch-[skill-name]/
├── dashboard.html       # copy from assets/dashboard-template.html
├── results.json         # data powering the dashboard
├── results.tsv          # tab-separated score log
├── changelog.md         # mutation log
└── SKILL.md.baseline    # backup of original skill
```

**Dashboard:** Copy [assets/dashboard-template.html](assets/dashboard-template.html) to `dashboard.html`. Open it: `open dashboard.html`. It auto-refreshes from results.json every 10 seconds.

**results.json schema:**

```json
{
  "skill_name": "[name]",
  "status": "running|complete",
  "current_experiment": 0,
  "baseline_score": 0.0,
  "best_score": 0.0,
  "experiments": [
    { "id": 0, "score": 14, "max_score": 20, "pass_rate": 70.0, "status": "baseline|keep|discard", "description": "..." }
  ],
  "eval_breakdown": [
    { "name": "Eval name", "pass_count": 8, "total": 10 }
  ]
}
```

**results.tsv format:**

```
experiment	score	max_score	pass_rate	status	description
0	14	20	70.0%	baseline	original skill — no changes
```

## Step 4: Establish Baseline

Run the skill AS-IS (experiment #0). Score every output against every eval. Record baseline in results.tsv and results.json.

After baseline, confirm score with user. If already 90%+, ask if they want to continue.

## Step 5: Run the Experiment Loop

Run autonomously until stopped. Each cycle:

1. **Analyze failures** — Which evals fail most? What pattern?
2. **Hypothesize** — Pick ONE thing to change
3. **Mutate** — Edit SKILL.md with one targeted change
4. **Run** — Execute skill [N] times with same test inputs
5. **Score** — Run outputs through all evals
6. **Keep or discard:**
   - Improved -> KEEP (new baseline)
   - Same or worse -> DISCARD (revert SKILL.md)
7. **Log** — Update results.tsv, results.json, and changelog.md
8. **Repeat**

**Mutation guidelines:**
- One change per cycle (isolate what helps)
- Good: specific instructions for common failures, reworded ambiguities, anti-patterns, moved priority, added examples, removed over-optimizing rules
- Bad: full rewrites, 10 rules at once, vague additions

**Stop conditions:**
- User stops you
- Budget cap hit
- 95%+ pass rate for 3 consecutive experiments

**If stuck:** Re-read failing outputs. Combine near-miss mutations. Try removing instead of adding.

## Step 6: Changelog

Append to `changelog.md` after each experiment:

```markdown
## Experiment [N] — [keep/discard]

**Score:** [X]/[max] ([percent]%)
**Change:** [One sentence]
**Reasoning:** [Why expected to help]
**Result:** [Which evals improved/declined]
**Failing outputs:** [What still fails]
```

## Step 7: Deliver Results

Present: score summary (baseline -> final), total experiments, keep rate, top 3 changes, remaining failure patterns, location of artifacts.

## Example

Diagram-generator skill, 4 evals, 10 runs/experiment (max score 40):
- **Baseline:** 32/40 (80%) — numbered steps, bright colors, illegible text
- **Exp 1 KEEP (87.5%):** Added anti-numbering rule
- **Exp 2 DISCARD (85%):** Font size rule hurt color compliance
- **Exp 3 KEEP (92.5%):** Specific hex codes replaced vague "pastel"
- **Exp 4 DISCARD (92.5%):** Anti-neon rule redundant with hex codes
- **Exp 5 KEEP (97.5%):** Added worked example with correct formatting
- **Result:** 80% -> 97.5%, 3 kept / 2 discarded
