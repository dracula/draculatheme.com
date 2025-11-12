# Agents Rules

## General Guidelines

- Keep all code in English.
- Always maintain consistent code style, structure, and patterns throughout the codebase.

## Naming Conventions

### Files and Folders

- Always use kebab-case for file and folder names.
- Never use abbreviations. Prefer fully spelt names everywhere.

### Code Identifiers

- Always use camelCase for variables, functions, props, state, components, and CSS class names.
- Never use UPPER_CASE except for genuine constants.
- Never use abbreviations in any identifier.

## TypeScript and Code Style

- Keep functions simple with single responsibility.
- Always prefer arrow functions.
- Enable strict typing and never use `any`.
- Prefer precise, explicit types.
- Use named exports. Only use default exports when strictly necessary (e.g., Next.js page components).

## State Management

- Group related states together.
- Avoid contradictory, redundant, or duplicated states.
- Avoid deeply nested state structures.

## JSX and HTML

### Syntax Rules

- Always use double quotes for JSX attributes.
- Use semantic HTML5 elements.
- Use WAI-ARIA attributes for accessibility.
- Never omit closing tags.
- Use sentence-casing for copy text.
- Avoid superfluous parent elements. Use fragments when needed.

### Boolean Attributes

Don't add values to boolean attributes:

```jsx
<input type="text" disabled />
```

### Attribute Order

1. `key`
2. `ref`
3. `className`
4. `id`
5. `data-[name]`
6. Event handlers (`onClick`, `onChange`, etc.)
7. Other props (`src`, `type`, `href`, `value`, etc.)
8. `aria-[name]`, `role`

### ClassName Value Order

1. Layout and positioning classes
2. Component classes
3. State classes
4. Utility classes

## CSS and Styling

### Naming

- CSS class names must be semantic and avoid redundancy.
- Example: `.card .cardTitle` should be `.card .title`.
- Use camelCase for CSS Module class names.

### Values and Units

- Use CSS variables for colors, spacing, and design tokens.
- Always use multiples of 6 for spacing and sizing values unless explicitly specified otherwise.
- Examples: `.375rem`, `.75rem`, `1.125rem`, `1.5rem`, `1.875rem`, `2.25rem`.
- Avoid units for zero values.
- Prefix decimal values with a leading zero (e.g., `0.5` not `.5`).

### Syntax Formatting

- Use `//` for comments in preprocessors.
- Keep individual selectors on separate lines when grouping.
- Include one space before opening braces.
- Place closing braces on new lines.
- Include one space after `:` in declarations.
- Each declaration on its own line.
- End all declarations with semicolons.
- Include spaces after commas in property values and color functions.
- Quote attribute values in selectors.

### Shorthand Properties

Avoid shorthand unless setting all available values. Write out individual properties for:

- `padding`
- `margin`
- `font`
- `background`
- `border`
- `border-radius`

Example:

```css
.element {
  margin-bottom: 0.75rem;
  border-top-right-radius: 0.375rem;
  border-top-left-radius: 0.375rem;
  background-image: url("image.jpg");
  background-color: var(--colorRed);
}
```

## Animations and Motion

### Animation Basics

- Default to `ease-out` for most animations.
- Only use `ease-out`, `ease`, or `linear` as built-in easings.
- Animation durations must not exceed 1000ms unless clearly illustrative.
- Most UI animations should be 200ms to 300ms.
- Always define durations in milliseconds (`ms`).

### Properties to Animate

- Prefer animating `opacity` and `transform`.
- Avoid animating layout properties (`top`, `left`, `right`, `bottom`, `width`, `height`) unless strongly justified.

### Motion Principles

- Elements should animate from the trigger position.
- Adjust `transform-origin` according to trigger position.
- Deactivate `transform` animations under `prefers-reduced-motion` media query.

### Performance

- Use `will-change` sparingly and only for: `transform`, `opacity`, `clip-path`, `filter`.
- Remove `will-change` after animation completes.

### Motion Libraries (Framer Motion)

- Use `transform` instead of `x` or `y` when hardware acceleration is required.
- Default to spring animations.
- Avoid bouncy springs except for drag gestures.

### Animation Restrictions

- Never animate drag gestures using CSS variables.
- Never animate blur values higher than 1.125rem.
