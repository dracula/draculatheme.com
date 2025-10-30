# Agents Rules

## Naming and Files

- Always use camelCase for all code identifiers.
- In HTML, always use kebab-case for attributes, element ids, and class names.
- File and folder names must always use kebab-case.
- Never use abbreviations in any part of the code. Prefer fully spelled names.

## Code Style and Simplicity

- Keep functions simple and not intricate. Prefer small, single-responsibility functions.
- Always prefer arrow functions.
- Never use weak typing. Enable strict typing and avoid `any`. Prefer precise, explicit types.

## Modules and Exports

- Never use default exports unless strictly necessary. A valid necessity example is page components in Next.js. Otherwise, use named exports.

## CSS and Semantics

- CSS class names must be semantic and must not repeat meaning across selectors.
  - Example: `.card.card-title` must be `.card.title`.

## Animations: Defaults and Limits

- Default to `var(--ease-fluid)` for most animations.
- Always use easing variables: `var(--ease-fluid)`, `var(--ease-sharp)`, `var(--ease-elastic)`, or `var(--ease-impact)`.
- Never use built-in CSS easings (`ease`, `ease-in`, `ease-out`, `ease-in-out`).
- For CSS `transition` durations:
  - Always use duration variables: `var(--duration-fast)`, `var(--duration-standard)`, or `var(--duration-slow)`.
- For CSS `animation` durations:
  - May use `linear` easing if needed.
  - May use specific duration values in `ms`.
  - Duration must never exceed `600ms` unless the animation is clearly illustrative or decorative.
- Always define durations in `ms`, never in `s`.

## Motion, Triggers, and Reduced Motion

- Elements should animate from the trigger. If a dropdown or popover opens, it must animate from the button. Adjust `transform-origin` according to the trigger position.
- If `transform` is used in an animation, disable it under the `prefers-reduced-motion` media query.

## Properties to Animate

- Prefer animating `opacity` and `transform` whenever possible.
- Do not animate layout properties such as `top`, `left`, `right`, `bottom`, `width`, or `height` to move elements unless there is a strong, justified reason.

## Things to Avoid

- Do not animate drag gestures using CSS variables.
- Do not animate blur values higher than `1.25rem`.

## Performance

- Use `will-change` sparingly and only for: `transform`, `opacity`, `clip-path`, `filter`.

## Motion Libraries

- When using [`framer-motion`/`motion/react`](https://motion.dev/docs/react), use `transform` instead of `x` or `y` when hardware acceleration is required.
- Default to spring animations when using `framer-motion`/`motion/react`.
- Avoid bouncy spring animations unless working with drag gestures.
