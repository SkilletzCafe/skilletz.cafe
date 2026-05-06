# Frontend guide

## Stack

- Next.js
- TypeScript
- Static export for GitHub Pages
- Mobile-first frontend

## TypeScript and React

- Use functional components with hooks
- Keep components focused and single-responsibility
- Prefer explicit function parameter and return types when they improve clarity
- Prefer interfaces for object-shaped contracts where practical
- Extract reusable logic into hooks/utilities when repetition appears
- Use local state by default; introduce context/reducers only when complexity justifies it

## Semantics and naming

Do not reuse components, CSS classes, or variable names just because they look visually similar. Reuse should follow meaning, not coincidence.

Good examples:

- `menuItemImage`
- `profileImage`
- `blogCard`
- `menuCard`

## Error handling

- Handle async failures with clear user-facing fallbacks where relevant
- Avoid silent failures
- Keep loading, empty, and error states explicit

## Accessibility

- Test keyboard navigation for interactive UI
- Preserve semantic HTML and useful ARIA only where needed
- Verify color contrast
- Ensure content stays usable when images fail to load

## Mobile and layout

- Build mobile-first
- Test at minimum widths around 320px, then tablet and desktop
- Avoid horizontal scrolling unless the UI explicitly requires it
- Use `box-sizing: border-box` and responsive width constraints consistently

### Horizontal scroll areas

When a horizontal scroller is intentional:

- use `flex: 0 0 auto` on items
- keep outer layout simple
- size the scroll region deliberately instead of relying on accidental overflow

## Images and placeholders

- Provide fallbacks for missing images
- Prefer CSS-based placeholders over random placeholder image assets when practical
- Maintain stable aspect ratios
- Apply loading transitions to the image, not the whole card/container
- Content must remain readable even when the image is absent

## Typography

- Use project font utilities/config instead of ad hoc font-family declarations
- Use Margarine sparingly for headings and brand-forward moments
- Use Geist for body copy and general UI text
- Prioritize readability on mobile

## Testing and validation

For frontend changes, run the smallest useful set of checks:

- `npm run lint`
- targeted local QA in dev mode when behavior changes
- `make build` before review/merge
