"use strict";(self.webpackChunkantm=self.webpackChunkantm||[]).push([[113],{30113:function(a,s,n){n.r(s),s.default={tile:"MarkdownSyntaxExtension",docs:'<h1>Markdown Syntax Extension</h1>\n<div class="card"><h3 id="Based%20on%20markdown-it"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>Based on markdown-it</h3>\n<p>antmjs Doc is based on markdown-it to parse markdown content. We can use the plugin mechanism of <code>markdown-it</code> to extend the syntax, such as:</p>\n<ul>\n<li><a href="https://github.com/markdown-it/markdown-it-sub">Subscript (markdown-it-sub)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-sup">Superscript (markdown-it-sup)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-footnote">Footnote (markdown-it-footnote)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-deflist">Definition list (markdown-it-deflist)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-abbr">Abbreviation (markdown-it-abbr)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-emoji">Emoji (markdown-it-emoji)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-container">Custom container (markdown-it-container)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-ins">Insert (markdown-it-ins)</a></li>\n<li><a href="https://github.com/markdown-it/markdown-it-mark">Mark (markdown-it-mark)</a></li>\n<li>... and <a href="https://www.npmjs.com/search?q=markdown-it%20plugin">others</a></li>\n</ul>\n</div><div class="card"><h3 id="Usage"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>Usage</h3>\n<p>In antmjs.config, use it as follows:</p>\n<pre><code class="language-ts"><span class="hljs-keyword">import</span> markdownItSub <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;markdown-it-sub&#x27;</span>\n<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">IDocsConfig</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@antmjs/doc&#x27;</span>\n\n<span class="hljs-keyword">const</span> <span class="hljs-attr">docs</span>: <span class="hljs-title class_">IDocsConfig</span> = {\n  <span class="hljs-attr">markdownPlugins</span>: [markdownItSub],\n}\n<span class="hljs-comment">// ...</span>\n</code></pre>\n</div>',h3Ids:"Based on markdown-it:::Usage"}}}]);