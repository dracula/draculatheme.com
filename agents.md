# Agents Rules

## Naming and Files

- File and folder names must always use kebab-case.
- All code identifiers (variables, functions, props, state, components) must use camelCase.
- Never use abbreviations in any part of the codebase. Prefer fully spelt names everywhere: file names, folder names, variables, functions, props, state, components, CSS classes, data attributes, and any other identifier.

## Code Style and Simplicity

- Keep functions simple and not intricate. Prefer small, single-responsibility functions.
- Always prefer arrow functions.
- Never use weak typing. Enable strict typing and avoid `any`. Prefer precise, explicit types.

## Modules and Exports

- Never use default exports unless strictly necessary. A valid necessity example is page components in Next.js. Otherwise, use named exports.

## State Management

- Group related states together.
- Avoid contradictions in states.
- Avoid redundant state.
- Avoid duplication in states.
- Avoid deeply nested state.

## JSX and HTML

### Syntax

- Always use double quotes for JSX attributes.
- Use semantic HTML5 elements.
- Use WAI-ARIA attributes to promote accessibility.
- Don't omit closing tags.
- Copy should be written in sentence-casing.

### Attribute Order

JSX attributes should be listed in the following order:

1. `key` (if applicable)
2. `ref` (if applicable)
3. `className`
4. `id`
5. `data-[name]`
6. Event handlers (`onClick`, `onChange`, etc.)
7. Other props (`src`, `type`, `href`, `value`, etc.)
8. `aria-[name]`, `role`

Order `className` values this way:

1. Layout and positioning classes
2. Component classes
3. State classes
4. Utility classes

### Boolean Attributes

Don't add a value to boolean attributes.

```jsx
<input type="text" disabled />
```

### Reducing Markup

Avoid superfluous parent elements when possible. Use fragments when needed.

```jsx
// Avoid
<span className="avatar">
  <img src="…" alt="User avatar" />
</span>

// Better
<img className="avatar" src="…" alt="User avatar" />

// Use fragments when returning multiple elements
<>
  <Header />
  <MainContent />
  <Footer />
</>
```

## CSS Modules and Styling

### Naming

- CSS class names must be semantic and must not repeat meaning across selectors.
  - Example: `.card .cardTitle` must be `.card .title`.
- Use camelCase for CSS Module class names to match JavaScript conventions.

### Syntax

- Use CSS variables for colors, spacing, and other design tokens.
- Use `//` for comments in preprocessors.
- Keep individual selectors on their own line when grouping.
- Include one space before the opening brace of declaration blocks.
- Place closing braces on a new line.
- Include one space after `:` for each declaration.
- Each declaration should appear on its own line.
- End all declarations with a semicolon.
- Comma-separated property values should include a space after each comma.
- Include spaces after commas within `rgb()`, `rgba()`, `hsl()`, `hsla()`, or `rect()` values.
- Prefix property values or color parameters with a leading zero.
- Quote attribute values in selectors.
- Avoid specifying units for zero values.

### Shorthand Notation

Avoid using shorthand unless explicitly setting all available values:

```css
.element {
  margin-bottom: 0.75rem;
  border-top-right-radius: 0.375rem;
  border-top-left-radius: 0.375rem;
  background-image: url("image.jpg");
  background-color: var(--color-red);
}
```

Properties to avoid as shorthand:

- `padding`
- `margin`
- `font`
- `background`
- `border`
- `border-radius`

## Animations: Defaults and Limits

- Default to `ease-out` for most animations.
- Only use `ease` or `linear` as built-in CSS easings.
- Animation durations must never exceed `1000ms` unless the animation is clearly illustrative.
- Most UI animations should be around `200ms` to `300ms`.
- Always define animation durations in `ms`.

## Motion, Triggers, and Reduced Motion

- Elements should animate from the trigger. Adjust `transform-origin` according to the trigger position.
- If `transform` is used in an animation, deactivate it under the `prefers-reduced-motion` media query.

## Properties to Animate

- Prefer animating `opacity` and `transform` whenever possible.
- Do not animate layout properties such as `top`, `left`, `right`, `bottom`, `width`, or `height` unless there is a strong, justified reason.

## Things to Avoid

- Do not animate drag gestures using CSS variables.
- Do not animate blur values higher than `1.25rem`.

## Performance

- Use `will-change` sparingly and only for: `transform`, `opacity`, `clip-path`, `filter`.
- Remove `will-change` after animation completes.

## Motion Libraries

- When using `framer-motion`/`motion/react`, use `transform` instead of `x` or `y` when hardware acceleration is required.
- Default to spring animations when using `framer-motion`/`motion/react`.
- Avoid bouncy spring animations unless working with drag gestures.
