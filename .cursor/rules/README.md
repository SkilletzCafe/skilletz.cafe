# Cursor Rules

This directory contains rules that guide Cursor's AI in understanding and maintaining our codebase.

## Files

- `general.mdc` - General project rules and coding standards
- `mobile.mdc` - Mobile development guidelines and patterns
- `learnings.mdc` - Project learnings and best practices

## File Types

- `*.mdc` - Source rule files (version controlled)
- `*.mdc.txt` - Working copies for editing

## Workflow

To edit rules:

1. Create working copies:

```bash
make init-rules
```

2. Edit the `.mdc.txt` files in this directory

3. Save changes back to source:

```bash
make save-rules
```

## Rule Types

- `general.mdc` - Applies to all files
- `mobile.mdc` - Applies to `*.tsx` and `*.css` files
- `learnings.mdc` - Applies to all files, contains project insights
