---
name: start-brief
description: "Create a standalone feature brief website — a polished, single-page Next.js app that communicates a completed feature to marketing, CX, and leadership teams."
---

# Start Brief

You are creating a standalone feature brief website — a polished, single-page Next.js app that communicates a completed feature to marketing, CX, and leadership teams. Think of it as a "feature launch page" that sells the value of what was built.

The reference for quality and structure is the GLD RCS brief at `gld-rcs.vercel.app` — a dark, premium, data-driven single-page site with phone mockups, comparison grids, revenue projections, and benefit cards. Your output should match or exceed that level of design craft.

## Step 1: Load the PRD

The PRD name is: $ARGUMENTS

**If no name provided:**
- Check `.claude/plans/` for completed PRDs (look for `## Status: Complete`)
- Also check `scripts/ares/tasks/` for `prd-*.md` files
- Present a list and wait for the user to pick one
- Stop if nothing is found: "No PRDs found. Run `/start-prd` first."

**If name provided:**
- Look for the PRD at `.claude/plans/{name}.md` or `scripts/ares/tasks/prd-{name}.md`
- If not found, tell the user and stop

Read the PRD thoroughly. Extract:
- **Feature name** and one-line summary
- **Key value propositions** — why this feature matters (for the audience, not developers)
- **User stories** — translate into real-world scenarios and use cases
- **Metrics / impact data** — any numbers, projections, benchmarks mentioned
- **Before/after contrast** — what changed from the old way to the new way
- **Technical capabilities** — features, integrations, channels involved

## Step 2: Interview for Brief Context

The PRD is written for engineers. A brief is written for stakeholders. You need to bridge that gap.

Ask the user these questions (adapt based on what the PRD already covers):

1. **Brand & audience**: "Who is the target audience for this brief? Any brand name, colors, or logo URL to incorporate?"
2. **Key metrics**: "Do you have specific numbers to highlight? (revenue impact, conversion rates, time saved, etc.) Even estimates are fine."
3. **Visual assets**: "Any mockups, screenshots, or product images to include? Provide file paths or URLs."
4. **Comparison angle**: "Is there a clear before/after or old-vs-new contrast to showcase?"
5. **Call to action**: "What should someone do after reading this? (schedule a demo, enable the feature, contact someone)"

If the user says "just use what's in the PRD" or similar, that's fine — infer reasonable defaults and move on. Don't block on perfect answers.

## Step 3: Scaffold the Next.js Project

Create a standalone Next.js app in the project root at `briefs/{feature-name}/`:

```bash
cd briefs/
bunx create-next-app@latest {feature-name} --ts --tailwind --app --src-dir --no-eslint --no-import-alias --use-bun
```

After scaffolding:
- Delete boilerplate: `src/app/page.tsx` content, default CSS, public assets
- Keep the Tailwind setup — you'll build on it

## Step 4: Design the Brief Page

**This is where you channel the frontend-design skill.** The page must be visually striking, not a generic template.

### Design Principles (from the GLD RCS reference)

- **Dark, premium aesthetic** — deep blacks (#0A0A0A), not gray. Rich accent colors derived from the brand.
- **Typography hierarchy** — Serif display font (like Playfair Display) for headlines, clean sans-serif (like DM Sans) for body, monospace (like JetBrains Mono) for data/numbers. Load via Google Fonts or next/font.
- **Data-forward** — Lead with metrics, not paragraphs. Big numbers with labels. Monospace for stats.
- **Subtle motion** — Staggered fade-up animations on scroll. CSS-only where possible. Not overdone.
- **Generous spacing** — Sections breathe. Content doesn't feel cramped.
- **SVG noise texture** — Subtle fractal noise overlay for depth (3-5% opacity).

But these are defaults — if the brand context calls for a light theme, editorial layout, or different aesthetic, follow that direction. The point is intentionality, not a rigid template.

### Section Library

Pick the sections that make sense for this feature. Not every brief needs all of them. Choose 4-6 from this menu:

**1. Hero**
- Feature name as large serif headline with gradient accent on key words
- One-line value proposition as subtitle
- 2-4 key stats in a grid (monospace numbers, descriptive labels)
- Optional: a "lift callout" box highlighting the primary impact metric

**2. Before/After Comparison**
- Side-by-side cards: old way (dimmed, X marks) vs new way (highlighted, check marks)
- Clear visual hierarchy — the "new" side should obviously win
- Works for: SMS→RCS, manual→automated, old UI→new UI, etc.

**3. Use Case Mockups**
- 2-6 cards in a responsive grid, each showing a specific scenario
- Each card: visual (phone mockup, screenshot, or illustration), title, description
- For messaging features: phone-frame mockups with conversation bubbles
- For UI features: browser-frame mockups or annotated screenshots
- For API/backend features: flow diagrams or data visualizations

**4. Revenue / Impact Projection**
- Sensitivity table showing baseline vs uplift scenarios
- Color-coded rows (green for positive impact)
- Monospace numbers, right-aligned
- Footnotes explaining methodology

**5. How It Works**
- 3-5 step flow with numbered steps or icons
- Brief description per step
- Optional: connecting lines or arrows between steps

**6. Benefits Grid**
- 3-4 cards with icon/emoji, bold title, short description
- "Why this works" framing — trust, speed, experience, etc.
- Equal-width cards in a responsive grid

**7. Timeline / Rollout Plan**
- Phases with dates and milestones
- Visual timeline or stacked cards
- Status indicators (completed, in progress, upcoming)

**8. Testimonials / Quotes**
- Pull quotes from stakeholders or customers
- Large quotation marks, italic serif text
- Attribution with name and role

### Implementation

Build the entire brief as a single `src/app/page.tsx` (or split into components in `src/components/` if complexity warrants it). Use:

- Tailwind CSS for layout and spacing
- CSS variables for the color system (define in `globals.css`)
- Google Fonts via `next/font/google` for typography
- Inline SVG for the noise texture overlay
- CSS `@keyframes` for entrance animations
- Responsive breakpoints: desktop (1300px container), tablet (1024px), mobile (768px, 420px)

The page should be fully static — no API calls, no client-side state, no interactivity beyond hover effects and scroll animations.

## Step 5: Add Visual Assets

If the user provided mockups or screenshots:
- Place them in `public/` and reference with next/image
- Wrap in device frames (phone or browser) using CSS

If no assets provided, create rich text-based mockups:
- Phone frames with conversation bubbles for messaging features
- Dashboard-style cards for analytics features
- Flow diagrams for process features
- Use CSS art — no placeholder images

## Step 6: Polish & Verify

1. Run the dev server: `cd briefs/{feature-name} && bun dev`
2. Check: Does the page look polished at desktop, tablet, and mobile widths?
3. Check: Are all sections rendering correctly? Any layout breaks?
4. Check: Is the content accurate to the PRD?
5. Check: Would a marketing/CX person understand this without engineering context?

Fix any issues before presenting to the user.

## Step 7: Present to User

Tell the user:

> **Brief created** at `briefs/{feature-name}/`
>
> Run `cd briefs/{feature-name} && bun dev` to preview locally.
>
> **Sections included**: {list the sections you chose and why}
>
> To deploy: `cd briefs/{feature-name} && bunx vercel`
>
> Want me to adjust the design, content, or add/remove sections?

## Notes

- This is a communication tool, not a technical document. Write for stakeholders who don't read code.
- Every piece of text should answer "so what?" — don't describe the feature, sell its impact.
- When in doubt about content, lean on the PRD's user stories and translate them into business value.
- The brief should be self-contained — someone seeing it for the first time should understand the feature's value in 30 seconds.
