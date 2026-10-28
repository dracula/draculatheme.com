type TokenClassName =
  | "comment"
  | "keyword"
  | "type"
  | "string"
  | "operator"
  | "function"
  | "identifier"
  | "property"
  | "constant"
  | "number";

type HighlightedToken = {
  identifier: string;
  className: TokenClassName;
  value: string;
};

type Token = HighlightedToken | { value: string };

type PreviewLine = {
  identifier: string;
  tokens: Token[];
  active?: boolean;
};

const mark = (
  identifier: string,
  className: TokenClassName,
  value: string
): HighlightedToken => ({ identifier, className, value });

const text = (value: string): Token => ({ value });

const snippet: PreviewLine[] = [
  {
    identifier: "comment-candle",
    tokens: [
      mark("comment", "comment", "// Light a candle before you open the crypt.")
    ]
  },
  {
    identifier: "import",
    tokens: [
      mark("import", "keyword", "import"),
      text(" { "),
      mark("coffin", "type", "Coffin"),
      text(", "),
      mark("lantern", "type", "Lantern"),
      text(" } "),
      mark("from", "keyword", "from"),
      text(" "),
      mark("crypt", "string", '"./crypt"'),
      text(";")
    ]
  },
  { identifier: "blank-after-import", tokens: [] },
  {
    identifier: "type-hour",
    tokens: [
      mark("type", "keyword", "type"),
      text(" "),
      mark("hour", "type", "Hour"),
      text(" "),
      mark("equals", "operator", "="),
      text(" "),
      mark("dusk", "string", '"dusk"'),
      text(" "),
      mark("union-dusk", "operator", "|"),
      text(" "),
      mark("midnight", "string", '"midnight"'),
      text(" "),
      mark("union-midnight", "operator", "|"),
      text(" "),
      mark("sunrise", "string", '"sunrise"'),
      text(";")
    ]
  },
  { identifier: "blank-after-hour", tokens: [] },
  {
    identifier: "export-awaken",
    tokens: [
      mark("export", "keyword", "export"),
      text(" "),
      mark("const", "keyword", "const"),
      text(" "),
      mark("awaken", "function", "awaken"),
      text(" "),
      mark("equals", "operator", "="),
      text(" "),
      mark("async", "keyword", "async"),
      text(" ("),
      mark("hour", "identifier", "hour"),
      text(": "),
      mark("hour-type", "type", "Hour"),
      text(") "),
      mark("arrow", "operator", "=>"),
      text(" {")
    ]
  },
  {
    identifier: "if-sunrise",
    tokens: [
      text("  "),
      mark("if", "keyword", "if"),
      text(" ("),
      mark("hour", "identifier", "hour"),
      text(" "),
      mark("equals", "operator", "==="),
      text(" "),
      mark("sunrise", "string", '"sunrise"'),
      text(") {")
    ]
  },
  {
    identifier: "throw-too-bright",
    tokens: [
      text("    "),
      mark("throw", "keyword", "throw"),
      text(" "),
      mark("new", "keyword", "new"),
      text(" "),
      mark("error", "type", "Error"),
      text("("),
      mark("message", "string", '"Too bright."'),
      text(");")
    ]
  },
  { identifier: "close-if", tokens: [text("  }")] },
  {
    identifier: "open-coffin",
    tokens: [
      text("  "),
      mark("const", "keyword", "const"),
      text(" "),
      mark("coffin", "identifier", "coffin"),
      text(" "),
      mark("equals", "operator", "="),
      text(" "),
      mark("await", "keyword", "await"),
      text(" "),
      mark("coffin-type", "type", "Coffin"),
      text("."),
      mark("open", "function", "open"),
      text("({ "),
      mark("creak", "property", "creak"),
      text(": "),
      mark("true", "constant", "true"),
      text(" });")
    ]
  },
  {
    identifier: "new-lantern",
    tokens: [
      text("  "),
      mark("const", "keyword", "const"),
      text(" "),
      mark("light", "identifier", "light"),
      text(" "),
      mark("equals", "operator", "="),
      text(" "),
      mark("new", "keyword", "new"),
      text(" "),
      mark("lantern-type", "type", "Lantern"),
      text("("),
      mark("brightness", "number", "0.8"),
      text(");")
    ]
  },
  { identifier: "blank-after-lantern", tokens: [] },
  {
    identifier: "return-rise",
    tokens: [
      text("  "),
      mark("return", "keyword", "return"),
      text(" "),
      mark("coffin", "identifier", "coffin"),
      text("."),
      mark("rise", "function", "rise"),
      text("({ "),
      mark("light", "identifier", "light"),
      text(", "),
      mark("thirst", "property", "thirst"),
      text(": "),
      mark("infinity", "constant", "Infinity"),
      text(" });")
    ]
  },
  { identifier: "close-function", tokens: [text("};")] },
  { identifier: "blank-after-function", tokens: [] },
  {
    identifier: "comment-todo",
    tokens: [
      mark("comment", "comment", "// TODO: find a way to make sunrise optional")
    ]
  },
  { identifier: "cursor", tokens: [], active: true }
];

export const CodePreview = () => (
  <figure className="code-preview" aria-label="crypt.ts — Nosferatu">
    <div className="chrome" aria-hidden>
      <span className="traffic">
        <span className="light close" />
        <span className="light minimize" />
        <span className="light maximize" />
      </span>
      <span className="filename">crypt.ts — Nosferatu</span>
    </div>
    <pre>
      <code>
        {snippet.map((line) => (
          <span
            key={line.identifier}
            className={line.active ? "line active" : "line"}
          >
            {line.tokens.map((token) =>
              "identifier" in token ? (
                <span key={token.identifier} className={token.className}>
                  {token.value}
                </span>
              ) : (
                token.value
              )
            )}
          </span>
        ))}
      </code>
    </pre>
  </figure>
);
