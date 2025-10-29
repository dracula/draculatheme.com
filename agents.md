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

- Default to `ease-out` for most animations.
- Do not use built-in CSS easings unless it is `ease` or `linear`. Do not use other built-ins.
- Animation durations must never exceed `600ms` unless the animation is clearly illustrative.
- Most UI animations should be around `180ms` to `300ms`.
- Always define animation durations in `ms`.

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

- When using `framer-motion`/`motion/react`, use `transform` instead of `x` or `y` when hardware acceleration is required.
- Default to spring animations when using `framer-motion`/`motion/react`.
- Avoid bouncy spring animations unless working with drag gestures.
