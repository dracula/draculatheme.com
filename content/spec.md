# Dracula Theme Specification

Official syntax highlighting and design specification for the Dracula Theme ecosystem.

## Overview

Dracula is a comprehensive dark/light color scheme designed for code editors, terminal emulators, and applications across multiple platforms. The project delivers a unified visual experience that minimizes context switching and enhances productivity.

**Available Variants:**

- **Classic:** Original dark theme;
- **Alucard:** Complementary light theme.

## Color Palette

### Classic (Dark Theme)

| Token            | Hex       | RGB           | HSL             | Usage                        |
| ---------------- | --------- | ------------- | --------------- | ---------------------------- |
| **Background**   | `#282A36` | 40, 42, 54    | 231°, 15%, 18%  | Main background              |
| **Current Line** | `#44475A` | 68, 71, 90    | 232°, 14%, 31%  | Line highlight               |
| **Selection**    | `#44475A` | 68, 71, 90    | 232°, 14%, 31%  | Text selection               |
| **Foreground**   | `#F8F8F2` | 248, 248, 242 | 60°, 30%, 96%   | Default text                 |
| **Comment**      | `#6272A4` | 98, 114, 164  | 225°, 27%, 51%  | Comments, disabled code      |
| **Red**          | `#FF5555` | 255, 85, 85   | 0°, 100%, 67%   | Errors, warnings, deletion   |
| **Orange**       | `#FFB86C` | 255, 184, 108 | 31°, 100%, 71%  | Numbers, constants, booleans |
| **Yellow**       | `#F1FA8C` | 241, 250, 140 | 65°, 92%, 76%   | Functions, methods           |
| **Green**        | `#50FA7B` | 80, 250, 123  | 135°, 94%, 65%  | Strings, inherited classes   |
| **Cyan**         | `#8BE9FD` | 139, 233, 253 | 191°, 97%, 77%  | Support functions, regex     |
| **Purple**       | `#BD93F9` | 189, 147, 249 | 265°, 89%, 78%  | Classes, types, variables    |
| **Pink**         | `#FF79C6` | 255, 121, 198 | 326°, 100%, 74% | Keywords, storage types      |

### Alucard (Light Theme)

| Token            | Hex       | RGB           | HSL            | Usage                        |
| ---------------- | --------- | ------------- | -------------- | ---------------------------- |
| **Background**   | `#FFFBEB` | 255, 251, 235 | 48°, 100%, 96% | Main background              |
| **Current Line** | `#6C664B` | 108, 102, 75  | 49°, 18%, 36%  | Line highlight               |
| **Selection**    | `#CFCFDE` | 207, 207, 222 | 240°, 18%, 84% | Text selection               |
| **Foreground**   | `#1F1F1F` | 31, 31, 31    | 0°, 0%, 12%    | Default text                 |
| **Comment**      | `#6C664B` | 108, 102, 75  | 49°, 18%, 36%  | Comments, disabled code      |
| **Red**          | `#CB3A2A` | 203, 58, 42   | 6°, 66%, 48%   | Errors, warnings, deletion   |
| **Orange**       | `#A34D14` | 163, 77, 20   | 24°, 78%, 36%  | Numbers, constants, booleans |
| **Yellow**       | `#846E15` | 132, 110, 21  | 48°, 73%, 30%  | Functions, methods           |
| **Green**        | `#14710A` | 20, 113, 10   | 114°, 84%, 24% | Strings, inherited classes   |
| **Cyan**         | `#036A96` | 3, 106, 150   | 198°, 96%, 30% | Support functions, regex     |
| **Purple**       | `#644AC9` | 100, 74, 201  | 252°, 54%, 54% | Classes, types, variables    |
| **Pink**         | `#A3144D` | 163, 20, 77   | 336°, 78%, 36% | Keywords, storage types      |

## ANSI Color Palette

For terminal applications, Dracula also defines ANSI colors.

**Classic:**

| ANSI Token            | Hex Code  | RGB           |
| --------------------- | --------- | ------------- |
| **AnsiBlack**         | `#21222C` | 33, 34, 44    |
| **AnsiRed**           | `#FF5555` | 255, 85, 85   |
| **AnsiGreen**         | `#50FA7B` | 80, 250, 123  |
| **AnsiYellow**        | `#F1FA8C` | 241, 250, 140 |
| **AnsiBlue**          | `#BD93F9` | 189, 147, 249 |
| **AnsiMagenta**       | `#FF79C6` | 255, 121, 198 |
| **AnsiCyan**          | `#8BE9FD` | 139, 233, 253 |
| **AnsiWhite**         | `#F8F8F2` | 248, 248, 242 |
| **AnsiBrightBlack**   | `#6272A4` | 98, 114, 164  |
| **AnsiBrightRed**     | `#FF6E6E` | 255, 110, 110 |
| **AnsiBrightGreen**   | `#69FF94` | 105, 255, 148 |
| **AnsiBrightYellow**  | `#FFFFA5` | 255, 255, 165 |
| **AnsiBrightBlue**    | `#D6ACFF` | 214, 172, 255 |
| **AnsiBrightMagenta** | `#FF92DF` | 255, 146, 223 |
| **AnsiBrightCyan**    | `#A4FFFF` | 164, 255, 255 |
| **AnsiBrightWhite**   | `#FFFFFF` | 255, 255, 255 |

**Alucard:**

| ANSI Token            | Hex Code  | RGB           |
| --------------------- | --------- | ------------- |
| **AnsiBlack**         | `#FFFBEB` | 255, 251, 235 |
| **AnsiRed**           | `#CB3A2A` | 203, 58, 42   |
| **AnsiGreen**         | `#14710A` | 20, 113, 10   |
| **AnsiYellow**        | `#846E15` | 132, 110, 21  |
| **AnsiBlue**          | `#644AC9` | 100, 74, 201  |
| **AnsiMagenta**       | `#A3144D` | 163, 20, 77   |
| **AnsiCyan**          | `#036A96` | 3, 106, 150   |
| **AnsiWhite**         | `#1F1F1F` | 31, 31, 31    |
| **AnsiBrightBlack**   | `#6C664B` | 108, 102, 75  |
| **AnsiBrightRed**     | `#D74C3D` | 215, 76, 61   |
| **AnsiBrightGreen**   | `#198D0C` | 25, 141, 12   |
| **AnsiBrightYellow**  | `#9E841A` | 158, 132, 26  |
| **AnsiBrightBlue**    | `#7862D0` | 120, 98, 208  |
| **AnsiBrightMagenta** | `#BF185A` | 191, 24, 90   |
| **AnsiBrightCyan**    | `#047FB4` | 4, 127, 180   |
| **AnsiBrightWhite**   | `#2C2B31` | 44, 43, 49    |

## UI Color Palette

### Classic (Dark Theme)

| Context                           | Hex       | RGB        | HSL            |
| --------------------------------- | --------- | ---------- | -------------- |
| **Floating interactive elements** | `#343746` | 52, 55, 70 | 225°, 15%, 24% |
| **Background Lighter**            | `#424450` | 66, 68, 80 | 231°, 10%, 29% |
| **Background Light**              | `#343746` | 52, 55, 70 | 225°, 15%, 24% |
| **Background Dark**               | `#21222C` | 33, 34, 44 | 235°, 14%, 15% |
| **Background Darker**             | `#191A21` | 25, 26, 33 | 232°, 14%, 11% |

### Alucard (Light Theme)

| Context                           | Hex       | RGB           | HSL           |
| --------------------------------- | --------- | ------------- | ------------- |
| **Floating interactive elements** | `#EFEDDC` | 239, 237, 220 | 54°, 37%, 90% |
| **Background Lighter**            | `#ECE9DF` | 236, 233, 223 | 46°, 25%, 90% |
| **Background Light**              | `#DEDCCF` | 222, 220, 207 | 52°, 19%, 84% |
| **Background Dark**               | `#CECCC0` | 206, 204, 192 | 51°, 13%, 78% |
| **Background Darker**             | `#BCBAB3` | 188, 186, 179 | 47°, 6%, 72%  |

### Functional Colors

UI-specific colors for interactive elements, borders, and indicators. **Do not use in editor or terminal applications.**

| Token                 | Hex       | RGB          | HSL             | Usage                    |
| --------------------- | --------- | ------------ | --------------- | ------------------------ |
| **Functional Red**    | `#DE5735` | 222, 87, 53  | 12°, 71%, 54%   | Critical actions, alerts |
| **Functional Orange** | `#A39514` | 163, 149, 20 | 54°, 78%, 36%   | Warnings, notifications  |
| **Functional Green**  | `#089108` | 8, 145, 8    | 120°, 90%, 30%  | Success states           |
| **Functional Cyan**   | `#0081D6` | 0, 129, 214  | 204°, 100%, 42% | Information, links       |
| **Functional Purple** | `#815CD6` | 129, 92, 214 | 258°, 61%, 60%  | Focus indicators         |

## Syntax Highlighting Rules

### Token Classification

Following _TextMate_ scoping conventions for consistent highlighting across editors.

#### Primary Tokens

**Keywords & Storage** → `Pink`

```
language keywords: if, else, return, function, class
storage modifiers: static, public, private, const, let, var
control flow: try, catch, throw, break, continue
```

**Functions & Methods** → `Yellow`

```
function declarations and calls
method invocations
built-in functions
```

**Classes & Types** → `Purple`

```
class names and constructors
type annotations: int, string, boolean
interfaces and enums
generic type parameters
```

**Strings & Text** → `Green`

```
string literals: "text", 'text', `template`
markup text content
attribute values in HTML/XML
escape sequences
```

**Numbers & Constants** → `Orange`

```
numeric literals: 42, 3.14, 0xFF, 1e5
boolean values: true, false
language constants: null, undefined, NaN
```

**Comments** → `Comment`

```
single-line: //, #, --
multi-line: /* */, <!-- -->
documentation blocks
annotations and decorators
```

**Support & Built-ins** → `Cyan`

```
built-in classes and functions
regular expressions
CSS properties and units
HTML/XML tag and attribute names
library functions
```

**Variables & Identifiers** → `Foreground`

```
variable names and parameters
object properties
default text content
```

**Errors & Warnings** → `Red`

```
syntax errors
deprecated code
invalid tokens
diff deletions
```

### Styling Modifiers

- **Italic**: Comments, type parameters, documentation;
- **Bold**: Strong emphasis (use sparingly);
- **Underline**: Links, misspelled words.

### Language-Specific Examples

#### JavaScript/TypeScript

```javascript
/**
 * @param {string} foo - Some string parameter.
// ^^^^^^ --------------------------------------- Pink
//        ^^^^^^^^ ------------------------------ Cyan Italic
//                 ^^^ -------------------------- Orange Italic
//                     >* ----------------------- Comment
 */
```

#### CSS

```css
/* Pink - White */
body {
  /* Cyan - Pink - Purple - White */
  background: #000;
}

/* Green - White */
#dracula {
  /* Cyan - Pink - Purple - White */
  opacity: 0;
  display: none;
  visibility: hidden;
  /* Cyan - Pink - Yellow - White */
  font-family: "Transylvania";
  height: calc(var(--deathDate) - var(--birthDate));
}
```

### Special Rules

1. **Braces and Parentheses**: Should match the foreground color of the currently scoped position:

   - `Purple` for headings;
   - `Foreground` for regular text.

2. **Instance Reserved Words**: Words that interact with the instance (this, self, super) should be highlighted consistently;

3. **Generic Templates**: Generic type declarations should use `Orange` Italic.

## Implementation Guidelines

### Accessibility Standards

- Maintain **4.5:1 minimum contrast ratio** (WCAG 2.1 Level AA);
- Ensure color is not the sole means of conveying information;
- Test with common color vision deficiencies.

### Consistency Requirements

1. **Priority Order**: Follow token classification hierarchy;
2. **Fallback Handling**: Use foreground color for unrecognized tokens;
3. **Semantic Consistency**: Same meaning = same color across languages;
4. **Reference Implementation**: [dracula/cursor](https://github.com/dracula/cursor).

### Testing Methodology

Use the standard test snippet to validate implementations:

```javascript
/**
 * Once upon a time...
 */
class Vampire {
  constructor(props) {
    this.location = props.location;
    this.birthDate = props.birthDate;
    this.deathDate = props.deathDate;
    this.weaknesses = props.weaknesses;
  }

  get age() {
    return this.calcAge();
  }

  calcAge() {
    return this.deathDate - this.birthDate;
  }
}

// ...there was a guy named Vlad
const Dracula = new Vampire({
  location: "Transylvania",
  birthDate: 1428,
  deathDate: 1476,
  weaknesses: ["Sunlight", "Garlic"]
});
```

> Our [official Template](https://github.com/dracula/template) for submissions includes a [sample folder](https://github.com/dracula/template/tree/main/sample) containing numerous code examples in various languages to assist with theme development.

## UI Design Guidelines

### Visual Hierarchy

Apply colors based on functional importance and user interaction patterns:

- **High Priority**: Interactive elements, errors, primary actions;
- **Medium Priority**: Secondary content, navigation, labels;
- **Low Priority**: Decorative elements, dividers, backgrounds.

### Component Guidelines

**Borders and Separators**

- Subtle borders: Use `Current Line` color;
- Interactive borders: Use functional colors;
- Focus rings: `Functional Purple` or appropriate accent.

**Shadows and Depth**

- Shadow color should harmonize with background;
- Avoid shadows darker than supporting surface;
- Use elevation sparingly to maintain theme coherence.

**State Indicators**

- Success: `Functional Green`;
- Warning: `Functional Orange`;
- Error: `Functional Red`;
- Info: `Functional Cyan`.

## Community and Maintenance

**Core Team:**

- **Zeno Rocha** (Creator);
- **Lucas de França** (Maintainer).

> Special thanks to [Derek Sifford](https://github.com/dsifford), creator of the first version of this specification on May 28, 2017.

**Resources:**

- GitHub: [github.com/dracula](https://github.com/dracula);
- Template: [github.com/dracula/template](https://github.com/dracula/template);
- Samples: [github.com/dracula/template/tree/main/sample](https://github.com/dracula/template/tree/main/sample).

## Contributing

> "We learn big things from small experiences" - **Bram Stoker**

Dracula Theme is an open-source project driven by and for the community. Most apps that support the theme are contributions from our community.

As much as the team is responsible for the core theme and wants to support all available applications, we can only do some of it ourselves.

That's why the community is essential for this project to keep evolving.

### Creating New Implementations

1. **Fork the template repository**

   ```bash
   git clone https://github.com/dracula/template.git
   ```

2. **Follow the specification**

   - Use exact color values from this specification;
   - Implement syntax highlighting rules consistently;
   - Test with provided code samples.

3. **Submit for review**

   - The repository must contain the following files, as in the template:
     - [`README.md`](https://github.com/dracula/template/blob/main/README.md): introduction and guide for GitHub users;
     - [`screenshot.png`](https://github.com/dracula/template/blob/main/screenshot.png): displays your Dracula-themed theme on the website;
     - [`INSTALL.md`](https://github.com/dracula/template/blob/main/INSTALL.md): installation instructions to display on the website;
     - [`sample`](https://github.com/dracula/template/blob/main/sample/): code samples in various languages to aid theme creation. (_Consider removing this folder before submission._);
   - [Submit an issue](https://github.com/dracula/dracula-theme/issues/new) with repository link.

4. **Organization transfer**

   - Accepted repositories move under Dracula organization;
   - Maintain consistency with other official implementations.

### Quality Standards

- **Color Accuracy**: Use exact hex values from specification;
- **Coverage**: Support all major syntax categories;
- **Documentation**: Clear installation and usage instructions;
- **Testing**: Validate against multiple code samples;
- **Maintenance**: Respond to issues and keep updated.

---

_This specification is the authoritative reference for Dracula Theme implementations. For updates and community resources, visit [draculatheme.com](https://draculatheme.com)._

> See something that could be improved in this documentation? Contribute by [editing this page on GitHub.](https://github.com/dracula/draculatheme.com/blob/main/content/spec.md) 🎈
