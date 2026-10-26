const markup = [
  `<span class="line"><span class="comment">// Light a candle before you open the crypt.</span></span>`,
  `<span class="line"><span class="keyword">import</span> { <span class="type">Coffin</span>, <span class="type">Lantern</span> } <span class="keyword">from</span> <span class="string">"./crypt"</span>;</span>`,
  `<span class="line"></span>`,
  `<span class="line"><span class="keyword">type</span> <span class="type">Hour</span> <span class="operator">=</span> <span class="string">"dusk"</span> <span class="operator">|</span> <span class="string">"midnight"</span> <span class="operator">|</span> <span class="string">"sunrise"</span>;</span>`,
  `<span class="line"></span>`,
  `<span class="line"><span class="keyword">export</span> <span class="keyword">const</span> <span class="function">awaken</span> <span class="operator">=</span> <span class="keyword">async</span> (<span class="identifier">hour</span>: <span class="type">Hour</span>) <span class="operator">=&gt;</span> {</span>`,
  `<span class="line">  <span class="keyword">if</span> (<span class="identifier">hour</span> <span class="operator">===</span> <span class="string">"sunrise"</span>) {</span>`,
  `<span class="line">    <span class="keyword">throw</span> <span class="keyword">new</span> <span class="type">Error</span>(<span class="string">"Too bright."</span>);</span>`,
  `<span class="line">  }</span>`,
  `<span class="line">  <span class="keyword">const</span> <span class="identifier">coffin</span> <span class="operator">=</span> <span class="keyword">await</span> <span class="type">Coffin</span>.<span class="function">open</span>({ <span class="property">creak</span>: <span class="constant">true</span> });</span>`,
  `<span class="line">  <span class="keyword">const</span> <span class="identifier">light</span> <span class="operator">=</span> <span class="keyword">new</span> <span class="type">Lantern</span>(<span class="number">0.8</span>);</span>`,
  `<span class="line"></span>`,
  `<span class="line">  <span class="keyword">return</span> <span class="identifier">coffin</span>.<span class="function">rise</span>({ <span class="identifier">light</span>, <span class="property">thirst</span>: <span class="constant">Infinity</span> });</span>`,
  `<span class="line">};</span>`,
  `<span class="line"></span>`,
  `<span class="line"><span class="comment">// TODO: find a way to make sunrise optional</span></span>`,
  `<span class="line active"></span>`
].join("");

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
      <code dangerouslySetInnerHTML={{ __html: markup }} />
    </pre>
  </figure>
);
