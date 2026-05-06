# Project learnings

Capture durable, repo-specific lessons here when they would help future contributors avoid repeating mistakes.

## Mobile layout issues

- Menu/content containers should respect mobile viewport width
- Responsive image containers should preserve aspect ratio without relying on fixed heights
- Prefer CSS placeholders to make missing assets obvious without breaking layout

## Component reuse

- Separate components that serve different semantic roles even if they look visually similar
- Avoid style-sharing that creates coupling between unrelated features

## Image handling

- Missing images should not hide surrounding content
- Loading effects belong on the image element, not the full card/container
- Placeholder states should remain visible when an image is permanently missing

## Documentation rule

When you learn something durable about this repo, add it here or to a more specific `agent-docs/*.md` file. Keep it concise and practical.
